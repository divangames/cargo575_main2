////////////////////////////////////////////////////////
//
// Векторная сцена маршрута: фура, дорога и биомы Китая / России
//
////////////////////////////////////////////////////////

import { useEffect, useId, useRef } from "react";
import { line, polygon, project } from "./vectorGeometry";
import { Box, Truck, TruckDefs } from "./VectorTruck";

function Tree({ variant = 0 }: { variant?: number }) {
  return (
    <g>
      <ellipse cy="4" rx="25" ry="8" fill="#07517a" opacity=".18" />
      <path d="M0 0v-65" stroke="#245773" strokeWidth="5" strokeLinecap="round" />
      {variant % 2 ? (
        <g>
          <path d="M0-117 23-70H15L32-45H22L39-20H-39L-22-45H-32L-15-70H-23Z" fill="#63c4cf" />
          <path d="M0-117 23-70H15L32-45H22L39-20H0Z" fill="#157f9e" />
          <path d="M-20-70H0M-29-45H0" stroke="#b9e9df" strokeOpacity=".4" strokeWidth="2" />
        </g>
      ) : (
        <g>
          <path d="M0-111C-35-111-41-71-32-46-24-21 22-18 32-43 45-72 31-111 0-111Z" fill="#70d1d2" />
          <path d="M0-111C32-112 46-72 32-43 26-27 13-24 0-25Z" fill="#2599b4" />
          <path
            d="M-17-89Q-29-74-25-60"
            stroke="#c4f1e6"
            strokeOpacity=".65"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M0-15V-62m0 22-13-13m13 4 14-14" stroke="#245773" strokeWidth="2" fill="none" />
        </g>
      )}
    </g>
  );
}

