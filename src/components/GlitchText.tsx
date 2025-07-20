import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchActive?: boolean;
}

export const GlitchText = ({ children, className, glitchActive = false }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';

  useEffect(() => {
    if (!glitchActive) {
      setDisplayText(children);
      return;
    }

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsGlitching(true);
        
        // Create glitched version
        const glitched = children
          .split('')
          .map(char => 
            Math.random() < 0.1 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        
        setDisplayText(glitched);

        // Restore original after short delay
        setTimeout(() => {
          setDisplayText(children);
          setIsGlitching(false);
        }, 100);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, [children, glitchActive]);

  return (
    <span 
      className={cn(
        "relative",
        isGlitching && "animate-pulse text-critical",
        className
      )}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ffff, 0 0 20px currentColor' 
          : undefined
      }}
    >
      {displayText}
    </span>
  );
};