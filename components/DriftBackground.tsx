"use client";

import { useEffect, useRef } from "react";

const BG = 0x24222d;
const WARM = 0xf0b48a;
const LAV = 0xbdb2f2;
const CREAM = 0xf1e4d6;

function glowTexture(THREE: typeof import("three"), hard: boolean) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  if (hard) {
    gr.addColorStop(0, "rgba(255,255,255,1)");
    gr.addColorStop(0.45, "rgba(255,255,255,.85)");
    gr.addColorStop(0.6, "rgba(255,255,255,0)");
  } else {
    gr.addColorStop(0, "rgba(255,255,255,.9)");
    gr.addColorStop(0.35, "rgba(255,255,255,.35)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
  }
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function DriftBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let teardown = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" });
      } catch {
        canvas.hidden = true;
        return;
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 700;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(BG, 1);

      const dotTex = glowTexture(THREE, true);
      const softTex = glowTexture(THREE, false);
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(BG, 16, 62);
      const cam = new THREE.PerspectiveCamera(55, 1, 0.1, 200);

      const layers: import("three").Points[] = [];
      const phases: number[] = [];
      const cloud = (
        n: number,
        size: number,
        color: number,
        opacity: number,
        tex: import("three").Texture,
        zNear: number,
        zFar: number,
        additive: boolean,
      ) => {
        const pts: import("three").Vector3[] = [];
        for (let i = 0; i < n; i++) {
          pts.push(
            new THREE.Vector3(
              (Math.random() - 0.5) * 70,
              16 - Math.random() * 80,
              -zNear - Math.random() * (zFar - zNear),
            ),
          );
        }
        const obj = new THREE.Points(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.PointsMaterial({
            size,
            map: tex,
            color,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
          }),
        );
        scene.add(obj);
        layers.push(obj);
        phases.push(Math.random() * Math.PI * 2);
        return pts;
      };

      cloud(small ? 260 : 520, 0.09, 0xd8c8ba, 0.38, dotTex, 4, 55, false);
      const starPts = cloud(small ? 90 : 170, 0.2, CREAM, 0.6, dotTex, 6, 40, false);
      cloud(small ? 10 : 18, 6, WARM, 0.07, softTex, 14, 45, true);
      cloud(small ? 8 : 14, 7, LAV, 0.06, softTex, 18, 50, true);

      const seg: import("three").Vector3[] = [];
      for (let i = 0; i < starPts.length; i++) {
        let best = -1;
        let bd = Infinity;
        for (let j = 0; j < starPts.length; j++) {
          if (i === j) continue;
          const d = starPts[i].distanceToSquared(starPts[j]);
          if (d < bd) {
            bd = d;
            best = j;
          }
        }
        if (best > i && bd < 36) seg.push(starPts[i], starPts[best]);
      }
      const lineMat = new THREE.LineBasicMaterial({ color: CREAM, transparent: true, opacity: 0.05, depthWrite: false });
      const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), lineMat);
      layers[1].add(lines);

      const pointer = { tx: 0, ty: 0, x: 0, y: 0 };
      const progress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      };
      let sp = progress();

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
      };
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      };

      const frame = (now: number) => {
        const t = reduce ? 12 : now / 1000;
        const p = progress();
        sp = reduce ? p : sp + (p - sp) * 0.06;
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;
        layers.forEach((l, k) => {
          l.position.x = Math.sin(t * 0.04 + phases[k]) * (1.2 + k * 0.4);
          l.position.y = Math.sin(t * 0.05 + phases[k] * 2) * 0.6;
        });
        lineMat.opacity = 0.04 + sp * 0.07;
        const y = -sp * 26;
        cam.position.set(pointer.x * 1.4, y - pointer.y * 0.8, 12);
        cam.lookAt(pointer.x * 0.4, y, -20);
        renderer.render(scene, cam);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointer, { passive: true });

      let raf = 0;
      const redraw = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      };
      if (reduce) {
        frame(0);
        window.addEventListener("scroll", redraw, { passive: true });
        window.addEventListener("resize", redraw);
      } else {
        const loop = (now: number) => {
          frame(now);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      }

      teardown = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", redraw);
        window.removeEventListener("resize", redraw);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose();
          const mat = m.material as import("three").Material | undefined;
          mat?.dispose();
        });
        dotTex.dispose();
        softTex.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return <canvas id="sky" ref={canvasRef} aria-hidden="true" />;
}
