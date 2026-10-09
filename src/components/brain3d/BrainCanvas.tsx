import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomicalModel } from './AnatomicalModel';
import { useNeuroStore } from '../../store/useNeuroStore';

// Controls camera transitions smoothly based on preset targets
const CameraManager: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraPresetTarget = useNeuroStore((s) => s.cameraPresetTarget);

  const targetPosRef = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (!cameraPresetTarget) return;

    let target = new THREE.Vector3(0, 0, 4.5); // Default reset
    switch (cameraPresetTarget) {
      case 'lateral_izq':
        target = new THREE.Vector3(-4.8, 0.4, 0);
        break;
      case 'lateral_der':
        target = new THREE.Vector3(4.8, 0.4, 0);
        break;
      case 'medial_sagital':
        target = new THREE.Vector3(-4.5, 0.2, 0.5);
        break;
      case 'superior':
        target = new THREE.Vector3(0, 5.0, 0.05);
        break;
      case 'inferior':
        target = new THREE.Vector3(0, -4.8, 0.05);
        break;
      case 'anterior':
        target = new THREE.Vector3(0, 0.2, 4.8);
        break;
      case 'posterior':
        target = new THREE.Vector3(0, 0.2, -4.8);
        break;
      case 'reset':
      default:
        target = new THREE.Vector3(3.2, 2.2, 3.8);
        break;
    }

    targetPosRef.current = target;
  }, [cameraPresetTarget]);

  useFrame(() => {
    if (targetPosRef.current) {
      camera.position.lerp(targetPosRef.current, 0.08);
      if (camera.position.distanceTo(targetPosRef.current) < 0.02) {
        targetPosRef.current = null;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.7}
      panSpeed={0.6}
      minDistance={1.8}
      maxDistance={9.0}
    />
  );
};

export const BrainCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-radial from-[#131b2e] via-[#0b0f19] to-[#070a12]">
      <Canvas
        camera={{ position: [3.2, 2.2, 3.8], fov: 45 }}
        gl={{
          antialias: true,
          localClippingEnabled: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
      >
        <ambientLight intensity={0.9} />
        
        {/* Studio Lighting Setup */}
        <directionalLight position={[6, 8, 5]} intensity={1.4} castShadow={false} />
        <directionalLight position={[-6, 6, -5]} intensity={0.8} color="#93c5fd" />
        <directionalLight position={[0, -6, 2]} intensity={0.4} color="#fcd34d" />
        
        <CameraManager />
        <AnatomicalModel />
      </Canvas>
    </div>
  );
};
