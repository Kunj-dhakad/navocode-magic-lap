'use client';

import Link from 'next/link';
import Starborn from './Starborn';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function MagicExperience({ item }) {
  return (
    <main className={`experience accent-${item.accent}`}>
      <header className="expHeader">
        <Link href="/" className="backBtn">← Lab</Link>
        <div className="expMeta"><span>{item.no}</span><strong>{item.title}</strong></div>
        <span className="liveTag">LIVE</span>
      </header>
      <section className="expStage">
        {renderExperiment(item.slug)}
      </section>
      <div className="expCaption"><span>{item.kicker}</span><small>Move, click, type — this one is interactive.</small></div>
    </main>
  );
}

function renderExperiment(slug) {
  switch (slug) {
    case 'starborn': return <Starborn />;
    case 'runaway-login': return <RunawayLogin />;
    case 'pull-cord-lamp': return <PullCordLamp />;
    case 'magnetic-cta': return <MagneticCTA />;
    case 'hologram-card': return <HologramCard />;
    case 'cursor-portal': return <CursorPortal />;
    case 'neon-vault': return <NeonVault />;
    case 'liquid-toggle': return <LiquidToggle />;
    case 'glitch-terminal': return <GlitchTerminal />;
    case 'gravity-playground': return <GravityPlayground />;
    case 'magic-search': return <MagicSearch />;
    case 'password-monster': return <PasswordMonster />;
    case 'hold-to-launch': return <HoldToLaunch />;
    case 'xray-spotlight': return <XraySpotlight />;
    case 'black-hole-404': return <BlackHole404 />;
    case 'exploding-menu': return <ExplodingMenu />;
    case 'moon-slider': return <MoonSlider />;
    case 'burn-to-reveal': return <BurnToReveal />;
    case 'self-destruct': return <SelfDestruct />;
    case 'captcha-boss': return <CaptchaBoss />;
    case 'confetti-checkbox': return <ConfettiCheckbox />;
    case 'swipe-card-stack': return <SwipeCardStack />;
    case 'jelly-navbar': return <JellyNavbar />;
    case 'notification-rain': return <NotificationRain />;
    case 'teleport-button': return <TeleportButton />;
    case 'text-decoder': return <TextDecoder />;
    case 'unlock-slider': return <UnlockSlider />;
    case 'cursor-snake': return <CursorSnake />;
    case 'peel-sticker': return <PeelSticker />;
    case 'mischief-toggle': return <MischiefToggle />;
    case 'neon-keyboard': return <NeonKeyboard />;
    default: return null;
  }
}

function RunawayLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState('Enter anything + password “navocode”');
  const valid = email.trim().length > 2 && password === 'navocode';

  function dodge() {
    if (valid) return;
    setPos({ x: Math.round((Math.random() - .5) * 210), y: Math.round((Math.random() - .5) * 110) });
    setStatus('Nope 😈 — the button escaped.');
  }

  return <div className="loginScene">
    <div className="orb orbA"/><div className="orb orbB"/>
    <div className="loginCard">
      <div className="faceIcon"><span>⌁</span></div>
      <p className="tinyLabel">SECURE PORTAL</p>
      <h2>Welcome back.</h2>
      <p className="muted">Only the correct password can tame this button.</p>
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@navocode.dev" /></label>
      <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Try: navocode" /></label>
      <div className="runZone">
        <button className={`runBtn ${valid ? 'valid' : ''}`} style={{ transform:`translate(${pos.x}px, ${pos.y}px)` }} onMouseEnter={dodge} onFocus={dodge} onClick={() => valid ? setStatus('ACCESS GRANTED ✓') : dodge()}>{valid ? 'Unlock →' : 'Sign in →'}</button>
      </div>
      <div className={`loginStatus ${valid ? 'ok':''}`}>{status}</div>
    </div>
  </div>
}

function PullCordLamp() {
  const [on, setOn] = useState(false);
  const [pulling, setPulling] = useState(false);
  function toggle(){ setPulling(true); setOn(v=>!v); setTimeout(()=>setPulling(false), 350); }
  return <div className={`lampScene ${on ? 'lampOn':''}`}>
    <div className="lampGlow" />
    <div className="ceilingLamp"><div className="wire"/><div className="shade"/><div className="bulb">●</div></div>
    <button className={`cord ${pulling?'pulled':''}`} onClick={toggle} aria-label="Pull lamp cord"><span className="cordLine"/><span className="cordKnob"/></button>
    <div className="lampText"><span>{on ? 'LIGHT MODE' : 'MIDNIGHT MODE'}</span><h2>{on ? 'Ideas look brighter now.' : 'Pull the cord.'}</h2><p>{on ? 'One tiny interaction changes the mood of the entire interface.' : 'Go on. It is way more satisfying than a normal toggle.'}</p></div>
    <div className="desk"><div className="plant">✦</div><div className="book b1"/><div className="book b2"/></div>
  </div>
}

