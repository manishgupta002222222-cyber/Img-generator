import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center p-4">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-purple-400 animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-400 animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>
      <p className="text-lg text-slate-300 font-semibold">Generating Your Vision...</p>
      <p className="text-sm text-slate-500">The cosmos is aligning. Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;