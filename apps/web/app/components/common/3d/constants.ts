import type { ResolvedSquaare3DSettings } from "./types";

export const DEFAULT_3D_SETTINGS: ResolvedSquaare3DSettings = {
  angle: 17,
  auraColor: "#bc13fe",
  auraSpread: 0.5,
  brightness: 1500,
  cursorAngle: Math.PI / 8,
  depth: 20,
  faceColor: "white",
  height: 200,
  metalness: 0.8,
  responsiveness: 0.1,
  roughness: 0.4,
  sideColor: "#555555",
};

export const CANVAS_CONFIG = {
  dpr: [1, 1.5] as [number, number],
} as const;

export const CAMERA_CONFIG = {
  fov: 50,
  position: [0, 0, 100] as [number, number, number],
} as const;

export const ENVIRONMENT_CONFIG = {
  preset: "city",
  intensity: 0.5,
} as const;

export const LIGHTS_CONFIG = {
  ambient: {
    intensity: 0.8,
  },
  hemisphere: {
    color: "white",
    intensity: 0.8,
  },
  point: {
    color: "#e0b0ff",
    position: [0, 0, 100] as [number, number, number],
  },
} as const;

export const AURA_CONFIG = {
  radius: 120,
  segments: 64,
  zBuffer: 5,
  opacity: 0.6,
} as const;

export const OBJECT_CONFIG = {
  faceEmissiveIntensity: 0.5,
  sideEmissiveIntensity: 0.05,
} as const;
