import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import { Layout } from './components/layout';
import './App.css';

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));

// 加载状态组件
const PageLoading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// 页面过渡动画组件
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// 滚动到顶部组件
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  
  return null;
};

// 带动画的路由组件
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/articles" 
          element={
            <PageTransition>
              <Articles />
            </PageTransition>
          } 
        />
        <Route 
          path="/articles/:id" 
          element={
            <PageTransition>
              <ArticleDetail />
            </PageTransition>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <PageTransition>
              <Categories />
            </PageTransition>
          } 
        />
        <Route 
          path="/categories/:name" 
          element={
            <PageTransition>
              <Articles />
            </PageTransition>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <About />
            </PageTransition>
          } 
        />
        <Route 
          path="/search" 
          element={
            <PageTransition>
              <Articles />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoading />}>
            <AnimatedRoutes />
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
