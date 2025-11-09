/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useGLTF } from "@react-three/drei";
import { CellShadedMesh, ShinyMesh, StandardMesh, ToonLines } from "./Textures";
import { ShadingType } from "./ViewerStateManager";

export default function ModelLoader(props: {
  model: IModel;
  style: ShadingType;
}) {
  const { model, style } = props;

  const { nodes } = useGLTF(model.filename || "", false);

  return (
    <group position={[0, 0.0245, 0]} scale={2.95} rotation={[0, 0.5, 0]}>
      {Object.keys(nodes)
        .filter((n) => nodes[n].type === "Mesh")
        .map((n, i) => {
          const geometry = (nodes[n] as any).geometry;

          return (
            <group key={n + i + "_group"}>
              {style === "toon" && (
                <CellShadedMesh geometry={geometry} model={model} />
              )}
              {style === "standard" && (
                <StandardMesh geometry={geometry} model={model} />
              )}
              {style === "shiny" && (
                <ShinyMesh geometry={geometry} model={model} />
              )}
              <ToonLines geometry={geometry} />
            </group>
          );
        })}
    </group>
  );
}
