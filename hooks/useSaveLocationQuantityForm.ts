import { useCallback, useState } from 'react';

export function useSaveLocationQuantityForm() {
  const [isSaveLocationQuantityFormOpen, setIsSaveLocationQuantityFormOpen] =
    useState(false);

  const toggleSaveLocationQuantityFormOpenState = useCallback(() => {
    setIsSaveLocationQuantityFormOpen(!isSaveLocationQuantityFormOpen);
  }, [isSaveLocationQuantityFormOpen, setIsSaveLocationQuantityFormOpen]);

  return {
    isSaveLocationQuantityFormOpen,
    toggleSaveLocationQuantityFormOpenState,
  };
}
