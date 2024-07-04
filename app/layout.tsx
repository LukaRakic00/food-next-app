import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader/>
        {children}
      </body>
    </html>
  );
}
