import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"

export default function Banner(props) {
  const ref = useRef()
  const texture = useTexture("/work_.png")

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  useFrame((state, delta) => {
    ref.current.material.map.offset.x += delta / 50
  })

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.13, 200, 50, true]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}
