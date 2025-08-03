import { useState } from "react";
import AudioAnalyzer from "../components/AudioAnalyzer";
import VocalTractVisualizer from "../components/VocalTractVisualizer";
import ControlPanel from "../components/ControlPanel";

export interface AudioData {
  pitch: number;
  highFreqEnergy: number;
  lowFreqBoost: number;
  isAnalyzing: boolean;
  hasPermission: boolean;
}

export default function Home() {
  const [audioData, setAudioData] = useState<AudioData>({
    pitch: 0,
    highFreqEnergy: 0,
    lowFreqBoost: 0,
    isAnalyzing: false,
    hasPermission: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Voice Training Analyzer</h1>
              <p className="text-gray-600 mt-1">Real-time vocal tract visualization for voice training</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Status</div>
              <div className="flex items-center mt-1">
                <div 
                  className={`w-2 h-2 rounded-full mr-2 ${
                    audioData.isAnalyzing ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <span className="text-gray-700">
                  {audioData.isAnalyzing ? 'Analyzing' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel audioData={audioData} />
          </div>

          {/* Vocal Tract Visualization */}
          <div className="lg:col-span-2">
            <VocalTractVisualizer audioData={audioData} />
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h4 className="font-medium text-gray-900">Start Analysis</h4>
                <p className="text-sm text-gray-600 mt-1">Click "Start Voice Analysis" and allow microphone access when prompted.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h4 className="font-medium text-gray-900">Speak Naturally</h4>
                <p className="text-sm text-gray-600 mt-1">Begin speaking and watch the vocal tract visualization update in real-time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h4 className="font-medium text-gray-900">Practice & Adjust</h4>
                <p className="text-sm text-gray-600 mt-1">Use the visual feedback to practice and refine your voice training exercises.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden Audio Analyzer */}
      <AudioAnalyzer onAudioData={setAudioData} />
    </div>
  );
}
