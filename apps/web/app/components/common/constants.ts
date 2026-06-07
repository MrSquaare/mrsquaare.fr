import type { SvgPoint } from "../../utilities/svg";

export const SVG_BASE_WIDTH = 48;
export const SVG_BASE_HEIGHT = 32;

export const SVG_POINTS: SvgPoint[] = [
  [0, 16],
  [0, 32],
  [16, 32], // Added for circuit connectivity
  [32, 32],
  [32, 16],
  [48, 16],
  [48, 0],
  [16, 0],
  [16, 16],
];
