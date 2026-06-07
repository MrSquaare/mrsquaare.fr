import { useApplication } from "@pixi/react";
import { Graphics, Matrix, RenderTexture } from "pixi.js";
import type { Texture } from "pixi.js";
import { useEffect, useState } from "react";

import { deferDestroy, deferSet } from "../../../utilities/defer";

import type { PatternSettings } from "./types";

export const useCircuitPatternTexture = ({
  points,
  size,
  color,
  width,
  alpha,
}: Required<PatternSettings>) => {
  const { app, isInitialised } = useApplication();
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    if (!isInitialised || !app || !app.renderer) return;

    const graphics = new Graphics();

    graphics.strokeStyle = { width, color, alpha };

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const offsetX = x * size.x;
        const offsetY = y * size.y;

        graphics.beginPath();
        points.forEach((p, i) => {
          if (i === 0) graphics.moveTo(p[0] + offsetX, p[1] + offsetY);
          else graphics.lineTo(p[0] + offsetX, p[1] + offsetY);
        });
        graphics.closePath();
        graphics.stroke();
      }
    }

    const renderTexture = RenderTexture.create({
      width: size.x,
      height: size.y,
    });

    app.renderer.render({
      container: graphics,
      target: renderTexture,
      clear: true,
      transform: new Matrix(),
    });

    const cancel = deferSet(setTexture, renderTexture);

    return () => {
      cancel();
      deferDestroy(renderTexture, true);
    };
  }, [app, isInitialised, points, size.x, size.y, color, width, alpha]);

  return texture;
};
