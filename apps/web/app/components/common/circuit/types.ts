export type PatternPoint = [number, number];
export type PatternPoints = PatternPoint[];
export type PatternSize = { x: number; y: number };

export type PatternSettings = {
  points?: PatternPoints;
  size?: PatternSize;
  rotation?: number;
  color?: string;
  width?: number;
  alpha?: number;
};

export type ParticleDirectionWeights = {
  up?: number;
  right?: number;
  down?: number;
  left?: number;
};

export type ParticleSettings = {
  count?: number;
  spawnRate?: number;
  color?: string;
  size?: number;
  trail?: ParticleTrailSettings;
  speed?: ParticleSpeedSettings;
  directionWeights?: ParticleDirectionWeights;
};

export type ParticleTrailSettings = {
  length?: number;
  thickness?: number;
  color?: string;
};

export type ParticleSpeedSettings = {
  min?: number;
  max?: number;
};

export type ResolvedParticleTrailSettings = Required<ParticleTrailSettings>;
export type ResolvedParticleSpeedSettings = Required<ParticleSpeedSettings>;
export type ResolvedParticleDirectionWeights =
  Required<ParticleDirectionWeights>;

export type ResolvedParticleSettings = Omit<
  Required<ParticleSettings>,
  "trail" | "speed" | "directionWeights"
> & {
  trail: ResolvedParticleTrailSettings;
  speed: ResolvedParticleSpeedSettings;
  directionWeights: ResolvedParticleDirectionWeights;
};

export type MoveOption = {
  targetIndex: number;
  patternShiftX: number;
  patternShiftY: number;
  dx: number;
  dy: number;
};

export type NodeMoves = {
  xMoves: MoveOption[];
  yMoves: MoveOption[];
  allMoves: MoveOption[];
};
