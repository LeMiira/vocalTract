export interface AudioAnalysisData {
  timeDomainData: Float32Array;
  frequencyData: Uint8Array;
}

export interface SpectralFeatures {
  highFreqEnergy: number;
  lowFreqBoost: number;
}

export function initializeAudioContext(): { audioContext: AudioContext; analyzer: AnalyserNode } {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const analyzer = audioContext.createAnalyser();
  
  // Configure analyzer for optimal pitch detection and spectral analysis
  analyzer.fftSize = 2048;
  analyzer.smoothingTimeConstant = 0.8;
  analyzer.minDecibels = -90;
  analyzer.maxDecibels = -10;
  
  return { audioContext, analyzer };
}

export function analyzeAudio(analyzer: AnalyserNode): AudioAnalysisData {
  const bufferLength = analyzer.frequencyBinCount;
  const timeDomainData = new Float32Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  
  analyzer.getFloatTimeDomainData(timeDomainData);
  analyzer.getByteFrequencyData(frequencyData);
  
  return { timeDomainData, frequencyData };
}

export function calculatePitch(timeDomainData: Float32Array): number {
  // Simple autocorrelation-based pitch detection
  const sampleRate = 44100; // Assume standard sample rate
  const minPitch = 50; // Hz
  const maxPitch = 800; // Hz
  
  const minPeriod = Math.floor(sampleRate / maxPitch);
  const maxPeriod = Math.floor(sampleRate / minPitch);
  
  let bestCorrelation = 0;
  let bestPeriod = 0;
  
  // Autocorrelation
  for (let period = minPeriod; period <= maxPeriod; period++) {
    let correlation = 0;
    for (let i = 0; i < timeDomainData.length - period; i++) {
      correlation += timeDomainData[i] * timeDomainData[i + period];
    }
    
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestPeriod = period;
    }
  }
  
  // Convert period to frequency
  if (bestPeriod > 0 && bestCorrelation > 0.01) {
    return sampleRate / bestPeriod;
  }
  
  return 0; // No pitch detected
}

export function calculateSpectralFeatures(frequencyData: Uint8Array): SpectralFeatures {
  const nyquist = 22050; // Half of 44.1kHz sample rate
  const binSize = nyquist / frequencyData.length;
  
  // Define frequency ranges
  const lowFreqEnd = Math.floor(500 / binSize); // 0-500 Hz
  const highFreqStart = Math.floor(2000 / binSize); // 2000+ Hz
  
  let lowFreqSum = 0;
  let highFreqSum = 0;
  let totalSum = 0;
  
  // Calculate energy in different frequency bands
  for (let i = 0; i < frequencyData.length; i++) {
    const value = frequencyData[i];
    totalSum += value;
    
    if (i <= lowFreqEnd) {
      lowFreqSum += value;
    }
    
    if (i >= highFreqStart) {
      highFreqSum += value;
    }
  }
  
  // Normalize to percentages
  const highFreqEnergy = totalSum > 0 ? (highFreqSum / totalSum) * 100 : 0;
  const lowFreqBoost = totalSum > 0 ? (lowFreqSum / totalSum) * 100 : 0;
  
  return {
    highFreqEnergy: Math.min(100, Math.max(0, highFreqEnergy)),
    lowFreqBoost: Math.min(100, Math.max(0, lowFreqBoost))
  };
}
