import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useNeuroStore } from '../../store/useNeuroStore';
import { ANATOMICAL_STRUCTURES } from '../../data/structures';
import { VASCULAR_TERRITORIES } from '../../data/clinicalCorrelates';
import { AnatomicalStructure } from '../../types/neuro';

// Helper to merge BufferGeometries without extra dependencies
function mergeGeometries(geoms: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  let indexOffset = 0;

  for (const g of geoms) {
    const pos = g.attributes.position;
    const idx = g.index;
    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
    }
    if (idx) {
      for (let i = 0; i < idx.count; i++) {
        indices.push(idx.getX(i) + indexOffset);
      }
    } else {
      for (let i = 0; i < pos.count; i++) {
        indices.push(i + indexOffset);
      }
    }
    indexOffset += pos.count;
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  out.setIndex(indices);
  out.computeVertexNormals();
  return out;
}

// 1. Cortical Hemispheric Gyri: Left & Right with medial compression to create natural longitudinal fissure
function createHemisphericGyriGeometry(isLeft: boolean, baseRadius = 0.85, detail = 48): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(baseRadius, detail, detail);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    // Procedural harmonic waves simulating cerebral sulci & convolutions
    const freq1 = 4.2;
    const freq2 = 8.5;
    const wave =
      Math.sin(x * freq1) * Math.cos(y * freq1) * Math.sin(z * freq1) * 0.045 +
      Math.sin(x * freq2 + 1.2) * Math.cos(z * freq2) * 0.022;

    x = x * (1 + wave);
    y = y * (1 + wave);
    z = z * (1 + wave);

    // Medial compression: keeps the medial face flush along the sagittal fissure
    const medialLimit = 0.42;
    if (isLeft && x > medialLimit) {
      x = medialLimit + (x - medialLimit) * 0.22;
    } else if (!isLeft && x < -medialLimit) {
      x = -medialLimit + (x + medialLimit) * 0.22;
    }

    pos.setXYZ(i, x, y, z);
  }
  geom.computeVertexNormals();
  return geom;
}

// 2. Occipital Lobe: Bilateral poles with subtle midline groove along x = 0
function createOccipitalGyriGeometry(baseRadius = 0.85, detail = 48): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(baseRadius, detail, detail);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const freq1 = 4.2;
    const freq2 = 8.5;
    const wave =
      Math.sin(x * freq1) * Math.cos(y * freq1) * Math.sin(z * freq1) * 0.045 +
      Math.sin(x * freq2 + 1.2) * Math.cos(z * freq2) * 0.022;

    x = x * (1 + wave);
    y = y * (1 + wave);
    z = z * (1 + wave);

    // Bilateral poles with subtle longitudinal fissure dip along x = 0
    const fissureDip = Math.exp(-x * x * 20.0) * 0.06;
    z = z - fissureDip;

    pos.setXYZ(i, x, y, z);
  }
  geom.computeVertexNormals();
  return geom;
}

// 3. Cerebellar Folia Geometry: dense transverse foliar striations & vermis depression
function createCerebellumGeometry(baseRadius = 0.85, detail = 48): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(baseRadius, detail, detail);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Transverse folia striations (horizontal waves along Y axis)
    const folia = Math.sin(y * 22.0) * 0.035 + Math.sin(x * 10.0) * 0.015;
    // Midline notch for cerebellar vermis
    const vermisNotch = Math.exp(-x * x * 12.0) * 0.04;

    pos.setXYZ(i, x * (1 + folia) - (x > 0 ? vermisNotch : -vermisNotch), y * (1 + folia), z * (1 + folia));
  }
  geom.computeVertexNormals();
  return geom;
}

// 4. Corpus Callosum: anatomical C-shaped commissural arch (rostrum, genu, trunk, splenium)
function createCorpusCallosumGeometry(): THREE.BufferGeometry {
  const curvePoints = [
    new THREE.Vector3(0, -0.15, 0.45), // Rostrum
    new THREE.Vector3(0, 0.06, 0.54),  // Genu
    new THREE.Vector3(0, 0.22, 0.28),  // Anterior body
    new THREE.Vector3(0, 0.28, 0.0),   // Mid-body vertex
    new THREE.Vector3(0, 0.22, -0.32), // Posterior body
    new THREE.Vector3(0, 0.06, -0.52), // Splenium arch
    new THREE.Vector3(0, -0.09, -0.49), // Splenium inferior bulb
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const tubeGeom = new THREE.TubeGeometry(curve, 36, 0.08, 16, false);
  tubeGeom.scale(1.8, 1.0, 1.0);
  tubeGeom.computeVertexNormals();
  return tubeGeom;
}

// 5. Brainstem: tapered pontomedullary column with distinct pontine bulge
function createBrainstemGeometry(): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(0.38, 0.32, 1.4, 32, 16);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // Pontine belly (protuberancia) bulges anteriorly (z > 0)
    if (y > -0.15 && y < 0.45) {
      const bulge = Math.sin(((y + 0.15) / 0.6) * Math.PI) * 0.15;
      if (z > 0) {
        pos.setZ(i, z + bulge);
      }
    }
  }
  geom.computeVertexNormals();
  return geom;
}

