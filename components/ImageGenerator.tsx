import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import { BASE_PROMPT, DEFAULT_NEGATIVE_PROMPT } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M14.226 2.23a1.5 1.5 0 0 1 2.085.396l.024.032 3.435 4.88a1.5 1.5 0 0 1-1.28 2.331l-.09.006h-.43l-2.14 2.14a5.25 5.25 0 0 1-8.312 5.584l-2.072 2.072a1.5 1.5 0 0 1-2.121-2.121l2.072-2.072a5.25 5.25 0 0 1 5.584-8.312l2.14-2.14v-.43a1.5 1.5 0 0 1 1.054-1.419l.102-.027ZM7.5 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM4.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM15 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /></svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 15.586l-4.293-4.293a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L12 15.586zM12 4a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1zM4 19a1 1 0 0 0 1 1h14a1 1 0 1 0 0-2H5a1 1 0 0 0-1 1z" /></svg>
);

const ImageGenerator: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState<string>('A vibrant aurora borealis over a snowy mountain range');
  const [negativePrompt, setNegativePrompt] = useState<string>(DEFAULT_NEGATIVE_PROMPT);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userPrompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    const finalPrompt = `${userPrompt.trim()}, ${BASE_PROMPT}`;

    try {
      const imageUrl = await generateImage(finalPrompt, negativePrompt);
      setGeneratedImage(imageUrl);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userPrompt, negativePrompt]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `artify-ai-${new Date().getTime()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900/50 p-4 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-grow w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder-slate-500"
            placeholder="e.g., A majestic lion with a crown of stars"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !userPrompt.trim()}
            className="w-full md:w-auto flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:saturate-50 hover:shadow-cyan-500/50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating...
              </>
            ) : (
              <>
                <MagicWandIcon className="w-5 h-5 mr-2" />
                Generate
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 bg-black/30 p-2 rounded-2xl shadow-2xl border border-gray-700/50 flex items-center justify-center aspect-video min-h-[300px] lg:min-h-0 relative group">
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && (
          <div className="text-center text-red-400 p-4">
            <h3 className="text-lg font-semibold">Generation Failed</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {!isLoading && !error && generatedImage && (
          <>
            <img src={generatedImage} alt="Generated art" className="w-full h-full object-contain rounded-lg animate-fade-in" />
            <button onClick={handleDownload} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white">
              <DownloadIcon className="w-6 h-6" />
            </button>
          </>
        )}
        {!isLoading && !error && !generatedImage && (
          <div className="text-center text-slate-500 p-4 flex flex-col items-center justify-center">
            <div className="w-24 h-24 mb-4 text-slate-600/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-400">Your masterpiece awaits</h3>
            <p className="text-sm max-w-xs mx-auto">Describe your vision and let the AI bring it to life.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;