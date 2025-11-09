/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { proxy, useSnapshot } from "valtio";
import ThreeDViewer from "./3DViewer";
import { getModels } from "./PartLookup";

const imageapi = "https://flovatar.com/api/image/template/";

// Iframe custom event listener
window.addEventListener(
  "message",
  (e: any) => {
    if (e.data?.message === "setParts") {
      setParts(e.data?.parts, e.data?.background, e.data?.style);
    }
  },
  false
);

export type ShadingType = "toon" | "standard" | "shiny";

// Local state management
interface ModelParts {
  bg: string;
  style: ShadingType;
  partids: number[];
  models: IModel[];
}
const modelparts = proxy<ModelParts>({
  bg: ``,
  style: "shiny",
  partids: [],
  models: [],
});

function setParts(parts: number[], background: number, style: ShadingType) {
  // Store the background
  modelparts.bg = background ? `${imageapi}${background}` : "";
  // Store the numbers, as they come in. This impacts rendering order, which causes eye problems
  modelparts.partids = parts;
  // Store the new style
  modelparts.style = style;

  // Build a new parts list
  let newmodels = modelparts.partids
    .flatMap((p) => getModels(p))
    .filter((p) => {
      if (p === undefined) return false;
      if (p.filename === undefined) return false;
      return true;
    }) as IModel[];

  // Perform colour inheritance
  const getColourFromParent = (inheritedpart: string, models: IModel[]) => {
    const c = models.find((p) => {
      return p.category === inheritedpart;
    });

    return c?.colour;
  };

  newmodels = newmodels.map((p) => {
    if (p.inheritedcolour) {
      p.colour = getColourFromParent(p.inheritedcolour, newmodels);
    }
    return p;
  });

  // Empty and refill the array
  modelparts.models.splice(0, modelparts.models.length);
  // console.log(newmodels);
  modelparts.models.push(...newmodels);
}

export default function ViewerStateManager() {
  const { bg, models, style } = useSnapshot(modelparts);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {bg && (
        <img
          style={{ position: "absolute" }}
          src={bg}
          alt="flovatar-background"
        />
      )}
      <ThreeDViewer models={models as IModel[]} style={style} />
    </div>
  );
}
