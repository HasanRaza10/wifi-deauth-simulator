import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Save, Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import backend from '~backend/client';

export default function PasswordSecurity() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [domain, setDomain] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [strengthResult, setStrengthResult] = useState<any>(null);
  const { toast } = useToast();

  // Get current user from localStorage
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const currentUser = getCurrentUser();

  const strengthMutation = useMutation({
    mutationFn: (password: string) => backend.passwords.checkStrength({ password }),
    onSuccess: (data) => setStrengthResult(data),
  });

  const saveMutation = useMutation({
    mutationFn: ({ user_id, domain, password }: { user_id: string; domain: string; password: string }) =>
      backend.passwords.savePassword({ user_id, domain, password }),
    onSuccess: () => {
      toast({
        title: 'Password Saved',
        description: 'Password has been securely saved to your vault.',
      });
      setShowSaveDialog(false);
      setDomain('');
      refetchPasswords();
    },
  });

  const { data: savedPasswords, refetch: refetchPasswords } = useQuery({
    queryKey: ['saved-passwords', currentUser?.id],
    queryFn: () => {
      if (!currentUser?.id) return { passwords: [] };
      return backend.passwords.listPasswords({ user_id: currentUser.id });
    },
    enabled: !!currentUser?.id,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length > 0) {
      strengthMutation.mutate(value);
    } else {
      setStrengthResult(null);
    }
  };

  const handleSave = () => {
    if (!currentUser?.id) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to save passwords.',
        variant: 'destructive',
      });
      return;
    }

    if (!domain.trim()) {
      toast({
        title: 'Domain Required',
        description: 'Please enter a domain or website name.',
        variant: 'destructive',
      });
      return;
    }
    
    saveMutation.mutate({ 
      user_id: currentUser.id, 
      domain: domain.trim(), 
      password 
    });
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 2) return 'bg-orange-500';
    if (score <= 4) return 'bg-yellow-500';
    if (score <= 5) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthProgress = (score: number) => {
    return (score / 6) * 100;
  };

  const commonPasswords = [
    '12345678',
    'password123',
    'qwertyuiop',
    'iloveyou',
    'admin@123',
    'welcome1',
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Password Security Checker</h1>
        <p className="text-muted-foreground">
          Test your password strength and securely save strong passwords
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Password Strength Test</span>
            </CardTitle>
            <CardDescription>
              Enter a password to check its security strength
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Enter Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Type your password here..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {strengthResult && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Strength</span>
                    <Badge
                      variant="secondary"
                      className={`${getStrengthColor(strengthResult.score)} text-white`}
                    >
                      {strengthResult.label}
                    </Badge>
                  </div>
                  <Progress 
                    value={getStrengthProgress(strengthResult.score)} 
                    className="h-2"
                  />
                </div>

                {strengthResult.feedback.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Suggestions:</h4>
                    <ul className="space-y-1">
                      {strengthResult.feedback.map((item: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <AlertTriangle className="h-3 w-3 mt-0.5 text-orange-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowSaveDialog(true)}
                    disabled={strengthResult.score <= 2 || !currentUser}
                    className="flex-1"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Password
                  </Button>
                  <Button
                    onClick={() => refetchPasswords()}
                    variant="outline"
                    disabled={!currentUser}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Saved
                  </Button>
                </div>
                
                {!currentUser && (
                  <p className="text-xs text-muted-foreground">
                    Please log in to save and view passwords
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Requirements</CardTitle>
            <CardDescription>
              Follow these guidelines for strong passwords
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">Use 12+ characters</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">Mix upper/lowercase, numbers, and symbols</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">Avoid dictionary words and patterns</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">Unique password per site</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Common Passwords to Avoid:</h4>
              <div className="grid grid-cols-2 gap-2">
                {commonPasswords.map((commonPassword) => (
                  <Badge
                    key={commonPassword}
                    variant="destructive"
                    className="font-mono text-xs justify-center"
                  >
                    {commonPassword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Passwords */}
      {currentUser && savedPasswords && savedPasswords.passwords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Your Saved Passwords</span>
            </CardTitle>
            <CardDescription>
              Your securely stored passwords (encrypted)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain/Website</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedPasswords.passwords.map((password) => (
                  <TableRow key={password.id}>
                    <TableCell className="font-medium">{password.domain}</TableCell>
                    <TableCell>
                      {new Date(password.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {password.id.slice(0, 8)}...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Save Password Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Password</DialogTitle>
            <DialogDescription>
              Enter the domain or website this password is for
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain/Website</Label>
              <Input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., github.com, mybank.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Password'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
