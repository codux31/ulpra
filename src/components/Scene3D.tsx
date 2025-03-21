
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';

// A simple 3D object that uses proper position typing
const SimpleObject = ({ 
  position, 
  color = "#F2FF49", 
  scale = 1, 
  shape = "sphere" 
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
  shape?: "sphere" | "box" | "torus";
}) => {
  // Use correct typing for position
  if (shape === "box") {
    return (
      <Box 
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
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2FF49" />
        
        {/* Yellow sphere - top right */}
        <SimpleObject 
          position={[5, 3, -5]} 
          color="#F2FF49" 
          scale={2.5}
          shape="sphere"
        />
        
        {/* Box - bottom left */}
        <SimpleObject 
          position={[-6, -4, -3]} 
          color="#F2FF49" 
          scale={1.5}
          shape="box"
        />
        
        {/* Torus - middle right */}
        <SimpleObject 
          position={[7, -1, -2]} 
          color="#F2FF49" 
          scale={1.8}
          shape="torus"
        />
        
        {/* White sphere - top left */}
        <SimpleObject 
          position={[-4, 5, -4]} 
          color="#FFFFFF" 
          scale={1.2}
          shape="sphere"
        />
        
        {/* Small yellow box - bottom right */}
        <SimpleObject 
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
