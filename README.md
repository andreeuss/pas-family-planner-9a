# PAS Family Planner

Planeador semanal para familias de 9°A. La aplicación funciona como un sitio web instalable (PWA), procesa los PDF PAS localmente en el dispositivo y no usa cuentas, analítica ni servicios externos.

Versión publicada: **V 2.6**. Baseline público: **PAS 008 · 28 de septiembre–2 de octubre de 2026**.

## Qué cambia en V 2.6

- PAS 008 queda publicado como semana base para todos los usuarios.
- La vista **Padres** se reorganiza como resumen ejecutivo: prioridad semanal, indicadores, semana de un vistazo, evaluaciones, preparación e información para padres.
- Nueva identidad visual **Esmeralda** para distinguir claramente la actualización.
- Mejor manejo de actualización de la PWA instalada.
- Si una aplicación de correo abre PAS Family Planner pero no entrega el PDF, la app ya no muestra una página de error: ofrece directamente **Seleccionar PDF** como respaldo.
- El parser admite semanas que cruzan de un mes a otro, como 28 de septiembre–2 de octubre.

## Cómo usarlo

Abre la aplicación y elige **Estudiante** o **Padres**. El selector solo cambia la presentación.

- **Estudiante:** Inicio, Semana y Horario.
- **Padres:** un único resumen semanal con la información más relevante.

Los checks de **Preparar** se guardan únicamente en el navegador actual.

## Cómo instalarlo

### Android

Abre la URL en Chrome, usa **Instalar aplicación** o **Agregar a pantalla principal** y completa la instalación. La app debe estar instalada para que Android pueda ofrecerla como destino para compartir.

### Computador

Abre la URL en Chrome o Edge y usa el icono **Instalar** cuando esté disponible. También puede usarse sin instalar.

### iPhone/iOS

Abre la URL en Safari, toca **Compartir** y luego **Agregar a inicio**. iOS puede no ofrecer Web Share Target; usa **Seleccionar PDF** como respaldo.

## Cómo actualizar el PAS

### Método 1: compartir el PDF

En Android, una aplicación compatible puede enviar el PDF directamente a **PAS Family Planner**. La app analiza el documento, muestra una vista previa y solo lo activa cuando el usuario confirma.

Algunas aplicaciones de correo abren el destino de compartir pero no entregan el archivo adjunto. En ese caso PAS Family Planner muestra el acceso directo a **Seleccionar PDF**.

### Método 2: seleccionar PDF

Abre **Configuración → Actualizar PAS → Seleccionar PDF**, elige el archivo, revisa la vista previa y toca **Activar PAS**. El análisis ocurre localmente en el dispositivo.

## Reglas funcionales

- El **PAS semanal prevalece sobre el horario general** cuando existe contradicción.
- Un Topic vacío no crea una evaluación.
- **Conocimientos Esenciales** no se convierten automáticamente en tareas.
- **Preparar** representa logística/materiales, no progreso académico.
- El horario V3 permanece vigente hasta que el colegio publique una nueva versión.

## Limitaciones

- Share Target depende de Android, Chrome y de la aplicación desde la que se comparte.
- El checklist es local al dispositivo; no hay cuentas ni sincronización multiusuario.
- El contenido extraído depende de que el PAS conserve una estructura compatible.
- Si el correo no entrega el adjunto a la PWA, se debe usar **Seleccionar PDF**.

## Privacidad

No se transmiten PDFs, checklist ni comportamiento a un backend. No hay analytics ni trackers. Los PDF originales del colegio no se publican en el repositorio.
