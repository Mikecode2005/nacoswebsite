import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FloatingCube, FloatingSphere, FloatingTorus } from './FloatingElements';
import { Suspense } from 'react';

const Scene3D = () => {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, -10]} color="#4ade80" />
          
          {/* Floating Elements */}
          <FloatingCube position={[-4, 2, 0]} color="#22c55e" speed={0.8} />
          <FloatingSphere position={[4, -1, -2]} color="#3b82f6" speed={1.2} />
          <FloatingTorus position={[0, 3, -1]} color="#8b5cf6" speed={0.6} />
          <FloatingCube position={[3, 1, 1]} color="#f59e0b" speed={1.5} />
          <FloatingSphere position={[-3, -2, 1]} color="#ef4444" speed={0.9} />
          
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;