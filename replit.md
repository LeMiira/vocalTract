# Overview

This is a voice training analyzer application built with React and Express that provides real-time vocal tract visualization. The app captures audio input from the user's microphone, analyzes vocal characteristics like pitch and frequency distribution, and visualizes the vocal tract in real-time to help with voice training exercises. It features a modern UI built with shadcn/ui components and uses audio processing techniques to analyze vocal patterns.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built with React using TypeScript and follows a component-based architecture:

- **UI Framework**: React with TypeScript, using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state, TanStack Query for server state management
- **Audio Processing**: Web Audio API for real-time microphone input analysis and visualization

The app structure separates concerns with dedicated components for audio analysis (`AudioAnalyzer`), vocal tract visualization (`VocalTractVisualizer`), and control panels (`ControlPanel`). Audio utilities handle pitch detection using autocorrelation and spectral analysis for frequency characteristics.

## Backend Architecture

The server-side uses Express.js with TypeScript:

- **Framework**: Express.js with TypeScript for type safety
- **Architecture Pattern**: RESTful API structure with route registration system
- **Development Setup**: Vite integration for hot reloading during development
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

The backend follows a modular approach with separate files for routes, storage interfaces, and Vite development server integration. The storage system uses an interface pattern to allow easy switching between different persistence layers.

## Data Storage Solutions

The application uses a dual-storage approach:

- **Development Storage**: In-memory storage using Map collections for rapid development and testing
- **Production Database**: PostgreSQL configured through Drizzle ORM with Neon serverless database
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **User Model**: Simple user schema with ID, username, and password fields

The storage interface pattern allows seamless switching between memory-based development storage and production PostgreSQL without changing application logic.

## Authentication and Authorization

Currently implements a basic user model structure with:

- **User Schema**: Defined using Drizzle ORM with PostgreSQL types
- **Validation**: Zod schemas for type-safe data validation
- **Storage Interface**: CRUD operations for user management (create, get by ID, get by username)

The authentication system is prepared for implementation but not yet fully integrated into the application flow.

## External Dependencies

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database for production
- **Drizzle ORM**: Type-safe database toolkit for schema definition and queries
- **Drizzle Kit**: Database migration and schema management tool

### UI and Styling
- **shadcn/ui**: Comprehensive React component library built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives for React
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Audio Processing
- **Web Audio API**: Native browser API for real-time audio analysis
- **Custom Audio Utils**: Pitch detection algorithms and spectral analysis functions

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **TanStack Query**: Data fetching and caching for React
- **Wouter**: Lightweight routing library for React

### Form Handling and Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries

The application is designed to be easily deployable on Replit with proper environment variable configuration for the database connection.