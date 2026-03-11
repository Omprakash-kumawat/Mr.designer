import { useEffect, useMemo, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import Rig from "./components/Rig"
import Carousel from "./components/Carousel"
import Banner from "./components/Banner"
import "./util/bentPlaneGeometry"
import Nav from "./components/Nav"
import Services from "./components/Services"
import Scard from "./components/Scard"
import Layout from "./Layout"
import Footer from "./components/Footer"

export default function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")

    const updateMobileState = () => setIsMobile(mediaQuery.matches)

    updateMobileState()
    mediaQuery.addEventListener("change", updateMobileState)

    return () => mediaQuery.removeEventListener("change", updateMobileState)
  }, [])

  const cameraSettings = useMemo(
    () =>
      isMobile
        ? { position: [0, 0.45, 7.2], fov: 24 }
        : { position: [0, 0.35, 8.6], fov: 18 },
    [isMobile]
  )

  return (
    <div className="page">
      <Nav />

      <main>
        <section id="home" className="hero-3d">
          <Canvas camera={cameraSettings} dpr={[1, 1.5]}>
            {/* <color attach="background" args={["#d5e0e7"]} /> */}
            <fog attach="fog" args={["#f6f1e8", 7.2, 11.2]} />

            <Rig
              rotation={[0, 0, 0.15]}
              pointerStrength={isMobile ? 1.2 : 1.8}
              baseCameraY={isMobile ? 1.05 : 1.3}
            >
              <Carousel radius={isMobile ? 1.2 : 1.4} />
            </Rig>
            <Banner position={[0, isMobile ? -0.08 : -0.15, 0]} />

            <Environment preset="sunset" blur={0.35} />
          </Canvas>
        </section>

          <Layout/>

     </main>
     
      <Footer/>
     
    </div>
  )
}
