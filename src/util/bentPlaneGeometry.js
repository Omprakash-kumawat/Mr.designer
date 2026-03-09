import { extend } from "@react-three/fiber"
import { PlaneGeometry } from "three"

class BentPlaneGeometry extends PlaneGeometry {
  constructor(radius, ...args) {
    super(...args)

    const pos = this.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = Math.sin(x * Math.PI) * radius
      pos.setZ(i, z)
    }
  }
}

extend({ BentPlaneGeometry })