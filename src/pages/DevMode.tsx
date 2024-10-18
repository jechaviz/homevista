import React, { useState } from 'react';
import { useDemo } from '../contexts/DemoContext';
import { GitBranch } from 'lucide-react';
import DevModeDownload from '../components/DevModeDownload';

const DevMode: React.FC = () => {
  const { isDemoMode } = useDemo();
  const [commitMessage, setCommitMessage] = useState('');
  const [isPushing, setIsPushing] = useState(false);

  const handlePush = async () => {
    if (!commitMessage.trim()) {
      alert('Please enter a commit message.');
      return;
    }

    setIsPushing(true);

    try {
      // In a real application, this would push the code to the repository
      // For demonstration purposes, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const repoUrl = import.meta.env.VITE_REPO_URL;
      const branch = import.meta.env.VITE_REPO_BRANCH || 'main';

      alert(`Code pushed successfully to ${repoUrl} on branch ${branch} with commit message: ${commitMessage}`);
      setCommitMessage('');
    } catch (error) {
      console.error('Error pushing code:', error);
      alert('Failed to push code. Please try again.');
    } finally {
      setIsPushing(false);
    }
  };

  if (!isDemoMode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Development Mode</h1>
        <p>Development mode is not available. Please enable demo mode to access this feature.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Development Mode</h1>
      <p className="mb-4">You are currently in development mode. You can download the source code using the button below:</p>
      
      <DevModeDownload />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Push Changes</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Enter commit message"
            className="flex-grow border rounded px-2 py-1 text-sm"
          />
          <button
            onClick={handlePush}
            disabled={isPushing}
            className={`flex items-center ${
              isPushing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            } text-white px-3 py-1 rounded-full transition duration-300`}
          >
            <GitBranch className="w-4 h-4 mr-1" />
            <span className="text-sm">{isPushing ? 'Pushing...' : 'Push to Repo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevMode;