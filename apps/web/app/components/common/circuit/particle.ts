import { useApplication, useTick } from "@pixi/react";
import {
  Graphics,
  MeshRope,
  Point,
  RenderTexture,
  Sprite,
  Texture,
} from "pixi.js";
import type { Application, Container } from "pixi.js";
import { useEffect, useRef } from "react";

import { useVisibility } from "../../../hooks/use-visibility";
import { deferDestroy } from "../../../utilities/defer";

import type {
  MoveOption,
  NodeMoves,
  ParticleDirectionWeights,
  PatternPoints,
  PatternSettings,
  PatternSize,
  ResolvedParticleSettings,
} from "./types";

const TRAIL_TEXTURE_WIDTH = 256;
const HEAD_TEXTURE_SIZE = 16;
const HEAD_RADIUS = HEAD_TEXTURE_SIZE / 2;

const TILE_SHIFTS = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
] as const;

const isDirectionAllowed = (
  dx: number,
  dy: number,
  directionWeights: Required<ParticleDirectionWeights>,
): boolean => {
  if (dx > 0.1 && directionWeights.right <= 0) return false;

  if (dx < -0.1 && directionWeights.left <= 0) return false;

  if (dy > 0.1 && directionWeights.down <= 0) return false;

  if (dy < -0.1 && directionWeights.up <= 0) return false;

  return true;
};

export const buildRoutingGraph = (
  points: PatternPoints,
  size: PatternSize,
  directionWeights: Required<ParticleDirectionWeights>,
): NodeMoves[] => {
  const nodeCount = points.length;
  const nodeEdges: MoveOption[][] = Array.from({ length: nodeCount }, () => []);

  for (let i = 0; i < nodeCount; i++) {
    const neighbors = [(i + 1) % nodeCount, (i - 1 + nodeCount) % nodeCount];

    for (const n of neighbors) {
      const dx = points[n][0] - points[i][0];
      const dy = points[n][1] - points[i][1];

      if (isDirectionAllowed(dx, dy, directionWeights)) {
        nodeEdges[i].push({
          targetIndex: n,
          patternShiftX: 0,
          patternShiftY: 0,
          dx: Math.sign(dx),
          dy: Math.sign(dy),
        });
      }
    }

    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;

      for (const shift of TILE_SHIFTS) {
        if (!isDirectionAllowed(shift.x, shift.y, directionWeights)) {
          continue;
        }

        const alignsX =
          Math.abs(points[i][0] - (points[j][0] + shift.x * size.x)) < 0.1;
        const alignsY =
          Math.abs(points[i][1] - (points[j][1] + shift.y * size.y)) < 0.1;

        if (alignsX && alignsY) {
          nodeEdges[i].push({
            targetIndex: j,
            patternShiftX: shift.x,
            patternShiftY: shift.y,
            dx: shift.x,
            dy: shift.y,
          });
        }
      }
    }
  }

  return nodeEdges.map((moves) => ({
    allMoves: moves,
    xMoves: moves.filter((m) => Math.abs(m.dx) > 0.1),
    yMoves: moves.filter((m) => Math.abs(m.dy) > 0.1),
  }));
};

export const selectNextMove = (
  moves: NodeMoves,
  directionWeights: Required<ParticleDirectionWeights>,
): MoveOption | null => {
  const { xMoves, yMoves, allMoves } = moves;

  if (allMoves.length === 0) return null;

  if (xMoves.length > 0 && yMoves.length > 0) {
    const totalWeightX = xMoves.reduce(
      (sum, m) =>
        sum + (m.dx > 0 ? directionWeights.right : directionWeights.left),
      0,
    );

    const totalWeightY = yMoves.reduce(
      (sum, m) =>
        sum + (m.dy > 0 ? directionWeights.down : directionWeights.up),
      0,
    );

    const totalWeight = totalWeightX + totalWeightY;

    if (process.env.NODE_ENV !== "production" && totalWeight === 0) {
      console.error(
        "[selectNextMove] totalWeight is 0 despite non-empty xMoves and yMoves. " +
          "This indicates a graph-build invariant violation.",
      );
    }

    const xProb = totalWeightX / (totalWeight || 1);

    const pool = Math.random() < xProb ? xMoves : yMoves;

    return pool[Math.floor(Math.random() * pool.length)];
  }

  return allMoves[Math.floor(Math.random() * allMoves.length)];
};

