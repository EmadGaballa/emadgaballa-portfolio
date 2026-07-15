import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import '@/styles/loading.css';

const About = lazy(() => import('@/pages/About/About'));
const Work = lazy(() => import('@/pages/Work/Work'));
const Project = lazy(() => import('@/pages/Project/Project'));
const Skills = lazy(() => import('@/pages/Skills/Skills'));
const Resume = lazy(() => import('@/pages/Resume/Resume'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

function Loading() {
  return <div className="loading-screen">Loading...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* Landing Page */}
                <Route path="/" element={<About />} />

                {/* Optional alias */}
                <Route path="/about" element={<About />} />

                {/* Other Pages */}
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<Project />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}