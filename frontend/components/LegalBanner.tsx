import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function LegalBanner() {
  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
      <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-500" />
      <AlertDescription className="text-orange-800 dark:text-orange-200">
        <strong>Educational Tool Only:</strong> This is a controlled demonstration for learning purposes. 
        Real deauthentication attacks are illegal and harmful. All simulations are mock demonstrations only.
      </AlertDescription>
    </Alert>
  );
}
