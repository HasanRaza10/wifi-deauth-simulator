import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PasswordSecurity from './pages/PasswordSecurity';
import Learning from './pages/Learning';
import News from './pages/News';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="password-security" element={<PasswordSecurity />} />
                <Route path="learning" element={<Learning />} />
                <Route path="news" element={<News />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
