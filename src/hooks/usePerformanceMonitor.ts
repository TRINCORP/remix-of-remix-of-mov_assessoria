// Lightweight performance monitor - no continuous RAF loop
// Only checks performance on demand
export const usePerformanceMonitor = () => {
  return {
    getCurrentFPS: () => 60, // Stub - no overhead
  };
};
