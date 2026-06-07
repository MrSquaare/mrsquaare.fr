import { lazy, Suspense, useState, type FC } from "react";
import { css } from "styled-system/css";

import { Squaare3D } from "../components/common/3d";
import type { Squaare3DSettings } from "../components/common/3d/types";
import type { ParticleSettings } from "../components/common/circuit/types";
import { ClientOnly } from "../components/common/client-only";

const SquaarePatternCircuit = lazy(() =>
  import("../components/common/circuit").then((module) => ({
    default: module.SquaarePatternCircuit,
  })),
);

const SquaarePatternCircuitControls = lazy(() =>
  import("../components/common/circuit").then((module) => ({
    default: module.SquaarePatternCircuitControls,
  })),
);

const Squaare3DControls = lazy(() =>
  import("../components/common/3d/controls").then((module) => ({
    default: module.Squaare3DControls,
  })),
);

const NewRoute: FC = () => {
  const [particleSettings, setParticleSettings] = useState<ParticleSettings>(
    {},
  );
  const [threeDSettings, setThreeDSettings] = useState<Squaare3DSettings>({});

  return (
    <main
      className={css({
        position: "relative",
        minH: "screen",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bg: "gray.950",
        color: "white",
        overflow: "hidden",
      })}
    >
      <div className={css({ position: "absolute", inset: 0 })}>
        <ClientOnly>
          {() => (
            <Suspense fallback={null}>
              <SquaarePatternCircuit particleSettings={particleSettings} />
              <SquaarePatternCircuitControls
                onChange={setParticleSettings}
                settings={particleSettings}
              />
              <Squaare3DControls
                onChange={setThreeDSettings}
                settings={threeDSettings}
              />
            </Suspense>
          )}
        </ClientOnly>
      </div>

      <div className={css({ position: "absolute", inset: 0, zIndex: 1 })}>
        <Squaare3D settings={threeDSettings} />
      </div>
    </main>
  );
};

export default NewRoute;
