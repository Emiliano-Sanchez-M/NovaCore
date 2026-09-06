# NovaCore

Sitio web oficial de **NovaCore**, una consultoría tecnológica enfocada en software, sistemas y arquitectura digital.

Este repositorio contiene el desarrollo frontend, recursos visuales, estilos, scripts y configuración de despliegue utilizados para construir el sitio web de NovaCore.


## Descripción

NovaCore nace como una propuesta de consultoría tecnológica orientada al diseño y construcción de soluciones digitales.

El sitio web funciona como la presencia digital principal de la marca y está diseñado para evolucionar progresivamente junto con el proyecto.

El desarrollo se realiza utilizando tecnologías web estándar, manteniendo una arquitectura frontend modular y evitando dependencias innecesarias.


## Objetivos del proyecto

El desarrollo del sitio busca:

- Construir una identidad digital sólida para NovaCore.
- Presentar la marca de manera profesional.
- Mantener una arquitectura frontend clara y mantenible.
- Crear una experiencia responsive para diferentes dispositivos.
- Incorporar interacciones y visualizaciones tecnológicas.
- Preparar el sitio para internacionalización.
- Mantener una base preparada para futuras ampliaciones.
- Aplicar buenas prácticas de accesibilidad y SEO.
- Facilitar el despliegue mediante servicios de hosting estático.

---

## Tecnologías

El proyecto utiliza principalmente:

- **HTML5**
- **CSS3**
- **JavaScript**
- **Three.js**
- **Git**
- **GitHub**

El sitio no depende actualmente de un framework frontend como React, Vue o Angular.

La decisión de utilizar JavaScript y tecnologías web nativas permite mantener el proyecto ligero y proporciona mayor control sobre la estructura, rendimiento y comportamiento de la interfaz.

---

## Estructura del proyecto

```text
NovaCore/
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── database/
│
├── docs/
│
├── frontend/
│   │
│   ├── assets/
│   │   ├── graphics/
│   │   ├── icos/
│   │   └── images/
│   │
│   ├── css/
│   │   ├── base/
│   │   ├── components/
│   │   └── layouts/
│   │
│   ├── js/
│   │
│   ├── views/
│   │   └── team.html
│   │
│   └── index.html
│
├── .gitignore
├── LICENSE
└── readme.md
```

`.github/workflows`

Contiene los workflows utilizados para automatizar procesos relacionados con el repositorio.

Actualmente incluye la configuración necesaria para el despliegue mediante GitHub Pages.

`database`

Espacio reservado para los recursos relacionados con la persistencia de datos y futuras necesidades de backend o infraestructura.

`docs`

Contiene documentación relacionada con el proyecto, decisiones, planificación y aspectos técnicos que no forman parte directamente del código de la aplicación.

`frontend`

Contiene la aplicación web.

`assets`

Recursos estáticos utilizados por la interfaz.

```
assets/
├── graphics/
├── icos/
└── images/
```

`css`

Los estilos están organizados por responsabilidad.

```
css/
├── base/
├── components/
└── layouts/
```

`base/`

Contiene los fundamentos visuales globales:

- Variables
- Reset
- Temas
- Animaciones generales

`components/`

Contiene estilos asociados a elementos reutilizables de la interfaz.

`layouts/`

Contiene estilos relacionados con la distribución estructural de las diferentes áreas y páginas.

`js`

Contiene la lógica JavaScript del sitio.

Los scripts se dividen según su responsabilidad para evitar concentrar todo el comportamiento en un único archivo.

`views`

Contiene páginas internas del sitio que no corresponden directamente a la página principal.


## Arquitectura CSS

La organización de estilos sigue una separación basada en responsabilidades.


```text
Base
 │
 ├── Variables
 ├── Reset
 ├── Themes
 └── Animations
        │
Components
 │
 ├── Buttons
 ├── Navigation
 ├── Typography
 ├── Projects
 ├── Core
 └── ...
        │
Layouts
 │
 ├── Header
 ├── Hero
 ├── Sections
 ├── Footer
 └── ...
 ```

Esta separación permite modificar la estructura visual del sitio sin generar un acoplamiento excesivo entre componentes.

## Arquitectura JavaScript

El código JavaScript se divide en módulos y scripts independientes según la funcionalidad.

Entre sus responsabilidades se encuentran:

- Inicialización general.
- Internacionalización.
- Animaciones.
- Navegación responsive.
- Visualizaciones 3D.

Interacciones específicas de determinadas páginas.

La intención es mantener cada funcionalidad aislada y facilitar su mantenimiento y evolución.

## Internacionalización

El sitio cuenta con un sistema propio de internacionalización.

Actualmente contempla:

- Español.
- Inglés.

Las traducciones se gestionan mediante atributos HTML:

data-i18n

Esto permite separar el contenido traducible de la estructura visual.

También se utilizan atributos específicos para elementos como:

