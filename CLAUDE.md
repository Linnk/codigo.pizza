# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Codigo.pizza is a real-time collaborative code editor web application. Users can create shareable code editor sessions with unique URLs, allowing multiple users to collaborate in real-time. Data is shared peer-to-peer via WebRTC and never stored on servers.

## Development Commands
- **Start development server**: `npm start` (runs WebRTC signaling server + React dev server on localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Run tests in watch mode**: `npm test -- --watch`
- **Eject from Create React App**: `npm run eject` (irreversible)

## Architecture
This is a Create React App project using:
- **React 19.1.1** with React DOM for the UI framework
- **React Router DOM 7.7.1** for routing between home and editor views
- **Bootstrap 5.3.7 + Reactstrap 9.2.3** for styling and responsive components
- **Monaco Editor (@monaco-editor/react 4.7.0)** for the code editor interface
- **Yjs 13.6.27** for Conflict-free Replicated Data Types (CRDTs) and document synchronization
- **y-webrtc 10.3.0** for WebRTC-based peer-to-peer collaboration
- **y-monaco 0.1.6** for Monaco Editor + Yjs integration

## Project Structure
```
src/
├── App.js       - Main router with theme detection
├── components/  - Reusable UI components (CodeEditor, NavigationBar, ToolBar)
├── views/       - Page components (Home, Editor)
├── services/    - WebRTC collaboration and user management
├── constants/   - Default code content for new sessions
└── assets/      - Static images and media files
```

## Key Features Implemented
- **Real-time collaborative editing** using Yjs CRDTs and WebRTC
- **Peer-to-peer communication** with no server-side data storage
- **User awareness** showing connected collaborators with colored cursors

## Technical Implementation Details
- **WebRTC Signaling**: Uses y-webrtc signaling server on localhost:4444
- **Document Synchronization**: Yjs handles conflict resolution and real-time sync

## Development Guidelines
- Never write custom CSS code, do everything using Bootstrap framework
- Follow the existing component structure and naming conventions
- Use the established services pattern for business logic
- Maintain real-time collaboration features when making changes
