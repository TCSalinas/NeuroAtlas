import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import { VASCULAR_TERRITORIES } from '../../data/clinicalCorrelates';
import { AnatomicalStructure } from '../../types/neuro';

// Helper to generate organic surface perturbation for realistic cerebral gyri & sulci
function createGyriGeometry(baseRadius = 1, detail = 32): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(baseRadius, detail, detail);
  const pos = geom.attributes.position;
  
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Procedural Perlin-like harmonic waves simulating cerebral sulci & convolutions
    const freq1 = 4.2;
    const freq2 = 8.5;
    const wave = Math.sin(x * freq1) * Math.cos(y * freq1) * Math.sin(z * freq1) * 0.05
               + Math.sin(x * freq2 + 1.2) * Math.cos(z * freq2) * 0.025;

    pos.setXYZ(i, x * (1 + wave), y * (1 + wave), z * (1 + wave));
  }
  geom.computeVertexNormals();
  return geom;
}

export const AnatomicalModel: React.FC = () => {
  const {
    selectedStructureId,
    hoveredStructureId,
    selectStructure,
    hoverStructure,
    isXRayMode,
    isolatedStructureId,
    clipping,
    activeView,
    activeVascularFilter,
  } = useNeuroStore();

  // Create clipping planes in Three.js
  const clippingPlanes = useMemo(() => {
    if (!clipping.enabled) return [];
    const planes: THREE.Plane[] = [];
    if (clipping.sagittal !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(-1, 0, 0), clipping.sagittal));
    }
    if (clipping.coronal !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 0, -1), clipping.coronal));
    }
    if (clipping.axial !== 0) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, -1, 0), clipping.axial));
    }
    return planes;
  }, [clipping]);

  // Gyri geometry cache
  const gyriGeom = useMemo(() => createGyriGeometry(0.85, 48), []);
  const smoothSphereGeom = useMemo(() => new THREE.SphereGeometry(0.7, 32, 32), []);
  const cylinderGeom = useMemo(() => new THREE.CylinderGeometry(0.5, 0.4, 1.4, 32), []);
  const boxGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1, 8, 8, 8), []);

  // Determine if a deep structure is selected
  const isSelectedDeep = useMemo(() => {
    if (!selectedStructureId) return false;
    const found = ANATOMICAL_STRUCTURES.find((s) => s.id === selectedStructureId);
    return found ? found.isDeepStructure : false;
  }, [selectedStructureId]);

  return (
    <group position={[0, 0.2, 0]}>
      {ANATOMICAL_STRUCTURES.map((struct: AnatomicalStructure) => {
        const isSelected = selectedStructureId === struct.id;
        const isHovered = hoveredStructureId === struct.id;

        // Isolation mode check
        if (isolatedStructureId && isolatedStructureId !== struct.id) {
          return null;
        }

        // Color computation: based on anatomical default or vascular territory mode
        let baseColor = struct.color;
        if (activeView === 'vascular') {
          const territory = VASCULAR_TERRITORIES[struct.vascularTerritory];
          if (territory) {
            baseColor = territory.colorHex;
          }
        }

        // Vascular territory filter dimming
        const isDimmedByVascularFilter = 
          activeView === 'vascular' && 
          activeVascularFilter !== 'all' && 
          struct.vascularTerritory !== activeVascularFilter;

        // Auto-ghosting: if user requested X-ray or selected a deep structure and this is superficial
        const shouldBeTransparent = (isXRayMode || isSelectedDeep) && !struct.isDeepStructure && !isSelected;

        const opacity = isDimmedByVascularFilter 
          ? 0.15 
          : shouldBeTransparent 
          ? 0.18 
          : 1.0;

        const emissiveColor = isSelected 
          ? '#38bdf8' 
          : isHovered 
          ? '#fef08a' 
          : '#000000';

        const emissiveIntensity = isSelected ? 0.45 : isHovered ? 0.25 : 0;

        // Select appropriate geometry type
        let geomToUse: THREE.BufferGeometry = gyriGeom;
        if (struct.meshType === 'sphere') geomToUse = smoothSphereGeom;
        else if (struct.meshType === 'cylinder') geomToUse = cylinderGeom;
        else if (struct.meshType === 'box') geomToUse = boxGeom;

        return (
          <mesh
            key={struct.id}
            position={struct.meshPosition}
            scale={struct.meshScale}
            rotation={struct.meshRotation || [0, 0, 0]}
            geometry={geomToUse}
            onClick={(e) => {
              e.stopPropagation();
              selectStructure(struct.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              hoverStructure(struct.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              hoverStructure(null);
              document.body.style.cursor = 'auto';
            }}
          >
            <meshStandardMaterial
              color={baseColor}
              roughness={struct.isDeepStructure ? 0.35 : 0.65}
              metalness={0.08}
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity}
              transparent={opacity < 1}
              opacity={opacity}
              depthWrite={opacity > 0.4}
              clippingPlanes={clippingPlanes}
              clipShadows={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};
