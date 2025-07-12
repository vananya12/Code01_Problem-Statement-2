import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import AskQuestionPage from './pages/AskQuestionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="App">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions/:id" element={<QuestionDetailPage />} />
                <Route path="/ask" element={
                  <ProtectedRoute>
                    <AskQuestionPage />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user/:username" element={<UserProfilePage />} />
              </Routes>
            </Layout>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App; 