
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// A component for animated 3D objects
const AnimatedObject = ({ 
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
  const ref = useRef<THREE.Mesh>(null);
  
  // Use useFrame for animation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    }
  });
  
  if (shape === "box") {
    return (
      <Box 
        ref={ref}
        args={[1, 1, 1]} 
        position={position} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    );
  } else if (shape === "torus") {
    return (
      <Torus 
        ref={ref}
        args={[1, 0.4, 16, 32]} 
        position={position} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  } else {
    // Default to sphere
    return (
      <Sphere 
        ref={ref}
        args={[1, 16, 16]} 
        position={position} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </Sphere>
    );
  }
};

// Main scene component with simplified structure
const Scene3D = () => {
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
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2FF49" />
        
        {/* Yellow sphere - top right */}
        <AnimatedObject 
          position={[5, 3, -5]} 
          color="#F2FF49" 
          scale={2.5}
          shape="sphere"
          speed={0.0005}
        />
        
        {/* Box - bottom left */}
        <AnimatedObject 
          position={[-6, -4, -3]} 
          color="#F2FF49" 
          scale={1.5}
          shape="box"
          speed={0.001}
        />
        
        {/* Torus - middle right */}
        <AnimatedObject 
          position={[7, -1, -2]} 
          color="#F2FF49" 
          scale={1.8}
          shape="torus"
          speed={0.0008}
        />
        
        {/* White sphere - top left */}
        <AnimatedObject 
          position={[-4, 5, -4]} 
          color="#FFFFFF" 
          scale={1.2}
          shape="sphere"
          speed={0.0007}
        />
        
        {/* Small yellow box - bottom right */}
        <AnimatedObject 
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
