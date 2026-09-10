import { useEffect, useId, useRef } from "react";

type Point = [number, number, number];
const project = ([x, y, z]: Point) => [420 + x * .88 - y * .62, 337 + x * .29 + y * .42 - z];
const polygon = (points: Point[]) => points.map(project).map(p => p.join(",")).join(" ");
const line = (points: Point[]) => points.map((p, i) => `${i ? "L" : "M"}${project(p).join(" ")}`).join(" ");

function Box({ x, y, z = 0, w, d, h, front = "#91bfd6", side = "#e8f4fb", roof = "#ffffff" }: { x: number; y: number; z?: number; w: number; d: number; h: number; front?: string; side?: string; roof?: string }) {
  return <g stroke="#174767" strokeOpacity=".16" strokeWidth=".7" strokeLinejoin="round">
    <polygon points={polygon([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]])} fill={roof}/>
    <polygon points={polygon([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]])} fill={side}/>
    <polygon points={polygon([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]])} fill={front}/>
  </g>;
}

function Tree({ variant = 0 }: { variant?: number }) {
  return <g>
    <ellipse cy="4" rx="25" ry="8" fill="#07517a" opacity=".18"/>
    <path d="M0 0v-65" stroke="#245773" strokeWidth="5" strokeLinecap="round"/>
    {variant % 2 ? <g>
      <path d="M0-117 23-70H15L32-45H22L39-20H-39L-22-45H-32L-15-70H-23Z" fill="#63c4cf"/>
      <path d="M0-117 23-70H15L32-45H22L39-20H0Z" fill="#157f9e"/>
      <path d="M-20-70H0M-29-45H0" stroke="#b9e9df" strokeOpacity=".4" strokeWidth="2"/>
    </g> : <g>
      <path d="M0-111C-35-111-41-71-32-46-24-21 22-18 32-43 45-72 31-111 0-111Z" fill="#70d1d2"/>
      <path d="M0-111C32-112 46-72 32-43 26-27 13-24 0-25Z" fill="#2599b4"/>
      <path d="M-17-89Q-29-74-25-60" stroke="#c4f1e6" strokeOpacity=".65" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M0-15V-62m0 22-13-13m13 4 14-14" stroke="#245773" strokeWidth="2" fill="none"/>
    </g>}
  </g>;
}