function MagneticCTA() {
  const ref = useRef(null);
  const [xy, setXy] = useState({x:0,y:0});
  const [clicked,setClicked]=useState(false);
  function move(e){
    const r = ref.current?.getBoundingClientRect(); if(!r) return;
    const dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
    const d=Math.hypot(dx,dy);
    if(d<180) setXy({x:dx*.28,y:dy*.28}); else setXy({x:0,y:0});
  }
  return <div className="magScene" onMouseMove={move} onMouseLeave={()=>setXy({x:0,y:0})}>
    <div className="magGrid"/>
    <div className="orbit orbit1"><i/><i/><i/></div><div className="orbit orbit2"><i/><i/></div>
    <p className="tinyLabel">CURSOR PHYSICS</p><h2>Try to ignore me.</h2><p className="muted">Move your cursor close to the button.</p>
    <button ref={ref} onClick={()=>{setClicked(true);setTimeout(()=>setClicked(false),900)}} className={`magButton ${clicked?'burst':''}`} style={{transform:`translate(${xy.x}px,${xy.y}px)`}}><span>{clicked?'MAGIC ✦':'Launch project ↗'}</span></button>
  </div>
}

function HologramCard() {
  const [tilt,setTilt]=useState({x:0,y:0,gx:50,gy:50});
  function move(e){ const r=e.currentTarget.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width; const py=(e.clientY-r.top)/r.height; setTilt({x:(.5-py)*18,y:(px-.5)*22,gx:px*100,gy:py*100}); }
  return <div className="holoScene">
    <div className="holoWrap" onMouseMove={move} onMouseLeave={()=>setTilt({x:0,y:0,gx:50,gy:50})} style={{'--rx':`${tilt.x}deg`,'--ry':`${tilt.y}deg`,'--gx':`${tilt.gx}%`,'--gy':`${tilt.gy}%`}}>
      <div className="holoCard">
        <div className="holoNoise"/><div className="holoGlare"/>
        <div className="chip">N//</div><div className="signal">))))</div>
        <div className="holoMid"><span>DIGITAL ACCESS</span><strong>NAVO<br/>BLACK</strong></div>
        <div className="holoBottom"><span>•••• 2048</span><span>09/30</span></div>
      </div>
    </div>
    <p className="holoHint">MOVE CURSOR ACROSS THE CARD</p>
  </div>
}

function CursorPortal() {
  const [p,setP]=useState({x:50,y:50}); const [warp,setWarp]=useState(false);
  return <div className={`portalScene ${warp?'warping':''}`} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setP({x:((e.clientX-r.left)/r.width)*100,y:((e.clientY-r.top)/r.height)*100})}} onClick={()=>{setWarp(true);setTimeout(()=>setWarp(false),800)}} style={{'--px':`${p.x}%`,'--py':`${p.y}%`}}>
    <div className="portalStars"/><div className="portalRing ringA"/><div className="portalRing ringB"/><div className="portalCore"/>
    <div className="portalCopy"><p className="tinyLabel">DIMENSION // 05</p><h2>Your cursor is a doorway.</h2><p>Move around. Click anywhere to warp.</p></div>
  </div>
}

function NeonVault(){
  const [pin,setPin]=useState(''); const [state,setState]=useState('idle');
  function tap(n){ if(state==='open') return; const next=(pin+n).slice(0,4); setPin(next); if(next.length===4){ if(next==='2048'){setState('open')} else {setState('error');setTimeout(()=>{setPin('');setState('idle')},650)} } }
  return <div className={`vaultScene vault-${state}`}>
    <div className="vaultPanel"><div className="vaultHalo"/><div className="vaultIcon">{state==='open'?'✓':'◇'}</div><p className="tinyLabel">NEON VAULT</p><h2>{state==='open'?'ACCESS GRANTED':'Enter passcode'}</h2><p className="muted">{state==='open'?'The vault is yours.':'Hint: 2048'}</p>
      <div className="pinDots">{[0,1,2,3].map(i=><i className={pin.length>i?'filled':''} key={i}/>)}</div>
      <div className="keypad">{['1','2','3','4','5','6','7','8','9','⌫','0','↵'].map(k=><button key={k} onClick={()=>k==='⌫'?setPin(p=>p.slice(0,-1)):k==='↵'?null:tap(k)}>{k}</button>)}</div>
    </div>
  </div>
}

