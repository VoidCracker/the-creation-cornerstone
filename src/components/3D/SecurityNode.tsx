import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface SecurityNodeProps {
  position: [number, number, number];
  severity: 'critical' | 'high' | 'medium' | 'low' | 'success';
  title: string;
  isActive?: boolean;
}

export const SecurityNode = ({ position, severity, title, isActive = false }: SecurityNodeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const severityColors = {
    critical: '#ff4444',
    high: '#ff8800',
    medium: '#ffdd00',
    low: '#88ff88',
    success: '#00ff88'
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (sphereRef.current && isActive) {
      sphereRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere ref={sphereRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color={severityColors[severity]}
          emissive={severityColors[severity]}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </Sphere>
      
      {/* Connecting rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshStandardMaterial
          color={severityColors[severity]}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.9, 0.03, 8, 32]} />
        <meshStandardMaterial
          color={severityColors[severity]}
          transparent
          opacity={0.4}
        />
      </mesh>

      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
    </group>
  );
};