import { useEffect, useRef, useState } from "react";
import { AudioData } from "../pages/home";
import {
  initializeAudioContext,
  analyzeAudio,
  calculatePitch,
  calculateSpectralFeatures
} from "../lib/audioUtils";

interface AudioAnalyzerProps {
  onAudioData: (data: AudioData) => void;
}

export default function AudioAnalyzer({ onAudioData }: AudioAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const { audioContext, analyzer } = initializeAudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);

      microphone.connect(analyzer);

      audioContextRef.current = audioContext;
      analyzerRef.current = analyzer;
      microphoneRef.current = microphone;
      streamRef.current = stream;

      setHasPermission(true);
      setIsAnalyzing(true);

      analyzeFrame();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setHasPermission(false);
      setIsAnalyzing(false);

      onAudioData({
        pitch: 0,
        highFreqEnergy: 0,
        lowFreqBoost: 0,
        isAnalyzing: false,
        hasPermission: false
      });
    }
  };

  const stopAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }

    audioContextRef.current = null;
    analyzerRef.current = null;

    setIsAnalyzing(false);

    onAudioData({
      pitch: 0,
      highFreqEnergy: 0,
      lowFreqBoost: 0,
      isAnalyzing: false,
      hasPermission
    });
  };

  const analyzeFrame = () => {
    if (!analyzerRef.current || !isAnalyzing) return;

    const audioData = analyzeAudio(analyzerRef.current);
    const pitch = calculatePitch(audioData.timeDomainData);
    const spectralFeatures = calculateSpectralFeatures(audioData.frequencyData);

    onAudioData({
      pitch,
      highFreqEnergy: spectralFeatures.highFreqEnergy,
      lowFreqBoost: spectralFeatures.lowFreqBoost,
      isAnalyzing: true,
      hasPermission: true
    });

    animationFrameRef.current = requestAnimationFrame(analyzeFrame);
  };

  // Attach global event listeners once
  useEffect(() => {
    const handleStartAnalysis = () => {
      if (!isAnalyzing) startAnalysis();
    };
    const handleStopAnalysis = () => {
      if (isAnalyzing) stopAnalysis();
    };

    window.addEventListener("startVoiceAnalysis", handleStartAnalysis);
    window.addEventListener("stopVoiceAnalysis", handleStopAnalysis);

    return () => {
      window.removeEventListener("startVoiceAnalysis", handleStartAnalysis);
      window.removeEventListener("stopVoiceAnalysis", handleStopAnalysis);
      stopAnalysis();
    };
  }, []); // empty deps = only run once

  // Cleanup if component unmounts
  useEffect(() => {
    return () => {
      stopAnalysis();
    };
  }, []);

  return null;
}
