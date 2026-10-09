import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomicalModel } from './AnatomicalModel';
import { useNeuroStore } from '../../store/useNeuroStore';

// Controls camera transitions smoothly based on preset targets
const CameraManager: React.FC = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraPresetTarget = useNeuroStore((s) => s.cameraPresetTarget);

  const targetPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const selectedStructureId = useNeuroStore((s) => s.selectedStructureId);

  // Enforce touchAction none on canvas domElement for iOS Safari gestures
  useEffect(() => {
    if (gl && gl.domElement) {
      gl.domElement.style.touchAction = 'none';
      (gl.domElement.style as any).webkitTouchCallout = 'none';
      gl.domElement.style.userSelect = 'none';
      (gl.domElement.style as any).webkitUserSelect = 'none';
    }
  }, [gl]);

  // Smoothly adjust camera framing when bottom sheet opens/closes on mobile
  useEffect(() => {
    if (isMobile) {
      if (selectedStructureId) {
        // Elevate camera target so the brain is perfectly framed in the visible top 54% of the screen
        targetLookAtRef.current = new THREE.Vector3(0, 0.45, 0);
      } else {
        targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
      }
    }
  }, [selectedStructureId, isMobile]);

  useEffect(() => {
    if (!cameraPresetTarget) return;

    // Mobile screens have narrow portrait aspect ratio; distance needs to be ~1.35x further back
    const scale = isMobile ? 1.35 : 1.0;
    const yOffset = (isMobile && selectedStructureId) ? 0.45 : 0;

    let target = new THREE.Vector3(3.2 * scale, 2.0 * scale + yOffset, 3.8 * scale); // Default reset
    switch (cameraPresetTarget) {
      case 'lateral_izq':
        target = new THREE.Vector3(-4.8 * scale, 0.3 * scale + yOffset, 0);
        break;
      case 'lateral_der':
        target = new THREE.Vector3(4.8 * scale, 0.3 * scale + yOffset, 0);
        break;
      case 'medial_sagital':
        target = new THREE.Vector3(-4.2 * scale, 0.2 * scale + yOffset, 0.8 * scale);
        break;
      case 'superior':
        target = new THREE.Vector3(0, 5.0 * scale + yOffset, 0.05);
        break;
      case 'inferior':
        target = new THREE.Vector3(0, -4.8 * scale + yOffset, 0.05);
        break;
      case 'anterior':
        target = new THREE.Vector3(0, 0.2 * scale + yOffset, 4.8 * scale);
        break;
      case 'posterior':
        target = new THREE.Vector3(0, 0.2 * scale + yOffset, -4.8 * scale);
        break;
      case 'reset':
      case 'centrar':
      default:
        target = new THREE.Vector3(3.2 * scale, 2.0 * scale + yOffset, 3.8 * scale);
        break;
    }

    targetPosRef.current = target;
    // Animate controls target back to origin or elevated mobile framing
    targetLookAtRef.current = new THREE.Vector3(0, yOffset, 0);
  }, [cameraPresetTarget, isMobile, selectedStructureId]);

  useFrame(() => {
    let needsUpdate = false;
    if (targetPosRef.current) {
      camera.position.lerp(targetPosRef.current, 0.1);
      needsUpdate = true;
      if (camera.position.distanceTo(targetPosRef.current) < 0.02) {
        camera.position.copy(targetPosRef.current);
        targetPosRef.current = null;
      }
    }
    if (targetLookAtRef.current && controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAtRef.current, 0.1);
      needsUpdate = true;
      if (controlsRef.current.target.distanceTo(targetLookAtRef.current) < 0.01) {
        controlsRef.current.target.copy(targetLookAtRef.current);
        targetLookAtRef.current = null;
      }
    }
    if (needsUpdate && controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      domElement={gl.domElement}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={isMobile ? 1.15 : 0.75}
      panSpeed={isMobile ? 0.95 : 0.6}
      screenSpacePanning={true}
      minDistance={1.5}
      maxDistance={12.0}
      enableRotate={true}
      enableZoom={true}
      enablePan={true}
    />
  );
};

export const BrainCanvas: React.FC = () => {
  const triggerCameraPreset = useNeuroStore((s) => s.triggerCameraPreset);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const lastTapRef = useRef<number>(0);

  // Quick double-tap anywhere on mobile canvas to re-center smoothly
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      triggerCameraPreset('reset');
    }
    lastTapRef.current = now;
  };

  return (
    <div
      onDoubleClick={() => triggerCameraPreset('reset')}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
      className="w-full h-full relative bg-gradient-to-b from-[#f9f7f2] via-[#f2eee5] to-[#e8e2d5] select-none touch-none"
    >
      <Canvas
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        className="touch-none select-none"
        camera={{
          position: isMobile ? [4.32, 2.7, 5.13] : [3.2, 2.0, 3.8],
          fov: 45,
        }}
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
          gl.domElement.style.touchAction = 'none';
          (gl.domElement.style as any).webkitTouchCallout = 'none';
          gl.domElement.style.userSelect = 'none';
          (gl.domElement.style as any).webkitUserSelect = 'none';
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
