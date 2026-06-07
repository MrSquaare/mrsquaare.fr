/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type FC } from "react";
import * as THREE from "three";

import { useMouseInWindow } from "../../../hooks/use-mouse-in-window";
import { useMousePosition } from "../../../hooks/use-mouse-position";
import { SVG_BASE_HEIGHT, SVG_BASE_WIDTH, SVG_POINTS } from "../constants";

import { AURA_CONFIG, OBJECT_CONFIG } from "./constants";
import type { ResolvedSquaare3DSettings } from "./types";

export type SquaareMeshProps = {
  settings: ResolvedSquaare3DSettings;
};

export const SquaareMesh: FC<SquaareMeshProps> = ({ settings }) => {
  const {
    angle,
    auraColor,
    auraSpread,
    cursorAngle,
    depth,
    faceColor,
    height,
    metalness,
    responsiveness,
    roughness,
    sideColor,
    width,
  } = settings;
  const groupRef = useRef<THREE.Group>(null);
  const { size, viewport } = useThree();

  const scale = useMemo(() => {
    const pixelToUnit = viewport.width / size.width;

    if (width !== undefined) return (width * pixelToUnit) / SVG_BASE_WIDTH;

    if (height !== undefined) return (height * pixelToUnit) / SVG_BASE_HEIGHT;

    return 1;
  }, [height, width, viewport.width, size.width]);

  const auraZ = useMemo(() => {
    const boundingRadius = Math.sqrt(
      (SVG_BASE_WIDTH / 2) ** 2 + (SVG_BASE_HEIGHT / 2) ** 2 + (depth / 2) ** 2,
    );

    return -boundingRadius - AURA_CONFIG.zBuffer;
  }, [depth]);

  const [geometry, faceMaterial, sideMaterial] = useMemo(() => {
    const shape = new THREE.Shape();
    const offsetX = SVG_BASE_WIDTH / 2;
    const offsetY = SVG_BASE_HEIGHT / 2;

    shape.moveTo(SVG_POINTS[0][0] - offsetX, -(SVG_POINTS[0][1] - offsetY));

    for (let i = 1; i < SVG_POINTS.length; i++) {
      shape.lineTo(SVG_POINTS[i][0] - offsetX, -(SVG_POINTS[i][1] - offsetY));
    }

    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      bevelEnabled: false,
      depth,
    });
    const face = new THREE.MeshStandardMaterial({
      color: faceColor,
      roughness: 1.0,
      metalness: 0.0,
      emissive: "white",
      emissiveIntensity: OBJECT_CONFIG.faceEmissiveIntensity,
    });
    const sides = new THREE.MeshStandardMaterial({
      color: sideColor,
      roughness,
      metalness,
      emissive: auraColor,
      emissiveIntensity: OBJECT_CONFIG.sideEmissiveIntensity,
    });

    return [geo, face, sides] as const;
  }, [auraColor, depth, faceColor, metalness, roughness, sideColor]);

  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    sideMaterial.roughness = roughness;
    sideMaterial.metalness = metalness;

    sideMaterial.emissive.set(auraColor);
  }, [sideMaterial, roughness, metalness, auraColor]);
  /* eslint-enable react-hooks/immutability */

  useEffect(
    () => () => {
      geometry.dispose();
      faceMaterial.dispose();
      sideMaterial.dispose();
    },
    [geometry, faceMaterial, sideMaterial],
  );

  const mouse = useMousePosition();
  const isMouseInWindow = useMouseInWindow();

  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = isMouseInWindow.current ? mouse.current.x : 0;
    const targetY = isMouseInWindow.current ? mouse.current.y : 0;

    const targetRotationY = targetX * cursorAngle;
    const targetRotationX = -targetY * cursorAngle;

    groupRef.current.rotation.x +=
      (targetRotationX - groupRef.current.rotation.x) * responsiveness;
    groupRef.current.rotation.y +=
      (targetRotationY - groupRef.current.rotation.y) * responsiveness;
  });

  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(angle)]}>
      <mesh position={[0, 0, auraZ]}>
        <circleGeometry
          args={[AURA_CONFIG.radius * scale, AURA_CONFIG.segments]}
        />
        <shaderMaterial
          depthWrite={false}
          fragmentShader={`
            uniform vec3 color;
            uniform float spread;
            varying vec2 vUv;
            void main() {
              float dist = distance(vUv, vec2(0.5));
              float alpha = 1.0 - smoothstep(0.0, spread, dist);
              alpha = pow(alpha, 2.0);
              gl_FragColor = vec4(color, alpha * ${AURA_CONFIG.opacity.toFixed(1)});
            }
          `}
          transparent
          uniforms={{
            color: { value: new THREE.Color(auraColor) },
            spread: { value: auraSpread },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
        />
      </mesh>

      <group ref={groupRef}>
        <mesh
          material={[faceMaterial, sideMaterial]}
          position={[0, 0, -depth / 2]}
          scale={[scale, scale, 1]}
        >
          <primitive object={geometry} />
        </mesh>
      </group>
    </group>
  );
};
