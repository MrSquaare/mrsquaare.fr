import type { FC } from "react";

import { ControlColor, ControlPanel, ControlSlider } from "../controls";

import { DEFAULT_3D_SETTINGS } from "./constants";
import type { Squaare3DSettings } from "./types";

type Squaare3DControlsProps = {
  settings: Squaare3DSettings;
  onChange: (settings: Squaare3DSettings) => void;
};

export const Squaare3DControls: FC<Squaare3DControlsProps> = ({
  settings,
  onChange,
}) => {
  const updateSetting = (key: keyof Squaare3DSettings, value: unknown) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <ControlPanel position={"left"} title={"3D Controls"}>
      <ControlSlider
        label={"Rotation Angle"}
        max={45}
        min={0}
        onChange={(val) => updateSetting("angle", val)}
        step={1}
        value={settings.angle ?? DEFAULT_3D_SETTINGS.angle}
      />

      <ControlSlider
        label={"Aura Spread"}
        max={2}
        min={0.1}
        onChange={(val) => updateSetting("auraSpread", val)}
        step={0.1}
        value={settings.auraSpread ?? DEFAULT_3D_SETTINGS.auraSpread}
      />

      <ControlSlider
        label={"Emissive Brightness"}
        max={5000}
        min={100}
        onChange={(val) => updateSetting("brightness", val)}
        step={100}
        value={settings.brightness ?? DEFAULT_3D_SETTINGS.brightness}
      />

      <ControlSlider
        label={"Depth"}
        max={100}
        min={5}
        onChange={(val) => updateSetting("depth", val)}
        step={1}
        value={settings.depth ?? DEFAULT_3D_SETTINGS.depth}
      />

      <ControlSlider
        label={"Metalness"}
        max={1}
        min={0}
        onChange={(val) => updateSetting("metalness", val)}
        step={0.05}
        value={settings.metalness ?? DEFAULT_3D_SETTINGS.metalness}
      />

      <ControlSlider
        label={"Roughness"}
        max={1}
        min={0}
        onChange={(val) => updateSetting("roughness", val)}
        step={0.05}
        value={settings.roughness ?? DEFAULT_3D_SETTINGS.roughness}
      />

      <ControlSlider
        label={"Mouse Responsiveness"}
        max={1}
        min={0.01}
        onChange={(val) => updateSetting("responsiveness", val)}
        step={0.01}
        value={settings.responsiveness ?? DEFAULT_3D_SETTINGS.responsiveness}
      />

      <ControlColor
        label={"Aura Color"}
        onChange={(val) => updateSetting("auraColor", val)}
        value={settings.auraColor ?? DEFAULT_3D_SETTINGS.auraColor}
      />

      <ControlColor
        label={"Face Color"}
        onChange={(val) => updateSetting("faceColor", val)}
        value={settings.faceColor ?? DEFAULT_3D_SETTINGS.faceColor}
      />

      <ControlColor
        label={"Side Color"}
        onChange={(val) => updateSetting("sideColor", val)}
        value={settings.sideColor ?? DEFAULT_3D_SETTINGS.sideColor}
      />
    </ControlPanel>
  );
};
