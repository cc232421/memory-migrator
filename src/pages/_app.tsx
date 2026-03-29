import type { AppProps } from 'next/app';
import { useTranslation } from '../i18n/useTranslation';

/**
 * Custom App with i18n support
 */
export default function App({ Component, pageProps, router }: AppProps) {
  // Use translation hook to initialize i18n
  const { t, language } = useTranslation();

  return (
    <Component {...pageProps} />
  );
}
