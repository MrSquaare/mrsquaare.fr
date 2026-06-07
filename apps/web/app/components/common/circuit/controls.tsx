import type { FC } from "react";

import { ControlColor, ControlPanel, ControlSlider } from "../controls";

import { DEFAULT_PARTICLE_SETTINGS } from "./constants";
import type { ParticleSettings } from "./types";

type SquaarePatternCircuitControlsProps = {
  settings: ParticleSettings;
  onChange: (settings: ParticleSettings) => void;
};

export const SquaarePatternCircuitControls: FC<
  SquaarePatternCircuitControlsProps
> = ({ settings, onChange }) => {
  const updateSetting = (key: string, value: unknown) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  const updateNestedSetting = (
    parentKey: "trail" | "speed",
    key: string,
    value: unknown,
  ) => {
    onChange({
      ...settings,
      [parentKey]: {
        ...(settings[parentKey] as Record<string, unknown>),
        [key]: value,
      },
    });
  };

  return (
    <ControlPanel position={"right"} title={"Pattern Circuit Controls"}>
      <ControlSlider
        label={"Count"}
        max={500}
        min={10}
        onChange={(val) => updateSetting("count", val)}
        step={5}
        value={settings.count ?? DEFAULT_PARTICLE_SETTINGS.count}
      />

      <ControlSlider
        label={"Spawn Rate"}
        max={1}
        min={0.05}
        onChange={(val) => updateSetting("spawnRate", val)}
        step={0.05}
        value={settings.spawnRate ?? DEFAULT_PARTICLE_SETTINGS.spawnRate}
      />

      <ControlSlider
        label={"Speed Min"}
        max={10}
        min={0.5}
        onChange={(val) => updateNestedSetting("speed", "min", val)}
        step={0.1}
        value={settings.speed?.min ?? DEFAULT_PARTICLE_SETTINGS.speed.min}
      />

      <ControlSlider
        label={"Speed Max"}
        max={15}
        min={1}
        onChange={(val) => updateNestedSetting("speed", "max", val)}
        step={0.1}
        value={settings.speed?.max ?? DEFAULT_PARTICLE_SETTINGS.speed.max}
      />

      <ControlSlider
        label={"Particle Size"}
        max={8}
        min={0.5}
        onChange={(val) => updateSetting("size", val)}
        step={0.5}
        value={settings.size ?? DEFAULT_PARTICLE_SETTINGS.size}
      />

      <ControlSlider
        label={"Trail Length"}
        max={100}
        min={5}
        onChange={(val) => updateNestedSetting("trail", "length", val)}
        step={5}
        value={settings.trail?.length ?? DEFAULT_PARTICLE_SETTINGS.trail.length}
      />

      <ControlSlider
        label={"Trail Thickness"}
        max={12}
        min={1}
        onChange={(val) => updateNestedSetting("trail", "thickness", val)}
        step={1}
        value={
          settings.trail?.thickness ?? DEFAULT_PARTICLE_SETTINGS.trail.thickness
        }
      />

      <ControlColor
        label={"Head Color"}
        onChange={(val) => updateSetting("color", val)}
        value={settings.color ?? DEFAULT_PARTICLE_SETTINGS.color}
      />

      <ControlColor
        label={"Trail Color"}
        onChange={(val) => updateNestedSetting("trail", "color", val)}
        value={settings.trail?.color ?? DEFAULT_PARTICLE_SETTINGS.trail.color}
      />
    </ControlPanel>
  );
};
