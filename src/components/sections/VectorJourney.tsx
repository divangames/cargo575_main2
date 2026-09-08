import { useEffect, useRef } from "react";

type Point = [number, number, number];
const project = ([x, y, z]: Point) => [400 + x * .88 - y * .62, 340 + x * .29 + y * .42 - z];
const polygon = (points: Point[]) => points.map(project).map(p => p.join(",")).join(" ");

function Box({ x, y, z = 0, w, d, h, front = "#d6eaf6", side = "#ffffff", roof = "#f5faff" }: { x: number; y: number; z?: number; w: number; d: number; h: number; front?: string; side?: string; roof?: string }) {
  return <g stroke="#0a3d63" strokeOpacity=".12" strokeWidth=".6" strokeLinejoin="round">
    <polygon points={polygon([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]])} fill={roof}/>
    <polygon points={polygon([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]])} fill={side}/>
    <polygon points={polygon([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]])} fill={front}/>
  </g>;
}

function Tree({ variant = 0 }: { variant?: number }) {
  return <g><ellipse cy="3" rx="24" ry="8" fill="#0066a2" opacity=".15"/><path d="M0 0v-52" stroke="#0a3d63" strokeWidth="5"/>{variant % 2 ? <g><path d="M0-112 28-49H15L34-27H-34L-15-49H-28Z" fill="#0c6eb1"/><path d="M0-112 28-49H15L34-27H0Z" fill="#0a3d63" opacity=".25"/></g> : <g><ellipse cy="-65" rx="30" ry="43" fill="#6db7ff"/><path d="M0-108C42-106 44-27 0-22Z" fill="#0c6eb1"/><path d="m0-30-12-22m12 9 12-18" stroke="#0066a2" strokeWidth="2" fill="none"/></g>}</g>;
}

function House({ russian, variant }: { russian: boolean; variant: number }) {
  const h = variant % 3 === 0 ? 110 : 76;
  return <g transform="translate(-400 -340)">
    <polygon points={polygon([[-48,-30,0],[60,-30,0],[60,46,0],[-48,46,0]])} fill="#0066a2" opacity=".13"/>
    <Box x={-40} y={-24} w={80} d={48} h={h} side={russian ? "#d6eaf6" : "#e8f4fb"} front="#8fc6e8"/>
    {russian ? <>
      <polygon points={polygon([[-48,29,h],[48,29,h],[0,0,h+36]])} fill="#ff3001"/>
      <polygon points={polygon([[0,0,h+36],[48,29,h],[48,-29,h],[0,-50,h+36]])} fill="#c92c13"/>
      <Box x={-25} y={-8} z={h+14} w={10} d={10} h={24} side="#e8f4fb"/>
    </> : <>
      {[h,h+24].map((z, index) => <g key={z}>
        {index === 1 && <Box x={-27} y={-17} z={h} w={54} d={34} h={22} side="#d6eaf6"/>}
        <polygon points={polygon([[-52+index*10,34-index*6,z+8],[-38+index*10,27-index*6,z+2],[38-index*10,27-index*6,z+2],[52-index*10,34-index*6,z+8],[30-index*10,0,z+22],[-30+index*10,0,z+22]])} fill="#ff3001"/>
        <polygon points={polygon([[-30+index*10,0,z+22],[30-index*10,0,z+22],[48-index*10,-30+index*6,z+8],[-48+index*10,-30+index*6,z+8]])} fill="#c92c13"/>
      </g>)}
    </>}
    {[-23,4,27].flatMap((x) => [25,51,...(h>90 ? [79] : [])].map(z=><polygon key={`${x}-${z}`} points={polygon([[x-5,24.4,z],[x+5,24.4,z],[x+5,24.4,z+13],[x-5,24.4,z+13]])} fill="#0c6eb1"/>))}
    <polygon points={polygon([[7,24.8,0],[21,24.8,0],[21,24.8,23],[7,24.8,23]])} fill="#0a3d63"/>
    {!russian && [-32,32].map(x=><g key={x}><path d={`M${project([x,29,h-3]).join(' ')}v14`} stroke="#0a3d63" strokeWidth="1"/><ellipse cx={project([x,29,h-3])[0]} cy={project([x,29,h-3])[1]+18} rx="4" ry="6" fill="#ff3001"/></g>)}
  </g>;
}

