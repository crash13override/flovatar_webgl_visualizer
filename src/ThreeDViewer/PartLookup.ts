/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { parts } from "./Parts";

declare global {
  interface IModel {
    id: number;
    name: string;
    category: string;
    filename?: string;
    colour?: string;
    map?: string;
    normal?: string;
    transparent?: boolean;
    inheritedcolour?: string;
  }

  type IPartLookup = IModel[];
}

export function getModels(id: number): IModel[] | undefined {
  const p = parts.filter((f) => f.id === id);
  if (!p) return;

  const mp = p.map((p) => {
    // Clone the P object, rather than mutating it accidentally
    const mp = { ...p };
    const exturl = import.meta.env.VITE_EXTURL + "/" + p.category + "/";

    // Transform the part information into a set of things that can be loaded with loaders
    mp.filename = exturl + p.filename + ".glb";
    if (mp.map) {
      mp.map = exturl + p.map + ".png";
    }
    if (mp.normal) {
      mp.normal = exturl + p.normal + ".png";
    }

    return mp;
  });

  return mp;
}
