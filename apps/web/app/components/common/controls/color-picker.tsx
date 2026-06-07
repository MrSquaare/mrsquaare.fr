import type { FC } from "react";

import { sva } from "styled-system/css";

export type ControlColorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const recipe = sva({
  slots: ["root", "label", "input"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    label: {
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "rgba(255, 255, 255, 0.6)",
    },
    input: {
      width: "100%",
      height: "28px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      background: "transparent",
      cursor: "pointer",
    },
  },
});

export const ControlColor: FC<ControlColorProps> = ({
  label,
  value,
  onChange,
}) => {
  const classes = recipe();

  return (
    <div className={classes.root}>
      <span className={classes.label}>{label}</span>
      <input
        className={classes.input}
        onChange={(e) => onChange(e.target.value)}
        type={"color"}
        value={value}
      />
    </div>
  );
};