function LiquidToggle(){
  const [hot,setHot]=useState(false);
  return <div className={`liquidScene ${hot?'hot':''}`}>
    <div className="liquidBlob blob1"/><div className="liquidBlob blob2"/><div className="liquidBlob blob3"/>
    <div className="liquidContent"><p className="tinyLabel">MOOD ENGINE</p><h2>{hot?'Lava energy.':'Deep focus.'}</h2><p>{hot?'Fast, loud, fearless mode activated.':'Calm interface. Cold colors. Zero noise.'}</p>
      <button className="liquidSwitch" onClick={()=>setHot(v=>!v)}><span/><b>{hot?'HOT':'COOL'}</b></button>
    </div>
  </div>
}

function GlitchTerminal(){
  const [cmd,setCmd]=useState(''); const [lines,setLines]=useState(['NAVOCODE OS v1.0','Type “magic”, “ship” or “reel”.']); const [glitch,setGlitch]=useState(false);
  function run(e){e.preventDefault();const c=cmd.trim().toLowerCase(); if(!c)return; const map={magic:'Injecting delight... ✦ UI MAGIC READY',ship:'Build passed. Deploying impossible ideas →',reel:'Hook: “I made a login button that runs away.”'}; setLines(v=>[...v,`> ${cmd}`,map[c]||`Unknown command: ${cmd}`].slice(-7));setCmd('');setGlitch(true);setTimeout(()=>setGlitch(false),300)}
  return <div className={`terminalScene ${glitch?'termGlitch':''}`}><div className="terminalWindow"><div className="terminalBar"><span/><span/><span/><b>NAVOCODE_TERMINAL</b></div><div className="scanlines"/><div className="terminalLines">{lines.map((l,i)=><p key={i}>{l}</p>)}</div><form onSubmit={run}><span>❯</span><input autoFocus value={cmd} onChange={e=>setCmd(e.target.value)} placeholder="type a command..."/></form></div></div>
}

function GravityPlayground(){
  const base=useMemo(()=>[
    {t:'React',x:18,y:24},{t:'Next.js',x:46,y:18},{t:'Motion',x:72,y:27},{t:'UI',x:28,y:54},{t:'CSS',x:58,y:52},{t:'Ideas',x:80,y:60},{t:'Ship',x:42,y:78},{t:'Magic',x:68,y:80}
  ],[]);
  const [p,setP]=useState({x:-999,y:-999});
  return <div className="gravityScene" onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setP({x:e.clientX-r.left,y:e.clientY-r.top})}} onMouseLeave={()=>setP({x:-999,y:-999})}>
    <div className="gravityTitle"><p className="tinyLabel">POINTER REPULSION</p><h2>UI with personal space.</h2><p>Chase the floating chips.</p></div>
    {base.map((b,i)=><GravityChip key={b.t} b={b} p={p} i={i}/>) }
    <div className="cursorGhost" style={{left:p.x,top:p.y}}/>
  </div>
}

function GravityChip({b,p,i}){
  const ref=useRef(null); const [off,setOff]=useState({x:0,y:0});
  useEffect(()=>{const el=ref.current;if(!el)return;const r=el.parentElement.getBoundingClientRect();const x=r.width*b.x/100,y=r.height*b.y/100;const dx=x-p.x,dy=y-p.y,d=Math.max(1,Math.hypot(dx,dy));if(d<150){const power=(150-d)/150;setOff({x:(dx/d)*95*power,y:(dy/d)*95*power})}else setOff({x:0,y:0})},[p,b]);
  return <div ref={ref} className="gravityChip" style={{left:`${b.x}%`,top:`${b.y}%`,transform:`translate(-50%,-50%) translate(${off.x}px,${off.y}px) rotate(${(i%2?1:-1)*3}deg)`}}>{b.t}<span>✦</span></div>
}

function MagicSearch(){
  const [q,setQ]=useState('');
  const data=['Glassmorphism login','Animated pricing card','3D product hero','Magnetic button','AI dashboard'];
  const filtered=q?data.filter(x=>x.toLowerCase().includes(q.toLowerCase())||q.length>2).slice(0,3):[];
  return <div className={`searchScene ${q?'searching':''}`}>
    <div className="searchAura"/><div className="searchBox"><span className="searchIcon">⌕</span><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search an impossible UI..."/><kbd>⌘ K</kbd></div>
    <div className="searchIntro"><p className="tinyLabel">LIVE IDEA INDEX</p><h2>{q?`Searching “${q}”`:'What should we build?'}</h2><p>{q?'The interface reacts before the results arrive.':'Try typing “login”, “3D”, or anything you want.'}</p></div>
    <div className="searchResults">{filtered.map((x,i)=><div className="resultCard" style={{'--delay':`${i*70}ms`}} key={x}><span>0{i+1}</span><strong>{x}</strong><b>↗</b></div>)}</div>
  </div>
}

