import React, { useState } from 'react';
import { Share } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useLocation } from 'react-router-dom';

const DevModeDownload: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const location = useLocation();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();

      // Function to recursively add files to the zip
      const addFilesToZip = async (folderPath: string, zipFolder: JSZip) => {
        if (typeof window.webContainer !== 'undefined') {
          const files = await window.webContainer.fs.readdir(folderPath, { withFileTypes: true });

          for (const file of files) {
            const filePath = `${folderPath}/${file.name}`;
            if (file.isFile()) {
              const content = await window.webContainer.fs.readFile(filePath, 'utf-8');
              zipFolder.file(file.name, content);
            } else if (file.isDirectory()) {
              const newZipFolder = zipFolder.folder(file.name);
              if (newZipFolder) {
                await addFilesToZip(filePath, newZipFolder);
              }
            }
          }
        } else {
          // Fallback for browser environment
          zipFolder.file('README.md', 'This is a placeholder file. The actual source code download is not available in this environment.');
        }
      };

      // Start adding files from the root directory
      await addFilesToZip('/home/project', zip);

      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });

      // Trigger the download
      saveAs(content, 'project-source.zip');

      alert('Source code has been downloaded as a zip file.');
    } catch (error) {
      console.error('Error downloading source code:', error);
      alert('Failed to download source code. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (location.pathname !== '/dev') {
    return null;
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex items-center ${
        isDownloading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
      } text-white px-3 py-1 rounded-full transition duration-300`}
    >
      <Share className="w-4 h-4 mr-1" />
      <span className="text-sm">{isDownloading ? 'Downloading...' : 'Download Source'}</span>
    </button>
  );
};

export default DevModeDownload;