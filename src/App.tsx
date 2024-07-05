import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GuardedRoute from './components/GuardedRoute';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('userDetails');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route element={<GuardedRoute />}>
          <Route path="/second" element={<SecondPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