function House({ russian, variant }: { russian: boolean; variant: number }) {
  const h = variant % 2 ? 84 : 107;
  return <g transform="translate(-420 -337)">
    <polygon points={polygon([[-69,-45,0],[65,-45,0],[91,47,0],[-47,47,0]])} fill="#07517a" opacity=".16"/>
    <Box x={-56} y={-36} w={113} d={78} h={5} side="#8ccddd" front="#58a9c5" roof="#b2e1ea"/>
    <Box x={-45} y={-27} z={5} w={90} d={58} h={h} side={russian ? "#eaf2ee" : "#fff3df"} front={russian ? "#a9cad7" : "#e1cbb5"}/>
    {[24,52,...(h>90 ? [80] : [])].map(z => <g key={z}>
      {[-30,-5,20].map(x => <g key={x}>
        <polygon points={polygon([[x,31.5,z],[x+14,31.5,z],[x+14,31.5,z+18],[x,31.5,z+18]])} fill="#29637e" stroke="#ffffff" strokeWidth="2"/>
        <path d={line([[x+2,32,z+16],[x+12,32,z+16],[x+2,32,z+5]])} fill="#9bdded" opacity=".7"/>
        <path d={line([[x+7,32,z],[x+7,32,z+18]])} stroke="#dce9e8" strokeWidth="1"/>
        <Box x={x-2} y={31} z={z-3} w={18} d={3} h={3} side="#ffffff"/>
      </g>)}
      {[-16,9].map(y => <polygon key={y} points={polygon([[45.5,y,z],[45.5,y+13,z],[45.5,y+13,z+18],[45.5,y,z+18]])} fill="#37718c" stroke="#e7f2f0" strokeWidth="1.7"/>)}
    </g>)}
    <polygon points={polygon([[-6,32,5],[10,32,5],[10,32,24],[-6,32,24]])} fill="#174d68"/>
    <Box x={-11} y={32} w={27} d={10} h={5} roof="#e0eced"/>
    {russian ? <>
      <polygon points={polygon([[-45,31,h+5],[45,31,h+5],[0,31,h+45]])} fill="#e4efed" stroke="#bdd4d9"/>
      <polygon points={polygon([[0,-37,h+47],[0,39,h+47],[-57,39,h+2],[-57,-37,h+2]])} fill="#eb624b"/>
      <polygon points={polygon([[0,-37,h+47],[57,-37,h+2],[57,39,h+2],[0,39,h+47]])} fill="#b43f32"/>
      {[-20,0,20].map(y=><path key={y} d={line([[0,y,h+47],[57,y,h+2]])} stroke="#e98a70" strokeOpacity=".45" strokeWidth="1"/>)}
      <Box x={20} y={-19} z={h+24} w={12} d={13} h={28} side="#e6d8c9" front="#b99584" roof="#fff0dc"/>
      <polygon points={polygon([[-5,32,h+17],[5,32,h+17],[5,32,h+27],[-5,32,h+27]])} fill="#39758c"/>
    </> : <>
      {[0,1].map(tier => {
        const w=60-tier*17, d=42-tier*12, z=h+5+tier*30;
        return <g key={tier}>
          {tier===1 && <Box x={-30} y={-17} z={h+16} w={60} d={36} h={23} side="#fff0d8" front="#dec5a7"/>}
          <polygon points={polygon([[-w,-d,z+9],[w,-d,z+9],[w-7,0,z+3],[-w+7,0,z+3]])} fill="#b9362b"/>
          <polygon points={polygon([[-w,d,z+9],[-w+8,d-7,z],[w-8,d-7,z],[w,d,z+9],[w-19,0,z+24],[-w+19,0,z+24]])} fill="#f0694e"/>
          <polygon points={polygon([[w-19,0,z+24],[w,d,z+9],[w,-d,z+9]])} fill="#bc3f30"/>
          <path d={line([[-w,d,z+9],[-w+8,d-7,z],[w-8,d-7,z],[w,d,z+9]])} stroke="#ffbc81" strokeWidth="2" fill="none"/>
        </g>;
      })}
      {[-37,37].map(x=><g key={x} transform={`translate(${project([x,36,h]).join(" ")})`}>
        <path d="M0 0v12m0 14v7" stroke="#efd69c" strokeWidth="1.5"/>
        <ellipse cy="18" rx="6" ry="8" fill="#f14b34"/><path d="M-3 12v12m6-12v12" stroke="#ffbf72" strokeWidth="1"/>
      </g>)}
    </>}
  </g>;
}

