import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Palette, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from API
  const user = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'user@example.com',
    role: 'user' as const,
    theme: theme,
    createdAt: '2024-01-01T00:00:00Z',
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>
              Your account details and basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <Badge variant="secondary" className="mt-1">
                    {user.role}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">User ID</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {user.id}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Preferences</span>
            </CardTitle>
            <CardDescription>
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred color scheme
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="capitalize"
                >
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Badge variant="outline" className="mb-2">
                  Current: {theme} mode
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Your theme preference is automatically saved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-muted-foreground">
                    You are currently logged in to the Wi-Fi De-Authentication Tool
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>
                <strong>Security Note:</strong> This is an educational tool for cybersecurity awareness. 
                All simulations are mock demonstrations and no real network attacks are performed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
