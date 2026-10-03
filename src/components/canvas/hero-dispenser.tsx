"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HeroDispenserProps {
  shadeHex: string;
}

function DispenserMesh({ shadeHex }: HeroDispenserProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    // Scaled and centered so the full top and base fit comfortably in frame
    <group ref={groupRef} position={[0, -0.35, 0]} scale={0.78}>
      {/* Chrome Actuator Nozzle */}
      <mesh position={[0, 2.5, 0.15]}>
        <cylinderGeometry args={[0.5, 0.6, 0.35, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.06}
          metalness={0.98}
        />
      </mesh>

      {/* Nozzle Tip */}
      <mesh position={[0, 2.55, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.22, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Chrome Pump Head (Page 39) */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.4, 48]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.08}
          metalness={0.96}
        />
      </mesh>

      {/* Chrome Collar Ring */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.2, 48]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.12}
          metalness={0.94}
        />
      </mesh>

      {/* Steel Grey Cylinder Body */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 2.6, 48]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>

      {/* Vertical Shade Fluid Window (Page 39) */}
      <mesh position={[0, 0.45, 0.72]}>
        <boxGeometry args={[0.12, 2.0, 0.06]} />
        <meshStandardMaterial
          color={shadeHex}
          emissive={shadeHex}
          emissiveIntensity={0.65}
          roughness={0.15}
        />
      </mesh>

      {/* Protective Glass Layer */}
      <mesh position={[0, 0.45, 0.74]}>
        <boxGeometry args={[0.15, 2.05, 0.03]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.95}
          thickness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Base Cap */}
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.22, 48]} />
        <meshStandardMaterial
          color="#0D151C"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export function HeroDispenserCanvas({ shadeHex }: HeroDispenserProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Subtle Aura */}
      <div
        className="absolute inset-0 rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: shadeHex }}
      />

      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, -2, -5]} intensity={1.2} color="#94a3b8" />
        <pointLight position={[0, 3, 2]} intensity={2.0} color="#ffffff" />
        <pointLight position={[0, -1, 3]} intensity={1.6} color={shadeHex} />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.35}>
          <DispenserMesh shadeHex={shadeHex} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}