function House({ russian, variant }: { russian: boolean; variant: number }) {
  const h = variant % 2 ? 84 : 107;
  return (
    <g transform="translate(-420 -337)">
      <polygon
        points={polygon([
          [-69, -45, 0],
          [65, -45, 0],
          [91, 47, 0],
          [-47, 47, 0],
        ])}
        fill="#07517a"
        opacity=".16"
      />
      <Box x={-56} y={-36} w={113} d={78} h={5} side="#8ccddd" front="#58a9c5" roof="#b2e1ea" />
      <Box
        x={-45}
        y={-27}
        z={5}
        w={90}
        d={58}
        h={h}
        side={russian ? "#eaf2ee" : "#fff3df"}
        front={russian ? "#a9cad7" : "#e1cbb5"}
      />
      {[24, 52, ...(h > 90 ? [80] : [])].map((z) => (
        <g key={z}>
          {[-30, -5, 20].map((x) => (
            <g key={x}>
              <polygon
                points={polygon([
                  [x, 31.5, z],
                  [x + 14, 31.5, z],
                  [x + 14, 31.5, z + 18],
                  [x, 31.5, z + 18],
                ])}
                fill="#29637e"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path d={line([[x + 2, 32, z + 16], [x + 12, 32, z + 16], [x + 2, 32, z + 5]])} fill="#9bdded" opacity=".7" />
              <path d={line([[x + 7, 32, z], [x + 7, 32, z + 18]])} stroke="#dce9e8" strokeWidth="1" />
              <Box x={x - 2} y={31} z={z - 3} w={18} d={3} h={3} side="#ffffff" />
            </g>
          ))}
          {[-16, 9].map((y) => (
            <polygon
              key={y}
              points={polygon([
                [45.5, y, z],
                [45.5, y + 13, z],
                [45.5, y + 13, z + 18],
                [45.5, y, z + 18],
              ])}
              fill="#37718c"
              stroke="#e7f2f0"
              strokeWidth="1.7"
            />
          ))}
        </g>
      ))}
      <polygon
        points={polygon([
          [-6, 32, 5],
          [10, 32, 5],
          [10, 32, 24],
          [-6, 32, 24],
        ])}
        fill="#174d68"
      />
      <Box x={-11} y={32} w={27} d={10} h={5} roof="#e0eced" />
      {russian ? (
        <>
          <polygon
            points={polygon([
              [-45, 31, h + 5],
              [45, 31, h + 5],
              [0, 31, h + 45],
            ])}
            fill="#e4efed"
            stroke="#bdd4d9"
          />
          <polygon
            points={polygon([
              [0, -37, h + 47],
              [0, 39, h + 47],
              [-57, 39, h + 2],
              [-57, -37, h + 2],
            ])}
            fill="#eb624b"
          />
          <polygon
            points={polygon([
              [0, -37, h + 47],
              [57, -37, h + 2],
              [57, 39, h + 2],
              [0, 39, h + 47],
            ])}
            fill="#b43f32"
          />
          {[-20, 0, 20].map((y) => (
            <path key={y} d={line([[0, y, h + 47], [57, y, h + 2]])} stroke="#e98a70" strokeOpacity=".45" strokeWidth="1" />
          ))}
          <Box x={20} y={-19} z={h + 24} w={12} d={13} h={28} side="#e6d8c9" front="#b99584" roof="#fff0dc" />
          <polygon
            points={polygon([
              [-5, 32, h + 17],
              [5, 32, h + 17],
              [5, 32, h + 27],
              [-5, 32, h + 27],
            ])}
            fill="#39758c"
          />
        </>
      ) : (
        <>
          {[0, 1].map((tier) => {
            const w = 60 - tier * 17;
            const d = 42 - tier * 12;
            const z = h + 5 + tier * 30;
            return (
              <g key={tier}>
                {tier === 1 && <Box x={-30} y={-17} z={h + 16} w={60} d={36} h={23} side="#fff0d8" front="#dec5a7" />}
                <polygon
                  points={polygon([
                    [-w, -d, z + 9],
                    [w, -d, z + 9],
                    [w - 7, 0, z + 3],
                    [-w + 7, 0, z + 3],
                  ])}
                  fill="#b9362b"
                />
                <polygon
                  points={polygon([
                    [-w, d, z + 9],
                    [-w + 8, d - 7, z],
                    [w - 8, d - 7, z],
                    [w, d, z + 9],
                    [w - 19, 0, z + 24],
                    [-w + 19, 0, z + 24],
                  ])}
                  fill="#f0694e"
                />
                <polygon
                  points={polygon([
                    [w - 19, 0, z + 24],
                    [w, d, z + 9],
                    [w, -d, z + 9],
                  ])}
                  fill="#bc3f30"
                />
                <path
                  d={line([
                    [-w, d, z + 9],
                    [-w + 8, d - 7, z],
                    [w - 8, d - 7, z],
                    [w, d, z + 9],
                  ])}
                  stroke="#ffbc81"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            );
          })}
          {[-37, 37].map((x) => (
            <g key={x} transform={`translate(${project([x, 36, h]).join(" ")})`}>
              <path d="M0 0v12m0 14v7" stroke="#efd69c" strokeWidth="1.5" />
              <ellipse cy="18" rx="6" ry="8" fill="#f14b34" />
              <path d="M-3 12v12m6-12v12" stroke="#ffbf72" strokeWidth="1" />
            </g>
          ))}
        </>
      )}
    </g>
  );
}

// Стабильный шаг объектов: первый кадр и каждый следующий цикл выглядят одинаково.
const initialObjects = [
  { x: -340, y: -220, variant: 0, scale: 0.72, kind: "house" },
  { x: -125, y: -235, variant: 1, scale: 0.7, kind: "tree" },
  { x: 70, y: -250, variant: 1, scale: 0.83, kind: "house" },
  { x: 285, y: -220, variant: 0, scale: 0.72, kind: "tree" },
  { x: 455, y: -235, variant: 2, scale: 0.8, kind: "house" },
  { x: -225, y: 145, variant: 1, scale: 0.63, kind: "tree" },
  { x: 245, y: 149, variant: 0, scale: 0.65, kind: "tree" },
];
const speed = 52;

