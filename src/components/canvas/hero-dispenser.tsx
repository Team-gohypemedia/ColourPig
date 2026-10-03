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
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Aerospace Chrome Dispenser Top Mechanism (Page 39) */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.45, 48]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.06}
          metalness={0.96}
        />
      </mesh>

      {/* Chrome Actuator Head with Grip Texture */}
      <mesh position={[0, 2.7, 0.18]}>
        <cylinderGeometry args={[0.55, 0.65, 0.4, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.98}
        />
      </mesh>

      {/* Dispersion Nozzle Outlet */}
      <mesh position={[0, 2.75, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.25, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Collar Ring */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.25, 48]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.1}
          metalness={0.94}
        />
      </mesh>

      {/* Precision Body (Steel Grey finish) */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.7, 48]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>

      {/* Vertical Shade Pigment Window (Page 39) */}
      <mesh position={[0, 0.45, 0.77]}>
        <boxGeometry args={[0.13, 2.1, 0.08]} />
        <meshStandardMaterial
          color={shadeHex}
          emissive={shadeHex}
          emissiveIntensity={0.65}
          roughness={0.15}
        />
      </mesh>

      {/* Outer Protective Glass Slit */}
      <mesh position={[0, 0.45, 0.79]}>
        <boxGeometry args={[0.17, 2.15, 0.04]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.95}
          thickness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Base Cap */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.81, 0.81, 0.25, 48]} />
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
      {/* Reactive Shade Glow Aura */}
      <div
        className="absolute inset-0 rounded-full blur-[110px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: shadeHex }}
      />

      <Canvas
        camera={{ position: [0, 0.8, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 6]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[-5, -2, -5]} intensity={1.3} color="#94a3b8" />
        <pointLight position={[0, 3, 2]} intensity={2.2} color="#ffffff" />
        <pointLight position={[0, -1, 3]} intensity={1.8} color={shadeHex} />

        <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.5}>
          <DispenserMesh shadeHex={shadeHex} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.7}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}
