// ==========================================================================
// BOTTOM SHEET CONTEXT
//
// Global bottom sheet system using portal pattern.
// Renders bottom sheet at app root level to enable touch-through during
// close animations (absolute positioning instead of Modal).
//
// Usage:
//   const { showBottomSheet, hideBottomSheet } = useBottomSheet();
//   showBottomSheet({ title: 'Select Exercise', content: <ExerciseList /> });
//
// Dependencies: React context, BottomSheet component
// Used by: Any component that needs to show a bottom sheet
// ==========================================================================

import React, {createContext, useContext, useState, useCallback, useMemo, type ReactNode} from 'react';

// === TYPES ===

type BottomSheetConfig = {
  title?: string;
  content: ReactNode;
  maxHeightPercent?: number;
  bottomOffset?: number;
  topOffset?: number;
  onClose?: () => void;
};

type BottomSheetContextType = {
  showBottomSheet: (config: BottomSheetConfig) => void;
  hideBottomSheet: () => void;
  isVisible: boolean;
  config: BottomSheetConfig | null;
};

// === CONTEXT ===

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

// === PROVIDER ===

type BottomSheetProviderProps = {
  children: ReactNode;
};

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<BottomSheetConfig | null>(null);

  const showBottomSheet = useCallback((newConfig: BottomSheetConfig) => {
    setConfig(newConfig);
    setIsVisible(true);
  }, []);

  const hideBottomSheet = useCallback(() => {
    setIsVisible(false);
    // Call onClose callback if provided
    config?.onClose?.();
    // Clear config after animation completes (300ms spring animation)
    setTimeout(() => {
      setConfig(null);
    }, 400);
  }, [config]);

  const value = useMemo(
    () => ({
      showBottomSheet,
      hideBottomSheet,
      isVisible,
      config,
    }),
    [showBottomSheet, hideBottomSheet, isVisible, config],
  );

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};

// === CUSTOM HOOK ===

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within BottomSheetProvider');
  }
  return context;
};
