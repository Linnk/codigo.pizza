# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Codigo.pizza is a web application for sharing code like sharing pizza - users can create shareable code editors in the browser with real-time collaboration via unique URLs. Data is shared peer-to-peer and never stored on servers.

## Development Commands
- **Start development server**: `npm start` (runs on localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Run tests in watch mode**: `npm test -- --watch`
- **Eject from Create React App**: `npm run eject` (irreversible)

## Architecture
This is a Create React App project using:
- **React 19.1.1** with React DOM for the UI framework
- **Bootstrap 5.3.7 + Reactstrap 9.2.3** for styling and components
- **Testing Library** (@testing-library/react, jest-dom, user-event) for testing
- Standard CRA folder structure:
  - `src/App.js` - Main application component (currently default CRA template)
  - `src/index.js` - Application entry point
  - `src/components/` - Folder for UI components
  - `src/views/` - Views used by the router
  - `public/` - Static assets and index.html template

## Current State
The project is freshly initialized with Create React App defaults. The core collaborative code editing features described in the README are not yet implemented.

## Development Guidelines
- Never write custom CSS code, do everything using Bootstrap framework