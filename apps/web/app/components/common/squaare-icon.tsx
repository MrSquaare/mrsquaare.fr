import { useMemo, type FC, type SVGProps } from "react";

import { pointsToPath, computeViewBox } from "../../utilities/svg";

import { SVG_POINTS } from "./constants";

const SVG_PATH = pointsToPath({
  points: SVG_POINTS,
  closePath: true,
});

const SVG_VIEWBOX = computeViewBox({
  points: SVG_POINTS,
});

export type SquaareGlyphProps = Omit<
  SVGProps<SVGPathElement>,
  "d" | "children"
>;

export const SquaareGlyph: FC<SquaareGlyphProps> = ({
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2,
  vectorEffect = "non-scaling-stroke",
  ...props
}) => {
  return (
    <path
      d={SVG_PATH}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      vectorEffect={vectorEffect}
      {...props}
    />
  );
};

export type SquaareIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "children" | "fill" | "stroke" | "strokeWidth"
> & {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const DEFAULT_ROTATION = -17;

export const SquaareIcon: FC<SquaareIconProps> = ({
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2,
  style,
  ...svgProps
}) => {
  const transformedStyle = useMemo(
    () => ({
      transform: `rotate(${DEFAULT_ROTATION}deg)`,
      ...style,
    }),
    [style],
  );

  return (
    <svg
      {...svgProps}
      style={transformedStyle}
      viewBox={SVG_VIEWBOX}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <SquaareGlyph fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};
