import { useCallback, useState } from 'react';

export function useContactForm() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const toggleContactFormOpenState = useCallback(() => {
    setIsContactFormOpen(!isContactFormOpen);
  }, [isContactFormOpen, setIsContactFormOpen]);

  return {
    isContactFormOpen,
    toggleContactFormOpenState,
  };
}