function PasswordMonster(){
  const [pass,setPass]=useState('');
  const [eye,setEye]=useState({x:0,y:0});
  const strength=Math.min(4,Math.floor(pass.length/3));
  const labels=['FEED ME A PASSWORD','THAT\'S TINY','GETTING BETTER','OOH... STRONG','OKAY, I RESPECT THAT'];
  function move(e){const r=e.currentTarget.getBoundingClientRect();setEye({x:((e.clientX-r.left)/r.width-.5)*8,y:((e.clientY-r.top)/r.height-.5)*8})}
  return <div className={`monsterScene strength-${strength}`} onMouseMove={move}>
    <div className="monsterGlow"/>
    <div className="monsterFace">
      <div className="horn h1"/><div className="horn h2"/>
      <div className="monsterEyes"><i><b style={{transform:`translate(${eye.x}px,${eye.y}px)`}}/></i><i><b style={{transform:`translate(${eye.x}px,${eye.y}px)`}}/></i></div>
      <div className="monsterMouth">{strength<2?'﹏':strength<4?'◡':'✦'}</div>
    </div>
    <div className="monsterCard"><p className="tinyLabel">PASSWORD CREATURE // 11</p><h2>{labels[strength]}</h2><p>It watches your cursor and judges every key.</p><input autoFocus type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Type something..."/><div className="strengthBars">{[0,1,2,3].map(i=><i className={strength>i?'on':''} key={i}/>)}</div></div>
  </div>
}

function HoldToLaunch(){
  const [progress,setProgress]=useState(0); const [launched,setLaunched]=useState(false); const timer=useRef(null);
  function stop(){clearInterval(timer.current);timer.current=null;if(!launched)setProgress(p=>p<100?0:p)}
  function start(){if(launched)return;clearInterval(timer.current);timer.current=setInterval(()=>setProgress(p=>{const n=Math.min(100,p+3);if(n>=100){clearInterval(timer.current);setLaunched(true)}return n}),32)}
  return <div className={`launchScene ${launched?'launched':''}`}>
    <div className="launchStars"/><div className="launchMoon"/>
    <div className="rocket"><div className="rocketNose"/><div className="rocketBody">N</div><div className="rocketFlame" style={{height:launched?'140px':`${progress*.8}px`}}/></div>
    <div className="launchPanel"><p className="tinyLabel">HOLD INTERACTION // 12</p><h2>{launched?'WE HAVE LIFTOFF.':'Hold to launch.'}</h2><p>{launched?'The CTA just left the atmosphere.':'Keep holding. Let go too early and the engine cools down.'}</p>
      <button onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} className="holdButton"><span style={{width:`${progress}%`}}/><b>{launched?'ORBIT ACHIEVED':`HOLD • ${progress}%`}</b></button>
      {launched&&<button className="tinyReset" onClick={()=>{setLaunched(false);setProgress(0)}}>↻ launch again</button>}
    </div>
  </div>
}

function XraySpotlight(){
  const [p,setP]=useState({x:50,y:50});
  function move(e){const r=e.currentTarget.getBoundingClientRect();setP({x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100})}
  return <div className="xrayScene" onMouseMove={move} style={{'--x':`${p.x}%`,'--y':`${p.y}%`}}>
    <div className="plainSite"><div className="plainNav">ACME <span>Home&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div><div className="plainHero"><small>WELCOME TO OUR WEBSITE</small><h2>We make<br/>digital things.</h2><button>Learn more</button></div></div>
    <div className="cyberSite"><div className="cyberGrid"/><div className="cyberNav">N//VOID <span>01&nbsp;&nbsp;02&nbsp;&nbsp;03</span></div><div className="cyberHero"><small>XRAY MODE ACTIVE</small><h2>THERE WAS<br/>MAGIC UNDERNEATH.</h2><button>ENTER THE VOID ↗</button></div></div>
    <div className="xrayLens" style={{left:`${p.x}%`,top:`${p.y}%`}}><span>X-RAY</span></div>
    <div className="xrayHint">MOVE THE LENS ACROSS THE BORING WEBSITE</div>
  </div>
}

function BlackHole404(){
  const things=['404','PAGE NOT FOUND','Go home','Maybe it never existed','NAVOCODE']; const [eaten,setEaten]=useState(0);
  return <div className={`holeScene eaten-${eaten}`}>
    <div className="holeStars"/>
    <div className="holeOrbit"><div className="blackHole"><i/><b/></div></div>
    <div className={`victim victim0 ${eaten>0?'sucked':''}`}>404</div>
    <div className={`victim victim1 ${eaten>1?'sucked':''}`}>PAGE NOT FOUND</div>
    <div className={`victim victim2 ${eaten>2?'sucked':''}`}>This route fell out of reality.</div>
    <button className={`victim victim3 feedBtn ${eaten>3?'sucked':''}`} onClick={()=>setEaten(v=>Math.min(5,v+1))}>{eaten>=4?'...':'FEED THE BLACK HOLE'}</button>
    <div className={`victim victim4 mini404card ${eaten>4?'sucked':''}`}>N// 404</div>
    {eaten>=5&&<button className="holeReset" onClick={()=>setEaten(0)}>↻ rebuild reality</button>}
    <div className="holeCount">MASS CONSUMED {Math.min(eaten,5)}/5</div>
  </div>
}

