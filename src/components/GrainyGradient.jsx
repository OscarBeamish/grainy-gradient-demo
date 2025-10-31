import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GrainyGradient({ config }) {
  const meshRef = useRef()
  const materialRef = useRef()

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uTime;
    uniform float uGrainIntensity;
    uniform float uGrainSize;
    uniform float uNoiseScale;

    varying vec2 vUv;

    // Simplex 3D Noise
    vec4 permute(vec4 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      // Create animated gradient using UV coordinates
      vec2 uv = vUv;

      // Animated noise for gradient flow
      float noise1 = snoise(vec3(uv * uNoiseScale, uTime * 0.1));
      float noise2 = snoise(vec3(uv * uNoiseScale * 0.5, uTime * 0.15 + 100.0));

      // Create flowing gradient mix
      float gradientMix1 = uv.x + noise1 * 0.3;
      float gradientMix2 = uv.y + noise2 * 0.3;

      // Mix three colors
      vec3 color = mix(uColor1, uColor2, gradientMix1);
      color = mix(color, uColor3, gradientMix2 * 0.7);

      // Add grain texture
      float grain = snoise(vec3(uv * 200.0 / uGrainSize, uTime * 0.5)) * uGrainIntensity;
      color += grain * 0.1;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  const uniforms = useMemo(() => ({
    uColor1: { value: new THREE.Color(config.color1) },
    uColor2: { value: new THREE.Color(config.color2) },
    uColor3: { value: new THREE.Color(config.color3) },
    uTime: { value: 0 },
    uGrainIntensity: { value: config.grainIntensity },
    uGrainSize: { value: config.grainSize },
    uNoiseScale: { value: config.noiseScale },
  }), [])

  // Update uniforms when config changes
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(config.color1)
      materialRef.current.uniforms.uColor2.value.set(config.color2)
      materialRef.current.uniforms.uColor3.value.set(config.color3)
      materialRef.current.uniforms.uGrainIntensity.value = config.grainIntensity
      materialRef.current.uniforms.uGrainSize.value = config.grainSize
      materialRef.current.uniforms.uNoiseScale.value = config.noiseScale
      materialRef.current.uniforms.uTime.value += config.animationSpeed * 0.016
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 6, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