function Truck() {
  const wheels = [-192,-151,35,113];
  return <g>
    <polygon points={polygon([[-241,-29,0],[158,-29,0],[172,48,0],[-230,48,0]])} fill="#0a3d63" opacity=".17"/>
    {wheels.map(x=><g key={`far${x}`} transform={`translate(${project([x,-29,20]).join(' ')})`}><ellipse rx="14" ry="21" fill="#0a3d63"/></g>)}
    <Box x={-235} y={-27} z={20} w={386} d={54} h={10} front="#0a3d63" side="#0a3d63" roof="#0066a2"/>
    <Box x={-237} y={-34} z={43} w={286} d={68} h={120} side="#f5faff" front="#b9ddf3" roof="#ffffff"/>
    {Array.from({length:24},(_,i)=>{const x=-227+i*11.5;return <polyline key={i} points={polygon([[x,34.2,48],[x,34.2,158]])} fill="none" stroke="#0c6eb1" strokeOpacity=".13" strokeWidth="1.3"/>;})}
    <g transform={`matrix(.88 .29 0 1 ${project([-213,35,99]).join(' ')})`}>
      <rect x="-4" y="-31" width="235" height="43" rx="2" fill="#f5faff"/>
      <text fontFamily="Arial, sans-serif" fontWeight="900" fontSize="30" fill="#0088d8">CARGO <tspan fill="#ff3001">575</tspan></text>
      <text y="21" fontFamily="Arial, sans-serif" fontSize="7.5" letterSpacing="2.2" fill="#0066a2">CHINA — RUSSIA</text>
    </g>
    <Box x={-108} y={29} z={13} w={85} d={7} h={23} side="#8fc6e8" front="#0066a2"/>
    <Box x={60} y={-31} z={31} w={92} d={62} h={102} side="#ffffff" front="#d6eaf6" roof="#ffffff"/>
    <polygon points={polygon([[94,31.5,108],[141,31.5,108],[147,31.5,74],[94,31.5,74]])} fill="#0a3d63"/>
    <polygon points={polygon([[100,32,104],[136,32,104],[139,32,81],[100,32,81]])} fill="#0c6eb1"/>
    <polygon points={polygon([[152.5,-25,107],[152.5,25,107],[152.5,25,76],[152.5,-25,76]])} fill="#0a3d63"/>
    <polygon points={polygon([[153,-22,105],[153,20,105],[153,-5,80],[153,-22,80]])} fill="#6db7ff" opacity=".4"/>
    <Box x={61} y={-32} z={31} w={93} d={64} h={24} side="#ff3001" front="#e72d0a" roof="#ff6643"/>
    <polygon points={polygon([[155,-19,38],[155,19,38],[155,19,60],[155,-19,60]])} fill="#0a3d63"/>
    {[43,49,55].map(z=><polyline key={z} points={polygon([[156,-17,z],[156,17,z]])} stroke="#6db7ff" strokeWidth="1"/>)}
    {[-27,21].map(y=><polygon key={y} points={polygon([[155,y,35],[155,y+7,35],[155,y+7,43],[155,y,43]])} fill="white"/>)}
    <polyline points={polygon([[91,32,112],[87,38,104],[87,38,83]])} stroke="#0a3d63" strokeWidth="3" fill="none"/>
    <polyline points={polygon([[142,-32,112],[150,-39,104],[150,-39,86]])} stroke="#0a3d63" strokeWidth="3" fill="none"/>
    {wheels.map(x=><g key={x} transform={`translate(${project([x,34,20]).join(' ')})`}>
      <ellipse rx="16" ry="22" fill="#0a3d63"/>
      <ellipse rx="9.5" ry="15" fill="#d6eaf6"/>
      <g className="vector-wheel"><path d="M0-12v24m-7-18L7 6M-7 6 7-6" stroke="#0066a2" strokeWidth="2"/><ellipse rx="3" ry="5" fill="#0c6eb1"/></g>
    </g>)}
  </g>;
}

// Seeded spacing keeps a composed first frame; new spacing/variants are chosen at every pass.
const seeded = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
const initialObjects = Array.from({length:7},(_,i)=>({x:i<4 ? -590+i*320 : -520+(i-4)*460, y:i<4 ? -135-seeded(i)*60 : 140+seeded(i)*45, variant:Math.floor(seeded(i+50)*6), scale:.7+seeded(i+90)*.25}));

