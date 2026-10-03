"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Cylinder, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface DispenserProps {
  shadeColor: string;
  shadeCode: string;
}

function DispenserModel({ shadeColor }: { shadeColor: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Chrome Metallic Pump Head (Top mechanism from Page 39) */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.4, 48]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.08}
          metalness={0.96}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Chrome Actuator Nozzle */}
      <mesh position={[0, 2.65, 0.2]}>
        <cylinderGeometry args={[0.55, 0.65, 0.35, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.98}
        />
      </mesh>

      {/* Nozzle outlet */}
      <mesh position={[0, 2.7, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.25, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Collar Ring */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.3, 48]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.12}
          metalness={0.94}
        />
      </mesh>

      {/* Main Dispenser Body (Steel Grey matte finish) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.8, 48]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Precision Pigment Level Indicator Window (Vertical slit showing chosen shade) */}
      <mesh position={[0, 0.4, 0.77]}>
        <boxGeometry args={[0.14, 2.2, 0.08]} />
        <meshStandardMaterial
          color={shadeColor}
          emissive={shadeColor}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Glass casing over the pigment window */}
      <mesh position={[0, 0.4, 0.79]}>
        <boxGeometry args={[0.18, 2.25, 0.05]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.9}
          thickness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Base Cap */}
      <mesh position={[0, -1.1, 0]}>
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

export function Dispenser3DCanvas({
  shadeColor,
  shadeCode,
}: DispenserProps) {
  return (
    <div className="relative w-full h-[480px] lg:h-[600px] flex items-center justify-center">
      {/* Atmospheric lighting backdrop */}
      <div
        className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: shadeColor }}
      />

      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-5, -2, -5]} intensity={1.2} color="#94a3b8" />
        <pointLight position={[0, 3, 2]} intensity={2.0} color="#ffffff" />
        <pointLight position={[0, -2, 3]} intensity={1.5} color={shadeColor} />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <DispenserModel shadeColor={shadeColor} />
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
