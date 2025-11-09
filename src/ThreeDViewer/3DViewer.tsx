/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting, Loader } from "./SceneElements";
import ModelLoader from "./ModelLoader";
import { Object3D } from "three";
import { ShadingType } from "./ViewerStateManager";
import { ContactShadows } from "@react-three/drei";

export default function ThreeDViewer(props: {
  models: IModel[];
  style: ShadingType;
}) {
  const { models, style } = props;

  const modelref = useRef<Object3D | null>(null);

  const [dragging, setDragging] = useState<Boolean>(false);
  const locref = useRef<number[]>([0, 0]);

  const handleDrag = useCallback((e) => {
    setDragging(e.type === "pointerdown");
    locref.current = [e.clientX, modelref.current?.rotation.y || 0];
  }, []);

  const rotateScene = useCallback(
    (rpos) => {
      if (modelref.current) {
        modelref.current.rotation.y = rpos;
      }
    },
    [modelref]
  );

  return (
    <div
      style={{ position: "absolute", height: "100%", width: "100%" }}
      onPointerDown={handleDrag}
      onPointerUp={handleDrag}
      onPointerMove={(e) => {
        if (!dragging) {
          return;
        }

        // If we drag from one side of the canvas to the other, we want a full 360 motion
        // So calculate a proportion of distance
        const delta =
          ((e.clientX - locref.current[0]) / window.innerWidth) * 2 * Math.PI;
        rotateScene(locref.current[1] + delta);
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%", touchAction: "none" }}
        shadows
        camera={{ fov: 1, position: [0, 0.5, 5] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Lighting />

        <Suspense fallback={<Loader />}>
          <group ref={modelref} castShadow>
            {models.map((m) => {
              return (
                <ModelLoader
                  key={(m.filename || "") + (m.name || "") + (m.colour || "")}
                  model={m}
                  style={style}
                />
              );
            })}
          </group>
        </Suspense>

        <ContactShadows
          position={[0, -0.035, 0]}
          width={1}
          height={1}
          far={10}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
