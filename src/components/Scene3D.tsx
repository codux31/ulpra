
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Simple animated 3D object
const AnimatedObject = ({ 
  position, 
  color = "#F2FF49", 
  scale = 1,
  shape = "sphere"
}) => {
  const meshRef = useRef(null);
  
  // Animation using useFrame
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Basic rotation animation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.0015;
    
    // Simple floating motion
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
  });

  // Render different shapes based on the shape prop
  if (shape === "box") {
    return (
      <Box 
        ref={meshRef} 
        args={[1, 1, 1]} 
        position={[position[0], position[1], position[2]]} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    );
  } else if (shape === "torus") {
    return (
      <Torus 
        ref={meshRef} 
        args={[1, 0.4, 16, 32]} 
        position={[position[0], position[1], position[2]]} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  } else {
    // Default to sphere
    return (
      <Sphere 
        ref={meshRef} 
        args={[1, 16, 16]} 
        position={[position[0], position[1], position[2]]} 
        scale={scale}
      >
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </Sphere>
    );
  }
};

// Main scene component
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
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 15], fov: 50 }}
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
        />
        
        {/* Box - bottom left */}
        <AnimatedObject 
          position={[-6, -4, -3]} 
          color="#F2FF49" 
          scale={1.5}
          shape="box"
        />
        
        {/* Torus - middle right */}
        <AnimatedObject 
          position={[7, -1, -2]} 
          color="#F2FF49" 
          scale={1.8}
          shape="torus"
        />
        
        {/* White sphere - top left */}
        <AnimatedObject 
          position={[-4, 5, -4]} 
          color="#FFFFFF" 
          scale={1.2}
          shape="sphere"
        />
        
        {/* Small yellow box - bottom right */}
        <AnimatedObject 
          position={[3, -6, -3]} 
          color="#F2FF49" 
          scale={0.8}
          shape="box"
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
