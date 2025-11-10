import React from 'react';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0D1117] to-black text-slate-200 font-sans grainy-bg">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Artify AI ✨</h1>
          <ul className="hidden md:flex items-center space-x-6 text-sm text-slate-400">
            <li className="hover:text-white transition-colors cursor-pointer">Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Gallery</li>
            <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-white transition-colors cursor-pointer">About</li>
          </ul>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-10 md:mb-12">
           <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-cyan-400 pb-2">
            Generate Anything You Imagine
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Type your idea below and let our AI turn it into a masterpiece, instantly.
          </p>
        </section>
        
        <ImageGenerator />

        <section className="mt-20 md:mt-32">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
              alt="Creators collaborating" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <div className="relative p-8 md:p-16 text-center text-white">
              <h3 className="text-3xl font-bold mb-8">🛡️ Trusted by Creators Worldwide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-semibold mb-2">✅ Real AI Power</h4>
                  <p className="text-slate-300 text-sm">Generated using advanced neural models—no templates, just pure imagination.</p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-semibold mb-2">🌍 Global Community</h4>
                  <p className="text-slate-300 text-sm">Used by 10,000+ creators, artists, and designers to bring their visions to life.</p>
                </div>
                 <div className="flex flex-col items-center">
                  <h4 className="text-xl font-semibold mb-2">🔒 Secure & Private</h4>
                  <p className="text-slate-300 text-sm">Your creative ideas are safe with us and are never shared or used for training.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="text-center py-8 mt-16">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Artify AI. Powered by the Gemini API.</p>
      </footer>
    </div>
  );
}

export default App;