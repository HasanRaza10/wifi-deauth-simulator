import React, { useEffect, useRef } from 'react';

interface RadarAnimationProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
}

export default function RadarAnimation({ isActive, onAnimationComplete }: RadarAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    let angle = 0;
    let animationTime = 0;

    const devices = [
      { angle: 0, radius: maxRadius * 0.7, name: 'Laptop-1' },
      { angle: Math.PI / 2, radius: maxRadius * 0.8, name: 'Phone-2' },
      { angle: Math.PI, radius: maxRadius * 0.6, name: 'Tablet-3' },
      { angle: (3 * Math.PI) / 2, radius: maxRadius * 0.9, name: 'Smart_TV' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid circles
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 4) * i, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw center router
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw devices
      devices.forEach((device, index) => {
        const deviceX = centerX + Math.cos(device.angle) * device.radius;
        const deviceY = centerY + Math.sin(device.angle) * device.radius;
        
        // Device dot
        ctx.fillStyle = isActive && animationTime > index * 500 ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(deviceX, deviceY, 6, 0, 2 * Math.PI);
        ctx.fill();

        // Connection line to router
        ctx.strokeStyle = isActive && animationTime > index * 500 ? '#ef4444' : '#6b7280';
        ctx.lineWidth = 2;
        ctx.setLineDash(isActive && animationTime > index * 500 ? [5, 5] : []);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(deviceX, deviceY);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw hacker node (red dot)
      if (isActive) {
        const hackerX = centerX + Math.cos(angle) * maxRadius * 0.5;
        const hackerY = centerY + Math.sin(angle) * maxRadius * 0.5;
        
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(hackerX, hackerY, 8, 0, 2 * Math.PI);
        ctx.fill();

        // Broadcast waves from hacker
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        for (let i = 1; i <= 3; i++) {
          const waveRadius = (animationTime / 10) % 100 + i * 20;
          ctx.globalAlpha = 1 - (waveRadius / 100);
          ctx.beginPath();
          ctx.arc(hackerX, hackerY, waveRadius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // Draw sweeping radar beam
      if (isActive) {
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
        gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, maxRadius, angle - 0.3, angle + 0.3);
        ctx.closePath();
        ctx.fill();
      }

      angle += 0.02;
      animationTime += 16;

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
        
        if (animationTime > 5000 && onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    if (isActive) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animate(); // Draw static state
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, onAnimationComplete]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border border-border rounded-lg bg-background"
    />
  );
}
