let currentKey = "";

const links = {
  Dormida2025: "https://photos.app.goo.gl/VzGMH4Wpwv4ASjP79",
  ColoniesPrimavera2025: "https://photos.app.goo.gl/GeenKZG7Xrc9o3uM7",
  ColoniesTardor2024: " https://photos.app.goo.gl/rr3D1v1h3W8EKn2CA",
  campaments2024: "  ",
  Dormida2024: "https://photos.app.goo.gl/ENLLAC_COLONIES2024",
  ColoniesPrimavera2024: "https://photos.app.goo.gl/ENLLAC_CAMPAMENTS2023",
  ColoniesTardor2023: "https://photos.app.goo.gl/ENLLAC_SETMANA2023",
  campaments2023: "  ",
  Dormida2023: "https://photos.app.goo.gl/ENLLAC_COLONIES2024",
  ColoniesPrimavera2023: "https://photos.app.goo.gl/ENLLAC_CAMPAMENTS2023",
  ColoniesTardor2022: "https://photos.app.goo.gl/ENLLAC_SETMANA2023",
  campaments2022: "  "
}

const correctPassword = "esplai123";

// Obrir el modal
function requestAccess(key) {
  currentKey = key;
  const modal = document.getElementById("passwordModal");
  const input = document.getElementById("passwordInput");

  modal.style.display = "flex";
  input.value = "";
  input.focus();
}

// Tancar el modal
function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
}

// Validar la contrasenya
function validatePassword() {
  const input = document.getElementById("passwordInput").value.trim();
  if (input === correctPassword) {
    closeModal();
    if (links[currentKey]) {
      window.open(links[currentKey], "_blank");
    }
  } else {
    alert("Contrasenya incorrecta.");
  }
}

// Tancar modal amb ESC o enviar amb ENTER
document.addEventListener("keydown", function (e) {
  const modalVisible = document.getElementById("passwordModal").style.display === "flex";
  if (modalVisible && e.key === "Escape") closeModal();
  if (modalVisible && e.key === "Enter") validatePassword();
});

// Scroll suau per enllaços amb hash (si vols afegir-ne)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll('.acordio-titol').forEach(btn => {
  btn.addEventListener('click', () => {
    const acordio = btn.parentElement;
    const tots = document.querySelectorAll('.acordio');

    tots.forEach(el => {
      if (el !== acordio) el.classList.remove('open');
    });

    acordio.classList.toggle('open');
  });
});

// Que fem?

const sliderContainer = document.querySelector("#slider-que-fem .slider-inner");
const prevBtn = document.querySelector("#slider-que-fem .prev");
const nextBtn = document.querySelector("#slider-que-fem .next");

const sliderImages = [
  "foto1.png",
  "foto2.png",
  "foto3.png",
  "foto4.png",
  "foto5.png",
  "foto6.png"
];

// Càrrega dinàmica
sliderImages.forEach(imgName => {
  const img = document.createElement("img");
  img.src = `assets/que-fem/${imgName}`;
  img.alt = imgName;
  sliderContainer.appendChild(img);
});



let currentSlide = 0;

