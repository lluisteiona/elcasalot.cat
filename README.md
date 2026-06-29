# Esplai El Casalot — Web React

## Estructura del projecte

```
casalot/
├── public/
│   ├── index.html          ← Entry point HTML
│   ├── CNAME               ← Domini custom (elcasalot.cat)
│   └── assets/
│       ├── logo.png
│       ├── mapa.png
│       ├── favicon.png
│       └── que-fem/
│           ├── foto1.png … foto6.png
└── src/
    ├── index.js            ← Entry point React
    ├── App.jsx             ← Estat global i lògica
    ├── GlobalStyles.jsx    ← CSS injectat via JS (cap fitxer .css!)
    ├── config/
    │   ├── constants.js    ← Colors, contrasenyes, config slider
    │   └── firebase.js     ← Firebase SDK v9
    ├── hooks/
    │   └── index.js        ← useGaleria, useScrollCompact, useSlider
    └── components/
        ├── Header.jsx
        ├── Slider.jsx
        ├── Bloc.jsx        ← Wrapper de secció + H2, P, A
        ├── Sections.jsx    ← QuiSom, QueFem, OnSom, Esplac, Contacte, Instagram
        ├── Acordio.jsx
        ├── Galeria.jsx
        └── Modals.jsx      ← PasswordModal, AdminModal, EditModal
```

## Instal·lació i execució local

```bash
npm install
npm start
```

## Desplegament a GitHub Pages

### Primera vegada:

1. Crea un repositori a GitHub (ex: `elcasalot-web`)
2. Afegeix el remote:
   ```bash
   git init
   git remote add origin https://github.com/EL-TEU-USUARI/elcasalot-web.git
   ```
3. Desplega:
   ```bash
   npm run deploy
   ```
   Això fa automàticament:
   - `npm run build` → genera la carpeta `build/`
   - Puja la carpeta `build/` a la branca `gh-pages`

4. A GitHub → Settings → Pages → Source: **Deploy from branch** → `gh-pages` → `/ (root)`

### Cada actualització:

```bash
npm run deploy
```

### Domini custom (elcasalot.cat)

El fitxer `public/CNAME` ja conté `elcasalot.cat`.  
A GitHub → Settings → Pages → Custom domain: `elcasalot.cat`  
Al teu registrador de dominis, afegeix un registre DNS CNAME:  
`www → EL-TEU-USUARI.github.io`  
o registres A apuntant a les IPs de GitHub Pages.

## Notes importants

- **Cap fitxer `.css` ni `.js` extern** — tots els estils són inline o injectats via React
- **Firebase** — les dades de la galeria es carreguen en temps real
- **Accés admin** — clicar al logo del header
- **Les imatges** han d'estar a `public/assets/` i `public/assets/que-fem/`
