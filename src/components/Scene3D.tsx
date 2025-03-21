
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Individual 3D element that responds to scroll
const ScrollResponsiveObject = ({ 
  position = [0, 0, 0], 
  color = "#F2FF49", 
  speed = 0.5, 
  rotationFactor = 0.001,
  scale = 1,
  shape = "sphere"
}) => {
  const meshRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animate based on scroll position
  const animate = (state) => {
    if (!meshRef.current) return;
    
    // Base rotation
    meshRef.current.rotation.x += rotationFactor;
    meshRef.current.rotation.y += rotationFactor * 1.5;
    
    // Apply scroll-based position changes
    const scrollFactor = scrollY * 0.001;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5 - scrollFactor * 2;
    
    // Slight X movement based on scroll
    meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
  };

  // Render different shapes based on the shape prop
  if (shape === "box") {
    return (
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale} onUpdate={animate}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </Box>
    );
  } else if (shape === "torus") {
    return (
      <Torus ref={meshRef} args={[1, 0.4, 16, 32]} position={position} scale={scale} onUpdate={animate}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Torus>
    );
  } else {
    // Default to sphere
    return (
      <Sphere ref={meshRef} args={[1, 16, 16]} position={position} scale={scale} onUpdate={animate}>
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </Sphere>
    );
  }
};

// Camera controller that responds to mouse movement
const CameraController = () => {
  const { camera } = useState({ camera: null });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
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
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          style={{ 
            background: 'transparent'
          }}
          camera={{ position: [0, 0, 15], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F2FF49" />
          
          {/* Yellow sphere - top right */}
          <ScrollResponsiveObject 
            position={[5, 3, -5]} 
            color="#F2FF49" 
            speed={0.3} 
            scale={2.5}
            shape="sphere"
          />
          
          {/* Box - bottom left */}
          <ScrollResponsiveObject 
            position={[-6, -4, -3]} 
            color="#F2FF49" 
            speed={0.5} 
            scale={1.5}
            shape="box"
          />
          
          {/* Torus - middle right */}
          <ScrollResponsiveObject 
            position={[7, -1, -2]} 
            color="#F2FF49" 
            speed={0.2} 
            scale={1.8}
            shape="torus"
          />
          
          {/* White sphere - top left */}
          <ScrollResponsiveObject 
            position={[-4, 5, -4]} 
            color="#FFFFFF" 
            speed={0.4} 
            scale={1.2}
            shape="sphere"
          />
          
          {/* Small yellow box - bottom right */}
          <ScrollResponsiveObject 
            position={[3, -6, -3]} 
            color="#F2FF49" 
            speed={0.6} 
            scale={0.8}
            shape="box"
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Scene3D;