const resizeTypedArray = <T extends Uint8Array | Int32Array | Float32Array>(
  arr: T,
  size: number,
  Ctor: new (n: number) => T,
): T => {
  const res = new Ctor(size);

  res.set(arr.subarray(0, Math.min(arr.length, size)));

  return res;
};

const directionWeightsChanged = (
  a: Required<ParticleDirectionWeights>,
  b: Required<ParticleDirectionWeights>,
): boolean => {
  return (Object.keys(a) as Array<keyof typeof a>).some((k) => a[k] !== b[k]);
};

export class ParticleStorage {
  active = new Uint8Array(0);
  retiring = new Uint8Array(0);
  gridX = new Int32Array(0);
  gridY = new Int32Array(0);
  tileOffsetX = new Float32Array(0);
  tileOffsetY = new Float32Array(0);
  targetOffsetX = new Float32Array(0);
  targetOffsetY = new Float32Array(0);
  directionX = new Float32Array(0);
  directionY = new Float32Array(0);
  speed = new Float32Array(0);
  nodeIndex = new Int32Array(0);
  targetNodeIndex = new Int32Array(0);

  resize(newSize: number): void {
    this.active = resizeTypedArray(this.active, newSize, Uint8Array);
    this.retiring = resizeTypedArray(this.retiring, newSize, Uint8Array);
    this.gridX = resizeTypedArray(this.gridX, newSize, Int32Array);
    this.gridY = resizeTypedArray(this.gridY, newSize, Int32Array);
    this.tileOffsetX = resizeTypedArray(
      this.tileOffsetX,
      newSize,
      Float32Array,
    );
    this.tileOffsetY = resizeTypedArray(
      this.tileOffsetY,
      newSize,
      Float32Array,
    );
    this.targetOffsetX = resizeTypedArray(
      this.targetOffsetX,
      newSize,
      Float32Array,
    );
    this.targetOffsetY = resizeTypedArray(
      this.targetOffsetY,
      newSize,
      Float32Array,
    );
    this.directionX = resizeTypedArray(this.directionX, newSize, Float32Array);
    this.directionY = resizeTypedArray(this.directionY, newSize, Float32Array);
    this.speed = resizeTypedArray(this.speed, newSize, Float32Array);
    this.nodeIndex = resizeTypedArray(this.nodeIndex, newSize, Int32Array);
    this.targetNodeIndex = resizeTypedArray(
      this.targetNodeIndex,
      newSize,
      Int32Array,
    );
  }

  destroy(): void {
    this.resize(0);
  }
}

export class ParticleRenderer {
  trailTexture: Texture | null = null;
  headTexture: Texture | null = null;
  pixiPoints: Point[][] = [];
  trailMeshes: MeshRope[] = [];
  headSprites: Sprite[] = [];

  private app: Application;
  private container: Container;

  constructor(app: Application, container: Container, trailThickness: number) {
    this.app = app;
    this.container = container;

    this.initTextures(trailThickness);
  }

  updateTextures(trailThickness: number, trailColor: string): void {
    if (this.trailTexture) {
      deferDestroy(this.trailTexture, false);
    }

    this.trailTexture = this.createTrailTexture(trailThickness);

    const capacity = this.trailMeshes.length;

    for (let i = 0; i < capacity; i++) {
      this.trailMeshes[i].texture = this.trailTexture;

      this.rebuildMesh(i, trailColor);
    }
  }

  growPool(count: number, trailLength: number): void {
    const current = this.trailMeshes.length;

    if (current < count) {
      for (let i = current; i < count; i++) {
        if (this.trailTexture && this.headTexture) {
          const points: Point[] = [];

          for (let p = 0; p < trailLength; p++) {
            points.push(new Point(0, 0));
          }

          this.pixiPoints.push(points);

          const mesh = new MeshRope({
            texture: this.trailTexture,
            points,
          });

          mesh.visible = false;

          this.container.addChild(mesh);
          this.trailMeshes.push(mesh);

          const sprite = new Sprite(this.headTexture);

          sprite.anchor.set(0.5);

          sprite.visible = false;

          this.container.addChild(sprite);
          this.headSprites.push(sprite);
        }
      }
    }
  }

