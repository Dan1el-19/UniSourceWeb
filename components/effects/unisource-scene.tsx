"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

function Sculpture({
  reduced,
  detailed,
}: {
  reduced: boolean
  detailed: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    if (!reduced) {
      const scroll = window.scrollY / Math.max(window.innerHeight, 1)
      const targetY = t * 0.06 + pointer.current.x * 0.25 + scroll * 0.5
      const targetX = pointer.current.y * 0.15 + Math.sin(t * 0.12) * 0.08
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 1.2, delta)
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 1.2, delta)
      g.position.y = Math.sin(t * 0.22) * 0.1
    }
  })

  const segments = detailed ? 220 : 110

  return (
    <group ref={group} rotation={[0.35, 0, -0.25]}>
      <Float
        speed={reduced ? 0 : 0.55}
        rotationIntensity={0.12}
        floatIntensity={0.35}
      >
        <mesh>
          <torusKnotGeometry args={[1.05, 0.34, segments, detailed ? 32 : 20]} />
          <meshStandardMaterial
            color="#cfceca"
            roughness={0.42}
            metalness={0.28}
          />
        </mesh>
      </Float>
      {/* thin orbital ring, part of the composition, not a product */}
      <mesh rotation={[Math.PI / 2.35, 0.35, 0]}>
        <torusGeometry args={[2.05, 0.005, 8, 160]} />
        <meshBasicMaterial color="#83827e" />
      </mesh>
    </group>
  )
}

export default function UniSourceScene() {
  const reduced = useReducedMotion()
  const [detailed, setDetailed] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const update = () => setDetailed(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <Canvas
      dpr={detailed ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 7.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} />
      <directionalLight position={[-6, -3, -5]} intensity={0.3} />
      <Sculpture reduced={reduced} detailed={detailed} />
    </Canvas>
  )
}
