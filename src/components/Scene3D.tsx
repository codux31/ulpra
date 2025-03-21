
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple animated object component with proper typing
const AnimatedShape = ({ 
  position, 
  color = "#F2FF49", 
  scale = 1, 
  shape = "sphere",
  speed = 0.001
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
  shape?: "sphere" | "box" | "torus";
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {shape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
      {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
      {shape === "torus" && <torusGeometry args={[1, 0.4, 16, 32]} />}
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

// Main scene component
const Scene3D: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2FF49" />
        
        {/* Yellow sphere - top right */}
        <AnimatedShape 
          position={[5, 3, -5]} 
          color="#F2FF49" 
          scale={2.5}
          shape="sphere"
          speed={0.0005}
        />
        
        {/* Box - bottom left */}
        <AnimatedShape 
          position={[-6, -4, -3]} 
          color="#F2FF49" 
          scale={1.5}
          shape="box"
          speed={0.001}
        />
        
        {/* Torus - middle right */}
        <AnimatedShape 
          position={[7, -1, -2]} 
          color="#F2FF49" 
          scale={1.8}
          shape="torus"
          speed={0.0008}
        />
        
        {/* White sphere - top left */}
        <AnimatedShape 
          position={[-4, 5, -4]} 
          color="#FFFFFF" 
          scale={1.2}
          shape="sphere"
          speed={0.0007}
        />
        
        {/* Small yellow box - bottom right */}
        <AnimatedShape 
          position={[3, -6, -3]} 
          color="#F2FF49" 
          scale={0.8}
          shape="box"
          speed={0.0012}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