  resizeTrail(i: number, length: number, trailColor: string): void {
    const points = this.pixiPoints[i];
    const currentLength = points.length;

    if (currentLength === length) {
      return;
    }

    if (currentLength < length) {
      const lastPoint = points[currentLength - 1] ?? new Point(0, 0);

      while (points.length < length) {
        points.push(new Point(lastPoint.x, lastPoint.y));
      }
    } else {
      while (points.length > length) {
        points.pop();
      }
    }

    this.rebuildMesh(i, trailColor);
  }

  applyStyle(
    trailLength: number,
    trailColor: string,
    headColor: string,
    headSize: number,
  ): void {
    const capacity = this.trailMeshes.length;

    for (let i = 0; i < capacity; i++) {
      this.resizeTrail(i, trailLength, trailColor);

      this.trailMeshes[i].tint = trailColor;

      const sprite = this.headSprites[i];

      sprite.tint = headColor;
      sprite.width = headSize * 2;
      sprite.height = headSize * 2;
    }
  }

  activateParticle(
    i: number,
    worldX: number,
    worldY: number,
    trailLength: number,
    trailColor: string,
  ): void {
    this.resizeTrail(i, trailLength, trailColor);

    const points = this.pixiPoints[i];

    for (let p = 0; p < points.length; p++) {
      points[p].x = worldX;
      points[p].y = worldY;
    }

    this.trailMeshes[i].visible = true;

    const sprite = this.headSprites[i];

    sprite.x = worldX;
    sprite.y = worldY;
    sprite.visible = true;
  }

  deactivateParticle(i: number): void {
    this.trailMeshes[i].visible = false;
    this.headSprites[i].visible = false;
  }

  shiftTrail(i: number, worldX: number, worldY: number): void {
    const points = this.pixiPoints[i];

    for (let p = points.length - 1; p > 0; p--) {
      points[p].x = points[p - 1].x;
      points[p].y = points[p - 1].y;
    }

    points[0].x = worldX;
    points[0].y = worldY;

    this.headSprites[i].x = worldX;
    this.headSprites[i].y = worldY;
  }

  pop(): void {
    const i = this.trailMeshes.length - 1;

    this.trailMeshes[i].destroy();
    this.headSprites[i].destroy();
    this.trailMeshes.pop();
    this.headSprites.pop();
    this.pixiPoints.pop();
  }

  destroy(): void {
    const capacity = this.trailMeshes.length;

    for (let i = 0; i < capacity; i++) {
      if (!this.trailMeshes[i].destroyed) {
        this.trailMeshes[i].destroy();
      }

      if (!this.headSprites[i].destroyed) {
        this.headSprites[i].destroy();
      }
    }

    this.pixiPoints = [];
    this.trailMeshes = [];
    this.headSprites = [];

    if (this.trailTexture) {
      deferDestroy(this.trailTexture, false);

      this.trailTexture = null;
    }

    if (this.headTexture) {
      deferDestroy(this.headTexture, false);

      this.headTexture = null;
    }
  }

  private createTrailTexture(thickness: number): Texture {
    const canvas = document.createElement("canvas");

    canvas.width = TRAIL_TEXTURE_WIDTH;
    canvas.height = thickness;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "[ParticleRenderer] Failed to acquire 2D canvas context for trail texture. " +
          "The browser may have exceeded its canvas context limit.",
      );
    }

    const gradient = ctx.createLinearGradient(0, 0, TRAIL_TEXTURE_WIDTH, 0);

    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, TRAIL_TEXTURE_WIDTH, thickness);

    return Texture.from(canvas);
  }

  private initTextures(trailThickness: number): void {
    this.trailTexture = this.createTrailTexture(trailThickness);

    const graphics = new Graphics();

    graphics.circle(0, 0, HEAD_RADIUS);
    graphics.fill(0xffffff);
    graphics.position.set(HEAD_RADIUS, HEAD_RADIUS);

    this.headTexture = RenderTexture.create({
      width: HEAD_TEXTURE_SIZE,
      height: HEAD_TEXTURE_SIZE,
    });

    this.app.renderer.render({
      container: graphics,
      target: this.headTexture,
      clear: true,
    });

    graphics.destroy();
  }

  private rebuildMesh(i: number, tint: string): void {
    const oldMesh = this.trailMeshes[i];
    const visible = oldMesh.visible;

    if (oldMesh.parent) {
      try {
        oldMesh.parent.removeChild(oldMesh);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[ParticleRenderer] rebuildMesh: could not remove old mesh from parent.",
            error,
          );
        }
      }
    }

    const newMesh = new MeshRope({
      texture: this.trailTexture!,
      points: this.pixiPoints[i],
    });

    newMesh.tint = tint;
    newMesh.visible = visible;

    this.container.addChildAt(newMesh, 0);

    this.trailMeshes[i] = newMesh;

    deferDestroy(oldMesh);
  }
}

