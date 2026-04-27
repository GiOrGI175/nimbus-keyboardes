import { Keyboard } from '@/components/KeyBoard';
import { Stage, useTexture } from '@react-three/drei';
import { KEYCAP_TEXTURES } from '.';
import * as THREE from 'three';
import { useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplate: () => void;
};

export default function Scene({
  selectedTextureId,
  onAnimationComplate,
}: SceneProps) {
  const keboardRef = useRef<THREE.Group>(null);

  const texturePaths = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePaths);
  const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

  useGSAP(() => {
    if (!keboardRef.current || selectedTextureId === currentTextureId) return;

    const keyboard = keboardRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onAnimationComplate();
      },
    });

    tl.to(keyboard.position, {
      y: 0.3,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        setCurrentTextureId(selectedTextureId);
      },
    });

    tl.to(keyboard.position, {
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1,0.4)',
    });
  }, [selectedTextureId, currentTextureId]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((texturesConfig, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;

      if (texture) {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        materialMap[texturesConfig.id] = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });

    return materialMap;
  }, [textures]);

  const currentKnombColor = KEYCAP_TEXTURES.find(
    (t) => t.id === selectedTextureId,
  )?.knobColor;

  return (
    <Stage environment={'city'} intensity={0.05} shadows='contact'>
      <group ref={keboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTextureId]}
          knobColor={currentKnombColor}
        />
      </group>
    </Stage>
  );
}