function updateSlider() {
  const width = sliderContainer.clientWidth;
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

// Passa automàticament cada 5s
setInterval(() => {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  updateSlider();
}, 5000);

const adminPassword = "casalotAdmin123";

// Obrir modal amb clic al logo
document.querySelector(".logo img").addEventListener("click", () => {
  document.getElementById("adminPanel").style.display = "flex";
  document.getElementById("adminInput").value = "";
  document.getElementById("adminInput").focus();
});

function validateAdmin() {
  const input = document.getElementById("adminInput").value.trim();
  if (input === adminPassword) {
    closeAdmin();
    document.getElementById("editorGal").classList.remove("ocult");
  } else {
    alert("Contrasenya incorrecta.");
  }
}



function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

function afegirNovaEntrada() {
  const nom = document.getElementById("nomSeccio").value.trim();
  const any = document.getElementById("anySeccio").value.trim();
  const link = document.getElementById("linkSeccio").value.trim();

  if (!nom || !any || !link) {
    alert("Omple tots els camps.");
    return;
  }

  const key = (nom + any).replace(/\s+/g, '');
  links[key] = link; // ✅ Sempre actualitza link al backend

  const label = `${nom} ${any}`;
  const curs = parseInt(any) - (nom.toLowerCase().includes("tardor") ? 0 : 1);
  const etiqueta = `Curs ${curs}–${curs + 1}`;

  // 🧠 Busca si ja existeix el bloc del curs
  let acordio = [...document.querySelectorAll('.acordio')].find(a =>
    a.querySelector('.acordio-titol')?.textContent.includes(etiqueta)
  );

  // Si no existeix el curs → crea
  if (!acordio) {
    acordio = document.createElement("div");
    acordio.classList.add("acordio");
    acordio.innerHTML = `
      <button class="acordio-titol"><span>${etiqueta}</span><span class="fletxa">▼</span></button>
      <div class="acordio-contingut" style="display: flex;"></div>
    `;
    document.querySelector(".acordio-galeria").prepend(acordio);

    // Activa el toggle
    acordio.querySelector(".acordio-titol").addEventListener("click", () => {
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
      acordio.classList.toggle("open");
    });
  }

  const contenidor = acordio.querySelector(".acordio-contingut");

  // 🔍 Comprova si ja hi ha una activitat amb el mateix nom i any
  const botoExist = [...contenidor.querySelectorAll("button")].find(b =>
    b.textContent.trim().toLowerCase() === label.toLowerCase()
  );

  if (botoExist) {
    // ✅ Ja existeix → només actualitzem l'onclick
    botoExist.onclick = () => requestAccess(key);
    alert(`S'ha actualitzat el link de "${label}".`);
  } else {
    // 🆕 No existeix → l'afegim
    const nouBoto = document.createElement("button");
    nouBoto.textContent = label;
    nouBoto.onclick = () => requestAccess(key);
    contenidor.appendChild(nouBoto);
    alert(`S'ha afegit "${label}" al curs ${etiqueta}.`);
  }

  // 🔄 Neteja el formulari
  document.getElementById("nomSeccio").value = "";
  document.getElementById("anySeccio").value = "";
  document.getElementById("linkSeccio").value = "";
}


  // Troba o crea la secció per al curs
  const curs = parseInt(any) - (nom.toLowerCase().includes("tardor") ? 0 : 1);
  const etiqueta = `Curs ${curs}–${curs + 1}`;

  let blocCurs = [...document.querySelectorAll('.acordio-titol')]
    .find(el => el.textContent.includes(etiqueta));

  if (!blocCurs) {
    // Crear nou acordió
    const nova = document.createElement("div");
    nova.classList.add("acordio");
    nova.innerHTML = `
      <button class="acordio-titol"><span>${etiqueta}</span><span class="fletxa">▼</span></button>
      <div class="acordio-contingut" style="display: flex;">
        <button onclick="requestAccess('${key}')">${nom} ${any}</button>
      </div>`;
    document.querySelector(".acordio-galeria").prepend(nova);

    nova.querySelector(".acordio-titol").addEventListener("click", () => {
      document.querySelectorAll(".acordio").forEach(a => a.classList.remove("open"));
      nova.classList.toggle("open");
    });

  } else {
    const container = blocCurs.nextElementSibling;
    const btn = document.createElement("button");
    btn.textContent = `${nom} ${any}`;
    btn.onclick = () => requestAccess(key);
    container.appendChild(btn);
  }

  // Neteja
  document.getElementById("nomSeccio").value = "";
  document.getElementById("anySeccio").value = "";
  document.getElementById("linkSeccio").value = "";

  alert("Afegit correctament!");


document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo img");
  if (!logo) {
    console.warn("No s'ha trobat el logo per afegir el clic d'administració.");
    return;
  }

  logo.addEventListener("click", () => {
    document.getElementById("adminPanel").style.display = "flex";
    document.getElementById("adminInput").value = "";
    document.getElementById("adminInput").focus();
  });
});









