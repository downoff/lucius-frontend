import React from 'react';

export default function StreamingResult({ result, isLoading }) {
    return (
        <div className="mt-6 border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold">Generated Post:</h3>
            <div className="mt-2 p-4 bg-slate-900/50 rounded-md min-h-[150px] whitespace-pre-wrap">
                {result}
                {isLoading && <span className="streaming-text-cursor"></span>}
            </div>
        </div>
    );
}