# Arquitectura Frontend

## 1. Propósito

Este documento describe la arquitectura general del frontend de NovaCore, incluyendo su organización de archivos, separación de responsabilidades, tecnologías utilizadas y criterios adoptados para facilitar su mantenimiento y evolución.

La arquitectura está diseñada para mantener el proyecto ligero, modular y comprensible, evitando introducir complejidad innecesaria durante las primeras etapas de desarrollo.

El frontend utiliza tecnologías web nativas y módulos especializados para determinadas funcionalidades, manteniendo una separación clara entre estructura, presentación, comportamiento e interacción.

---

## 2. Tecnologías principales

El frontend está construido principalmente con:

- HTML5
- CSS3
- JavaScript
- Three.js

También utiliza recursos externos cuando aportan una funcionalidad específica, procurando mantener control sobre las dependencias utilizadas.

No se utiliza actualmente un framework frontend como React, Vue o Angular.

La ausencia de un framework permite mantener una arquitectura sencilla y proporciona control directo sobre:

- La estructura HTML.
- Los estilos.
- El comportamiento de la interfaz.
- Las animaciones.
- Las visualizaciones interactivas.
- La carga de recursos.

La incorporación de nuevas herramientas o frameworks deberá evaluarse de acuerdo con las necesidades reales del proyecto.

---

## 3. Estructura general

La aplicación frontend se encuentra dentro del directorio `frontend/`.

```text
frontend/
│
├── assets/
│   ├── graphics/
│   ├── icos/
│   └── images/
│
├── css/
│   ├── base/
│   ├── components/
│   └── layouts/
│
├── js/
│
├── views/
│   └── team.html
│
└── index.html
```

Cada directorio tiene una responsabilidad específica.

## 4. HTML

Los documentos HTML representan la estructura y el contenido semántico de la aplicación.

`index.html`

Es el punto de entrada principal del frontend.

Contiene la estructura principal de la página inicial y actúa como entrada principal para la navegación del sitio.

`views/`

Contiene páginas internas independientes de la página principal.

Por ejemplo:
```
views/
└── team.html
```

La carpeta permite mantener separadas las diferentes vistas sin convertir index.html en un documento excesivamente grande.

A medida que el proyecto crezca, podrán incorporarse nuevas vistas siguiendo la misma estructura.

##  5. Assets

Los recursos estáticos se encuentran en:

```
assets/
├── graphics/
├── icos/
└── images/
graphics/
```

Contiene recursos gráficos utilizados por la interfaz.

`icos/`

Contiene iconos y recursos relacionados con elementos gráficos pequeños o reutilizables.

`images/`

Contiene imágenes utilizadas por las diferentes vistas del sitio.

La separación permite localizar rápidamente los recursos y evita mezclar diferentes tipos de archivos estáticos.

## 6. Arquitectura CSS

Los estilos se encuentran organizados en tres niveles:

```
css/
├── base/
├── components/
└── layouts/
```

Esta organización está basada en la responsabilidad de cada archivo y no únicamente en la página donde se utiliza.

`base/`

Contiene los fundamentos globales del sistema visual.

```
base/
├── variables.css
├── reset.css
├── themes.css
└── animations.css
variables.css
```

Define variables reutilizables relacionadas con:

- Tipografía.
- Tamaños.
- Espaciado.
- Contenedores.
- Bordes.
- Transiciones.
- Capas de visualización.
- Breakpoints.
- Colores.

El objetivo es evitar valores duplicados y proporcionar un sistema visual centralizado.

`reset.css`

Normaliza los estilos básicos del navegador y establece una base consistente para los diferentes elementos HTML.

`themes.css`

Define los valores asociados a los diferentes temas visuales.

Actualmente el sistema contempla principalmente:

- Tema oscuro.
- Tema claro.

La interfaz utiliza variables CSS para permitir que los componentes consuman los valores del tema sin depender directamente de colores específicos.

`animations.css`

Contiene animaciones y comportamientos visuales globales que pueden ser reutilizados por diferentes componentes.

También contempla la preferencia del usuario:

prefers-reduced-motion

para reducir o eliminar determinadas animaciones cuando el usuario así lo solicita mediante la configuración de su sistema.

## 7. Componentes CSS

La carpeta:

css/components/

contiene estilos asociados a componentes reutilizables de la interfaz.

Algunos ejemplos son:

```
components/
├── typography.css
├── buttons.css
├── container.css
├── brand.css
├── navigation.css
├── languaje-selector.css
├── section-meta.css
├── capability.css
├── projects.css
├── core.css
├── metrics.css
├── contact.css
└── team.css
```