- `aria-label`
- `alt`
- `placeholder`
- `title`
- `Metadatos`

La preferencia de idioma se conserva mediante localStorage.

Además, el sistema permite sincronizar cambios de idioma entre diferentes pestañas abiertas del sitio.

## Diseño responsive

El sitio está diseñado para adaptarse a diferentes tamaños de pantalla.

Se consideran principalmente:

- Escritorio.
- Tablet.
- Dispositivos móviles.

La adaptación contempla:

- Navegación.
- Distribución de contenido.
- Tipografía.
- Espaciado.
- Componentes.
- Visualizaciones interactivas.
- Interacciones específicas para dispositivos pequeños.

## Visualizaciones 3D

Three.js se utiliza para determinadas experiencias visuales del sitio.

Su implementación busca complementar la interfaz y reforzar el concepto tecnológico de NovaCore sin convertir el 3D en un elemento obligatorio para navegar por el sitio.

Las visualizaciones se desarrollan de manera independiente respecto al resto de la interfaz.

Esto permite:

- Activarlas únicamente cuando son necesarias.
- Adaptarlas según el viewport.
- Reducir su impacto en dispositivos pequeños.
- Considerar preferencias de movimiento reducido.

## Accesibilidad

La accesibilidad forma parte de la estructura del proyecto.

Se utilizan elementos y atributos semánticos de HTML5 junto con características como:

- `aria-label`
- `aria-expanded`
- `aria-controls`
- `aria-hidden`
- `aria-labelledby`

Los elementos interactivos cuentan con estados de foco visibles y las animaciones consideran la preferencia:

prefers-reduced-motion

El objetivo es mantener una experiencia funcional independientemente del dispositivo o método de interacción utilizado.

## SEO

El proyecto contempla una base para optimización en motores de búsqueda.

Entre los aspectos considerados se encuentran:

- Estructura semántica.
- Jerarquía de encabezados.
- Títulos de página.
- Meta descripciones.
- Texto alternativo.
- URLs estructuradas.
- Datos estructurados.
- `robots.txt`.
- `sitemap.xml`.
- Metadatos para compartir contenido.
- Rendimiento.

La implementación SEO continuará evolucionando conforme se complete la infraestructura definitiva del sitio.

## Desarrollo local

El proyecto es una aplicación web estática, por lo que no requiere actualmente un servidor de aplicaciones para ejecutarse.

Para desarrollo local se recomienda utilizar un servidor HTTP.

Por ejemplo, mediante Live Server desde Visual Studio Code.

Esto permite trabajar correctamente con recursos como:

- Módulos JavaScript.
- Importaciones externas.
- Recursos estáticos.
- Rutas relativas.

## Despliegue

El proyecto está preparado para utilizar GitHub Pages como plataforma de despliegue.

El proceso se encuentra automatizado mediante GitHub Actions.

```
Commit
   │
GitHub
   │
GitHub Actions
   │
Build / Deploy
   │
GitHub Pages
```

La configuración correspondiente se encuentra en:

.github/workflows/deploy-pages.yml

## Principios de desarrollo

Durante el desarrollo se priorizan los siguientes principios:

**Modularidad**

Cada parte del sistema debe tener una responsabilidad clara.

**Mantenibilidad**

El código debe poder evolucionar sin requerir modificaciones innecesarias en otras partes del proyecto.

**Simplicidad**

Se evita introducir herramientas o dependencias cuando una solución nativa resulta suficiente.

**Consistencia**

Los componentes deben mantener patrones visuales y estructurales coherentes.

**Accesibilidad**

La experiencia visual no debe comprometer la funcionalidad ni la navegación.

**Rendimiento**

Las animaciones, recursos externos y visualizaciones deben utilizarse de manera intencional.

**Evolución progresiva**

El proyecto se desarrolla por etapas, permitiendo incorporar nuevas capacidades sin reconstruir completamente la base existente.

## Estado del proyecto

### En desarrollo activo.

La arquitectura actual corresponde a la primera etapa de construcción del sitio y continuará evolucionando conforme se definan nuevos requerimientos de NovaCore.

Las funcionalidades y estructuras del repositorio pueden cambiar durante el desarrollo.

## Próximas etapas

Algunas de las áreas consideradas para futuras versiones son:

- Finalización de la identidad visual.
- Optimización SEO.
- Optimización de rendimiento.
- Ampliación del sistema de páginas internas.
- Sistema de documentación de proyectos.
- Nuevas visualizaciones interactivas.
- Incorporación de nuevos miembros del equipo.
- Integración con servicios externos.
- Posible incorporación de backend.
- Mejoras progresivas en accesibilidad.
- Automatización adicional del despliegue.


## Licencia

Este proyecto se encuentra bajo la licencia especificada en el archivo `LICENSE`.

## Autor

**Emiliano Sánchez M.**

Fundador — NovaCore

Software & Systems