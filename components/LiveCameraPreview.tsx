import React, { useRef, useEffect, useState } from "react";

export default function LiveCameraPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    setLoading(true);

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to access camera");
        setLoading(false);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full max-w-xs aspect-video rounded-xl shadow-lg bg-black overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
            <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 text-white">
            {error}
          </div>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      </div>
      <span className="mt-2 text-xs text-muted-foreground">Live Camera Preview</span>
    </div>
  );
}