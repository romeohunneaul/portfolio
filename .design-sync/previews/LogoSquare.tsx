import * as React from "react";
import { LogoSquare } from "portfolio";
// public/ is not shipped to Claude Design: embed the marks (data URLs skip next/image's loader).
import taster from "@ds-stories/public/logos/taster.png";
import artefact from "@ds-stories/public/logos/artefact.png";

export const WithImage = () => <LogoSquare name="Taster" src={taster} />;
export const Initials = () => <LogoSquare name="Leah Care" />;
export const Row = () => (
  <div className="flex gap-3">
    <LogoSquare name="Independent" />
    <LogoSquare name="Taster" src={taster} />
    <LogoSquare name="Leah Care" />
    <LogoSquare name="Artefact" src={artefact} />
  </div>
);
