/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function mkGradient() {
  // Even split over 5 colours
  // const colors = new Uint8Array(5);
  // for (let c = 0; c <= colors.length; c++) {
  //   colors[c] = (c / colors.length) * 256;
  // }

  // Custom uneven split
  const colors = new Uint8Array([0, 102, 152, 255, 255]);
  const dt = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat);
  dt.needsUpdate = true;
  return dt;
}
const gradientMap = mkGradient();

function useNormalMap(mapname?: string) {
  let normalmap = useTexture(
    mapname || ((import.meta.env.VITE_EXTURL + "/dot.png") as string)
  );

  useEffect(() => {
    if (mapname && normalmap) {
      normalmap.needsUpdate = true;
    }
  }, [normalmap, mapname]);

  return normalmap;
}

function useColourMap(mapname?: string) {
  let colourmap = useTexture(
    mapname || ((import.meta.env.VITE_EXTURL + "/dot.png") as string)
  );

  useEffect(() => {
    if (mapname) {
      colourmap.needsUpdate = true;
    }
  }, [colourmap, mapname]);

  return colourmap;
}

export function CellShadedMesh(props: { geometry: any; model: IModel }) {
  const { geometry, model } = props;

  const colourmap = useColourMap(model.map);
  const normalmap = useNormalMap(model.normal);

  return (
    <>
      {model.map && colourmap && (
        <mesh receiveShadow geometry={geometry}>
          <meshToonMaterial
            attach="material"
            gradientMap={gradientMap}
            map={model.map ? colourmap : null}
            normalMap={model.normal ? normalmap : null}
            normalMapType={THREE.ObjectSpaceNormalMap}
            transparent
          />
        </mesh>
      )}

      <mesh receiveShadow geometry={geometry}>
        <meshToonMaterial
          attach="material"
          color={model.colour}
          normalMap={model.normal ? normalmap : null}
          gradientMap={gradientMap}
          transparent={model.transparent ? true : false}
          opacity={model.transparent ? 0 : 1}
          normalMapType={THREE.ObjectSpaceNormalMap}
        />
      </mesh>
    </>
  );
}

export function StandardMesh(props: { geometry: any; model: IModel }) {
  const { geometry, model } = props;

  const colourmap = useColourMap(model.map);
  const normalmap = useNormalMap(model.normal);

  return (
    <>
      {model.map && (
        <mesh receiveShadow geometry={geometry}>
          <meshStandardMaterial
            attach="material"
            map={model.map ? colourmap : null}
            normalMap={model.normal ? normalmap : null}
            normalMapType={THREE.ObjectSpaceNormalMap}
            transparent
          />
        </mesh>
      )}

      <mesh receiveShadow geometry={geometry}>
        <meshStandardMaterial
          attach="material"
          color={model.colour}
          normalMap={model.normal ? normalmap : null}
          normalMapType={THREE.ObjectSpaceNormalMap}
          transparent={model.transparent ? true : false}
          opacity={model.transparent ? 0 : 1}
        />
      </mesh>
    </>
  );
}

export function ShinyMesh(props: { geometry: any; model: IModel }) {
  const { geometry, model } = props;

  const colourmap = useColourMap(model.map);
  const normalmap = useNormalMap(model.normal);

  return (
    <>
      {model.map && (
        <mesh receiveShadow geometry={geometry}>
          <meshPhongMaterial
            attach="material"
            map={model.map ? colourmap : null}
            normalMap={model.normal ? normalmap : null}
            normalMapType={THREE.ObjectSpaceNormalMap}
            transparent
          />
        </mesh>
      )}

      <mesh receiveShadow geometry={geometry}>
        <meshPhongMaterial
          attach="material"
          color={model.colour}
          normalMap={model.normal ? normalmap : null}
          normalMapType={THREE.ObjectSpaceNormalMap}
          transparent={model.transparent ? true : false}
          opacity={model.transparent ? 0 : 1}
        />
      </mesh>
    </>
  );
}

export function ToonLines(props: { geometry: any }) {
  const { geometry } = props;
  return (
    <mesh geometry={geometry} scale={1.015} position={[0, 0.00015, 0]}>
      <meshBasicMaterial
        attach="material"
        color={"#000000"}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