function ExplodingMenu(){
  const [open,setOpen]=useState(false); const items=['WORK','LAB','ABOUT','GITHUB','CONTACT','REELS'];
  return <div className={`explodeScene ${open?'menuOpen':''}`}>
    <div className="explodeGrid"/><p className="explodeBrand">N//NAVO</p>
    <div className="radialMenu">
      {items.map((x,i)=><button key={x} className="orbitItem" style={{'--a':`${i*60}deg`,'--na':`${-i*60}deg`,'--delay':`${i*35}ms`}}><span>{String(i+1).padStart(2,'0')}</span>{x}</button>)}
      <button className="menuBomb" onClick={()=>setOpen(v=>!v)}><i/><i/><i/></button>
    </div>
    <div className="explodeCopy"><p className="tinyLabel">RADIAL NAV // 15</p><h2>{open?'NAVIGATION: DETONATED':'Press the menu.'}</h2><p>A hamburger menu that refuses to be boring.</p></div>
  </div>
}

function MoonSlider(){
  const [t,setT]=useState(15); const phase=t<35?'MORNING':t<68?'GOLDEN HOUR':'MIDNIGHT';
  return <div className={`timeScene ${phase.toLowerCase().replace(' ','-')}`} style={{'--time':t}}>
    <div className="timeStars" style={{opacity:Math.max(0,(t-55)/45)}}/>
    <div className="sunMoon" style={{left:`${8+t*.84}%`,top:`${62-Math.sin(t/100*Math.PI)*48}%`}}>{t<63?'☀':'●'}</div>
    <div className="skyline"><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="timeCopy"><p className="tinyLabel">TIME MACHINE // 16</p><h2>{phase}</h2><p>Drag through a whole day.</p></div>
    <div className="timeControl"><span>06:00</span><input type="range" min="0" max="100" value={t} onChange={e=>setT(Number(e.target.value))}/><span>00:00</span></div>
  </div>
}

function BurnToReveal(){
  const [p,setP]=useState({x:50,y:50});
  function move(e){const r=e.currentTarget.getBoundingClientRect();setP({x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100})}
  return <div className="burnScene" onMouseMove={move} style={{'--bx':`${p.x}%`,'--by':`${p.y}%`}}>
    <div className="burnSecret"><div className="burnLines"/><p>YOU FOUND IT</p><h2>GREAT UI<br/>SHOULD FEEL<br/><span>ALIVE.</span></h2><small>NAVOCODE // SOURCE IN BIO</small></div>
    <div className="burnCover"><p>MOVE YOUR CURSOR<br/>TO BURN THIS POSTER</p><b>17</b></div>
    <div className="flameCursor" style={{left:`${p.x}%`,top:`${p.y}%`}}>✦</div>
  </div>
}

function SelfDestruct(){
  const [armed,setArmed]=useState(false); const [count,setCount]=useState(5); const [blown,setBlown]=useState(false);
  useEffect(()=>{if(!armed||blown)return;if(count<=0){setBlown(true);return}const id=setTimeout(()=>setCount(c=>c-1),720);return()=>clearTimeout(id)},[armed,count,blown]);
  function reset(){setArmed(false);setCount(5);setBlown(false)}
  return <div className={`destructScene ${armed?'armed':''} ${blown?'blown':''}`}>
    <div className="warningGrid"/><div className="warningSweep"/>
    {!blown?<div className="destructPanel"><p className="tinyLabel">DANGEROUS UI // 18</p><div className="dangerIcon">!</div><h2>{armed?String(count).padStart(2,'0'):'DO NOT PRESS'}</h2><p>{armed?'SELF-DESTRUCT SEQUENCE ACTIVE':'Seriously. This button is dramatic.'}</p><button onClick={()=>setArmed(true)} disabled={armed}>{armed?'SYSTEM LOCKED':'PRESS ANYWAY'}</button></div>:
    <div className="boomResult"><h2>BOOM.</h2><p>You pressed it. Obviously.</p><button onClick={reset}>rebuild interface ↻</button></div>}
    {blown&&[...Array(18)].map((_,i)=>{const a=i/18*Math.PI*2;return <i className="debris" key={i} style={{'--tx':`${Math.cos(a)*(280+(i%4)*55)}px`,'--ty':`${Math.sin(a)*(220+(i%5)*42)}px`,'--delay':`${-i*17}ms`}}/>}) }
  </div>
}

