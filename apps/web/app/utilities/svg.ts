export type SvgPoint = [number, number];

export type RotatePointsOptions = {
  points: SvgPoint[];
  rotation: {
    a: number;
    x: number;
    y: number;
  };
};

export const rotatePoints = ({
  points,
  rotation,
}: RotatePointsOptions): SvgPoint[] => {
  const rad = (rotation.a * Math.PI) / 180;

  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return points.map<SvgPoint>(([x, y]) => {
    const dx = x - rotation.x;
    const dy = y - rotation.y;
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;

    return [rx + rotation.x, ry + rotation.y];
  });
};

export type PointsToPathOptions = {
  closePath?: boolean;
};

export const pointsToPath = ({
  points,
  closePath = true,
}: {
  points: SvgPoint[];
  closePath?: boolean;
}): string => {
  if (points.length === 0) {
    return "";
  }

  const [first, ...rest] = points;
  const move = `M ${first[0]} ${first[1]}`;
  const lines = rest.map(([x, y]) => `L ${x} ${y}`).join(" ");

  return closePath ? `${move} ${lines} Z` : `${move} ${lines}`;
};

export type RotatedViewBoxOptions = {
  points: SvgPoint[];
  strokeWidth?: number;
};

export const computeViewBox = ({
  points,
  strokeWidth,
}: RotatedViewBoxOptions): string => {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);

  const pad = (strokeWidth ?? 0) / 4;

  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;

  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
};
