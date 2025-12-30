import React, { useState, useCallback } from 'react';
import { generateStrategy } from './services/geminiService';
import InputGroup from './components/InputGroup';
import ResultDisplay from './components/ResultDisplay';
import LightbulbIcon from './components/icons/LightbulbIcon';
import TargetIcon from './components/icons/TargetIcon';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [strengths, setStrengths] = useState<string>('');
  const [decisionArea, setDecisionArea] = useState<string>('');
  const [strategy, setStrategy] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStrategy = useCallback(async () => {
    if (!strengths || !decisionArea) {
      setError('Please fill in both your strengths and the area of focus.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStrategy('');

    try {
      const result = await generateStrategy(strengths, decisionArea);
      setStrategy(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [strengths, decisionArea]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-700">
            Strategic Thinking Partner
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Leverage your strengths. Make smarter decisions.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="space-y-6">
              <InputGroup
                label="Your Strengths"
                id="strengths"
                placeholder="e.g., Analytical, Creative, Empathetic"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                as="textarea"
                icon={<LightbulbIcon />}
              />
              <InputGroup
                label="Area of Focus"
                id="decision-area"
                placeholder="e.g., Career change, new business idea"
                value={decisionArea}
                onChange={(e) => setDecisionArea(e.target.value)}
                as="input"
                icon={<TargetIcon />}
              />
            </div>
            <button
              onClick={handleGenerateStrategy}
              disabled={isLoading}
              className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:text-slate-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon />
                  Generate Strategy
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 min-h-[400px] flex flex-col">
            <ResultDisplay 
              isLoading={isLoading} 
              error={error} 
              strategy={strategy} 
            />
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;