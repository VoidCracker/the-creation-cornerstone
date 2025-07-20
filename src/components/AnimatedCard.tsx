import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps {
  className?: string;
  variant?: 'default' | 'glow' | 'float' | 'scan';
  delay?: number;
  children?: ReactNode;
  [key: string]: any;
}

export const AnimatedCard = ({ 
  className, 
  variant = 'default', 
  delay = 0, 
  children, 
  ...props 
}: AnimatedCardProps) => {
  const variantClasses = {
    default: "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
    glow: "animate-glow transition-all duration-500 hover:scale-105",
    float: "animate-float",
    scan: "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent before:translate-x-[-100%] hover:before:animate-scan-line"
  };

  return (
    <Card 
      className={cn(
        "backdrop-blur-lg bg-card/80 border-2 border-primary/20",
        variantClasses[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Card>
  );
};