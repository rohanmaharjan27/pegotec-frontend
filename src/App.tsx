import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const Home = lazy(() => import('./pages/Home'));

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner animation="border" />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
