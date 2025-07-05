let galeria = {};  // Nou format: { "Curs 2024–2025": { k123: {...} } }
let esAdmin = false;
let currentCurs = "";
let currentKey = "";

// Carrega des de Firebase
firebase.database().ref("galeria").once("value").then(snapshot => {
  const data = snapshot.val();
  if (data) {
    galeria = data;
    renderGaleria();
  }
});

// Desa a Firebase
function desaLinks() {
  firebase.database().ref("galeria").set(galeria);
}

// 🔐 Accés públic
const correctPassword = "esplai123";

// 🔓 Modal d'accés
function requestAccess(key, curs) {
  currentKey = key;
  currentCurs = curs;

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
    const entrada = galeria?.[currentCurs]?.[currentKey];
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
    const curs = acordio.dataset.curs;
    const afegirBtn = document.createElement("button");
    afegirBtn.textContent = "+";
    afegirBtn.className = "boto-admin";
    afegirBtn.onclick = () => afegirNovaSeccio(curs);
    acordio.appendChild(afegirBtn);

    acordio.querySelectorAll('.acordio-contingut button').forEach(btn => {
      btn.onclick = () => editarSeccio(btn.dataset.key, curs);
    });
  });

  const botoGlobal = document.createElement("button");
  botoGlobal.textContent = "+";
  botoGlobal.className = "boto-admin";
  botoGlobal.onclick = afegirNouCurs;
  document.querySelector(".acordio-galeria").appendChild(botoGlobal);
}

function afegirNouCurs() {
  const any = prompt("Introdueix l’any inicial (ex: 2024)");
  if (!any || isNaN(any)) return;

  const etiqueta = `Curs ${any}–${parseInt(any)+1}`;
  if (galeria[etiqueta]) {
    alert("Aquest curs ja existeix.");
    return;
  }

  galeria[etiqueta] = {};
  desaLinks();
  renderGaleria();
}

function afegirNovaSeccio(curs) {
  obrirEditModal("Afegir nova secció", "", "", (nom, link) => {
    if (!nom || !link) return;
    const key = `k_${Date.now()}`;
    galeria[curs][key] = { nom, link };
    desaLinks();
    renderGaleria();
  });
}

function editarSeccio(key, curs) {
  const entrada = galeria[curs]?.[key];
  if (!entrada) return;

  obrirEditModal("Editar secció", entrada.nom, entrada.link, (nouNom, nouLink) => {
    const novaKey = `k_${Date.now()}`;
    galeria[curs][novaKey] = { nom: nouNom, link: nouLink };
    delete galeria[curs][key];
    desaLinks();
    renderGaleria();
  }, () => {
    delete galeria[curs][key];
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

  const cursosOrdenats = Object.keys(galeria).sort().reverse();

  for (const curs of cursosOrdenats) {
    const acordio = document.createElement("div");
    acordio.classList.add("acordio");
    acordio.dataset.curs = curs;

    acordio.innerHTML = `
      <button class="acordio-titol">
        <span>${curs}</span><span class="fletxa">▼</span>
      </button>
      <div class="acordio-contingut"></div>
    `;

    const contingut = acordio.querySelector(".acordio-contingut");

    for (const key in galeria[curs]) {
      const entrada = galeria[curs][key];
      const btn = document.createElement("button");
      btn.textContent = entrada.nom;
      btn.onclick = () => requestAccess(key, curs);
      btn.dataset.key = key;
      contingut.appendChild(btn);
    }

    acordio.querySelector(".acordio-titol").addEventListener("click", () => {
      const jaObert = acordio.classList.contains("open");
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
      if (!jaObert) acordio.classList.add("open");
    });

    container.appendChild(acordio);
  }

  if (esAdmin) activarModeAdmin();
}

// Animació del header
window.addEventListener("scroll", () => {
  const logoHeader = document.querySelector(".logo");
  if (!logoHeader) return;
  if (window.scrollY > 50) {
    logoHeader.classList.add("compacte");
  } else {
    logoHeader.classList.remove("compacte");
  }
});
