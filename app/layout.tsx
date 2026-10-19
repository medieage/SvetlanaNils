import { siteMetadata } from './seo';
import '@fontsource-variable/rubik';
import '@fontsource-variable/lora';
import '@fontsource-variable/lora/wght-italic.css';
import './globals.css';
import './typography.css';
import './design.css';
import './motion.css';
import './library-backdrop.css';
import LibraryBackdrop from './components/LibraryBackdrop';

export const metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Wallet extensions such as TokenPocket inject attributes on <html> before hydration.
  // Suppress only root attribute warnings; keep hydration checks for page content.
  return <html lang="ru" suppressHydrationWarning><body><LibraryBackdrop />{children}</body></html>;
}
