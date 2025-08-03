import { AudioData } from "../pages/home";

interface VocalTractVisualizerProps {
  audioData: AudioData;
}

export default function VocalTractVisualizer({ audioData }: VocalTractVisualizerProps) {
  const { pitch, highFreqEnergy, lowFreqBoost, isAnalyzing } = audioData;

  // Determine articulator states based on audio analysis
  const larynxActive = pitch > 200;
  const tongueActive = highFreqEnergy > 50;
  const palateActive = lowFreqBoost > 30;

  const getLarynxStatus = () => {
    if (!isAnalyzing) return "Normal Position";
    return larynxActive ? "Raised Position" : "Normal Position";
  };

  const getTongueStatus = () => {
    if (!isAnalyzing) return "Normal Position";
    return tongueActive ? "Forward Position" : "Normal Position";
  };

  const getPalateStatus = () => {
    if (!isAnalyzing) return "Normal Position";
    return palateActive ? "Lowered (Nasal)" : "Normal Position";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Vocal Tract Visualization</h2>
      
      {/* SVG Vocal Tract Diagram */}
      <div className="flex justify-center">
        <svg width="400" height="500" viewBox="0 0 400 500" className="max-w-full h-auto">
          {/* Background */}
          <rect width="400" height="500" fill="#F8FAFC" stroke="#E5E7EB" strokeWidth="2" rx="10"/>
          
          {/* Nasal Cavity */}
          <path 
            d="M 120 80 Q 160 60 200 80 Q 240 60 280 80 L 280 120 Q 240 100 200 120 Q 160 100 120 120 Z" 
            fill="#E0E7FF" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            opacity="0.7"
          />
          <text x="200" y="100" textAnchor="middle" className="text-xs fill-gray-600">Nasal Cavity</text>
          
          {/* Soft Palate */}
          <path 
            d="M 120 120 Q 200 140 280 120 Q 260 160 200 170 Q 140 160 120 120" 
            fill="#D1FAE5" 
            stroke="#10B981" 
            strokeWidth="2" 
            className={palateActive ? "glow-palate" : ""}
            style={{
              filter: palateActive ? "drop-shadow(0 0 8px #10B981)" : "none",
              animation: palateActive ? "pulse-glow 2s ease-in-out infinite alternate" : "none"
            }}
          />
          <text x="200" y="145" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Soft Palate</text>
          
          {/* Hard Palate */}
          <path 
            d="M 120 170 Q 200 150 280 170 L 280 200 Q 200 180 120 200 Z" 
            fill="#FEF3C7" 
            stroke="#F59E0B" 
            strokeWidth="2" 
            opacity="0.6"
          />
          <text x="200" y="185" textAnchor="middle" className="text-xs fill-gray-600">Hard Palate</text>
          
          {/* Tongue */}
          <ellipse 
            cx="200" 
            cy="280" 
            rx="80" 
            ry="40" 
            fill="#DBEAFE" 
            stroke="#3B82F6" 
            strokeWidth="3" 
            className={tongueActive ? "glow-tongue" : ""}
            style={{
              filter: tongueActive ? "drop-shadow(0 0 8px #3B82F6)" : "none",
              animation: tongueActive ? "pulse-glow 2s ease-in-out infinite alternate" : "none"
            }}
          />
          <text x="200" y="285" textAnchor="middle" className="text-sm fill-gray-700 font-semibold">Tongue</text>
          
          {/* Jaw */}
          <path 
            d="M 80 320 Q 200 340 320 320 L 320 360 Q 200 380 80 360 Z" 
            fill="#F3F4F6" 
            stroke="#6B7280" 
            strokeWidth="2"
          />
          <text x="200" y="345" textAnchor="middle" className="text-xs fill-gray-600">Jaw</text>
          
          {/* Larynx */}
          <rect 
            x="180" 
            y="380" 
            width="40" 
            height="60" 
            rx="5" 
            fill="#FEF3C7" 
            stroke="#F59E0B" 
            strokeWidth="3" 
            className={larynxActive ? "glow-larynx" : ""}
            style={{
              filter: larynxActive ? "drop-shadow(0 0 8px #F59E0B)" : "none",
              animation: larynxActive ? "pulse-glow 2s ease-in-out infinite alternate" : "none"
            }}
          />
          <text x="200" y="415" textAnchor="middle" className="text-sm fill-gray-700 font-semibold">Larynx</text>
          
          {/* Vocal Folds */}
          <line x1="185" y1="385" x2="215" y2="385" stroke="#DC2626" strokeWidth="3"/>
          <line x1="185" y1="390" x2="215" y2="390" stroke="#DC2626" strokeWidth="3"/>
          <text x="200" y="405" textAnchor="middle" className="text-xs fill-gray-600">Vocal Folds</text>
          
          {/* Airflow Indication */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280"/>
            </marker>
          </defs>
          <path d="M 200 450 L 200 400" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.7"/>
          <text x="210" y="430" className="text-xs fill-gray-500">Airflow</text>
          
          {/* Legend */}
          <g transform="translate(20, 460)">
            <text x="0" y="0" className="text-xs fill-gray-700 font-medium">Active Areas:</text>
            <circle cx="10" cy="15" r="4" fill="#F59E0B" opacity="0.7"/>
            <text x="20" y="19" className="text-xs fill-gray-600">Larynx (High Pitch)</text>
            <circle cx="120" cy="15" r="4" fill="#3B82F6" opacity="0.7"/>
            <text x="130" y="19" className="text-xs fill-gray-600">Tongue (Fronted)</text>
            <circle cx="230" cy="15" r="4" fill="#10B981" opacity="0.7"/>
            <text x="240" y="19" className="text-xs fill-gray-600">Palate (Nasal)</text>
          </g>
        </svg>
      </div>

      {/* Real-time Feedback */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-amber-600 font-semibold">Larynx</div>
          <div className="text-sm text-amber-700 mt-1">{getLarynxStatus()}</div>
          <div className="text-xs text-amber-600 mt-2">
            {larynxActive ? "High pitch detected" : "Normal range"}
          </div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-blue-600 font-semibold">Tongue</div>
          <div className="text-sm text-blue-700 mt-1">{getTongueStatus()}</div>
          <div className="text-xs text-blue-600 mt-2">
            {tongueActive ? "High frequency energy" : "Normal spectrum"}
          </div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-green-600 font-semibold">Soft Palate</div>
          <div className="text-sm text-green-700 mt-1">{getPalateStatus()}</div>
          <div className="text-xs text-green-600 mt-2">
            {palateActive ? "Increased nasality" : "Low nasality"}
          </div>
        </div>
      </div>
    </div>
  );
}
