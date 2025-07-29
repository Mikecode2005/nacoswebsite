import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

export const FloatingCube = ({ position, color, speed = 1 }: FloatingElementProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const FloatingSphere = ({ position, color, speed = 1 }: FloatingElementProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const FloatingTorus = ({ position, color, speed = 1 }: FloatingElementProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.6, 0.2, 16, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};