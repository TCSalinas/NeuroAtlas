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

    let target = new THREE.Vector3(3.2, 2.0, 3.8); // Default reset
    switch (cameraPresetTarget) {
      case 'lateral_izq':
        target = new THREE.Vector3(-4.8, 0.3, 0);
        break;
      case 'lateral_der':
        target = new THREE.Vector3(4.8, 0.3, 0);
        break;
      case 'medial_sagital':
        target = new THREE.Vector3(-4.2, 0.2, 0.8);
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
        target = new THREE.Vector3(3.2, 2.0, 3.8);
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
    <div className="w-full h-full relative bg-gradient-to-b from-[#f9f7f2] via-[#f2eee5] to-[#e8e2d5] select-none">
      <Canvas
        camera={{ position: [3.2, 2.0, 3.8], fov: 45 }}
        gl={{
          antialias: true,
          localClippingEnabled: true,
          stencil: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        {/* Soft, warm studio museum lighting */}
        <ambientLight intensity={0.9} color="#fffcf5" />
        
        {/* Key Light (warm directional) */}
        <directionalLight position={[6, 8, 6]} intensity={1.3} color="#ffffff" castShadow={false} />
        {/* Fill Light (soft cool daylight) */}
        <directionalLight position={[-6, 5, -5]} intensity={0.6} color="#e0f2fe" />
        {/* Rim / Bottom Light (soft warm glow for ventral structures) */}
        <directionalLight position={[0, -6, 2]} intensity={0.4} color="#fef3c7" />
        {/* Frontal Soft Light */}
        <directionalLight position={[0, 2, 6]} intensity={0.5} color="#ffffff" />
        
        <CameraManager />
        <AnatomicalModel />
      </Canvas>
    </div>
  );
};