function CaptchaBoss(){
  const [hp,setHp]=useState(3); const [pos,setPos]=useState({x:50,y:45}); const [hit,setHit]=useState(false);
  function smack(){if(hp<=0)return;setHit(true);setHp(h=>h-1);setPos({x:20+((hp*29)%60),y:22+((hp*37)%55)});setTimeout(()=>setHit(false),180)}
  return <div className={`bossScene ${hp<=0?'verified':''}`}>
    <div className="bossGrid"/><div className="bossHud"><span>HUMAN VERIFICATION</span><div className="hp">BOSS HP {[0,1,2].map(i=><i key={i} className={hp>i?'alive':''}/>)}</div></div>
    {hp>0?<button className={`captchaBoss ${hit?'hit':''}`} style={{left:`${pos.x}%`,top:`${pos.y}%`}} onClick={smack}><span>☐</span><b>I&apos;M NOT A ROBOT</b><small>catch me</small></button>:<div className="verifiedCard"><div>✓</div><h2>HUMAN CONFIRMED</h2><p>The captcha has been defeated.</p><button onClick={()=>{setHp(3);setPos({x:50,y:45})}}>fight again</button></div>}
    {hp>0&&<div className="bossCopy"><p className="tinyLabel">CAPTCHA BOSS // 19</p><h2>Prove it.</h2><p>Hit the moving captcha three times.</p></div>}
  </div>
}

function ConfettiCheckbox(){
  const [checked,setChecked]=useState(false); const [burst,setBurst]=useState(0);
  function toggle(){setChecked(v=>!v);setBurst(b=>b+1)}
  return <div className={`checkScene ${checked?'checked':''}`}>
    <div className="checkCard"><p className="tinyLabel">TOTALLY NORMAL CHECKBOX // 20</p><h2>{checked?'LEGENDARY CHOICE.':'Accept tiny terms?'}</h2><p>{checked?'The checkbox may have overreacted a little.':'Surely nothing excessive will happen.'}</p><button className="bigCheck" onClick={toggle}><span>{checked?'✓':''}</span><b>{checked?'ACCEPTED':'I agree'}</b></button></div>
    {checked&&[...Array(36)].map((_,i)=>{const a=i/36*Math.PI*2;const r=180+(i%6)*35;return <i key={`${burst}-${i}`} className="confetti" style={{'--tx':`${Math.cos(a)*r}px`,'--ty':`${Math.sin(a)*r}px`,backgroundColor:`hsl(${(i*37)%360} 90% 66%)`}}/>}) }
    {checked&&<div className="celebrateWord">YES!</div>}
  </div>
}

function SwipeCardStack(){
  const initial=[{t:'SHIP WEIRD IDEAS',s:'01',c:'violet'},{t:'MAKE IT MOVE',s:'02',c:'cyan'},{t:'BREAK THE PATTERN',s:'03',c:'pink'},{t:'POST THE CODE',s:'04',c:'amber'}];
  const [cards,setCards]=useState(initial); const [dx,setDx]=useState(0); const start=useRef(null);
  function down(e){start.current=e.clientX;e.currentTarget.setPointerCapture?.(e.pointerId)}
  function move(e){if(start.current!==null)setDx(e.clientX-start.current)}
  function up(){if(Math.abs(dx)>95)setCards(c=>c.slice(1));setDx(0);start.current=null}
  return <div className="swipeScene"><div className="swipeCopy"><p className="tinyLabel">GESTURE STACK // 21</p><h2>Throw it away.</h2><p>Drag the top card sideways.</p></div><div className="cardStack">
    {cards.length?cards.slice(0,3).map((c,i)=><div key={c.s} className={`swipeCard sc-${c.c}`} style={{zIndex:10-i,transform:i===0?`translate(${dx}px,0) rotate(${dx/18}deg)`:`translateY(${i*14}px) scale(${1-i*.055})`,opacity:1-i*.14}} onPointerDown={i===0?down:undefined} onPointerMove={i===0?move:undefined} onPointerUp={i===0?up:undefined} onPointerCancel={i===0?up:undefined}><span>{c.s}</span><h3>{c.t}</h3><p>NAVOCODE / INTERACTION CARD</p><b>↗</b></div>):<div className="stackDone"><h2>EMPTY.</h2><button onClick={()=>setCards(initial)}>restack ↻</button></div>}
    </div></div>
}

function JellyNavbar(){
  const [bar,setBar]=useState({x:8,w:92});
  function hover(e){const el=e.currentTarget;setBar({x:el.offsetLeft,w:el.offsetWidth})}
  return <div className="jellyScene"><div className="jellyGlow"/><nav className="jellyNav"><div className="jellyBrand">N//</div><div className="jellyLinks"><i style={{left:bar.x,width:bar.w}}/>{['Home','Work','Lab','About'].map(x=><button onMouseEnter={hover} key={x}>{x}</button>)}</div><button className="jellyCta">Let&apos;s build ↗</button></nav><div className="jellyHero"><p className="tinyLabel">ELASTIC NAV // 22</p><h2>Navigation<br/>with <span>jelly bones.</span></h2><p>Hover across the links and watch the highlight stretch.</p></div></div>
}

function NotificationRain(){
  const [show,setShow]=useState(false); const [round,setRound]=useState(0);
  function rain(){setRound(r=>r+1);setShow(false);requestAnimationFrame(()=>setShow(true));setTimeout(()=>setShow(false),4300)}
  const texts=['Build passed ✓','Deployed to production','Lighthouse 100','New star on GitHub ★','0 bugs found','Cache hit 99%','Reel saved','PR merged','Ship complete','Coffee acquired'];
  return <div className="rainScene"><div className="rainGrid"/><div className="rainPanel"><p className="tinyLabel">DEPLOYMENT WEATHER // 23</p><h2>Make it rain.</h2><p>One successful deploy. Ten unnecessary notifications.</p><button onClick={rain}>SHIP IT <span>↗</span></button></div>{show&&texts.map((x,i)=><div key={`${round}-${i}`} className="rainToast" style={{'--i':i,'--x':`${5+(i*17)%86}%`,'--r1':`${(i%3-1)*5}deg`,'--r2':`${(i%4-2)*18}deg`,'--delay':`${i*.13}s`}}><span>✓</span>{x}</div>)}</div>
}

function TeleportButton(){
  const spots=[{x:50,y:56},{x:18,y:24},{x:79,y:30},{x:72,y:76},{x:28,y:70}]; const [idx,setIdx]=useState(0); const [phase,setPhase]=useState('idle');
  function jump(){if(phase!=='idle')return;setPhase('implode');setTimeout(()=>{setIdx(i=>(i+1)%spots.length);setPhase('pop')},260);setTimeout(()=>setPhase('idle'),620)}
  const p=spots[idx];
  return <div className="teleScene"><div className="teleGrid"/><div className="teleCopy"><p className="tinyLabel">PORTAL CTA // 24</p><h2>Catch the CTA.</h2><p>Every click tears a tiny hole in the layout.</p></div><button className={`teleButton ${phase}`} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={jump}><i/><span>CLICK ME ↗</span></button></div>
}

function TextDecoder(){
  const [target,setTarget]=useState('MAKE CODE FEEL ALIVE'); const [display,setDisplay]=useState(target); const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  useEffect(()=>{let frame=0;const total=Math.max(12,target.length*2);const id=setInterval(()=>{frame++;setDisplay(target.split('').map((ch,i)=>{if(ch===' ')return ' ';if(i<frame/2)return ch;return chars[(i*7+frame*3)%chars.length]}).join(''));if(frame>total){clearInterval(id);setDisplay(target)}},32);return()=>clearInterval(id)},[target]);
  return <div className="decoderScene"><div className="decoderNoise"/><div className="decoderTop">DECRYPTION ENGINE <span>ONLINE</span></div><div className="decoderMain"><p className="tinyLabel">TEXT FX // 25</p><h2>{display || 'TYPE SOMETHING'}</h2><div className="decoderInput"><span>❯</span><input value={target} onChange={e=>setTarget(e.target.value.toUpperCase().slice(0,28))} maxLength={28}/></div><p>Every edit re-enters the decoder.</p></div></div>
}

function UnlockSlider(){
  const track=useRef(null); const [p,setP]=useState(0); const [drag,setDrag]=useState(false); const [open,setOpen]=useState(false);
  function calc(e){const r=track.current.getBoundingClientRect();setP(Math.max(0,Math.min(100,(e.clientX-r.left)/(r.width-68)*100)))}
  function move(e){if(drag&&!open)calc(e)} function up(){if(!drag)return;setDrag(false);if(p>88){setP(100);setOpen(true)}else setP(0)}
  return <div className={`unlockScene ${open?'unlocked':''}`}><div className="unlockHalo"/><div className="lockIcon"><div className="shackle"/><div className="lockBody">{open?'✓':'•'}</div></div><div className="unlockCopy"><p className="tinyLabel">PHYSICAL CONTROL // 26</p><h2>{open?'UNLOCKED.':'Slide to enter.'}</h2><p>{open?'Welcome to the other side.':'Drag the handle all the way.'}</p></div><div ref={track} className="unlockTrack" onPointerMove={move} onPointerUp={up} onPointerLeave={up}><div className="unlockFill" style={{width:`${p}%`}}/><div className="unlockHandle" style={{left:`${p*.82}%`}} onPointerDown={e=>{setDrag(true);e.currentTarget.setPointerCapture?.(e.pointerId)}}>{open?'✓':'→'}</div><span>{open?'ACCESS GRANTED':'SLIDE TO UNLOCK'}</span></div>{open&&<button className="unlockReset" onClick={()=>{setOpen(false);setP(0)}}>lock again</button>}</div>
}

function CursorSnake(){
  const [pts,setPts]=useState(Array.from({length:16},()=>({x:50,y:50})));
  function move(e){const r=e.currentTarget.getBoundingClientRect();const next={x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100};setPts(p=>[next,...p.slice(0,15)])}
  return <div className="snakeScene" onMouseMove={move}><div className="snakeGrid"/><div className="snakeCopy"><p className="tinyLabel">CURSOR CREATURE // 27</p><h2>It follows you.</h2><p>Move fast. Make loops. Try to lose it.</p></div>{pts.map((p,i)=><i className="snakeDot" key={i} style={{left:`${p.x}%`,top:`${p.y}%`,width:`${Math.max(6,28-i*1.25)}px`,height:`${Math.max(6,28-i*1.25)}px`,opacity:1-i*.055,transform:`translate(-50%,-50%) scale(${1-i*.025})`}}>{i===0?'✦':''}</i>)}</div>
}

function PeelSticker(){
  const [peel,setPeel]=useState(18);
  return <div className="peelScene" style={{'--peel':`${peel}%`,'--p74':`${peel*.74}%`,'--p98':`${peel*.98}%`,'--flap':`${peel*.72}%`,'--alpha':peel/100}}><div className="secretCard"><span>NAVOCODE // 28</span><h2>SOURCE<br/>UNLOCKED.</h2><p>React + CSS. No animation library.</p><code>github.com/yourname/navocode-magic</code></div><div className="stickerCover"><div className="stickerNoise"/><span>PEEL ME</span><h2>THERE&apos;S CODE<br/>UNDER THIS.</h2><b>↘</b></div><div className="peelFlap"/><div className="peelControl"><span>PEEL</span><input type="range" min="0" max="100" value={peel} onChange={e=>setPeel(Number(e.target.value))}/><span>{peel}%</span></div></div>
}

function MischiefToggle(){
  const [on,setOn]=useState(false); const [tries,setTries]=useState(0); const [msg,setMsg]=useState('Turn me on. I dare you.');
  function toggle(){if(on){setOn(false);setMsg('Fine. Off again.');return}const n=tries+1;setTries(n);setOn(true);if(n<3){setMsg(n===1?'Nope 😈':'Still nope. Try once more.');setTimeout(()=>setOn(false),420)}else setMsg('Okay okay! You win. ✦')}
  return <div className={`mischiefScene ${on?'on':''}`}><div className="mischiefFace"><i/><i/><b>{on?'◡':'⌣'}</b></div><p className="tinyLabel">TROLL TOGGLE // 29</p><h2>{msg}</h2><button className="mischiefSwitch" onClick={toggle}><span/><b>{on?'ON':'OFF'}</b></button><p className="tryCount">ATTEMPTS: {tries}</p>{on&&tries>=3&&[...Array(18)].map((_,i)=>{const a=i/18*Math.PI*2;return <i className="miniSpark" key={i} style={{'--tx':`${Math.cos(a)*220}px`,'--ty':`${Math.sin(a)*180}px`,'--delay':`${-i*18}ms`}}/>})}</div>
}

function NeonKeyboard(){
  const keys=['A','S','D','F','J','K','L']; const [active,setActive]=useState(''); const [pulse,setPulse]=useState(0);
  useEffect(()=>{function down(e){const k=e.key.toUpperCase();if(keys.includes(k)){setActive(k);setPulse(p=>p+1)}}function up(e){if(e.key.toUpperCase()===active)setActive('')}window.addEventListener('keydown',down);window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}},[active]);
  function hit(k){setActive(k);setPulse(p=>p+1);setTimeout(()=>setActive(''),180)}
  return <div className="keysScene"><div className="keysAurora"/><div className="soundWave" key={pulse}>{[...Array(24)].map((_,i)=><i key={i} style={{'--wave':`${30+(i%7)*13}px`,'--delay':`${i*12}ms`}}/>)}</div><div className="keysCopy"><p className="tinyLabel">KEYBOARD LIGHTSHOW // 30</p><h2>Play the interface.</h2><p>Press A S D F J K L — or tap the pads.</p></div><div className="keyPads">{keys.map((k,i)=><button key={k} onPointerDown={()=>hit(k)} className={active===k?'active':''} style={{'--h':180+i*23}}><span>{k}</span><small>0{i+1}</small></button>)}</div></div>
}
