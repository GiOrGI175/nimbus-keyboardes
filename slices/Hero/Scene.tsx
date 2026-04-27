'use client';

import { Keyboard } from '@/components/KeyBoard';
import { Keycap } from '@/components/Keycap';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Scene() {
  // const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
  //   useControls({
  //     positionX: 0,
  //     positionY: -0.5,
  //     positionZ: 3,
  //     rotationX: Math.PI / 2,
  //     rotationY: 0,
  //     rotationZ: 0,
  //   });

  const KeyboardGroupRef = useRef<THREE.Group>(null);
  const [lightIntensityScaler, setLightIntensityScaler] = useState(0);

  const scaleFactory = window.innerWidth <= 500 ? 0.5 : 1;

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference', () => {
      if (!KeyboardGroupRef.current) return;

      const keyboard = KeyboardGroupRef.current;

      gsap.to(
        { lightIntensityScaler: 0 },
        {
          lightIntensityScaler: 1,
          duration: 3.5,
          delay: 0.5,
          ease: 'power2.inOut',
          onUpdate: function () {
            setLightIntensityScaler(this.targets()[0].lightIntensityScaler);
          },
        },
      );

      const tl = gsap.timeline({
        ease: 'power2.inOut',
      });

      tl.to(keyboard.position, {
        x: 0,
        y: -0.5,
        z: 0.5,
        duration: 2,
      })
        .to(
          keyboard.rotation,
          {
            x: 1.4,
            y: 0,
            z: 0,
            duration: 1.8,
          },
          '<',
        )
        .to(keyboard.position, {
          x: 0.2,
          y: -0.5,
          z: 1.9,
          duration: 2,
          delay: 0.5,
        })
        .to(
          keyboard.rotation,
          {
            x: 1.6,
            y: 0.4,
            z: 0,
            duration: 2,
          },
          '<',
        );
    });
  });

  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      <group scale={scaleFactory}>
        <group
          ref={KeyboardGroupRef}
          // position={[0.2, -0.5, 1.8]}
          // rotation={[1.6, 0.4, 0]}
        >
          <Keyboard scale={9} />
        </group>
        <group>
          <Keycap position={[0, -0.4, 2.6]} texture={0} />
          <Keycap position={[-1.4, 0, 2.3]} texture={1} />
          <Keycap position={[-1.8, 1, 1.5]} texture={2} />
          <Keycap position={[0, 1, 1]} texture={3} />
          <Keycap position={[0.7, 0.9, 1.4]} texture={4} />
          <Keycap position={[1.3, -0.3, 2.3]} texture={5} />
          <Keycap position={[0, 1, 2]} texture={6} />
          <Keycap position={[-0.7, 0.6, 2]} texture={7} />
          <Keycap position={[0.77, 0.1, 2.8]} texture={8} />
          <Keycap position={[2, 0, 1]} texture={7} />
        </group>
      </group>

      <Environment
        files={['/hdr/blue-studio.hdr']}
        environmentIntensity={0.2 * lightIntensityScaler}
      />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30 * lightIntensityScaler}
        castShadow
        shadow-bios={-0.0002}
        shadow-normalBios={0.002}
        shadow-mapSize={1024}
      />
    </group>
  );
}
