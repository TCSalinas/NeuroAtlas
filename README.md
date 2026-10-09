# NeuroAtlas: Plataforma Interactiva de Estudio de Neuropsicología

NeuroAtlas es una herramienta web académica y visual diseñada para estudiantes y docentes de neuropsicología y neurociencias. Su núcleo es una maqueta interactiva tridimensional del cerebro humano vinculada de manera estricta y trazable con los contenidos, diapositivas y apuntes del curso de neuropsicología.

Desarrollada para operar sin backend y desplegable de forma directa y continua en **GitHub Pages**.

---

## 🧠 Características Principales

### 1. Maqueta Cerebral 3D Interactiva
- **Exploración Libre y Ángulos Predefinidos**: Navegación en 360°, zoom orbital, paneo y vistas ortogonales inmediatas (Lateral Izquierda, Lateral Derecha, Medial/Sagital, Dorsal, Ventral, Frontal y Occipital).
- **Selección Anatómica Sincronizada**: Al hacer clic sobre cualquier estructura en 3D, se resalta con material emisivo y se sincroniza en tiempo real con el árbol temático y la ficha de estudio.
- **Modo Rayos X (*Ghosting*)**: Al inspeccionar estructuras profundas (Tálamo, Hipocampo, Amígdala, Ganglios de la Base, Cuerpo Calloso), la corteza superficial se vuelve translúcida (`opacity: 0.18`), permitiendo apreciar la localización tridimensional exacta de los núcleos internos.
- **Modo Aislamiento**: Posibilidad de aislar visualmente cualquier estructura para estudiar su morfología y límites sin interferencias visuales.
- **Cortes Anatómicos Dinámicos 3D (*Clipping Planes*)**: Deslizadores interactivos para seccionar el modelo cerebral en tiempo real a lo largo de los planos **Sagital**, **Coronal** y **Axial / Horizontal**.

### 2. Módulo de Territorios Vasculares y ACV (Unidad 3)
- Mapeo cromático de los territorios de irrigación:
  - **Arteria Cerebral Anterior (ACA)**: cara medial frontal/parietal; síndromes de acinesia, mutismo acinético y abulia.
  - **Arteria Cerebral Media Izquierda (ACM Dominante)**: afasias (Broca/Wernicke), apraxias, Síndrome de Gerstmann (acalculia, agrafia, agnosia digital).
  - **Arteria Cerebral Media Derecha (ACM No Dominante)**: heminegligencia espacial izquierda, anosognosia, asomatognosia, aprosodia y conducta heboide.
  - **Arteria Cerebral Posterior (ACP)**: hemianopsia homónima, alexia sin agrafia (desconexión occipitocallosa), agnosia visual y amnesia.
  - **Sistema Vértebro-Basilar / Tronco**: afección del estado de vigilia (SRAA) y pares craneales.
  - **Arterias Perforantes Lenticuloestriadas**: infartos lacunares en cápsula interna y ganglios basales.

### 3. Visor de Citoarquitectura Neocortical (Unidad 1)
- Representación transversal interactiva de las **6 capas neocorticales** (Capa I Molecular a Capa VI Multiforme) y microcolumnas corticales según los esquemas de cátedra (Squire et al., 2003 y Mitchell & Patterson, 1954).
- Detalle de células piramidales (Betz en Capa V), interneuronas estrelladas receptoras talámicas en Capa IV, aferencias y eferencias de cada capa.
- Tabla de correspondencia con las principales áreas de Brodmann (BA 4, 6, 8, 9/46, 44/45, 1/2/3, 5/7, 39, 40, 17, 18/19, 41/42, 22, 11/47).

### 4. Matriz Comparativa de Demencias (Unidad 5)
- Tabla comparativa interactiva basada en la **Tabla 2 de la diapositiva 33** de la cátedra:
  - Enfermedad de Alzheimer (EA)
  - Demencia Vascular (DV)
  - Degeneración Lobar Frontotemporal (DLFT: conductual, nfvPPA, semántica)
  - Demencia por Cuerpos de Lewy (DL)
  - Hidrocefalia Normotensiva (Síndrome de Hakim-Adams)
  - Enfermedad de Parkinson con Demencia (EPD)
