/* eslint-disable react/no-unknown-property */
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, type CSSProperties, type FC } from "react";

import { deepMerge } from "../../../utilities/deep-merge";

import {
  CAMERA_CONFIG,
  CANVAS_CONFIG,
  DEFAULT_3D_SETTINGS,
  ENVIRONMENT_CONFIG,
  LIGHTS_CONFIG,
} from "./constants";
import { SquaareMesh } from "./mesh";
import type { Squaare3DSettings } from "./types";

export type Squaare3DProps = {
  className?: string;
  settings?: Squaare3DSettings;
  style?: CSSProperties;
};

export const Squaare3D: FC<Squaare3DProps> = ({
  className,
  settings,
  style,
}) => {
  const resolvedSettings = useMemo(
    () => deepMerge(DEFAULT_3D_SETTINGS, settings),
    [settings],
  );

  return (
    <div
      className={className}
      style={{
        height: "100%",
        width: "100%",
        pointerEvents: "none",
        ...style,
      }}
    >
      <Canvas camera={CAMERA_CONFIG} dpr={CANVAS_CONFIG.dpr}>
        <Environment
          environmentIntensity={ENVIRONMENT_CONFIG.intensity}
          preset={ENVIRONMENT_CONFIG.preset}
        />
        <ambientLight intensity={LIGHTS_CONFIG.ambient.intensity} />
        <hemisphereLight
          color={LIGHTS_CONFIG.hemisphere.color}
          groundColor={resolvedSettings.auraColor}
          intensity={LIGHTS_CONFIG.hemisphere.intensity}
        />
        <pointLight
          color={LIGHTS_CONFIG.point.color}
          intensity={resolvedSettings.brightness}
          position={LIGHTS_CONFIG.point.position}
        />

        <SquaareMesh settings={resolvedSettings} />
      </Canvas>
    </div>
  );
};