Los componentes deben representar elementos con una responsabilidad visual concreta.

Por ejemplo:

buttons.css

debe encargarse de los botones y no de la estructura general del encabezado.

Esta separación permite reutilizar componentes en diferentes vistas.

## 8. Layouts CSS

La carpeta:

css/layouts/

contiene estilos relacionados con la estructura y distribución general de las diferentes áreas del sitio.

Por ejemplo:

```
layouts/
├── header.css
├── hero.css
├── sections.css
├── footer.css
├── mobile-menu.css
└── team-navigation.css
```

Los layouts definen principalmente:

- Distribución.
- Posicionamiento.
- Grid.
- Flexbox.
- Espaciado estructural.
- Comportamiento responsive de grandes áreas.

La diferencia principal respecto a components/ es que los layouts describen cómo se organizan las áreas de la interfaz, mientras que los componentes describen elementos reutilizables.

## 9. JavaScript

La lógica del frontend se encuentra en:

frontend/js/

Los scripts se dividen según su responsabilidad.

Actualmente se contemplan funcionalidades como:

```
js
├── i18n.js
├── animations.js
├── mobile-menu.js
├── hero-core.js
└── team-core.js
```

`i18n.js`

Gestiona el sistema de internacionalización.

Sus responsabilidades incluyen:

`Aplicación de traducciones.`
`Cambio de idioma.`
`Persistencia de la preferencia.`
`Actualización de atributos traducibles.`
`Actualización de metadatos.`
`Sincronización entre pestañas.`

Actualmente se contemplan los idiomas:

Español
Inglés

`animations.js`

Gestiona comportamientos generales relacionados con las animaciones de entrada y aparición de elementos.

Las animaciones se apoyan en atributos HTML como:

data-reveal

Esto permite controlar el comportamiento visual desde la estructura HTML sin acoplar cada elemento a una implementación JavaScript específica.

`mobile-menu.js`

Gestiona el comportamiento de la navegación móvil.

Entre sus responsabilidades se encuentran:

- Apertura del menú.
- Cierre del menú.
- Estado aria-expanded.
- Actualización del aria-label.
- Cierre mediante Escape.
- Cierre al seleccionar un enlace.
- Bloqueo del scroll del documento mientras el menú está abierto.

`hero-core.js`

Gestiona la visualización 3D interactiva utilizada en la sección correspondiente.

Utiliza Three.js para crear y controlar:

- Geometría.
- Cámara.
- Escena.
- Iluminación visual.
- Animaciones.
- Partículas.
- Interacción con el cursor.
- Responsive behavior.


`team-core.js`

Gestiona las visualizaciones 3D relacionadas con determinadas vistas internas.

Su implementación se mantiene independiente del resto de la aplicación para evitar acoplar Three.js con la navegación o la estructura general.

## 10. Visualizaciones 3D

Las visualizaciones 3D se consideran funcionalidades especializadas dentro del frontend.

Su implementación utiliza Three.js y se mantiene separada de los estilos y de la lógica general del sitio.

La arquitectura busca que una visualización pueda:

1. Inicializarse cuando sea necesaria.
2. Adaptarse al tamaño de su contenedor.
3. Responder a la interacción del usuario.
4. Respetar prefers-reduced-motion.
5. Liberar recursos cuando deje de utilizarse.

Esto es especialmente importante debido a que WebGL puede consumir recursos considerablemente mayores que una interfaz HTML/CSS convencional.

## 11. Internacionalización

El frontend utiliza un sistema de internacionalización propio.

Los elementos traducibles se identifican mediante atributos como:

`data-i18n="..."`

Por ejemplo:

```html
<h1 data-i18n="hero.title">
    Título
</h1>
```

Las traducciones se mantienen separadas de la estructura HTML.

Esto permite cambiar el idioma sin duplicar páginas completas.

El sistema también contempla atributos HTML que no contienen texto visible, como:

alt
aria-label
placeholder
title

La selección de idioma se conserva mediante localStorage.

Además, los cambios pueden sincronizarse entre diferentes pestañas mediante el evento storage.

## 12. Responsive Design

La interfaz utiliza un enfoque responsive basado principalmente en CSS.

Los estilos se adaptan mediante media queries y variables de diseño.

Los principales puntos considerados son:

Mobile
Tablet
Desktop
Large Desktop

La adaptación responsive puede afectar:

- Layouts.
- Tipografía.
- Espaciado.
- Navegación.
- Menús.
- Componentes.
- Visualizaciones 3D.

Determinadas funcionalidades JavaScript también utilizan breakpoints para cambiar su comportamiento.