- Filtros por: Clínica Inicial, Deterioro Cognitivo, Exploración Neurológica, Exploración Psiquiátrica, Hallazgos en Neuroimagen y Fisiopatología.

### 5. Herramientas de Estudio y Autoevaluación
- **Buscador Omnibox (⌘K / Ctrl+K)**: Indexación instantánea en memoria por nombre de estructura, sinónimo, función, síntoma clínico o unidad temática.
- **Banco de Autoevaluación Formativa**: Cuestionario interactivo con retroalimentación inmediata y explicaciones teóricas fundamentadas en los apuntes.
- **Seguimiento de Progreso**: Marcado de estructuras dominadas y estado del cuestionario persistido en `localStorage` del navegador.
- **Atlas 2D Accesible**: Alternativa textual y taxonómica completa para dispositivos de bajo consumo o entornos sin aceleración WebGL2.

---

## 📚 Trazabilidad y Fuentes Académicas

Toda la información contenida en NeuroAtlas deriva estrictamente de:

1. **Materiales Locales del Curso**:
   - `-1656795872_Panoramica neurofuncional .pdf` (Bernard J. Baars & Nicole M. Gage; Standring; Squire et al.).
   - `NEUROPATOLOGIA TEC Y ACV 2022.pdf` (Kolb & Whishaw; MINSAL; UBC Neuroanatomy).
   - `nauropatologia Ev Neuropsicologica 2020 Demencia y otros.pdf` (Cátedra de Neuropatología Clínica y Evaluación Neuropsicológica).
   - `EC - Apuntes Salud (1).pdf` (Psicología de la salud y modelos biopsicosociales).
2. **Fuentes Complementarias Obligatorias**:
   - **Neuroanatomía Universidad de La Frontera (UFRO)**: `https://neuroanatomia.ufro.cl/apuntes/` (CC BY-NC-SA 4.0).
   - **Clinical Anatomy UBC (University of British Columbia)**: `https://www.neuroanatomy.ca/modules/CNSintro/story.html` y `https://www.neuroanatomy.ca/stroke.html` (Dr. Claudia Krebs).

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite.
- **Visualización 3D**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`).
- **Estilos**: Tailwind CSS + Lucide React.
- **Gestión de Estado**: Zustand con persistencia en `localStorage`.
- **Alojamiento y Despliegue**: GitHub Pages (100% estático, cero backend).

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)

### Instalación y Ejecución

```bash
# Clonar o situarse en el directorio del proyecto
cd Neubrain

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev
```

El servidor Vite se iniciará típicamente en `http://localhost:5173/`.

### Compilación para Producción

```bash
npm run build
```

Los archivos estáticos listos para producción se generan en la carpeta `dist/`, configurados con rutas relativas (`base: './'`) para ser servidos bajo cualquier subdirectorio de GitHub Pages.

---

## 🌐 Despliegue en GitHub Pages

El proyecto incluye el flujo de trabajo automatizado en `.github/workflows/deploy.yml`.

Para desplegar:
1. Subir el repositorio a GitHub (`git push origin main`).
2. En GitHub, ir a **Settings** -> **Pages**.
3. En **Build and deployment > Source**, seleccionar **GitHub Actions**.
4. Cada push a `main` compilará y publicará la plataforma automáticamente.

---

## ⚖️ Licencia y Atribución Ética

- El código fuente de la plataforma se distribuye bajo licencia **MIT**.
- Los contenidos de referencia de Neuroanatomía UFRO se utilizan bajo licencia **CC BY-NC-SA 4.0** (Camila Díaz / Universidad de La Frontera).
- Esta plataforma es una herramienta pedagógica de estudio universitario, no un dispositivo de diagnóstico clínico.
