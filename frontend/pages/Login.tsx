import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Loader2, Eye, EyeOff, UserPlus } from 'lucide-react';
import backend from '~backend/client';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('DevOnlyPassword!234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      
      if (isRegisterMode) {
        response = await backend.auth.register({ name, email, password });
        toast({
          title: 'Account Created',
          description: 'Your account has been created successfully. You are now logged in.',
        });
      } else {
        response = await backend.auth.login({ email, password });
      }
      
      // Show splash animation
      setShowSplash(true);
      
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Navigate after splash animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
      
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: isRegisterMode ? 'Registration failed' : 'Login failed',
        description: isRegisterMode 
          ? 'Failed to create account. Please try again.'
          : 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail(isRegisterMode ? '' : 'user@example.com');
    setPassword(isRegisterMode ? '' : 'DevOnlyPassword!234');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    resetForm();
  };

  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-pulse">
          <Shield className="h-16 w-16 mx-auto mb-4 text-primary animate-bounce" />
          <h1 className="text-4xl font-bold text-foreground animate-fade-in">
            Wi-Fi De-Authentication Tool
          </h1>
          <p className="text-muted-foreground mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {isRegisterMode ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isRegisterMode 
              ? 'Create a new account to access the Wi-Fi security simulation tool'
              : 'Sign in to access the Wi-Fi security simulation tool'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegisterMode ? 'Creating Account...' : 'Signing in...'}
                </>
              ) : (
                <>
                  {isRegisterMode ? (
                    <UserPlus className="mr-2 h-4 w-4" />
                  ) : null}
                  {isRegisterMode ? 'Create Account' : 'Sign In'}
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={toggleMode}
              disabled={isLoading}
              className="text-sm"
            >
              {isRegisterMode 
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one"
              }
            </Button>
          </div>
          
          {!isRegisterMode && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Demo Credentials:</strong><br />
                Email: user@example.com<br />
                Password: DevOnlyPassword!234
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
