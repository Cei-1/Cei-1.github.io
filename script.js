// Fondo de constelaciones: coordenadas CSS, resolución Retina y movimiento reducido.
const canvas=document.getElementById('background-canvas');
const ctx=canvas.getContext('2d');
let particles=[],mouseX=-1000,mouseY=-1000,particleFrame=0,lastFrame=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function initParticles(){
 const dpr=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;
 canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 particles=Array.from({length:Math.min(115,Math.max(40,Math.round(w*h/14500)))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.7+.6,vx:0,vy:0,driftX:(Math.random()-.5)*.35,driftY:(Math.random()-.5)*.35,phase:Math.random()*6.28,blue:Math.random()>.65}));
 if(reducedMotion.matches)drawParticles(0);
}
function drawParticles(time){
 const w=innerWidth,h=innerHeight;ctx.clearRect(0,0,w,h);
 const glow=ctx.createRadialGradient(w*.72,h*.32,0,w*.72,h*.32,w*.55);glow.addColorStop(0,'rgba(246,28,105,.10)');glow.addColorStop(1,'rgba(246,28,105,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 for(let i=0;i<particles.length;i++){
  const a=particles[i];if(!reducedMotion.matches){
   const dx=a.x-mouseX,dy=a.y-mouseY,d=Math.hypot(dx,dy),radius=180;
   if(d<radius){const falloff=(1-d/radius)**2,nx=d>.01?dx/d:Math.cos(a.phase),ny=d>.01?dy/d:Math.sin(a.phase);a.vx+=nx*falloff*1.25;a.vy+=ny*falloff*1.25;}
   // La velocidad conserva inercia, pierde energía y recupera la deriva natural.
   a.vx*=.93;a.vy*=.93;const speed=Math.hypot(a.vx,a.vy);if(speed>7){a.vx=a.vx/speed*7;a.vy=a.vy/speed*7;}
   a.x+=a.driftX+a.vx;a.y+=a.driftY+a.vy;
   if(a.x<0){a.x=0;a.vx=Math.abs(a.vx)*.55;a.driftX=Math.abs(a.driftX)}if(a.x>w){a.x=w;a.vx=-Math.abs(a.vx)*.55;a.driftX=-Math.abs(a.driftX)}
   if(a.y<0){a.y=0;a.vy=Math.abs(a.vy)*.55;a.driftY=Math.abs(a.driftY)}if(a.y>h){a.y=h;a.vy=-Math.abs(a.vy)*.55;a.driftY=-Math.abs(a.driftY)}
  }
  const color=a.blue?'106,190,255':'255,83,146';
  for(let j=i+1;j<particles.length;j++){const b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<155){ctx.strokeStyle=`rgba(${color},${(1-d/155)*.33})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
  ctx.shadowBlur=a.r*5;ctx.shadowColor=`rgb(${color})`;ctx.fillStyle=`rgba(${color},${.55+Math.sin(time*.0006+a.phase)*.22})`;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
 }
}
function animate(time=0){cancelAnimationFrame(particleFrame);if(document.hidden||reducedMotion.matches){drawParticles(time);return}if(time-lastFrame>30){drawParticles(time);lastFrame=time}particleFrame=requestAnimationFrame(animate)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(particleFrame);else animate()});
reducedMotion.addEventListener('change',()=>{initParticles();animate()});
window.addEventListener('pointerleave',()=>{mouseX=-1000;mouseY=-1000});
// Demos independientes con estilos y comportamiento propios.
function openDemo(type) {
  window.location.href = type === 'shop' ? 'demos/shop.html' : 'demos/academy.html';
}

// --- UI LOGIC ---
function initSite() {
  initParticles();
  animate();
  if (window.lucide) lucide.createIcons();
  const btnOpen = document.getElementById("btn-open-menu");
  const btnClose = document.getElementById("btn-close-menu");
  const overlay = document.getElementById("menu-overlay");
  btnOpen.onclick = () => {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
  window.closeMenu = () => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  };
  btnClose.onclick = closeMenu;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const sections = document.querySelectorAll(".section-anchor");
  const dots = document.querySelectorAll(".progress-dot");
  window.onscroll = () => {
    let current = "";
    sections.forEach((s) => {
      if (window.pageYOffset >= s.offsetTop - 350) current = s.id;
    });
    dots.forEach((d) => {
      d.classList.remove("active");
      if (d.getAttribute("href").includes(current))
        d.classList.add("active");
    });
  };
};

const phrases = [
  "El éxito se construye con tecnología sólida.",
  "Ingeniería que traduce ideas en código.",
  "Cada gran solución comienza con una conversación.",
  "Sistemas diseñados para el crecimiento real.",
];
let pIdx = 0;
setInterval(() => {
  const el = document.getElementById("phrase-text");
  if (el) {
    el.classList.add("phrase-hidden");
    setTimeout(() => {
      pIdx = (pIdx + 1) % phrases.length;
      el.innerText = phrases[pIdx];
      const counter = document.getElementById("phrase-counter");
      if (counter) counter.textContent = `${String(pIdx + 1).padStart(2, "0")} / ${String(phrases.length).padStart(2, "0")}`;
      el.classList.remove("phrase-hidden");
    }, 500);
  }
}, 4000);

window.addEventListener('resize',initParticles);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initSite,{once:true});else initSite();
