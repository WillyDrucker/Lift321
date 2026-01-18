// ==========================================================================
// BOTTOM SHEET PORTAL
//
// Renders global bottom sheet at app root level using portal pattern.
// Consumes BottomSheetContext to display sheet with absolute positioning.
//
// This component should be rendered once at app root (in AppLayout or App.tsx).
// All bottom sheets in the app will render through this single portal.
//
// Dependencies: BottomSheetContext, BottomSheet component
// Used by: AppLayout (or App.tsx)
// ==========================================================================

import React from 'react';
import {BottomSheet} from './BottomSheet';
import {useBottomSheet} from '@/contexts';

export const BottomSheetPortal: React.FC = () => {
  const {isVisible, config, hideBottomSheet} = useBottomSheet();

  if (!config) {
    return null;
  }

  return (
    <BottomSheet
      visible={isVisible}
      onClose={hideBottomSheet}
      title={config.title}
      maxHeightPercent={config.maxHeightPercent}
      bottomOffset={config.bottomOffset}
      topOffset={config.topOffset}
    >
      {config.content}
    </BottomSheet>
  );
};