export class CircuitParticleManager {
  private graph: NodeMoves[];
  private patternPoints: PatternPoints;
  private patternSettings: Required<PatternSettings>;
  private particleSettings: ResolvedParticleSettings;
  private isVisible: boolean;

  private storage = new ParticleStorage();
  private renderer: ParticleRenderer;
  private activeCount = 0;

  constructor(
    app: Application,
    container: Container,
    patternSettings: Required<PatternSettings>,
    particleSettings: ResolvedParticleSettings,
    isVisible: boolean,
  ) {
    this.patternSettings = patternSettings;
    this.particleSettings = particleSettings;
    this.isVisible = isVisible;
    this.patternPoints = patternSettings.points;
    this.graph = buildRoutingGraph(
      patternSettings.points,
      patternSettings.size,
      particleSettings.directionWeights,
    );
    this.renderer = new ParticleRenderer(
      app,
      container,
      particleSettings.trail.thickness,
    );

    this.reconcileCount();
    this.applyStyle();
  }

  update(
    patternSettings: Required<PatternSettings>,
    particleSettings: ResolvedParticleSettings,
    isVisible: boolean,
  ): void {
    const pointsChanged =
      this.patternSettings.points !== patternSettings.points;
    const sizeChanged =
      this.patternSettings.size.x !== patternSettings.size.x ||
      this.patternSettings.size.y !== patternSettings.size.y;
    const weightsChanged = directionWeightsChanged(
      this.particleSettings.directionWeights,
      particleSettings.directionWeights,
    );

    if (pointsChanged || sizeChanged || weightsChanged) {
      this.patternPoints = patternSettings.points;
      this.graph = buildRoutingGraph(
        patternSettings.points,
        patternSettings.size,
        particleSettings.directionWeights,
      );
    }

    const thicknessChanged =
      this.particleSettings.trail.thickness !==
      particleSettings.trail.thickness;
    const trailColorChanged =
      this.particleSettings.trail.color !== particleSettings.trail.color;

    if (thicknessChanged || trailColorChanged) {
      this.renderer.updateTextures(
        particleSettings.trail.thickness,
        particleSettings.trail.color,
      );
    }

    this.patternSettings = patternSettings;
    this.particleSettings = particleSettings;
    this.isVisible = isVisible;

    this.reconcileCount();
    this.applyStyle();
  }

