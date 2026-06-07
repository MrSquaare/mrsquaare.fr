import type { FC } from "react";

import { sva } from "styled-system/css";

export type ControlSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

const recipe = sva({
  slots: ["root", "labelContainer", "input"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    labelContainer: {
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "rgba(255, 255, 255, 0.6)",
      display: "flex",
      justifyContent: "space-between",
    },
    input: {
      width: "100%",
      height: "6px",
      borderRadius: "3px",
      background: "rgba(255, 255, 255, 0.1)",
      outline: "none",
      accentColor: "#bc13fe",
      cursor: "pointer",
    },
  },
});

export const ControlSlider: FC<ControlSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const classes = recipe();

  return (
    <div className={classes.root}>
      <div className={classes.labelContainer}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        className={classes.input}
        max={max}
        min={min}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        step={step}
        type={"range"}
        value={value}
      />
    </div>
  );
};
