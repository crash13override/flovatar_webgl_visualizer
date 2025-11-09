# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flovatar Visualiser is a standalone 3D visualiser for GLTF asset files, built with React, TypeScript, Three.js, and React Three Fiber. It renders customizable 3D avatars (Flovatars) based on part IDs and supports different shading styles (toon, standard, shiny). The visualiser is designed to be embedded in iframes and communicates via postMessage.

## Development Commands

### Setup and Development
```bash
yarn dev                # Start development server with hot reload at http://localhost:3000
                       # Also starts asset server concurrently

yarn serve:assets      # Run asset server separately (serves ./assetserver with CORS)
```

### Building
```bash
yarn build             # Production build to ./build directory
                       # Automatically runs clean before and statics after

yarn clean             # Remove build directory

yarn serve             # Preview production build locally
```

### Testing and Quality
```bash
yarn test              # Run Jest tests in watch mode

yarn lint              # Lint TypeScript/TSX files with ESLint
```

## Architecture

### State Management (Valtio)
The application uses Valtio for reactive state management. State is defined in `src/ThreeDViewer/ViewerStateManager.tsx:32` with the `modelparts` proxy object containing:
- `bg`: Background image URL
- `style`: Shading type (toon/standard/shiny)
- `partids`: Array of part IDs to render
- `models`: Processed model data with color inheritance

### iframe Communication
The visualiser listens for `postMessage` events in `src/ThreeDViewer/ViewerStateManager.tsx:13`. External pages send messages with structure:
```javascript
{
  message: "setParts",
  parts: number[],      // Array of part IDs
  background: number,   // Background template ID
  style: "toon" | "standard" | "shiny"
}
```

See `iframetest.html` for integration example.

### 3D Rendering Pipeline
1. **ViewerStateManager** (`src/ThreeDViewer/ViewerStateManager.tsx`) receives part IDs via postMessage
2. **PartLookup** (`src/ThreeDViewer/PartLookup.ts:24`) transforms part IDs into model metadata using the `parts` array from `Parts.ts`
3. **ModelLoader** (`src/ThreeDViewer/ModelLoader.tsx`) loads GLTF files using `@react-three/drei`
4. **Textures** (`src/ThreeDViewer/Textures.tsx`) applies shading (CellShadedMesh, StandardMesh, ShinyMesh)
5. **3DViewer** (`src/ThreeDViewer/3DViewer.tsx`) renders the scene with drag-to-rotate interaction

### Asset Loading
- Assets are loaded from `VITE_EXTURL` environment variable (defined in `.env`)
- Production URL: `https://webgl.flovatar.com/assetserver/`
- Local development: `./assetserver` served via http-server
- Asset paths are constructed in `PartLookup.ts:31` as: `{VITE_EXTURL}/{category}/{filename}.glb`

### Color Inheritance
Models support color inheritance through the `inheritedcolour` property. The system looks up colors from parent parts (e.g., accessories inherit body color). Implementation in `ViewerStateManager.tsx:57-70`.

### Rendering Order
Part rendering order is preserved based on the order of part IDs in the input array. This is critical for proper layering (e.g., eyes rendering correctly).

## Key Files

- `src/ThreeDViewer/ViewerStateManager.tsx` - State management and iframe message handling
- `src/ThreeDViewer/3DViewer.tsx` - Main Three.js canvas and drag-to-rotate logic
- `src/ThreeDViewer/ModelLoader.tsx` - GLTF model loading per part
- `src/ThreeDViewer/PartLookup.ts` - Part ID to model metadata transformation
- `src/ThreeDViewer/Parts.ts` - Large lookup table of all available parts (40K+ lines)
- `src/ThreeDViewer/Textures.tsx` - Shading implementations
- `iframetest.html` - Example integration page for testing
- `snapshotter.html` - Tool for capturing snapshots

## TypeScript Configuration

- Base URL is set to `src` for absolute imports (e.g., `import App from "App"`)
- Use absolute imports from `src` directory rather than relative paths
- Types are globally declared in `PartLookup.ts:8-22` for `IModel` and `IPartLookup`

## Environment Variables

- `VITE_EXTURL` - Base URL for loading 3D assets (required)

## Build Output

Build artifacts go to `./build` directory:
- JavaScript/CSS bundles in `./build/assets`
- `loader.svg` copied to build root
- `iframetest.html` and `snapshotter.html` copied for serve command

## Content Security Policy

Development uses open CSP in `index.html` to allow asset loading from external servers. These should be tightened for production deployment.
