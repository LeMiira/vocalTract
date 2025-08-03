import { AudioData } from "@/pages/home";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface ControlPanelProps {
  audioData: AudioData;
}

export default function ControlPanel({ audioData }: ControlPanelProps) {
  const { pitch, highFreqEnergy, lowFreqBoost, isAnalyzing, hasPermission } = audioData;

  const toggleAnalysis = () => {
    if (isAnalyzing) {
      window.dispatchEvent(new CustomEvent('stopVoiceAnalysis'));
    } else {
      window.dispatchEvent(new CustomEvent('startVoiceAnalysis'));
    }
  };

  const getPitchPercentage = () => {
    const minPitch = 80;
    const maxPitch = 400;
    return Math.min(100, Math.max(0, (pitch - minPitch) / (maxPitch - minPitch) * 100));
  };

  const getPitchRange = () => {
    if (pitch < 150) return "Low";
    if (pitch < 250) return "Mid";
    return "High";
  };

  const getPermissionStatus = () => {
    if (isAnalyzing) return "Active";
    if (hasPermission) return "Granted";
    return "Pending";
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Audio Controls</h2>
        
        {/* Start/Stop Button */}
        <Button 
          onClick={toggleAnalysis}
          className={`w-full py-4 px-6 text-lg font-medium transition-colors focus:ring-4 focus:outline-none mb-4 ${
            isAnalyzing 
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500/20' 
              : 'bg-primary hover:bg-primary/90 focus:ring-primary/20'
          }`}
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <MicOff className="mr-2 h-5 w-5" />
              Stop Analysis
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              Start Voice Analysis
            </>
          )}
        </Button>

        {/* Microphone Permission Status */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Microphone Access</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isAnalyzing 
                ? 'bg-green-100 text-green-700'
                : hasPermission 
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {getPermissionStatus()}
            </span>
          </div>
        </div>

        {/* Real-time Pitch Display */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">Current Pitch</div>
            <div className="text-4xl font-bold text-primary mb-1">
              {Math.round(pitch)} <span className="text-lg font-normal text-gray-500">Hz</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${getPitchPercentage()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>80 Hz</span>
              <span>400 Hz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spectral Analysis</h3>
        
        <div className="space-y-4">
          {/* High Frequency Energy */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">High Frequency Energy</span>
              <span className="text-sm text-primary font-medium">{Math.round(highFreqEnergy)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${highFreqEnergy}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Tongue Position Indicator</div>
          </div>

          {/* Low Frequency Energy */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Low Frequency Boost</span>
              <span className="text-sm text-secondary font-medium">{Math.round(lowFreqBoost)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${lowFreqBoost}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Nasality Indicator</div>
          </div>

          {/* Pitch Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Pitch Range</span>
              <span className="text-sm text-accent font-medium">{getPitchRange()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPitchPercentage()}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">Larynx Position</div>
          </div>
        </div>
      </div>
    </>
  );
}
