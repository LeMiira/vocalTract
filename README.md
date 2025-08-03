# Voice Training Analyzer

A React-based voice training application with real-time vocal tract visualization designed for gender-affirming voice practice.

## Features

- **Real-time Audio Analysis**: Uses Web Audio API to capture and analyze microphone input
- **Pitch Detection**: Calculates fundamental frequency (F0) using autocorrelation algorithms
- **Spectral Analysis**: Performs FFT analysis to extract frequency characteristics
- **Vocal Tract Visualization**: Interactive SVG diagram showing articulator positions
- **Real-time Feedback**: Visual indicators for larynx, tongue, and soft palate activity
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Wouter** for lightweight routing
- **TanStack Query** for state management

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** (Neon serverless) for production
- **In-memory storage** for development

### Audio Processing
- **Web Audio API** for real-time microphone input
- **Custom algorithms** for pitch detection and spectral analysis
- **Real-time visualization** with SVG animations

## How It Works

1. **Audio Capture**: Captures audio input from user's microphone using Web Audio API
2. **Pitch Analysis**: Extracts fundamental frequency using autocorrelation
3. **Spectral Analysis**: Analyzes frequency distribution using FFT
4. **Articulator Estimation**: Maps audio features to vocal tract positions:
   - High pitch → larynx raised
   - Strong high-frequency energy → tongue fronted
   - Low-frequency energy boost → soft palate lowered (nasality)
5. **Visualization**: Updates SVG vocal tract diagram in real-time with colored glows and animations

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Modern web browser with microphone support

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd voice-training-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided URL

### Usage

1. Click "Start Voice Analysis" to begin
2. Allow microphone access when prompted
3. Begin speaking and watch the vocal tract visualization update in real-time
4. Use the visual feedback to practice and refine your voice training exercises

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── lib/          # Utility functions and audio processing
│   │   └── hooks/        # Custom React hooks
├── server/               # Backend Express application
├── shared/               # Shared types and schemas
└── README.md
```

## Key Components

- **AudioAnalyzer**: Handles audio capture and real-time analysis
- **VocalTractVisualizer**: SVG-based vocal tract diagram with animations
- **ControlPanel**: User controls and real-time metrics display

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.