  tick(deltaTime: number, screenWidth: number, screenHeight: number): void {
    if (!this.isVisible) {
      return;
    }

    const delta = Math.min(deltaTime, 2.0);
    const { count, spawnRate, directionWeights } = this.particleSettings;
    const { size: patternSize } = this.patternSettings;

    const diag = Math.sqrt(
      screenWidth * screenWidth + screenHeight * screenHeight,
    );
    const minPatternX = Math.floor(-diag / 2 / patternSize.x) - 5;
    const maxPatternX = Math.ceil(diag / 2 / patternSize.x) + 5;
    const minPatternY = Math.floor(-diag / 2 / patternSize.y) - 5;
    const maxPatternY = Math.ceil(diag / 2 / patternSize.y) + 5;

    const capacity = this.renderer.trailMeshes.length;

    if (this.activeCount < count && Math.random() < spawnRate) {
      for (let i = 0; i < capacity; i++) {
        if (this.storage.active[i] === 0 && this.storage.retiring[i] === 0) {
          this.spawnParticle(
            i,
            minPatternX,
            maxPatternX,
            minPatternY,
            maxPatternY,
          );

          break;
        }
      }
    }

    for (let i = 0; i < capacity; i++) {
      if (this.storage.active[i] === 0) {
        continue;
      }

      const dist = this.storage.speed[i] * delta;
      const tx = this.storage.targetOffsetX[i];
      const ty = this.storage.targetOffsetY[i];
      const ox = this.storage.tileOffsetX[i];
      const oy = this.storage.tileOffsetY[i];

      const dx = tx - ox;
      const dy = ty - oy;
      const distToTarget = Math.abs(dx) + Math.abs(dy);

      if (dist >= distToTarget) {
        this.storage.tileOffsetX[i] = tx;
        this.storage.tileOffsetY[i] = ty;
        this.storage.nodeIndex[i] = this.storage.targetNodeIndex[i];

        if (this.storage.retiring[i] === 1) {
          this.despawnParticle(i);

          continue;
        }

        const move = selectNextMove(
          this.graph[this.storage.nodeIndex[i]],
          directionWeights,
        );

        if (move) {
          this.storage.gridX[i] += move.patternShiftX;
          this.storage.gridY[i] += move.patternShiftY;
          this.storage.tileOffsetX[i] -= move.patternShiftX * patternSize.x;
          this.storage.tileOffsetY[i] -= move.patternShiftY * patternSize.y;
          this.storage.targetNodeIndex[i] = move.targetIndex;
          this.storage.targetOffsetX[i] =
            this.patternPoints[move.targetIndex][0];
          this.storage.targetOffsetY[i] =
            this.patternPoints[move.targetIndex][1];
          this.storage.directionX[i] = move.dx;
          this.storage.directionY[i] = move.dy;
        } else {
          this.despawnParticle(i);

          continue;
        }
      } else {
        this.storage.tileOffsetX[i] += this.storage.directionX[i] * dist;
        this.storage.tileOffsetY[i] += this.storage.directionY[i] * dist;
      }

      const worldX =
        this.storage.gridX[i] * patternSize.x + this.storage.tileOffsetX[i];
      const worldY =
        this.storage.gridY[i] * patternSize.y + this.storage.tileOffsetY[i];

      this.renderer.shiftTrail(i, worldX, worldY);

      const gx = this.storage.gridX[i];
      const gy = this.storage.gridY[i];

      if (
        gx > maxPatternX ||
        gx < minPatternX ||
        gy > maxPatternY ||
        gy < minPatternY
      ) {
        this.despawnParticle(i);
      }
    }

    this.shrinkPool();
  }

  destroy(): void {
    this.storage.destroy();
    this.renderer.destroy();

    this.activeCount = 0;
  }

  private reconcileCount(): void {
    const { count, trail } = this.particleSettings;
    const current = this.renderer.trailMeshes.length;

    if (current < count) {
      this.storage.resize(count);
      this.renderer.growPool(count, trail.length);
    } else if (current > count) {
      for (let i = count; i < current; i++) {
        if (this.storage.active[i] === 1) {
          this.storage.retiring[i] = 1;
        }
      }
    }
  }

  private applyStyle(): void {
    const { trail, color, size } = this.particleSettings;

    this.renderer.applyStyle(trail.length, trail.color, color, size);
  }

