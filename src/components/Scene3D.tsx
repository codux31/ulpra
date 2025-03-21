
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';

// A simpler animated 3D object that doesn't use useFrame directly
const AnimatedObject = ({ position, color = "#F2FF49", scale = 1, shape = "sphere" }) => {
  // Ensure position is always passed as a proper array to avoid undefined lov errors
  const positionArray = Array.isArray(position) ? position : [0, 0, 0];
  
  // Animation handled by auto rotation in the parent component
  if (shape === "box") {
    return (
      <Box 
        args={[1, 1, 1]} 
        position={positionArray} 
        scale={scale}
        rotation={[Math.random() * 0.1, Math.random() * 0.1, 0]}
      >
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    );
  } else if (shape === "torus") {
    return (
      <Torus 
        args={[1, 0.4, 16, 32]} 
        position={positionArray} 
        scale={scale}
        rotation={[Math.random() * 0.1, Math.random() * 0.1, 0]}
      >
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  } else {
    // Default to sphere
    return (
      <Sphere 
        args={[1, 16, 16]} 
        position={positionArray} 
        scale={scale}
        rotation={[Math.random() * 0.1, Math.random() * 0.1, 0]}
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
      {/* Wrapping in a div before Canvas to avoid direct rendering issues */}
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          style={{ background: 'transparent' }}
          camera={{ position: [0, 0, 15], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
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
    </div>
  );
};

export default Scene3D;
