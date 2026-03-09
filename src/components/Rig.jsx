import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"

export default function Rig({ pointerStrength = 2, baseCameraY = 1.5, ...props }) {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.3

    easing.damp3(
      state.camera.position,
      [-state.pointer.x * pointerStrength, state.pointer.y + baseCameraY, state.camera.position.z],
      0.3,
      delta
    )

    state.camera.lookAt(0, 0, 0)
  })

  return <group ref={ref} {...props} />
}
