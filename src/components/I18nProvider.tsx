/**
 * i18n Provider
 * Wraps the app with i18n context
 */

import { useTranslation } from '../i18n/useTranslation';
import { ReactNode } from 'react';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  // The hook will initialize automatically
  const { isInitialized } = useTranslation();

  // Just render children, the hook handles initialization
  return (
    <>
      {children}
    </>
  );
}
