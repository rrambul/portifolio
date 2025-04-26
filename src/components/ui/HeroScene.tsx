"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// Define tech symbols
interface TechSymbol {
  text: string;
  position: [number, number, number];
  scale: number;
  color: string;
}

// Position symbols in a wider circle around the center
const symbols: TechSymbol[] = [
  { text: "</>", position: [-5, 2, -1], scale: 0.7, color: "#9333ea" },
  { text: "{ }", position: [5, -2, 1], scale: 0.7, color: "#2563eb" },
  { text: "[]", position: [-4, -4, 0], scale: 0.7, color: "#06b6d4" },
  { text: "JS", position: [4, 4, -1], scale: 0.6, color: "#f7df1e" },
  { text: "TS", position: [0, 5, -2], scale: 0.6, color: "#3178c6" },
  { text: "()=>", position: [4, -4, 0], scale: 0.6, color: "#e11d48" },
];

// Individual symbol component with animation
function TechSymbol({ text, position, scale, color }: TechSymbol) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;

      // Add slight bounce effect
      const bounce = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
      meshRef.current.position.y = position[1] + bounce;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.6}
            height={0.2}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {text}
            <meshStandardMaterial
              color={hovered ? "#ffffff" : color}
              emissive={color}
              emissiveIntensity={hovered ? 0.8 : 0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full"></div>;
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 70 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        {/* Enable orbit controls with limited movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.2}
          autoRotate
          autoRotateSpeed={0.4}
          // Allow more free rotation since symbols are distributed evenly
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 2.8}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />

        {/* Scene lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.4} />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} />
        <pointLight position={[0, 0, 8]} intensity={0.4} />

        {/* Tech symbols */}
        {symbols.map((symbol, index) => (
          <TechSymbol
            key={index}
            text={symbol.text}
            position={symbol.position}
            scale={symbol.scale}
            color={symbol.color}
          />
        ))}
      </Canvas>
    </div>
  );
}
