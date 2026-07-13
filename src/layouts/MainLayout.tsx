import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import Cursor from '@/components/Cursor/Cursor';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';

export default function MainLayout() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}