interface WebContainerFS {
  readdir(path: string, options?: { withFileTypes: boolean }): Promise<any[]>;
  readFile(path: string, encoding: string): Promise<string>;
}

interface WebContainer {
  fs: WebContainerFS;
}

interface Window {
  webContainer: WebContainer;
}