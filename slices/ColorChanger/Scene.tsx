import { Keyboard } from '@/components/KeyBoard';
import { Stage, useTexture } from '@react-three/drei';
import { KEYCAP_TEXTURES } from '.';
import * as THREE from 'three';
import { useMemo } from 'react';

type SceneProps = {
  selectedTextureId: string;
  onAnimationComplate: () => void;
};

export default function Scene({
  selectedTextureId,
  onAnimationComplate,
}: SceneProps) {
  const texturePaths = KEYCAP_TEXTURES.map((t) => t.path);
  const textures = useTexture(texturePaths);

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

  return (
    <Stage environment={'city'} intensity={0.05} shadows='contact'>
      <group>
        <Keyboard keycapMaterial={materials[selectedTextureId]} />
      </group>
    </Stage>
  );
}
