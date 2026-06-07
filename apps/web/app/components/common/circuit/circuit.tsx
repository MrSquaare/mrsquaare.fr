"use client";

/* eslint-disable react/no-unknown-property */
import { Application as PixiApplication, extend } from "@pixi/react";
import { Container, Graphics, MeshRope, Sprite, TilingSprite } from "pixi.js";
import { useMemo, type FC } from "react";

import { useWindowSize } from "../../../hooks/use-window-size";
import { deepMerge } from "../../../utilities/deep-merge";

import {
  DEFAULT_PARTICLE_SETTINGS,
  DEFAULT_PATTERN_SETTINGS,
} from "./constants";
import { useCircuitParticles } from "./particle";
import { useCircuitPatternTexture } from "./textures";
import type {
  ParticleSettings,
  PatternSettings,
  ResolvedParticleSettings,
} from "./types";

extend({ Container, Graphics, TilingSprite, Sprite, MeshRope });

type CircuitBoardProps = {
  patternSettings: Required<PatternSettings>;
  particleSettings: ResolvedParticleSettings;
};

const CircuitBoard: FC<CircuitBoardProps> = ({
  patternSettings,
  particleSettings,
}) => {
  const { rotation } = patternSettings;
  const screenSize = useWindowSize();

  const patternTexture = useCircuitPatternTexture(patternSettings);
  const particlesContainerRef = useCircuitParticles(
    patternSettings,
    particleSettings,
  );

  return (
    <pixiContainer
      rotation={rotation}
      x={screenSize.width / 2}
      y={screenSize.height / 2}
    >
      {patternTexture && (
        <pixiTilingSprite
          height={screenSize.height * 2}
          texture={patternTexture}
          tilePosition={{ x: screenSize.width, y: screenSize.height }}
          width={screenSize.width * 2}
          x={-screenSize.width}
          y={-screenSize.height}
        />
      )}
      <pixiContainer blendMode={"add"} ref={particlesContainerRef} />
    </pixiContainer>
  );
};

export type SquaarePatternCircuitProps = {
  className?: string;
  patternSettings?: PatternSettings;
  particleSettings?: ParticleSettings;
};

export const SquaarePatternCircuit: FC<SquaarePatternCircuitProps> = ({
  className,
  patternSettings,
  particleSettings,
}) => {
  const resolvedPatternSettings = useMemo(
    () => deepMerge(DEFAULT_PATTERN_SETTINGS, patternSettings),
    [patternSettings],
  );
  const resolvedParticleSettings = useMemo(
    () => deepMerge(DEFAULT_PARTICLE_SETTINGS, particleSettings),
    [particleSettings],
  );

  return (
    <div className={className}>
      <PixiApplication antialias backgroundAlpha={0} resizeTo={window}>
        <CircuitBoard
          particleSettings={resolvedParticleSettings}
          patternSettings={resolvedPatternSettings}
        />
      </PixiApplication>
    </div>
  );
};
