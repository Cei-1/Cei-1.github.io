// --- MOTOR DE PARTÍCULAS INTERACTIVO ---
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const numParticles = 85;
const maxDistance = 115;
let mouseX = 0,
  mouseY = 0;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      let force = (150 - distance) / 150;
      this.x -= dx * force * 0.05;
      this.y -= dy * force * 0.05;
    }
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(246, 28, 105, 0.4)";
    ctx.fill();
  }
}

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < numParticles; i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(246, 28, 105, ${0.4 * (1 - dist / maxDistance)})`;
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}

// --- CORE FUNCTIONS ---
const courseData = [
  {
    id: "curso1",
    title: "Ingeniería de Interfaces Modernas",
    summary:
      "Domina las tecnologías de vanguardia para crear experiencias digitales de alta gama. Este curso cubre arquitectura CSS, componentes reactivos y optimización de rendimiento.",
    progress: 45,
    icon: "code",
    modules: [
      {
        id: "m1",
        title: "Arquitectura de Sistemas Web",
        isCompleted: true,
        videoUrl: "https://www.youtube.com/embed/S_B7_P-gKNA",
      },
      {
        id: "m2",
        title: "Diseño Basado en Datos",
        isCompleted: false,
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
      },
    ],
  },
];

function openDemo(type) {
  document.body.style.overflow = "hidden";
  const overlay = document.getElementById("demo-overlay");
  overlay.style.display = "block";
  document.getElementById("btn-close-demo").classList.remove("hidden");
  if (type === "shop") renderShop();
  else renderEdu();
}

function closeDemo() {
  document.body.style.overflow = "auto";
  document.getElementById("demo-overlay").style.display = "none";
  document.getElementById("btn-close-demo").classList.add("hidden");
}

function renderShop() {
  const shopImages = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  ];
  const productNames = [
    "Dispositivo Móvil CEI v1",
    "Estación de Trabajo CEI",
    "Interfaz Portátil CEI",
  ];

  document.getElementById("demo-overlay").innerHTML = `
            <div class="bg-gray-50 min-h-screen text-gray-900 pb-32 font-sans">
                <nav class="bg-white border-b px-8 py-6 flex justify-between items-center sticky top-0 z-[2500]">
                    <div class="text-2xl font-black text-[#f61c69]">CEI<span class="text-black">SHOP</span></div>
                    <div class="flex gap-8 font-black uppercase text-xs tracking-widest"><a href="#">Catálogo</a><a href="#">Carrito (0)</a></div>
                </nav>
                <div class="max-w-7xl mx-auto p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                    ${shopImages
      .map(
        (img, i) => `
                        <div class="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
                            <div class="aspect-square bg-gray-50 overflow-hidden">
                                <img src="${img}" alt="${productNames[i]}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="p-8">
                                <h4 class="font-black text-xl mb-2">${productNames[i]}</h4>
                                <p class="text-[#f61c69] font-black">$${(1299 + i * 200).toLocaleString()}.00</p>
                            </div>
                        </div>
                    `,
      )
      .join("")}
                </div>
            </div>
        `;
}

function renderEdu() {
  document.getElementById("demo-overlay").innerHTML = `
            <div class="bg-[#0f172a] min-h-screen text-gray-200 pb-32 font-sans">
                <header class="bg-[#1a202c] border-b border-gray-800 p-10 text-center sticky top-0 z-[2500]">
                    <h2 class="text-3xl font-black edu-cei-title mb-1 uppercase tracking-tighter text-white">CEI Academy</h2>
                    <p class="text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em]">Portal de Capacitación</p>
                </header>
                <main class="max-w-4xl mx-auto p-8 pt-16 flex flex-col items-center" id="edu-main-content">
                    <div class="mb-12 text-center">
                        <h1 class="text-4xl font-black text-white mb-3 uppercase tracking-tighter">Cursos Disponibles</h1>
                    </div>
                    <div class="space-y-6 w-full" id="edu-course-list"></div>
                </main>
            </div>
        `;
  renderEduList();
}

function renderEduList() {
  const container = document.getElementById("edu-course-list");
  container.innerHTML = courseData
    .map(
      (c) => `
            <div class="bg-[#1a202c] rounded-3xl shadow-xl border border-gray-800 overflow-hidden hover:border-[#f61c69]/30 transition-all">
                <div class="p-8 flex items-center justify-between cursor-pointer" onclick="toggleEduAccordion('${c.id}')">
                    <div class="flex items-center gap-6">
                        <div class="w-14 h-14 bg-[#f61c69]/10 rounded-2xl flex items-center justify-center text-[#f61c69] border border-[#f61c69]/20"><i class="fas fa-${c.icon}"></i></div>
                        <div><h4 class="font-black text-xl text-white uppercase tracking-tight">${c.title}</h4><p class="text-[9px] text-gray-500 uppercase tracking-widest mt-1">${c.progress}% COMPLETADO</p></div>
                    </div>
                    <i class="fas fa-chevron-down opacity-20" id="icon-${c.id}"></i>
                </div>
                <div id="content-${c.id}" class="accordion-content">
                    <div class="p-8 border-t border-gray-800 bg-[#161e2e] space-y-6">
                        <p class="text-sm text-gray-400 leading-relaxed max-w-2xl">${c.summary}</p>
                        <div class="space-y-3">
                            ${c.modules
          .map(
            (m, idx) => `
                                <div class="flex items-center justify-between p-5 bg-[#1a202c] rounded-2xl border border-gray-800">
                                    <span class="text-sm font-bold text-gray-200 uppercase font-mono tracking-tighter">MOD_0${idx + 1}: ${m.title}</span>
                                    ${m.isCompleted ? '<i class="fas fa-check-circle text-[#f61c69]"></i>' : `<button class="text-[9px] font-black text-white bg-[#f61c69] px-6 py-3 rounded-xl uppercase tracking-widest" onclick="playEduModule('${c.id}', '${m.id}')">INICIAR</button>`}
                                </div>
                            `,
          )
          .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `,
    )
    .join("");
}

window.toggleEduAccordion = function (id) {
  const content = document.getElementById("content-" + id);
  const icon = document.getElementById("icon-" + id);
  if (content.style.maxHeight && content.style.maxHeight !== "0px") {
    content.style.maxHeight = "0px";
    icon.style.transform = "rotate(0deg)";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.style.transform = "rotate(180deg)";
  }
};

window.playEduModule = function (cId, mId) {
  const course = courseData.find((c) => c.id === cId);
  const module = course.modules.find((m) => m.id === mId);
  const main = document.getElementById("edu-main-content");

  main.className =
    "min-h-[80vh] w-full flex flex-col items-center justify-center p-4 md:p-12";

  main.innerHTML = `
            <div class="w-full max-w-6xl mx-auto space-y-10">
                <div class="flex justify-start">
                    <button onclick="renderEdu()" class="text-[10px] font-black text-[#f61c69] uppercase tracking-widest flex items-center gap-3 group">
                        <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Volver al panel de cursos
                    </button>
                </div>
                
                <div class="text-center space-y-3">
                    <h3 class="text-4xl md:text-5xl font-black text-white uppercase font-mono tracking-tighter leading-tight">${module.title}</h3>
                    <p class="text-[#f61c69] text-[10px] font-black uppercase tracking-[0.4em]">${course.title}</p>
                </div>

                <div class="w-full shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_50_rgba(246,28,105,0.1)] border border-white/5 rounded-[40px] overflow-hidden bg-black aspect-video relative">
                    <iframe 
                        src="${module.videoUrl}?autoplay=1&rel=0&modestbranding=1" 
                        class="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen" 
                        allowfullscreen>
                    </iframe>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                    <div class="p-10 bg-white/5 rounded-[40px] border border-white/5">
                        <h5 class="text-white font-black text-xs uppercase tracking-widest mb-4">Resumen del Módulo</h5>
                        <p class="text-gray-400 text-sm leading-relaxed italic">Despliegue de sistemas de alta disponibilidad bajo arquitecturas de microservicios. Este contenido es propiedad exclusiva de Consultoría Éxito e Innovación.</p>
                    </div>
                    <div class="p-10 bg-[#f61c69]/5 rounded-[40px] border border-[#f61c69]/20 flex items-center justify-between">
                        <div>
                            <h5 class="text-white font-black text-xs uppercase tracking-widest">Documentación</h5>
                            <p class="text-gray-500 text-[10px] mt-1">Manual de Ingeniería CEI_v2.pdf</p>
                        </div>
                        <button class="w-12 h-12 rounded-full bg-[#f61c69] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
  document.getElementById("demo-overlay").scrollTop = 0;
};

// --- UI LOGIC ---
window.onload = () => {
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
  "EL ÉXITO SE CONSTRUYE CON TECNOLOGÍA SÓLIDA.",
  "INGENIERÍA QUE TRADUCE IDEAS EN CÓDIGO.",
  "CONECTA CON NUESTRA VISIÓN EN REDES SOCIALES.",
  "SISTEMAS DISEÑADOS PARA EL CRECIMIENTO REAL.",
];
let pIdx = 0;
setInterval(() => {
  const el = document.getElementById("phrase-text");
  if (el) {
    el.classList.add("phrase-hidden");
    setTimeout(() => {
      pIdx = (pIdx + 1) % phrases.length;
      el.innerText = phrases[pIdx];
      el.classList.remove("phrase-hidden");
    }, 500);
  }
}, 4000);

window.onresize = initParticles;
