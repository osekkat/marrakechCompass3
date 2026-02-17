/**
 * Hook for detecting network/offline status
 */

export interface UseOfflineStatusResult {
  isOnline: boolean;
  isConnected: boolean;
  connectionType: 'wifi' | 'cellular' | 'none' | 'unknown';
}

// Placeholder - will be implemented with NetInfo in Phase D
export function useOfflineStatus(): UseOfflineStatusResult {
  return {
    isOnline: true,
    isConnected: true,
    connectionType: 'unknown',
  };
}
