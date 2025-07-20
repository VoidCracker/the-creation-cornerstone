import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { CyberParticles } from './CyberParticles';
import { FloatingShield } from './FloatingShield';
import { SecurityNode } from './SecurityNode';

interface Scene3DProps {
  scanActive?: boolean;
  vulnerabilities?: any[];
  className?: string;
}

export const Scene3D = ({ scanActive = false, vulnerabilities = [], className }: Scene3DProps) => {
  return (
    <div className={className}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#00bfff" intensity={0.5} />
        
        <Suspense fallback={null}>
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Animated particles */}
          <CyberParticles />
          
          {/* Main shield */}
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <FloatingShield 
              position={[0, 0, 0]} 
              color={scanActive ? "#ff4444" : "#00bfff"} 
              text="SECURE"
            />
          </Float>
          
          {/* Vulnerability nodes */}
          {vulnerabilities.slice(0, 6).map((vuln, index) => {
            const angle = (index / 6) * Math.PI * 2;
            const radius = 4;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <Float key={index} speed={1.5} rotationIntensity={0.2}>
                <SecurityNode
                  position={[x, Math.sin(index) * 2, z]}
                  severity={vuln.severity}
                  title={vuln.category}
                  isActive={scanActive}
                />
              </Float>
            );
          })}
          
          {/* Additional floating shields */}
          <Float speed={0.8} rotationIntensity={0.3}>
            <FloatingShield position={[-6, 2, -3]} color="#00ff88" />
          </Float>
          <Float speed={1.2} rotationIntensity={0.4}>
            <FloatingShield position={[6, -2, -3]} color="#ff8800" />
          </Float>
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            maxDistance={20} 
            minDistance={5}
            autoRotate={!scanActive}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};