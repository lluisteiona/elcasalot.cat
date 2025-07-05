let currentKey = "";
let esAdmin = false;
let links = {};

// 🔁 Carrega les dades des de Firebase
firebase.database().ref("galeria").once("value").then(snapshot => {
  const data = snapshot.val();
  if (data) {
    links = data;
    renderGaleria();
  }
});

// ✅ Desa a Firebase (tot l’objecte complet)
function desaLinks() {
  firebase.database().ref("galeria").set(links);
}

// 🔑 Accés públic
const correctPassword = "esplai123";

// Modal per veure una galeria
function requestAccess(key) {
  currentKey = key;
  const modal = document.getElementById("passwordModal");
  const input = document.getElementById("passwordInput");

  modal.style.display = "flex";
  input.value = "";
  input.focus();
}

function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
}

function validatePassword() {
  const input = document.getElementById("passwordInput").value.trim();
  if (input === correctPassword) {
    closeModal();
    const entrada = links[currentKey];
    if (entrada?.link) {
      window.open(entrada.link, "_blank");
    } else {
      alert("No s'ha trobat l'enllaç.");
    }
  } else {
    alert("Contrasenya incorrecta.");
  }
}

// Navegació suau
document.addEventListener("keydown", e => {
  const modalVisible = document.getElementById("passwordModal").style.display === "flex";
  if (modalVisible && e.key === "Escape") closeModal();
  if (modalVisible && e.key === "Enter") validatePassword();
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Acordions
document.querySelectorAll('.acordio-titol').forEach(btn => {
  btn.addEventListener('click', () => {
    const acordio = btn.parentElement;
    document.querySelectorAll('.acordio').forEach(el => {
      if (el !== acordio) el.classList.remove('open');
    });
    acordio.classList.toggle('open');
  });
});

// Slider
const sliderContainer = document.querySelector("#slider-que-fem .slider-inner");
const prevBtn = document.querySelector("#slider-que-fem .prev");
const nextBtn = document.querySelector("#slider-que-fem .next");

const sliderImages = ["foto1.png", "foto2.png", "foto3.png", "foto4.png", "foto5.png", "foto6.png"];

sliderImages.forEach(imgName => {
  const img = document.createElement("img");
  img.src = `assets/que-fem/${imgName}`;
  img.alt = imgName;
  sliderContainer.appendChild(img);
});

let currentSlide = 0;

function updateSlider() {
  sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
  updateSlider();
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  updateSlider();
}, 5000);

// ADMIN
const adminPassword = "casalotAdmin123";

document.querySelector(".logo img").addEventListener("click", () => {
  document.getElementById("adminPanel").style.display = "flex";
  document.getElementById("adminInput").value = "";
  document.getElementById("adminInput").focus();
});

function validateAdmin() {
  const input = document.getElementById("adminInput").value.trim();
  if (input === adminPassword) {
    esAdmin = true;
    closeAdmin();
    activarModeAdmin();
  } else {
    alert("Contrasenya incorrecta.");
  }
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

function activarModeAdmin() {
  if (!esAdmin) return;

  document.querySelectorAll(".boto-admin").forEach(el => el.remove());

  document.querySelectorAll('.acordio').forEach(acordio => {
    const afegirBtn = document.createElement("button");
    afegirBtn.textContent = "+";
    afegirBtn.className = "boto-admin";
    afegirBtn.onclick = () => afegirNovaSeccio(acordio);
    acordio.appendChild(afegirBtn);

    acordio.querySelectorAll('.acordio-contingut button').forEach(btn => {
      btn.onclick = () => editarSeccio(btn);
    });
  });

  const botoGlobal = document.createElement("button");
  botoGlobal.textContent = "+";
  botoGlobal.className = "boto-admin";
  botoGlobal.onclick = () => afegirNouCurs();
  document.querySelector(".acordio-galeria").appendChild(botoGlobal);
}

function afegirNouCurs() {
  const any = prompt("Introdueix l’any inicial (ex: 2024)");
  if (!any || isNaN(any)) return;

  const etiqueta = `Curs ${any}–${parseInt(any)+1}`;
  if ([...document.querySelectorAll('.acordio-titol span')]
      .some(span => span.textContent === etiqueta)) {
    alert("Aquest curs ja existeix.");
    return;
  }

  const acordio = document.createElement("div");
  acordio.classList.add("acordio");
  acordio.innerHTML = `
    <button class="acordio-titol">
      <span>${etiqueta}</span><span class="fletxa">▼</span>
    </button>
    <div class="acordio-contingut"></div>
  `;
  document.querySelector(".acordio-galeria").prepend(acordio);

  acordio.querySelector(".acordio-titol").addEventListener("click", () => {
    document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
    acordio.classList.toggle("open");
  });

  activarModeAdmin();
}

function afegirNovaSeccio(acordio) {
  obrirEditModal("Afegir nova secció", "", "", (nom, link) => {
    if (!nom || !link) return;

    const key = `k_${Date.now()}`; // clau única
    links[key] = { nom, link };
    desaLinks();

    renderGaleria();
  });
}

function editarSeccio(btn) {
  const currentKey = btn.dataset.key || "";
  const currentEntrada = links[currentKey];
  if (!currentEntrada) return;

  obrirEditModal("Editar secció", currentEntrada.nom, currentEntrada.link, (nouNom, nouLink) => {
    if (!nouNom || !nouLink) return;

    const novaKey = `k_${Date.now()}`;
    links[novaKey] = { nom: nouNom, link: nouLink };
    delete links[currentKey];
    desaLinks();
    renderGaleria();
  }, () => {
    delete links[currentKey];
    desaLinks();
    renderGaleria();
  });
}

function obrirEditModal(titol, nom, link, onSave, onDelete = null) {
  document.getElementById("editTitle").textContent = titol;
  document.getElementById("editNom").value = nom || "";
  document.getElementById("editLink").value = link || "";

  const modal = document.getElementById("editModal");
  modal.style.display = "flex";

  document.getElementById("editGuardar").onclick = () => {
    const nomFinal = document.getElementById("editNom").value.trim();
    const linkFinal = document.getElementById("editLink").value.trim();
    modal.style.display = "none";
    onSave(nomFinal, linkFinal);
  };

  const esborrarBtn = document.getElementById("editEsborrar");
  if (onDelete) {
    esborrarBtn.style.display = "inline-block";
    esborrarBtn.onclick = () => {
      modal.style.display = "none";
      onDelete();
    };
  } else {
    esborrarBtn.style.display = "none";
  }
}

function tancarEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function renderGaleria() {
  const container = document.querySelector(".acordio-galeria");
  if (!container) return;

  container.innerHTML = "";
  const cursos = {};

  for (const key in links) {
    const entrada = links[key];
    const nom = entrada.nom || key;
    const link = entrada.link;

    const anyMatch = nom.match(/\d{4}/);
    const any = anyMatch ? parseInt(anyMatch[0]) : new Date().getFullYear();
    const nomText = nom.toLowerCase();
    const curs = any - (nomText.includes("tardor") ? 0 : 1);
    const etiqueta = `Curs ${curs}–${curs + 1}`;

    if (!Array.isArray(cursos[etiqueta])) cursos[etiqueta] = [];
    cursos[etiqueta].push({ key, nom });
  }

  for (const etiqueta in cursos) {
    const acordio = document.createElement("div");
    acordio.classList.add("acordio");
    acordio.innerHTML = `
      <button class="acordio-titol"><span>${etiqueta}</span><span class="fletxa">▼</span></button>
      <div class="acordio-contingut"></div>
    `;

    // ✅ correcte: defineix "contingut"
    const contingut = acordio.querySelector(".acordio-contingut");

    // ✅ listener per obrir/tancar acordions
    acordio.querySelector(".acordio-titol").addEventListener("click", () => {
      const jaObert = acordio.classList.contains("open");
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
      if (!jaObert) acordio.classList.add("open");
    });

    cursos[etiqueta].forEach(({ key, nom }) => {
      const btn = document.createElement("button");
      btn.textContent = nom;
      btn.onclick = () => requestAccess(key);
      btn.dataset.key = key;
      contingut.appendChild(btn);
    });

    container.appendChild(acordio);
  }

  if (esAdmin) activarModeAdmin();
}

    
    acordio.querySelector(".acordio-titol").addEventListener("click", () => {
      const jaObert = acordio.classList.contains("open");
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
      if (!jaObert) acordio.classList.add("open");
    });

    cursos[etiqueta].forEach(({ key, nom }) => {
      const btn = document.createElement("button");
      btn.textContent = nom;
      btn.onclick = () => requestAccess(key);
      btn.dataset.key = key;
      contenidor.appendChild(btn);
    });

    acordio.querySelector(".acordio-titol").addEventListener("click", () => {
      const jaObert = acordio.classList.contains("open");
    
      // Tanquem tots
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
    
      // Si el que hem clicat no estava obert, l’obrim
      if (!jaObert) {
        acordio.classList.add("open");
      }
    });



    container.appendChild(acordio);
  }

  if (esAdmin) activarModeAdmin();
}






