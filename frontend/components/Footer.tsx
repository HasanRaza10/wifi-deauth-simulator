import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>Contact: hasanraza6361@gmail.com</span>
          </div>
          <p className="text-xs text-muted-foreground">
            For any query, contribution, or issues, feel free to contact us.
          </p>
        </div>
      </div>
    </footer>
  );
}
