import React, { useEffect, useState } from 'react';

export default function WiFiStrengthIndicator() {
  const [strength, setStrength] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setStrength(Math.floor(Math.random() * 5) + 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={`w-2 transition-all duration-300 ${
            level <= strength ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          style={{ height: `${level * 4 + 8}px` }}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {strength}/5 Signal Strength
      </span>
    </div>
  );
}
