import { useState, type FC, type ReactNode } from "react";

import { sva } from "styled-system/css";

export type ControlPanelProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  position?: "left" | "right";
};

const recipe = sva({
  slots: ["root", "header", "title", "toggleBtn", "content", "triggerBtn"],
  base: {
    root: {
      position: "fixed",
      bottom: "20px",
      zIndex: 100,
      width: "320px",
      background: "rgba(15, 15, 25, 0.75)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "16px",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      paddingBottom: "8px",
    },
    title: {
      fontWeight: "bold",
      fontSize: "14px",
      letterSpacing: "0.02em",
    },
    toggleBtn: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "none",
      color: "white",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "12px",
      cursor: "pointer",
      transition: "background 0.2s",
      _hover: {
        background: "rgba(255, 255, 255, 0.2)",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxHeight: "350px",
      overflowY: "auto",
      paddingRight: "4px",
    },
    triggerBtn: {
      position: "fixed",
      bottom: "20px",
      zIndex: 100,
      background: "#bc13fe",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 4px 16px rgba(188, 19, 254, 0.4)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 20px rgba(188, 19, 254, 0.6)",
      },
      transition: "all 0.2s",
    },
  },
  variants: {
    position: {
      left: {
        root: { left: "20px", right: "auto" },
        triggerBtn: { left: "20px", right: "auto" },
      },
      right: {
        root: { right: "20px", left: "auto" },
        triggerBtn: { right: "20px", left: "auto" },
      },
    },
  },
  defaultVariants: {
    position: "right",
  },
});

export const ControlPanel: FC<ControlPanelProps> = ({
  title,
  children,
  defaultOpen = true,
  position = "right",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const classes = recipe({ position });

  if (!isOpen) {
    return (
      <button className={classes.triggerBtn} onClick={() => setIsOpen(true)}>
        Show {title}
      </button>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.title}>{title}</span>
        <button className={classes.toggleBtn} onClick={() => setIsOpen(false)}>
          Hide
        </button>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
