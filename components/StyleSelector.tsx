import React from 'react';
import { StyleMode } from '../types';

interface StyleSelectorProps {
  selectedStyle: StyleMode;
  onStyleChange: (style: StyleMode) => void;
  disabled: boolean;
}

const styles = [
  StyleMode.REALISTIC,
  StyleMode.FUTURISTIC,
  StyleMode.FANTASY,
  StyleMode.MINIMALIST,
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange, disabled }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-400">Select Style</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {styles.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => onStyleChange(style)}
            disabled={disabled}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500 disabled:opacity-50
              ${
                selectedStyle === style
                  ? 'bg-sky-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-transparent hover:border-sky-500'
              }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;