function Wheel({ x, far = false }: { x: number; far?: boolean }) {
  return <g transform={`translate(${project([x,far ? -36 : 43,24]).join(" ")})`}>
    <g transform="matrix(.88 .29 0 1 0 0)">
      <circle r="25" fill="#102b40"/>
      <circle r="21.5" fill="#243e50" stroke="#567184" strokeWidth="1"/>
      <circle r="15.5" fill="#91a9b8" stroke="#091f30" strokeWidth="2"/>
      <circle r="12" fill="#d9e8ee"/>
      <g className="vector-wheel">
        {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45})`}>
          <path d="M-2.6-11.5h5.2l-1 5h-3.2Z" fill="#3a596c"/>
          <circle cy="-5" r="1" fill="#54768a"/>
        </g>)}
        <path d="M-16-10A19 19 0 0 1-8-17M16 10A19 19 0 0 1 8 17" stroke="#748b99" strokeWidth="1.2" fill="none"/>
      </g>
      <circle r="4.5" fill="#7894a5" stroke="#f3fafb" strokeWidth="1.5"/>
    </g>
  </g>;
}

function Truck({ id }: { id: string }) {
  const axles = [-227,-176,-125,48,137];
  const cabProfile: [number,number][] = [[77,39],[77,135],[93,151],[145,151],[169,124],[179,68],[177,36],[163,36],[159,45],[151,51],[137,54],[123,51],[115,45],[111,35],[77,35]];
  return <g>
    <polygon points={polygon([[-268,-29,1],[181,-29,1],[198,53,1],[-250,53,1]])} fill="#073253" opacity=".22" filter={`url(#${id}-shadow)`}/>
    {axles.map(x=><Wheel key={x} x={x} far/>)}
    <Box x={-258} y={-33} z={28} w={427} d={68} h={13} side="#1a3b52" front="#15334a" roof="#48667b"/>
    <Box x={12} y={-29} z={42} w={61} d={57} h={7} side="#3d5768" roof="#24475e"/>
    <g className="vector-truck-body">
      <Box x={-263} y={-39} z={60} w={292} d={78} h={134} side={`url(#${id}-trailer)`} front="#b8d4e3" roof="#ffffff"/>
      {Array.from({length:32},(_,i)=>{
        const x=-255+i*8.7;
        return <g key={i}><path d={line([[x,39.5,66],[x,39.5,188]])} stroke="#adcbdc" strokeOpacity=".6" strokeWidth="1"/><path d={line([[x+1.8,39.5,66],[x+1.8,39.5,188]])} stroke="#ffffff" strokeWidth="1"/></g>;
      })}
      <path d={line([[-260,40,190],[27,40,190],[27,40,62],[-260,40,62],[-260,40,190]])} stroke="#d2e4ed" strokeWidth="3" fill="none"/>
      <g transform={`matrix(.88 .29 0 1 ${project([-237,40,123]).join(" ")})`}>
        <path d="M-4-31H249V19H-4Z" fill="#f4f9fc"/>
        <text fontFamily="Arial, sans-serif" fontWeight="900" fontSize="32" letterSpacing="-1" fill="#087eBD">CARGO <tspan fill="#f04424">575</tspan></text>
        <text y="18" fontFamily="Arial, sans-serif" fontSize="7.5" letterSpacing="3.1" fill="#4e839f">CHINA → RUSSIA</text>
      </g>
      <path d={line([[-257,40,69],[23,40,69]])} stroke="#ed6b4e" strokeWidth="2"/>
      {[-246,-103,17].map(x=><path key={x} d={line([[x,41,64],[x+8,41,64]])} stroke="#ffbe75" strokeWidth="3"/>)}
      {[-25,4,26].map(y=><path key={y} d={line([[29.5,y,68],[29.5,y,184]])} stroke="#85adc4" strokeWidth="1.3"/>)}
      <Box x={-104} y={30} z={21} w={83} d={12} h={27} side={`url(#${id}-metal)`} front="#668b9f" roof="#c8dce5"/>
      {[-88,-40].map(x=><path key={x} d={line([[x,42.5,23],[x,42.5,47]])} stroke="#426779" strokeWidth="3"/>)}
      <path d={line([[-119,45,16],[-10,45,16]])} stroke="#91afbf" strokeWidth="3"/>
      <polygon points={polygon([[77,-36,135],[93,-36,151],[145,-36,151],[145,36,151],[93,36,151],[77,36,135]])} fill="#f5fafc" stroke="#c5dce8"/>
      <polygon points={polygon([[145,-36,151],[169,-36,124],[179,-36,68],[177,-36,36],[177,36,36],[179,36,68],[169,36,124],[145,36,151]])} fill={`url(#${id}-cab-front)`} stroke="#8cbbd0" strokeWidth=".8"/>
      <polygon points={polygon(cabProfile.map(([x,z])=>[x,36,z]))} fill={`url(#${id}-cab)`} stroke="#aacbdb" strokeWidth=".8"/>
      <polygon points={polygon([[77,36.5,72],[178,36.5,72],[177,36.5,36],[163,36.5,36],[159,36.5,45],[151,36.5,51],[137,36.5,54],[123,36.5,51],[115,36.5,45],[111,36.5,35],[77,36.5,35]])} fill="#ed4b2c"/>
      <polygon points={polygon([[179,-36,68],[179,36,68],[177,36,36],[177,-36,36]])} fill="#c53221"/>
      <polygon points={polygon([[104,37,135],[143,37,135],[160,37,116],[162,37,92],[104,37,92]])} fill="#153e57" stroke="#ffffff" strokeWidth="2.5"/>
      <polygon points={polygon([[109,37.5,131],[141,37.5,131],[155,37.5,114],[109,37.5,101]])} fill={`url(#${id}-glass)`}/>
      <path d={line([[145,38,130],[149,38,95]])} stroke="#749caf" strokeWidth="2"/>
      <polygon points={polygon([[157,-30,135],[157,30,135],[173,30,88],[173,-30,88]])} fill="#153c55" stroke="#e4f2f7" strokeWidth="2"/>
      <polygon points={polygon([[159,-27,131],[159,26,131],[172,26,94],[169,-9,102]])} fill={`url(#${id}-glass)`}/>
      <path d={line([[172,-22,93],[170,-6,99],[172,4,93],[170,22,99]])} stroke="#102f43" strokeWidth="1.5" fill="none"/>
      <path d={line([[98,37,137],[98,37,61],[109,37,58]])} stroke="#7da9be" strokeWidth="1" fill="none"/>
      <path d={line([[106,38,83],[116,38,83]])} stroke="#3a657b" strokeWidth="2.5" strokeLinecap="round"/>
      <path d={line([[88,38,119],[84,48,115],[84,48,92]])} stroke="#19394e" strokeWidth="2.5" fill="none"/>
      <Box x={79} y={46} z={92} w={9} d={6} h={18} side="#193e55" roof="#4d738a" front="#31586f"/>
      <path d={line([[163,-36,126],[172,-45,118],[174,-45,97]])} stroke="#19394e" strokeWidth="2.5" fill="none"/>
      <Box x={170} y={-48} z={98} w={7} d={5} h={17} side="#193e55"/>
      <polygon points={polygon([[179.5,-20,66],[179.5,20,66],[178,20,44],[178,-20,44]])} fill="#153548"/>
      {[49,54,59,64].map(z=><path key={z} d={line([[180,-18,z],[180,18,z]])} stroke="#6b8b9d" strokeWidth="1.2"/>)}
      <path d={line([[176,-2,79],[176,3,79]])} stroke="#eaf6fc" strokeWidth="2.5"/>
      {[-32,23].map(y=><g key={y}>
        <polygon points={polygon([[179,y,48],[179,y+9,48],[180,y+9,60],[180,y,60]])} fill="#eafaff" stroke="#8ab8ce" strokeWidth="1"/>
        <path d={line([[180.5,y,46],[180.5,y+9,46]])} stroke="#ffc274" strokeWidth="2"/>
      </g>)}
      <Box x={176} y={-37} z={30} w={5} d={75} h={9} side="#193e56" front="#244b63" roof="#6c899b"/>
      <path d={line([[181,-31,33],[181,31,33]])} stroke="#b1cbd9" strokeWidth="2"/>
      <polygon points={polygon([[182,-9,31],[182,8,31],[182,8,37],[182,-9,37]])} fill="#ebf3f4"/>
      <path d={line([[82,40,40],[104,40,40]])} stroke="#a8c4d3" strokeWidth="4"/>
      <path d={line([[82,42,31],[104,42,31]])} stroke="#bfd8e4" strokeWidth="3"/>
      <path d={line([[99,36,146],[140,36,146]])} stroke="#ffffff" strokeWidth="2"/>
    </g>
    <path d={line([[-254,44,48],[-254,44,56],[-98,44,56],[-98,44,48]])} stroke="#7995a7" strokeWidth="4" fill="none"/>
    {[48,137].map(x=><g key={`arch-${x}`} transform={`translate(${project([x,43,24]).join(" ")}) matrix(.88 .29 0 1 0 0)`}>
      <path d="M-28 1V-9Q-24-29 0-29T28-9V1" fill="none" stroke={x===137 ? "#dce9ef" : "#7995a7"} strokeWidth="4"/>
    </g>)}
    {axles.map(x=><Wheel key={x} x={x}/>)}
    <path d={line([[-255,43,8],[-255,43,27]])} stroke="#193b51" strokeWidth="5"/>
  </g>;
}

