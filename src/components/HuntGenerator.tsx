import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { generateHunt } from '../utils/huntGenerator';

export const HuntGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    childrenAge: '',
    numberOfChildren: '',
    theme: 'pirates',
    spaceDetails: ''
  });
  
  const [generatedHunt, setGeneratedHunt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          childrenAge: parseInt(formData.childrenAge),
          numberOfChildren: parseInt(formData.numberOfChildren),
          theme: formData.theme,
          spaceDetails: formData.spaceDetails
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const data = await response.json();
      setGeneratedHunt(data.story);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      // Fallback to local generation if API fails
      const localHunt = generateHunt({
        childrenAge: parseInt(formData.childrenAge),
        numberOfChildren: parseInt(formData.numberOfChildren),
        theme: formData.theme,
        spaceDetails: formData.spaceDetails
      });
      setGeneratedHunt(localHunt);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHunt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'treasure-hunt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Age of Children
          </label>
          <input
            type="number"
            value={formData.childrenAge}
            onChange={(e) => setFormData({ ...formData, childrenAge: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter age"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Number of Children
          </label>
          <input
            type="number"
            value={formData.numberOfChildren}
            onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter number of children"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Theme
          </label>
          <select
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            required
          >
            <option value="pirates">Pirates</option>
            <option value="unicorns">Unicorns</option>
            <option value="space">Space</option>
            <option value="dinosaurs">Dinosaurs</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Space Details
          </label>
          <textarea
            value={formData.spaceDetails}
            onChange={(e) => setFormData({ ...formData, spaceDetails: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Describe the available space (e.g., house, garden, rooms)"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Hunt'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {generatedHunt && (
        <div className="mt-8 p-6 rounded-lg bg-white/10 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Your Treasure Hunt</h3>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <Download size={20} />
              Download
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-white/90 font-mono text-sm">
            {generatedHunt}
          </pre>
        </div>
      )}
    </div>
  );
};