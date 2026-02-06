import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Mouse position state
const mousePosition = { x: 0, y: 0 }

function StarField(props: any) {
  const ref = useRef<THREE.Points>(null!)

  const sphere = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const r = 4 + Math.random() * 2
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const targetRotationX = -mousePosition.y * 0.3
      const targetRotationY = mousePosition.x * 0.3
      
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.05
      ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.05
      
      ref.current.rotation.x -= 0.0005
      ref.current.rotation.y -= 0.001
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

function FloatingParticles() {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.elapsedTime
      mesh.current.rotation.x = t * 0.1 + mousePosition.y * 0.5
      mesh.current.rotation.y = t * 0.15 + mousePosition.x * 0.5
      
      const targetX = mousePosition.x * 0.5
      const targetY = mousePosition.y * 0.5
      
      mesh.current.position.x += (targetX - mesh.current.position.x) * 0.05
      mesh.current.position.y += (targetY - mesh.current.position.y) * 0.05
    }
  })

  return (
    <mesh ref={mesh} scale={2.5}>
      <icosahedronGeometry args={[1, 16]} />
      <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

function GradientOrbs() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      const baseY = Math.sin(t * 0.5) * 0.5
      const baseX = Math.cos(t * 0.3) * 0.3
      
      const targetX = baseX + mousePosition.x * 0.3
      const targetY = baseY + mousePosition.y * 0.3
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05
      
      meshRef.current.rotation.x = t * 0.2
      meshRef.current.rotation.y = t * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[2, -1, -3]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#f472b6" transparent opacity={0.3} />
    </mesh>
  )
}

function NebulaCloud() {
  const mesh1 = useRef<THREE.Mesh>(null!)
  const mesh2 = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    if (mesh1.current) {
      const baseX = -3 + Math.sin(t * 0.3) * 0.5
      const baseY = 2 + Math.cos(t * 0.2) * 0.3
      
      const targetX = baseX - mousePosition.x * 0.5
      const targetY = baseY - mousePosition.y * 0.5
      
      mesh1.current.position.x += (targetX - mesh1.current.position.x) * 0.03
      mesh1.current.position.y += (targetY - mesh1.current.position.y) * 0.03
      mesh1.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.1)
    }
    
    if (mesh2.current) {
      const baseX = 4 + Math.cos(t * 0.4) * 0.5
      const baseY = -2 + Math.sin(t * 0.3) * 0.3
      
      const targetX = baseX + mousePosition.x * 0.5
      const targetY = baseY + mousePosition.y * 0.5
      
      mesh2.current.position.x += (targetX - mesh2.current.position.x) * 0.03
      mesh2.current.position.y += (targetY - mesh2.current.position.y) * 0.03
      mesh2.current.scale.setScalar(1 + Math.cos(t * 0.6) * 0.1)
    }
  })

  return (
    <group>
      <mesh ref={mesh1} position={[-3, 2, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.1} />
      </mesh>
      <mesh ref={mesh2} position={[4, -2, -4]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function WifiIcon() {
  const groupRef = useRef<THREE.Group>(null!)
  const wave1Ref = useRef<THREE.Mesh>(null!)
  const wave2Ref = useRef<THREE.Mesh>(null!)
  const wave3Ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      const baseX = 3 + Math.sin(t * 0.5) * 0.3
      const baseY = 0 + Math.cos(t * 0.7) * 0.2
      
      const targetX = baseX + mousePosition.x * 0.4
      const targetY = baseY - mousePosition.y * 0.4
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
      
      const scale = 1 + Math.sin(t * 2) * 0.05
      groupRef.current.scale.setScalar(scale)
    }
    
    // Animate waves
    if (wave1Ref.current) {
      const t = state.clock.elapsedTime
      const material = wave1Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.6 + Math.sin(t * 3) * 0.2
    }
    if (wave2Ref.current) {
      const t = state.clock.elapsedTime
      const material = wave2Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.4 + Math.sin(t * 3 + 0.5) * 0.2
    }
    if (wave3Ref.current) {
      const t = state.clock.elapsedTime
      const material = wave3Ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.2 + Math.sin(t * 3 + 1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      {/* WiFi waves */}
      <mesh ref={wave1Ref} position={[0, 0.3, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 32, Math.PI]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
      </mesh>
      <mesh ref={wave2Ref} position={[0, 0.2, 0]}>
        <torusGeometry args={[0.5, 0.02, 16, 32, Math.PI]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
      </mesh>
      <mesh ref={wave3Ref} position={[0, 0.1, 0]}>
        <torusGeometry args={[0.7, 0.02, 16, 32, Math.PI]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} />
      </mesh>
      {/* Center dot */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </group>
  )
}

export default function ThreeBackground() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <NebulaCloud />
        <GradientOrbs />
        <FloatingParticles />
        <WifiIcon />
        <StarField />
        <fog attach="fog" args={['#0a0a0a', 1, 10]} />
      </Canvas>
      <div
        className="blurry-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(96, 165, 250, 0) 70%)',
          top: '10%',
          left: '10%',
        }}
      />
      <div
        className="blurry-orb"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 70%)',
          top: '60%',
          right: '10%',
          animationDelay: '2s',
        }}
      />
      <div
        className="blurry-orb"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(244, 114, 182, 0) 70%)',
          bottom: '20%',
          left: '30%',
          animationDelay: '4s',
        }}
      />
    </div>
  )
}
