
import React, { useState, useCallback } from 'react';
import { analyzeLeafHealth } from '../services/geminiService';
import type { LeafHealthStatus } from '../types';

interface LeafAnalyzerProps {
    onAnalysisComplete: (status: LeafHealthStatus, reason: string) => void;
}

const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });

const LeafAnalyzer: React.FC<LeafAnalyzerProps> = ({ onAnalysisComplete }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    
    const handleAnalyze = useCallback(async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setError(null);

        try {
            const base64Image = await fileToBase64(selectedFile);
            const result = await analyzeLeafHealth(base64Image, selectedFile.type);
            onAnalysisComplete(result.status, result.reason);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedFile, onAnalysisComplete]);

    return (
        <div className="bg-surface rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-text-primary">AI Leaf Analyzer</h3>
            <div className="space-y-4">
                <div className="w-full h-48 bg-base rounded-md flex items-center justify-center border-2 border-dashed border-gray-600">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Leaf preview" className="h-full w-full object-cover rounded-md" />
                    ) : (
                        <p className="text-text-secondary">Upload a leaf image</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="leaf-upload"
                    className="hidden"
                />
                <label htmlFor="leaf-upload" className="w-full text-center block bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-300">
                    Choose Image
                </label>

                {selectedFile && (
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : 'Analyze Health'}
                    </button>
                )}

                {error && <p className="text-sm text-danger text-center">{error}</p>}
            </div>
        </div>
    );
};

export default LeafAnalyzer;
