import { SVG_POINTS } from "../constants";

import type {
  ResolvedParticleDirectionWeights,
  ResolvedParticleSettings,
  ResolvedParticleSpeedSettings,
  ResolvedParticleTrailSettings,
  PatternSettings,
  PatternSize,
  PatternPoints,
} from "./types";

export const DEFAULT_COLORS = {
  pattern: "#1f1f2e",
  particle: "#ffffff",
  trail: "#bc13fe",
} as const;

const DEFAULT_PATTERN_POINTS: PatternPoints = SVG_POINTS;
const DEFAULT_PATTERN_SIZE: PatternSize = { x: 32, y: 32 };
const DEFAULT_PATTERN_ROTATION = -17 * (Math.PI / 180);

export const DEFAULT_PATTERN_SETTINGS: Required<PatternSettings> = {
  points: DEFAULT_PATTERN_POINTS,
  size: DEFAULT_PATTERN_SIZE,
  rotation: DEFAULT_PATTERN_ROTATION,
  color: DEFAULT_COLORS.pattern,
  width: 1.5,
  alpha: 0.3,
};

const DEFAULT_TRAIL_SETTINGS: ResolvedParticleTrailSettings = {
  length: 20,
  thickness: 4,
  color: DEFAULT_COLORS.trail,
};

const DEFAULT_SPEED_SETTINGS: ResolvedParticleSpeedSettings = {
  min: 1.5,
  max: 4.5,
};

const DEFAULT_DIRECTION_WEIGHTS: ResolvedParticleDirectionWeights = {
  up: 0.3,
  right: 0.7,
  down: 0,
  left: 0,
};

export const DEFAULT_PARTICLE_SETTINGS: ResolvedParticleSettings = {
  count: 150,
  spawnRate: 0.3,
  color: DEFAULT_COLORS.particle,
  size: 1,
  trail: DEFAULT_TRAIL_SETTINGS,
  speed: DEFAULT_SPEED_SETTINGS,
  directionWeights: DEFAULT_DIRECTION_WEIGHTS,
};
