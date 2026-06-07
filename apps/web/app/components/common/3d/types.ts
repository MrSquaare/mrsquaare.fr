export type Squaare3DSettings = {
  angle?: number;
  auraColor?: string;
  auraSpread?: number;
  brightness?: number;
  cursorAngle?: number;
  depth?: number;
  faceColor?: string;
  height?: number;
  metalness?: number;
  responsiveness?: number;
  roughness?: number;
  sideColor?: string;
  width?: number;
};

export type ResolvedSquaare3DSettings = Required<
  Omit<Squaare3DSettings, "width" | "height">
> & {
  width?: number;
  height?: number;
};