export function VectorJourney({ stage, playing }: { stage: number; playing: boolean }) {
  const id = `journey-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const scenery = useRef<(SVGGElement | null)[]>([]);
  const lane = useRef<SVGPathElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = 0;
    const move = (now: number) => {
      const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      elapsed.current += delta;
      initialObjects.forEach((item, i) => {
        const x =
          ((item.x + 670 - elapsed.current * speed * (i < 5 ? 0.8 : 1.12)) % 1340 + 1340) % 1340 - 670;
        scenery.current[i]?.setAttribute(
          "transform",
          `translate(${project([x, item.y, 0]).join(" ")}) scale(${item.scale})`,
        );
      });
      lane.current?.setAttribute("stroke-dashoffset", String(elapsed.current * speed * Math.hypot(0.88, 0.29)));
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const objectsLayer = (front: boolean) =>
    initialObjects.map((item, i) =>
      (i >= 5) === front ? (
        <g
          key={i}
          ref={(el) => {
            scenery.current[i] = el;
          }}
          transform={`translate(${project([item.x, item.y, 0]).join(" ")}) scale(${item.scale})`}
        >
          {item.kind === "tree" ? (
            <Tree variant={item.variant} />
          ) : (
            <>
              <g className={`vector-biome ${stage === 0 ? "is-current" : ""}`}>
                <House variant={item.variant} russian={false} />
              </g>
              <g className={`vector-biome ${stage === 1 ? "is-current" : ""}`}>
                <House variant={item.variant} russian={item.variant % 2 === 1} />
              </g>
              <g className={`vector-biome ${stage === 2 ? "is-current" : ""}`}>
                <House variant={item.variant} russian />
              </g>
            </>
          )}
        </g>
      ) : null,
    );

  return (
    <svg
      className="vector-journey"
      viewBox="0 0 800 540"
      role="img"
      aria-label={`Грузовик CARGO 575 на дороге: ${["Китай, здания с ярусными крышами", "маршрут из Китая в Россию", "Россия, дома с двускатными крышами"][stage]}`}
    >
      <defs>
        <linearGradient id={`${id}-edge`}>
          <stop stopColor="white" stopOpacity="0" />
          <stop offset=".1" stopColor="white" />
          <stop offset=".9" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="800" height="540" fill={`url(#${id}-edge)`} />
        </mask>
        <TruckDefs id={id} />
        <radialGradient id={`${id}-ground`}>
          <stop stopColor="#92d9ee" stopOpacity=".23" />
          <stop offset="1" stopColor="#92d9ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="415" cy="285" rx="385" ry="238" fill={`url(#${id}-ground)`} />
      <g mask={`url(#${id}-mask)`}>
        <g fill="none" stroke="#b6e6f4" strokeWidth="1" opacity=".19">
          <path d="M40 219 113 192 192 198 296 158 414 180 535 145 668 171 760 150" />
          <path d="m78 250 91-17 117 19 126-30 150 27 156-38" />
        </g>
        {objectsLayer(false)}
        <polygon
          points={polygon([
            [-432, -85, -9],
            [368, -85, -9],
            [385, -67, -9],
            [385, 88, -9],
            [-415, 88, -9],
            [-432, 70, -9],
          ])}
          fill="#0878ad"
        />
        <polygon
          points={polygon([
            [-432, -85, 0],
            [368, -85, 0],
            [385, -67, 0],
            [385, 88, 0],
            [-415, 88, 0],
            [-432, 70, 0],
          ])}
          fill="#8ec9d9"
        />
        <polygon
          points={polygon([
            [-432, -75, 1],
            [374, -75, 1],
            [376, 76, 1],
            [-423, 76, 1],
          ])}
          fill="#34647e"
        />
        <polygon
          points={polygon([
            [-432, -67, 2],
            [374, -67, 2],
            [376, 67, 2],
            [-425, 67, 2],
          ])}
          fill="#294f68"
        />
        {[-61, 61].map((y) => (
          <path key={y} d={line([[-432, y, 3], [378, y, 3]])} stroke="#d0e2e9" strokeWidth="1.5" fill="none" />
        ))}
        <path
          ref={lane}
          d={line([[-432, 6, 3], [378, 6, 3]])}
          stroke="#f4f3df"
          strokeWidth="2.6"
          strokeDasharray="26 25"
          fill="none"
        />
        <g opacity=".55" stroke="#e4f5f8" strokeWidth="1.5">
          {[-370, -245, -120, 5, 130, 255, 365].map((x) => (
            <path key={x} d={line([[x, 79, 1], [x + 17, 79, 1]])} />
          ))}
        </g>
        <Truck id={id} />
        {objectsLayer(true)}
      </g>
    </svg>
  );
}
