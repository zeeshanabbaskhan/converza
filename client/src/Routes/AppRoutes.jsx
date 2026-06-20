import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/Signup.jsx';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Updateprofile from '../pages/Updateprofile.jsx';
import { userauthstore } from '../Store/UserAuthStore.jsx';
import ProtectedRoute from '../componenets/Protectedroute.jsx';
import Loader from '../componenets/Loader.jsx';

const Videocall = lazy(() => import('../pages/Videocall.jsx'));
const Documents = lazy(() => import('../pages/Documents.jsx'));
const DocumentEditor = lazy(() => import('../pages/DocumentEditor.jsx'));

function PageLoader() {
  return (
    <div className="signupbody">
      <Loader />
    </div>
  );
}

function AppRoutes() {
  const { user } = userauthstore();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Navigate to="/signup" replace />} />
        <Route path="/Login" element={<Navigate to="/login" replace />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user ? <Home /> : <Login />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              {user ? <Updateprofile /> : <Login />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/videocall"
          element={
            <ProtectedRoute>
              {user ? <Videocall /> : <Login />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              {user ? <Documents /> : <Login />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              {user ? <DocumentEditor /> : <Login />}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
