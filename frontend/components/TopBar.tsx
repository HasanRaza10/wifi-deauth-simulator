import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, User, LogOut, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/password-security', label: 'Password Security' },
    { path: '/learning', label: 'Learning' },
    { path: '/news', label: 'News' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2 font-bold text-lg">
            <Shield className="h-6 w-6 text-primary" />
            <span>WiFi DeAuth Tool</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
