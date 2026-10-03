"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  TorusKnot,
  Stars,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25;
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
        <torusKnotGeometry args={[1, 0.36, 128, 32]} />
        <MeshDistortMaterial
          color="#9333ea"
          emissive="#3b0764"
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={2.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSpheres() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere position={[3.2, 0.8, -1]} args={[0.35, 32, 32]}>
        <meshStandardMaterial
          color="#ec4899"
          emissive="#be185d"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere position={[-3, -1.2, 1.2]} args={[0.45, 32, 32]}>
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere position={[1.5, -2.4, -2]} args={[0.25, 32, 32]}>
        <meshStandardMaterial
          color="#eab308"
          emissive="#ca8a04"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="relative w-full h-[520px] lg:h-[640px] rounded-3xl overflow-hidden glassmorphism">
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-gradient from-transparent via-transparent to-slate-950/60" />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        <directionalLight position={[0, 8, 5]} intensity={1.2} color="#ffffff" />
        
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3.5}
          saturation={1}
          fade
          speed={1.5}
        />

        <FloatingShape />
        <OrbitingSpheres />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
}
