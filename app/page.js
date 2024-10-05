"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Check, Loader2, AlertCircle } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [targetJob, setTargetJob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const resultsRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !targetJob) return;

    setIsLoading(true);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetJob", targetJob);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze resume");
      }
      setAnalysis(result);
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Upload Your Resume
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="targetJob"
                className="block text-sm font-medium text-gray-700"
              >
                Target Job Role
              </label>
              <input
                type="text"
                id="targetJob"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Software Engineer, Marketing Manager"
                required
              />
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700"
              >
                Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.txt"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Only TXT files up to 10MB
                  </p>
                </div>
              </div>
            </div>
            {file && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-5 w-5" />
                <span>{file.name}</span>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!file || !targetJob || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {analysis && (
        <div ref={resultsRef} className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-4">
              Resume Analysis Results
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Overall Score
                </h3>
                <p className="mt-2 text-3xl font-bold text-indigo-600">
                  {analysis.overallScore}/10
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Summary
                </h3>
                <p className="mt-2 text-gray-600">{analysis.summary}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Strengths
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Areas for Improvement
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                  {analysis.areasForImprovement.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Recommendations
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
