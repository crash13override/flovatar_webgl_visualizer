# Flovatar Visualiser

This repository contains a standalone 3D visualiser for GLTF asset files.

## Usage

Go to `http://localhost:3000/iframetest.html` and set the components you want displayed (by ID). The example assets in `./assetserver` are not currently usable as we update the parts lookup to reflect production assets.

## Development

[`ViewerStateManager.tsx`](./src/ThreeDViewer/ViewerStateManager.tsx) is configured with an event listener to receive messages to update the model contents, such as from an iframe.

[`iframetest.html`](./iframetest.html) contains the relevant code to send a message to the viewer inside an iframe. It also contains code to detect when the iframe has completed loading, to enable defaulting on load.

Use `yarn dev` to load a hot reload environment on [http://localhost:3000](http://localhost:3000).

To simulate a more real production environment, the 3D test assets are served separately using `http-server`, which leads to some very open content-security-policies in index.html. It's not advised to use these in real production :)

## Stand alone integration

b) `yarn build` and deploy the scripts in `./build/assets`.

## License

Parts of this software are licensed under a proprietary license, the details of which may be found in LICENSE.txt.

## Template information

This is an extension of the official React Typescript template for [Vite](vitejs.dev).

This template includes:

- Typescript (including absolute path imports)
- Tailwind / PostCSS (including JIT compilation for supert-fast dev startup)
- ESLint / Prettier + VSCode settings (for linting, and autoformatting on save)
- FontAwesome (because icons)
- Valtio (because state)

To use this template, run `degit githubrepo/...` when creating a new app.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn serve`

Serves the `build` folder for production testing before deployment.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).
