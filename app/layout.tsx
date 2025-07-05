import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bella Vista Restaurant - Authentic Italian Cuisine',
  description: 'Experience authentic Italian cuisine in a warm, welcoming atmosphere. From traditional recipes to modern interpretations, we bring you the best of Italy.',
  keywords: 'Italian restaurant, authentic cuisine, fine dining, pasta, pizza, wine',
  authors: [{ name: 'Bella Vista Restaurant' }],
  openGraph: {
    title: 'Bella Vista Restaurant - Authentic Italian Cuisine',
    description: 'Experience authentic Italian cuisine in a warm, welcoming atmosphere.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <OrderProvider>
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster />
              </OrderProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}