// 6. Thalamus: Bilateral paired ovoid masses flanking the 3rd ventricle + interthalamic adhesion
function createThalamusGeometry(): THREE.BufferGeometry {
  const leftThalamus = new THREE.SphereGeometry(0.24, 24, 24);
  leftThalamus.scale(0.85, 0.75, 1.25);
  leftThalamus.translate(-0.18, 0, 0);

  const rightThalamus = new THREE.SphereGeometry(0.24, 24, 24);
  rightThalamus.scale(0.85, 0.75, 1.25);
  rightThalamus.translate(0.18, 0, 0);

  const bridge = new THREE.CylinderGeometry(0.055, 0.055, 0.36, 16);
  bridge.rotateZ(Math.PI / 2);

  return mergeGeometries([leftThalamus, rightThalamus, bridge]);
}

// 7. Hippocampus: Bilateral curved seahorse arches (pes hippocampi + corpus + cauda)
function createHippocampusGeometry(): THREE.BufferGeometry {
  function makeSide(isLeft: boolean) {
    const s = isLeft ? -1 : 1;
    const points = [
      new THREE.Vector3(s * 0.45, -0.05, 0.22),  // Pes hippocampi
      new THREE.Vector3(s * 0.52, -0.02, 0.05),  // Body mid-curve
      new THREE.Vector3(s * 0.46, 0.08, -0.18),  // Posterior curve
      new THREE.Vector3(s * 0.35, 0.16, -0.32),  // Fornix transition
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.TubeGeometry(curve, 24, 0.085, 12, false);

    const head = new THREE.SphereGeometry(0.12, 16, 16);
    head.scale(1.2, 0.8, 1.1);
    head.translate(s * 0.45, -0.05, 0.22);
    return [tube, head];
  }
  return mergeGeometries([...makeSide(true), ...makeSide(false)]);
}

// 8. Basal Ganglia: Bilateral Caudate arch (C-shape) + Lateral Lentiform nucleus (Putamen)
function createBasalGangliaGeometry(): THREE.BufferGeometry {
  function makeSide(isLeft: boolean) {
    const s = isLeft ? -1 : 1;
    const caudatePoints = [
      new THREE.Vector3(s * 0.22, 0.12, 0.26),  // Head (caput)
      new THREE.Vector3(s * 0.26, 0.24, 0.05),  // Body (corpus) arching over thalamus
      new THREE.Vector3(s * 0.32, 0.18, -0.22), // Posterior curve
      new THREE.Vector3(s * 0.38, 0.02, -0.30), // Tail (cauda)
    ];
    const caudateCurve = new THREE.CatmullRomCurve3(caudatePoints);
    const caudateTube = new THREE.TubeGeometry(caudateCurve, 24, 0.07, 12, false);

    const caudateHead = new THREE.SphereGeometry(0.14, 16, 16);
    caudateHead.scale(1.1, 1.2, 1.2);
    caudateHead.translate(s * 0.22, 0.12, 0.26);

    const putamen = new THREE.SphereGeometry(0.19, 16, 16);
    putamen.scale(0.7, 0.9, 1.4);
    putamen.translate(s * 0.46, 0.08, 0.06);

    return [caudateTube, caudateHead, putamen];
  }
  return mergeGeometries([...makeSide(true), ...makeSide(false)]);
}

// 9. Amygdala: Bilateral almond-shaped masses rostral to hippocampus
function createAmygdalaGeometry(): THREE.BufferGeometry {
  function makeSide(isLeft: boolean) {
    const s = isLeft ? -1 : 1;
    const geom = new THREE.SphereGeometry(0.11, 16, 16);
    geom.scale(0.85, 0.85, 1.35);
    geom.rotateY(s * 0.25);
    geom.translate(s * 0.42, -0.06, 0.28);
    return geom;
  }
  return mergeGeometries([makeSide(true), makeSide(false)]);
}

// 10. Hypothalamus: Ventral diencephalic wedge with infundibulum & mammillary bodies
function createHypothalamusGeometry(): THREE.BufferGeometry {
  const wedge = new THREE.ConeGeometry(0.18, 0.22, 16);
  wedge.rotateX(Math.PI);
  wedge.scale(1.2, 0.8, 1.0);
  wedge.translate(0, -0.08, 0.05);

  const mbL = new THREE.SphereGeometry(0.045, 12, 12);
  mbL.translate(-0.055, -0.06, -0.04);
  const mbR = new THREE.SphereGeometry(0.045, 12, 12);
  mbR.translate(0.055, -0.06, -0.04);

  return mergeGeometries([wedge, mbL, mbR]);
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

  // Create standard Three.js clipping planes based on enabled axes
  const clippingPlanes = useMemo(() => {
    if (!clipping.enabled) return [];
    const planes: THREE.Plane[] = [];
    if (clipping.sagittalEnabled) {
      planes.push(new THREE.Plane(new THREE.Vector3(-1, 0, 0), clipping.sagittal));
    }
    if (clipping.coronalEnabled) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, 0, -1), clipping.coronal));
    }
    if (clipping.axialEnabled) {
      planes.push(new THREE.Plane(new THREE.Vector3(0, -1, 0), clipping.axial));
    }
    return planes;
  }, [clipping]);

  // Geometry cache
  const geometries = useMemo(() => {
    return {
      gyriLeft: createHemisphericGyriGeometry(true, 0.85, 48),
      gyriRight: createHemisphericGyriGeometry(false, 0.85, 48),
      occipital: createOccipitalGyriGeometry(0.85, 48),
      cerebellum: createCerebellumGeometry(0.85, 48),
      callosum: createCorpusCallosumGeometry(),
      brainstem: createBrainstemGeometry(),
      thalamus: createThalamusGeometry(),
      hippocampus: createHippocampusGeometry(),
      basalGanglia: createBasalGangliaGeometry(),
      amygdala: createAmygdalaGeometry(),
      hypothalamus: createHypothalamusGeometry(),
      smoothSphere: new THREE.SphereGeometry(0.65, 32, 32),
      box: new THREE.BoxGeometry(1, 1, 1, 8, 8, 8),
    };
  }, []);

  // Helper to get correct geometry for each structure
  const getGeom = (struct: AnatomicalStructure): THREE.BufferGeometry => {
    if (struct.meshType === 'thalamus') return geometries.thalamus;
    if (struct.meshType === 'hippocampus') return geometries.hippocampus;
    if (struct.meshType === 'basal_ganglia') return geometries.basalGanglia;
    if (struct.meshType === 'amygdala') return geometries.amygdala;
    if (struct.meshType === 'hypothalamus') return geometries.hypothalamus;
    if (struct.meshType === 'occipital') return geometries.occipital;
    if (struct.meshType === 'cerebellum') return geometries.cerebellum;
    if (struct.meshType === 'callosum') return geometries.callosum;
    if (struct.meshType === 'cylinder') return geometries.brainstem;
    if (struct.meshType === 'sphere') return geometries.smoothSphere;
    if (struct.meshType === 'box') return geometries.box;
    return struct.hemisphere === 'izquierdo' ? geometries.gyriLeft : geometries.gyriRight;
  };

  // Determine if a deep structure is selected
  const isSelectedDeep = useMemo(() => {
    if (!selectedStructureId) return false;
    const found = ANATOMICAL_STRUCTURES.find((s) => s.id === selectedStructureId);
    return found ? found.isDeepStructure : false;
  }, [selectedStructureId]);

  // Order structures so cortical lobes are capped first, then cerebellum/brainstem, then deep organs on top
  const sortedStructuresForCapping = useMemo(() => {
    return [...ANATOMICAL_STRUCTURES].sort((a, b) => {
      // 0 for cortical lobes, 1 for cerebellum/brainstem, 2 for deep organs
      const getPriority = (s: AnatomicalStructure) => {
        if (s.isDeepStructure) return 2;
        if (s.lobe === 'cerebelo' || s.lobe === 'tronco') return 1;
        return 0;
      };
      return getPriority(a) - getPriority(b);
    });
  }, []);

  // Multi-object Stencil Capping: renders solid, zone-colored tissue caps on cut surfaces
  const stencilElements = useMemo(() => {
    if (!clipping.enabled || clippingPlanes.length === 0) return null;

    const capPlaneGeom = new THREE.PlaneGeometry(8, 8);

    return clippingPlanes.map((plane, planeIdx) => {
      const otherPlanes = clippingPlanes.filter((p) => p !== plane);

      // Normal and position of the clipping plane
      const normal = plane.normal.clone().normalize();
      const point = normal.clone().multiplyScalar(-plane.constant);
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      // Render order block for this plane
      // Each structure gets a 2-step pass: stencil calculation (order N), then cap render & stencil clear (order N + 1)
      const planeBaseOrder = planeIdx * 40;

      return (
        <group key={`stencil-plane-${planeIdx}`}>
          {sortedStructuresForCapping.map((struct, sIdx) => {
            if (isolatedStructureId && isolatedStructureId !== struct.id) return null;

            const isSelected = selectedStructureId === struct.id;
            const isHovered = hoveredStructureId === struct.id;

            // Vascular color computation
            let capColor = struct.color;
            if (activeVascularFilter !== 'all') {
              const isIrrigated = struct.vascularTerritory === activeVascularFilter;
              capColor = isIrrigated ? '#ef4444' : '#cbd5e1';
            } else if (activeView === 'vascular') {
              const territory = VASCULAR_TERRITORIES[struct.vascularTerritory];
              if (territory) capColor = territory.colorHex;
            }

            // Ghosting when a deep structure is selected
            const isGhosted = isSelectedDeep && !struct.isDeepStructure;

            const baseOrder = planeBaseOrder + sIdx * 2 + 1;
            const geom = getGeom(struct);

            // Step 1: Stencil calculation for this structure
            // Back faces increment, Front faces decrement
            const matBack = new THREE.MeshBasicMaterial({
              depthWrite: false,
              depthTest: true,
              colorWrite: false,
              stencilWrite: true,
              stencilFunc: THREE.AlwaysStencilFunc,
              side: THREE.BackSide,
              clippingPlanes: [plane],
              stencilFail: THREE.KeepStencilOp,
              stencilZFail: THREE.IncrementWrapStencilOp,
              stencilZPass: THREE.IncrementWrapStencilOp,
            });

            const matFront = new THREE.MeshBasicMaterial({
              depthWrite: false,
              depthTest: true,
              colorWrite: false,
              stencilWrite: true,
              stencilFunc: THREE.AlwaysStencilFunc,
              side: THREE.FrontSide,
              clippingPlanes: [plane],
              stencilFail: THREE.KeepStencilOp,
              stencilZFail: THREE.DecrementWrapStencilOp,
              stencilZPass: THREE.DecrementWrapStencilOp,
            });

            // Step 2: Solid cap mesh rendered in struct.color
            // Replaces/resets stencil to 0 so the next structure starts with clean stencil buffer
            const capMat = new THREE.MeshStandardMaterial({
              color: capColor,
              roughness: struct.isDeepStructure ? 0.35 : 0.58,
              metalness: 0.05,
              emissive: isSelected ? '#f59e0b' : isHovered ? '#38bdf8' : '#000000',
              emissiveIntensity: isSelected ? 0.65 : isHovered ? 0.35 : 0,
              transparent: isGhosted,
              opacity: isGhosted ? 0.08 : 1.0,
              depthWrite: !isGhosted,
              depthTest: true,
              polygonOffset: true,
              // Deep internal organs get priority offset so their cuts render crisp on top of any cortical volume
              polygonOffsetFactor: struct.isDeepStructure ? -2.0 : -0.5,
              polygonOffsetUnits: struct.isDeepStructure ? -2.0 : -0.5,
              side: THREE.DoubleSide,
              clippingPlanes: otherPlanes,
              stencilWrite: true,
              stencilRef: 0,
              stencilFunc: THREE.NotEqualStencilFunc,
              stencilFail: THREE.ZeroStencilOp,
              stencilZFail: THREE.ZeroStencilOp,
              stencilZPass: THREE.ZeroStencilOp,
            });

            const meshBack = new THREE.Mesh(geom, matBack);
            meshBack.position.set(...struct.meshPosition);
            meshBack.scale.set(...struct.meshScale);
            if (struct.meshRotation) meshBack.rotation.set(...struct.meshRotation);
            meshBack.renderOrder = baseOrder;

            const meshFront = new THREE.Mesh(geom, matFront);
            meshFront.position.set(...struct.meshPosition);
            meshFront.scale.set(...struct.meshScale);
            if (struct.meshRotation) meshFront.rotation.set(...struct.meshRotation);
            meshFront.renderOrder = baseOrder;

            const capMesh = new THREE.Mesh(capPlaneGeom, capMat);
            capMesh.position.copy(point);
            capMesh.quaternion.copy(quat);
            capMesh.renderOrder = baseOrder + 1;
            // Prevent cap mesh from intercepting pointer clicks outside the real anatomical volume
            capMesh.raycast = () => null;

            return (
              <group key={`struct-cap-${struct.id}-${planeIdx}`}>
                <primitive object={meshBack} />
                <primitive object={meshFront} />
                <primitive object={capMesh} />
              </group>
            );
          })}
        </group>
      );
    });
  }, [
    clipping.enabled,
    clippingPlanes,
    geometries,
    isolatedStructureId,
    selectedStructureId,
    hoveredStructureId,
    isSelectedDeep,
    activeVascularFilter,
    activeView,
    sortedStructuresForCapping,
  ]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Solid Stencil Capping Elements (rendered per structure with zone colors) */}
      {stencilElements}

      {/* 2. Main Anatomical Meshes (rendered at renderOrder 3) */}
      {ANATOMICAL_STRUCTURES.map((struct: AnatomicalStructure) => {
        const isSelected = selectedStructureId === struct.id;
        const isHovered = hoveredStructureId === struct.id;

        // Isolation mode check
        if (isolatedStructureId && isolatedStructureId !== struct.id) {
          return null;
        }

        // 1. Vascular Filter Highlighting Logic (ACV mode)
        let isVascularIrrigated = true;
        if (activeVascularFilter !== 'all') {
          isVascularIrrigated = struct.vascularTerritory === activeVascularFilter;
        }

        // Base color computation
        let baseColor = struct.color;
        if (activeVascularFilter !== 'all') {
          baseColor = isVascularIrrigated ? '#ef4444' : '#cbd5e1';
        } else if (activeView === 'vascular') {
          const territory = VASCULAR_TERRITORIES[struct.vascularTerritory];
          if (territory) baseColor = territory.colorHex;
        }

        // 2. Opacity & Depth Testing computation
        // When deep structures are selected, cortex drops to ghost-like 0.06 with depthWrite: false
        let opacity = 1.0;
        let shouldDepthWrite = true;

        if (activeVascularFilter !== 'all') {
          opacity = isVascularIrrigated ? 1.0 : 0.10;
          shouldDepthWrite = isVascularIrrigated;
        } else if (selectedStructureId) {
          if (isSelected) {
            opacity = 1.0;
            shouldDepthWrite = true;
          } else if (isSelectedDeep && !struct.isDeepStructure) {
            opacity = 0.06; // Ultra-transparent so internal structures shine through clearly!
            shouldDepthWrite = false; // NEVER occlude internal structures!
          } else if (isSelectedDeep && struct.isDeepStructure) {
            opacity = 0.25;
            shouldDepthWrite = false;
          } else {
            opacity = 0.15; // Soft ghosting
            shouldDepthWrite = false;
          }
        } else if (isXRayMode && !struct.isDeepStructure) {
          opacity = 0.16;
          shouldDepthWrite = false;
        }

        // 3. Emissive Glow computation
        let emissiveColor = '#000000';
        let emissiveIntensity = 0;

        if (activeVascularFilter !== 'all') {
          if (isVascularIrrigated) {
            emissiveColor = '#dc2626';
            emissiveIntensity = 0.85;
          }
        } else if (isSelected) {
          emissiveColor = '#f59e0b'; // Distinct warm gold highlight
          emissiveIntensity = 0.85;
        } else if (isHovered) {
          emissiveColor = '#38bdf8'; // Soft cyan hover glow
          emissiveIntensity = 0.4;
        }

        const geomToUse = getGeom(struct);

        return (
          <mesh
            key={struct.id}
            position={struct.meshPosition}
            scale={struct.meshScale}
            rotation={struct.meshRotation || [0, 0, 0]}
            geometry={geomToUse}
            renderOrder={150}
            onClick={(e) => {
              e.stopPropagation();
              selectStructure(isSelected ? null : struct.id);
            }}
            onPointerOver={(e) => {
              if (e.pointerType !== 'mouse') return;
              e.stopPropagation();
              hoverStructure(struct.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              if (e.pointerType !== 'mouse') return;
              e.stopPropagation();
              hoverStructure(null);
              document.body.style.cursor = 'auto';
            }}
          >
            <meshStandardMaterial
              color={baseColor}
              roughness={struct.isDeepStructure ? 0.35 : 0.62}
              metalness={0.06}
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity}
              transparent={opacity < 0.99}
              opacity={opacity}
              depthWrite={shouldDepthWrite}
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