export function VectorJourney({stage, playing}:{stage:number; playing:boolean}) {
  const scenery = useRef<(SVGGElement|null)[]>([]);
  const lane = useRef<SVGPathElement>(null);
  const truck = useRef<SVGGElement>(null);
  const elapsed = useRef(0);
  const objects = useRef(initialObjects.map(item=>({...item})));
  useEffect(()=>{
    if (!playing) return;
    let frame = 0;
    let previous = 0;
    const move = (now:number) => {
      const delta = previous ? Math.min((now-previous)/1000,.05) : 0;
      previous = now;
      elapsed.current += delta;
      const bend = Math.sin(elapsed.current / 5) * 12;
      truck.current?.setAttribute("transform", `translate(${bend} ${bend * .35}) rotate(${Math.sin(elapsed.current / 5) * .65} 400 340)`);
      objects.current.forEach((item,i)=>{
        item.x -= delta * (i<4 ? 58 : 82);
        if(item.x < -650) { item.x = 690 + Math.random()*90; item.scale=.68+Math.random()*.3; }
        const [x,y]=project([item.x,item.y,0]);
        scenery.current[i]?.setAttribute('transform',`translate(${x} ${y}) scale(${item.scale})`);
      });
      lane.current?.setAttribute('stroke-dashoffset',String(elapsed.current*62));
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return ()=>cancelAnimationFrame(frame);
  },[playing]);
  const objectsLayer = (front:boolean) => initialObjects.map((item,i)=> (i>=4)===front ? <g key={i} ref={el=>{scenery.current[i]=el;}} transform={`translate(${project([item.x,item.y,0]).join(' ')}) scale(${item.scale})`}>
    <g className={`vector-biome ${stage===0?'is-current':''}`}><House variant={item.variant} russian={false}/></g>
    <g className={`vector-biome ${stage===1?'is-current':''}`}><Tree variant={item.variant}/></g>
    <g className={`vector-biome ${stage===2?'is-current':''}`}><House variant={item.variant} russian/></g>
  </g> : null);
  return <svg className="vector-journey" viewBox="0 0 800 540" role="img" aria-label={`Векторная фура на дороге: ${['дома в китайском стиле','деревья вдоль маршрута','дома в российском стиле'][stage]}`}>
    <defs>
      <linearGradient id="journey-edge"><stop stopColor="white" stopOpacity="0"/><stop offset=".055" stopColor="white"/><stop offset=".945" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><mask id="journey-mask"><rect width="800" height="540" fill="url(#journey-edge)"/></mask>
      <clipPath id="journey-window"><rect x="0" y="0" width="800" height="540" rx="20"/></clipPath>
      <linearGradient id="journey-ground" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6db7ff" stopOpacity=".18"/><stop offset="1" stopColor="#6db7ff" stopOpacity=".03"/></linearGradient>
    </defs>
    <g clipPath="url(#journey-window)" mask="url(#journey-mask)">
      <ellipse cx="419" cy="285" rx="340" ry="205" fill="url(#journey-ground)"/>
      <g className="vector-distance" fill="none" stroke="#e8f4fb" strokeWidth="1" opacity=".14"><path d="M0 206 95 183 188 196 269 155 399 180 535 143 677 168 800 128"/><path d="M0 226 159 212 257 230 420 201 600 219 800 181"/></g>
      {objectsLayer(false)}
      <path d="M-180 143C85 217 90 231 400 340S776 456 990 490" stroke="#6db7ff" strokeOpacity=".38" strokeWidth="102" fill="none"/>
      <path d="M-180 143C85 217 90 231 400 340S776 456 990 490" stroke="#0a3d63" strokeWidth="90" fill="none"/>
      <path d="M-180 143C85 217 90 231 400 340S776 456 990 490" stroke="#0c6eb1" strokeWidth="84" fill="none"/>
      <path ref={lane} d="M-180 165C85 239 90 253 400 362S776 478 990 512" stroke="#e8f4fb" strokeOpacity=".8" strokeWidth="2" strokeDasharray="25 28" fill="none"/>
      <g ref={truck} className="vector-truck"><Truck/></g>
      {objectsLayer(true)}
    </g>
  </svg>;
}


