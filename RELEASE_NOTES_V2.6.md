# PAS Family Planner — Release Notes V 2.6

Fecha: 26/09/2026  
Estado: DEPLOYED — READY FOR USER VALIDATION

## Fuente semanal

Baseline público: PAS 008, semana 28 de septiembre al 2 de octubre de 2026.

El PDF original del colegio no se publica en el repositorio. La aplicación contiene únicamente los datos estructurados necesarios para la experiencia semanal.

## Cambios funcionales

- PAS 008 reemplaza PAS 006 como baseline público.
- Se incorpora la evaluación de Math del miércoles: “Evaluación de números reales y operaciones entre conjuntos”.
- Se soportan semanas que cruzan de un mes a otro.
- Se mantiene Horario V3.
- PAS semanal continúa teniendo prioridad sobre el horario general.
- Conocimientos Esenciales no se convierten automáticamente en tareas.
- Preparar continúa siendo un checklist logístico local.

## Vista Padres

La pantalla Padres se mantiene como una sola vista ejecutiva y ahora prioriza:

1. Lo importante de la semana.
2. Indicadores: evaluaciones, pendientes de preparar e información para padres.
3. Semana de un vistazo.
4. Prioridad semanal.
5. Evaluaciones.
6. Preparar esta semana.
7. Información para padres.

No se agregan calificaciones, vigilancia, perfiles ni mensajería.

## UX / identidad

- Nueva paleta Esmeralda como identidad visual de V 2.6.
- Áreas táctiles principales de 44 px.
- Nueva indicación visible de versión.
- Mejor jerarquía visual para lectura móvil.

## Actualización del PAS

- Se conserva Web Share Target.
- Se aceptan PDF con metadatos MIME variables.
- Si una app de correo abre PAS Family Planner sin entregar el archivo, se presenta un flujo de recuperación con Seleccionar PDF en lugar de una página de error.
- El service worker usa cache pas-family-v2.6.
- La PWA solicita actualización del service worker sin depender del caché HTTP.

## Validaciones técnicas ejecutadas

- Scripts JavaScript: syntax PASS.
- APP_VERSION 2.6: PASS.
- EMBEDDED_PAS_NUMBER 8: PASS.
- PAS 008 baseline: PASS.
- Semana cruzando septiembre/octubre: PASS.
- Math assessment: PASS.
- Vista Padres V 2.6 presente: PASS.
- Paleta Esmeralda: PASS.
- Share fallback: PASS.
- Cache pas-family-v2.6: PASS.
- GitHub Pages deployment: PASS.

## Limitación conocida

Algunas aplicaciones de correo de Android abren un Web Share Target sin transferir físicamente el adjunto. Una PWA no puede recuperar un archivo que la aplicación de origen no entregó. V 2.6 gestiona este caso ofreciendo Seleccionar PDF dentro de la propia aplicación.