// Stable spacing makes the first frame and every subsequent loop equally composed.
const initialObjects = [
  {x:-340,y:-220,variant:0,scale:.72,kind:"house"},
  {x:-125,y:-235,variant:1,scale:.7,kind:"tree"},
  {x:70,y:-250,variant:1,scale:.83,kind:"house"},
  {x:285,y:-220,variant:0,scale:.72,kind:"tree"},
  {x:455,y:-235,variant:2,scale:.8,kind:"house"},
  {x:-225,y:145,variant:1,scale:.63,kind:"tree"},
  {x:245,y:149,variant:0,scale:.65,kind:"tree"},
];
const speed = 52;

export function VectorJourney({stage, playing}:{stage:number; playing:boolean}) {
  const id = `journey-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const scenery = useRef<(SVGGElement|null)[]>([]);
  const lane = useRef<SVGPathElement>(null);
  const elapsed = useRef(0);
  useEffect(()=>{
    if (!playing) return;
    let frame = 0;
    let previous = 0;
    const move = (now:number) => {
      const delta = previous ? Math.min((now-previous)/1000,.05) : 0;
      previous = now;
      elapsed.current += delta;
      initialObjects.forEach((item,i)=>{
        const x = ((item.x + 670 - elapsed.current * speed * (i<5 ? .8 : 1.12)) % 1340 + 1340) % 1340 - 670;
        scenery.current[i]?.setAttribute("transform",`translate(${project([x,item.y,0]).join(" ")}) scale(${item.scale})`);
      });
      lane.current?.setAttribute("stroke-dashoffset",String(elapsed.current*speed*Math.hypot(.88,.29)));
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return ()=>cancelAnimationFrame(frame);
  },[playing]);
  const objectsLayer = (front:boolean) => initialObjects.map((item,i)=> (i>=5)===front ? <g key={i} ref={el=>{scenery.current[i]=el;}} transform={`translate(${project([item.x,item.y,0]).join(" ")}) scale(${item.scale})`}>
    {item.kind==="tree" ? <Tree variant={item.variant}/> : <>
      <g className={`vector-biome ${stage===0?'is-current':''}`}><House variant={item.variant} russian={false}/></g>
      <g className={`vector-biome ${stage===1?'is-current':''}`}><House variant={item.variant} russian={item.variant%2===1}/></g>
      <g className={`vector-biome ${stage===2?'is-current':''}`}><House variant={item.variant} russian/></g>
    </>}
  </g> : null);
  return <svg className="vector-journey" viewBox="0 0 800 540" role="img" aria-label={`Грузовик CARGO 575 на дороге: ${['Китай, здания с ярусными крышами','маршрут из Китая в Россию','Россия, дома с двускатными крышами'][stage]}`}>
    <defs>
      <linearGradient id={`${id}-edge`}><stop stopColor="white" stopOpacity="0"/><stop offset=".1" stopColor="white"/><stop offset=".9" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
      <mask id={`${id}-mask`}><rect width="800" height="540" fill={`url(#${id}-edge)`}/></mask>
      <linearGradient id={`${id}-trailer`} x2="0" y2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#dfedf5"/></linearGradient>
      <linearGradient id={`${id}-cab`} x2=".8" y2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#dceaf2"/></linearGradient>
      <linearGradient id={`${id}-cab-front`} x2="1" y2="1"><stop stopColor="#deedf4"/><stop offset="1" stopColor="#96bed3"/></linearGradient>
      <linearGradient id={`${id}-glass`} x2=".8" y2="1"><stop stopColor="#a9e7f3"/><stop offset=".45" stopColor="#5cabc7"/><stop offset="1" stopColor="#285d7c"/></linearGradient>
      <linearGradient id={`${id}-metal`} x2="0" y2="1"><stop stopColor="#dcecf3"/><stop offset=".48" stopColor="#9cbbc9"/><stop offset=".52" stopColor="#799cad"/><stop offset="1" stopColor="#b9d2dd"/></linearGradient>
      <radialGradient id={`${id}-ground`}><stop stopColor="#92d9ee" stopOpacity=".23"/><stop offset="1" stopColor="#92d9ee" stopOpacity="0"/></radialGradient>
      <filter id={`${id}-shadow`} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <ellipse cx="415" cy="285" rx="385" ry="238" fill={`url(#${id}-ground)`}/>
    <g mask={`url(#${id}-mask)`}>
      <g fill="none" stroke="#b6e6f4" strokeWidth="1" opacity=".19">
        <path d="M40 219 113 192 192 198 296 158 414 180 535 145 668 171 760 150"/>
        <path d="m78 250 91-17 117 19 126-30 150 27 156-38"/>
      </g>
      {objectsLayer(false)}
      <polygon points={polygon([[-432,-85,-9],[368,-85,-9],[385,-67,-9],[385,88,-9],[-415,88,-9],[-432,70,-9]])} fill="#0878ad"/>
      <polygon points={polygon([[-432,-85,0],[368,-85,0],[385,-67,0],[385,88,0],[-415,88,0],[-432,70,0]])} fill="#8ec9d9"/>
      <polygon points={polygon([[-432,-75,1],[374,-75,1],[376,76,1],[-423,76,1]])} fill="#34647e"/>
      <polygon points={polygon([[-432,-67,2],[374,-67,2],[376,67,2],[-425,67,2]])} fill="#294f68"/>
      {[-61,61].map(y=><path key={y} d={line([[-432,y,3],[378,y,3]])} stroke="#d0e2e9" strokeWidth="1.5" fill="none"/>)}
      <path ref={lane} d={line([[-432,6,3],[378,6,3]])} stroke="#f4f3df" strokeWidth="2.6" strokeDasharray="26 25" fill="none"/>
      <g opacity=".55" stroke="#e4f5f8" strokeWidth="1.5">{[-370,-245,-120,5,130,255,365].map(x=><path key={x} d={line([[x,79,1],[x+17,79,1]])}/>)}</g>
      <Truck id={id}/>
      {objectsLayer(true)}
    </g>
  </svg>;
}
