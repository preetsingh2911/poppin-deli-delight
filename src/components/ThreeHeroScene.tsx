import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import lumaCupSrc from "@/assets/poppin_highres/luma_cup.jpg";
import lumaBeanSrc from "@/assets/poppin_highres/luma_bean.jpg";

gsap.registerPlugin(ScrollTrigger);

// Custom Bean Component
function FloatingBean({ 
  textures, 
  position, 
  scale, 
  scrollSpeed,
  initialRotation,
  isCup = false
}: { 
  textures: THREE.Texture[], 
  position: [number, number, number], 
  scale: number,
  scrollSpeed: number,
  initialRotation: [number, number, number],
  isCup?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Idle floating offsets
  const [randomOffset] = useState(() => Math.random() * Math.PI * 2);
  
  // Use GSAP to handle scroll parallax and rotation
  useGSAP(() => {
    if (!meshRef.current) return;
    
    // We bind the scroll animation to the document body
    gsap.to(meshRef.current.position, {
      y: position[1] + scrollSpeed, // Parallax destination
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "1000px top", // Approx hero section height
        scrub: 1, // Smooth scrubbing
      }
    });

    if (!isCup) {
      // Rotate X and Y to reveal different "angles" (simulated 3D depth)
      gsap.to(meshRef.current.rotation, {
        x: initialRotation[0] + Math.PI,
        y: initialRotation[1] - Math.PI,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "1000px top",
          scrub: 1.5,
        }
      });
    }
  }, { dependencies: [] });

  // Continuous idle animation
  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle sine-wave floating motion
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + randomOffset) * 0.002;
    // Subtle rotation
    if (!isCup) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={initialRotation}>
      {/* 
        Using planeGeometry for all 2D textures so they don't look warped like a bubble.
      */}
      {isCup ? (
        <planeGeometry args={[10, 10]} />
      ) : (
        <planeGeometry args={[3, 3]} />
      )}
      
      <meshStandardMaterial 
        ref={materialRef}
        map={textures[0]} 
        transparent={true}
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.1}
        customProgramCacheKey={() => 'radialKeyerV2'} // Forces the shader to recompile!
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <map_fragment>',
            `
            #include <map_fragment>
            #ifdef USE_MAP
              vec4 rawTexColor = texture2D( map, vMapUv );
              float dist = distance(vMapUv, vec2(0.5, 0.5));
              // Ultra-strict threshold: 0.0 at center, up to 0.05 at edges.
              // This guarantees dark shadows in the center are completely solid!
              if (length(rawTexColor.rgb) < (dist * 0.05)) {
                discard;
              }
            #endif
            `
          );
        }}
      />
    </mesh>
  );
}

// Main Scene Component
function Scene() {
  const { viewport } = useThree();
  
  // Load the new textures
  const cupTex = useTexture(lumaCupSrc);
  const beanTex = useTexture(lumaBeanSrc);

  // Fix texture orientation and remove watermark
  [cupTex, beanTex].forEach(tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    // Crop the bottom 15% to dynamically remove the "Luma AI" watermark without altering the file
    tex.repeat.set(1, 0.85);
    tex.offset.set(0, 0.15);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      {/* Center Cup */}
      <FloatingBean 
        isCup={true}
        textures={[cupTex]} 
        position={[0, -viewport.height * 0.05, 0]} 
        scale={viewport.width > 10 ? 0.8 : viewport.width * 0.12} 
        scrollSpeed={-2} // Moves down
        initialRotation={[0, 0, 0]}
      />

      {/* Bean 1 */}
      <FloatingBean 
        textures={[beanTex]} 
        position={[-viewport.width * 0.3, viewport.height * 0.2, 1]} 
        scale={viewport.width > 10 ? 0.7 : viewport.width * 0.08} 
        scrollSpeed={3} // Moves up fast
        initialRotation={[0.2, -0.4, 0.1]}
      />

      {/* Bean 2 */}
      <FloatingBean 
        textures={[beanTex]} 
        position={[viewport.width * 0.3, -viewport.height * 0.1, -1]} 
        scale={viewport.width > 10 ? 0.9 : viewport.width * 0.1} 
        scrollSpeed={1.5} // Moves up slow
        initialRotation={[-0.3, 0.5, -0.2]}
      />

      {/* Bean 3 */}
      <FloatingBean 
        textures={[beanTex]} 
        position={[-viewport.width * 0.2, -viewport.height * 0.3, -2]} 
        scale={viewport.width > 10 ? 0.5 : viewport.width * 0.06} 
        scrollSpeed={4} // Moves up very fast
        initialRotation={[0.5, -0.2, 0.4]}
      />
    </>
  );
}

// Wrapper to be used in React
export function ThreeHeroScene() {
  return (
    <section className="relative h-[92vh] min-h-[700px] overflow-hidden bg-cream flex items-center justify-center">
      {/* 3D WebGL Canvas Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
        >
          <React.Suspense fallback={null}>
            <Scene />
          </React.Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <motion.div className="relative h-full w-full flex items-end pb-16 sm:pb-24 pointer-events-none z-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-terracotta text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
          >
            Arera Colony · Bhopal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] max-w-4xl mix-blend-multiply"
          >
            Invest in <span className="text-terracotta italic">culture</span><br />&amp; coffee.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-foreground/80 text-lg max-w-xl pointer-events-auto mix-blend-multiply"
          >
            A world-class cafe experience for Tier II India — freshly brewed coffee, soul-satisfying food, and a vibrant community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-3 pointer-events-auto"
          >
            <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full bg-terracotta text-primary-foreground px-6 py-3.5 font-medium hover:opacity-90 transition-all hover:scale-105">
              See the menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-foreground/30 text-foreground px-6 py-3.5 font-medium hover:bg-foreground/5 transition-colors">
              Visit us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