Por ejemplo, las visualizaciones 3D pueden sustituirse o desactivarse en dispositivos pequeños cuando su presencia no aporta suficiente valor frente a su coste de procesamiento.

## 13. Accesibilidad

La arquitectura frontend considera la accesibilidad como parte de la implementación y no como una etapa posterior.

Se utilizan elementos HTML semánticos como:

header
nav
main
section
article
footer

También se utilizan atributos ARIA cuando proporcionan información adicional necesaria para tecnologías asistivas.

Entre ellos:

aria-label
aria-expanded
aria-controls
aria-hidden
aria-labelledby

Los elementos interactivos deben mantener estados de foco visibles.

Las animaciones también deben respetar:

prefers-reduced-motion

## 14. Separación de responsabilidades

La arquitectura sigue una separación conceptual similar a:

```
HTML
 │
 │ estructura y contenido
CSS
 │
 │ presentación y layout
JavaScript
 │
 │ comportamiento e interacción
Three.js
 │
 │ visualizaciones 3D especializadas
Browser
```

Cada tecnología debe utilizarse para la responsabilidad que le corresponde.

### HTML

Responsable de:

- Estructura.
- Semántica.
- Contenido.
- Accesibilidad estructural.

### CSS

Responsable de:

- Presentación.
- Layout.
- Responsive design.
- Estados visuales.
- Animaciones CSS.

### JavaScript

Responsable de:

- Interactividad.
- Estado.
- Eventos.
- Lógica de interfaz.
- Integración entre componentes.

### Three.js

Responsable exclusivamente de las visualizaciones 3D que requieren WebGL.

## 15. Principios arquitectónicos

El frontend sigue los siguientes principios:

### Modularidad

Las funcionalidades deben mantenerse separadas por responsabilidad.

### Bajo acoplamiento

Un componente no debería depender innecesariamente de la implementación interna de otro.

### Reutilización

Los componentes y estilos comunes deben poder utilizarse en diferentes vistas.

### Simplicidad

No se debe introducir una abstracción o dependencia cuando una solución más sencilla sea suficiente.

### Progresividad

La arquitectura debe permitir agregar funcionalidades sin tener que reconstruir el frontend existente.

### Accesibilidad

Las decisiones visuales y de interacción no deben impedir el uso del sitio.

### Rendimiento

Los recursos computacionalmente costosos deben utilizarse de manera controlada.

### Mantenibilidad

La organización del código debe facilitar que una persona pueda comprender y modificar el proyecto incluso después de un periodo prolongado sin trabajar en él.

## 16. Reglas para futuras modificaciones

Antes de agregar un nuevo archivo, se debe determinar su responsabilidad.

**Si es un estilo global:**

css/base/

**Si pertenece a un componente reutilizable:**

css/components/

**Si controla una estructura de página o sección:**

css/layouts/

**Si contiene lógica JavaScript:**

js/

**Si es una nueva página:**

views/

**Si es un recurso estático:**

assets/


La estructura existente debe mantenerse antes de crear nuevos niveles de organización.

## 17. Evolución futura

La arquitectura actual está diseñada para una aplicación web estática de tamaño pequeño o mediano.

Si las necesidades del proyecto aumentan significativamente, podrían evaluarse nuevas herramientas o arquitecturas.

Algunas posibilidades futuras incluyen:

- Sistema de componentes más avanzado.
- Framework frontend.
- Generador de sitios estáticos.
- Backend.
- API.
- Sistema de gestión de contenido.
- Formularios conectados a servicios externos.
- Analytics.
- Optimización avanzada de assets.
- Automatización adicional del proceso de build.

La incorporación de cualquiera de estas tecnologías deberá evaluarse antes de modificar la arquitectura actual.

Una nueva tecnología no debe incorporarse únicamente por tendencia o conveniencia momentánea.

## 18. Diagrama general

La arquitectura actual puede resumirse de la siguiente manera:

```text

                         NOVACORE FRONTEND
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
            HTML              CSS            JavaScript
              │                 │                 │
              │          ┌──────┼───────────┐     │
              │          │      │           │     │
              │        Base  Components Layouts Modules
              │                                      │
              │                         ┌────────────┼────────────┐
              │                         │            │            │
              │                       i18n       Animation    Interaction
              │                                                    │
              │                                                Three.js
              │                                                    │
              └────────────────────────────┬───────────────────────┘
                                           │
                                       Browser
```

## 19. Estado

**Estado**: Vigente

**Última actualización**: 2026

Este documento debe actualizarse cuando se produzcan cambios estructurales relevantes en la arquitectura frontend.