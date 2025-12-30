import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  strategy: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, strategy }) => {
  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-600 animate-pulse">
         <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.28 0-.53.11-.71.29L2.29 11.29c-.18.18-.29.43-.29.71s.11.53.29.71l9 9c.18.18.43.29.71.29s.53-.11.71-.29l9-9c.18-.18.29-.43.29-.71s-.11-.53-.29-.71l-9-9A.996.996 0 0 0 12 2zm0 18L4 12l8-8 8 8-8 8z" /></svg>
        <p className="text-lg font-semibold">Crafting your strategy...</p>
        <p className="text-sm">The AI is analyzing your strengths.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
        <div>
          <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-500">
         <svg className="w-16 h-16 mb-4 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-12a2.25 2.25 0 0 1-2.25-2.25V3M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
        <h3 className="text-xl font-bold">Your strategic plan will appear here.</h3>
        <p>Fill out the fields and let the AI guide you.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-slate max-w-none prose-h2:text-cyan-600 prose-h2:font-bold prose-h3:text-indigo-600 prose-strong:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {strategy}
      </ReactMarkdown>
    </div>
  );
};

export default ResultDisplay;