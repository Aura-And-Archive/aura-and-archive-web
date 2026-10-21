'use client';

import React, { useState, useRef } from 'react';
import { uploadMedia } from '@/lib/uploadMedia';

interface AudioRecorderProps {
  onUploadComplete?: (publicUrl: string) => void;
}

export default function AudioRecorder({ onUploadComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [timer, setTimer] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioUrl(null);
      setTimer(0);

      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone access denied or not supported.');
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const handleUpload = async () => {
    if (!audioBlob) return;
    setIsUploading(true);
    try {
      const { publicUrl } = await uploadMedia(audioBlob, 'audio');
      if (onUploadComplete) onUploadComplete(publicUrl);
      alert('Audio recording saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Error uploading recording.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-xl bg-slate-900 text-white max-w-md w-full shadow-lg">
      <h3 className="text-lg font-semibold">Voice Message</h3>

      {isRecording && (
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <span className="font-mono text-xl text-red-400">{formatTimer(timer)}</span>
        </div>
      )}

      <div className="flex gap-4">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 font-medium rounded-lg transition"
          >
            {audioUrl ? 'Record Again' : 'Record Audio'}
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 font-medium rounded-lg transition"
          >
            Stop Recording
          </button>
        )}
      </div>

      {audioUrl && !isRecording && (
        <div className="flex flex-col items-center gap-3 w-full mt-2">
          <audio controls src={audioUrl} className="w-full" />
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 font-medium rounded-lg transition disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Save Voice Recording'}
          </button>
        </div>
      )}
    </div>
  );
}
