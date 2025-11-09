/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Plastic Alchemy Ltd
 *  See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Html, OrbitControls } from "@react-three/drei";

export function Loader() {
  // const { progress } = useProgress(); // Causes errors with fast re-rendering due to the complexity of the scene nesting.
  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/loader.svg" alt="loading" style={{ width: "20%" }} />
      </div>
    </Html>
  );
}

export function Controls() {
  return (
    <OrbitControls
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 1.75}
    />
  );
}

export function Lighting() {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0x555555, 0.7]} />
      <directionalLight
        castShadow
        position={[50, 20, 100]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
}

export function LocalPlane(props: { size: number; grid: boolean }) {
  return (
    <>
      <gridHelper args={[props.size, 10, 0x888888, 0x444444]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
    </>
  );
}