  private spawnParticle(
    i: number,
    minPatternX: number,
    maxPatternX: number,
    minPatternY: number,
    maxPatternY: number,
  ): void {
    const { directionWeights, trail, speed } = this.particleSettings;
    const { size: patternSize } = this.patternSettings;

    const edgeWeights = {
      left: directionWeights.right,
      right: directionWeights.left,
      top: directionWeights.down,
      bottom: directionWeights.up,
    };

    const total =
      edgeWeights.left +
      edgeWeights.right +
      edgeWeights.top +
      edgeWeights.bottom;

    const r = Math.random() * (total || 1);

    let gridX: number;
    let gridY: number;

    if (total === 0 || r < edgeWeights.left) {
      gridX = minPatternX;
      gridY =
        Math.floor(Math.random() * (maxPatternY - minPatternY + 1)) +
        minPatternY;
    } else if (r < edgeWeights.left + edgeWeights.right) {
      gridX = maxPatternX;
      gridY =
        Math.floor(Math.random() * (maxPatternY - minPatternY + 1)) +
        minPatternY;
    } else if (r < edgeWeights.left + edgeWeights.right + edgeWeights.top) {
      gridX =
        Math.floor(Math.random() * (maxPatternX - minPatternX + 1)) +
        minPatternX;
      gridY = minPatternY;
    } else {
      gridX =
        Math.floor(Math.random() * (maxPatternX - minPatternX + 1)) +
        minPatternX;
      gridY = maxPatternY;
    }

    const startNodeIndex = Math.floor(
      Math.random() * this.patternPoints.length,
    );
    const startNode = this.patternPoints[startNodeIndex];
    const moves = this.graph[startNodeIndex].allMoves;

    if (moves.length > 0) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const targetNode = this.patternPoints[move.targetIndex];

      this.storage.active[i] = 1;
      this.storage.retiring[i] = 0;
      this.storage.gridX[i] = gridX + move.patternShiftX;
      this.storage.gridY[i] = gridY + move.patternShiftY;
      this.storage.tileOffsetX[i] =
        startNode[0] - move.patternShiftX * patternSize.x;
      this.storage.tileOffsetY[i] =
        startNode[1] - move.patternShiftY * patternSize.y;
      this.storage.targetOffsetX[i] = targetNode[0];
      this.storage.targetOffsetY[i] = targetNode[1];
      this.storage.directionX[i] = move.dx;
      this.storage.directionY[i] = move.dy;
      this.storage.speed[i] =
        speed.min + Math.random() * (speed.max - speed.min);
      this.storage.nodeIndex[i] = startNodeIndex;
      this.storage.targetNodeIndex[i] = move.targetIndex;

      this.activeCount++;

      const worldX =
        this.storage.gridX[i] * patternSize.x + this.storage.tileOffsetX[i];
      const worldY =
        this.storage.gridY[i] * patternSize.y + this.storage.tileOffsetY[i];

      this.renderer.activateParticle(
        i,
        worldX,
        worldY,
        trail.length,
        trail.color,
      );
    }
  }

  private despawnParticle(i: number): void {
    this.storage.active[i] = 0;
    this.storage.retiring[i] = 0;

    this.renderer.deactivateParticle(i);
    this.activeCount--;
  }

  private shrinkPool(): void {
    const { count } = this.particleSettings;
    let newCapacity = this.renderer.trailMeshes.length;

    if (newCapacity <= count) {
      return;
    }

    while (newCapacity > count) {
      const i = newCapacity - 1;

      if (this.storage.active[i] === 0 && this.storage.retiring[i] === 0) {
        this.renderer.pop();
        newCapacity--;
      } else {
        break;
      }
    }

    if (newCapacity !== this.storage.active.length) {
      this.storage.resize(newCapacity);
    }
  }
}

export const useCircuitParticles = (
  patternSettings: Required<PatternSettings>,
  particleSettings: ResolvedParticleSettings,
) => {
  const { app, isInitialised } = useApplication();
  const isVisible = useVisibility();
  const containerRef = useRef<Container>(null);
  const managerRef = useRef<CircuitParticleManager | null>(null);

  const stateRef = useRef({ patternSettings, particleSettings, isVisible });

  useEffect(() => {
    if (!isInitialised || !app || !app.renderer || !containerRef.current) {
      return;
    }

    const manager = new CircuitParticleManager(
      app,
      containerRef.current,
      stateRef.current.patternSettings,
      stateRef.current.particleSettings,
      stateRef.current.isVisible,
    );

    managerRef.current = manager;

    return () => {
      manager.destroy();

      managerRef.current = null;
    };
  }, [app, isInitialised]);

  useEffect(() => {
    stateRef.current = { patternSettings, particleSettings, isVisible };
    managerRef.current?.update(patternSettings, particleSettings, isVisible);
  }, [patternSettings, particleSettings, isVisible]);

  useTick((ticker) => {
    if (app) {
      managerRef.current?.tick(
        ticker.deltaTime,
        app.screen.width,
        app.screen.height,
      );
    }
  });

  return containerRef;
};
