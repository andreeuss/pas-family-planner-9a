# PAS Family Planner

Planeador semanal para familias de 9°A. La aplicación funciona como un sitio web instalable (PWA), procesa los PDF PAS localmente en el dispositivo y no usa cuentas, analítica ni servicios externos.

## Cómo usarlo

Abre la aplicación y elige **Estudiante** o **Padres**. El selector solo cambia la presentación. En Estudiante están Inicio, Semana y Horario; Padres muestra un único resumen semanal. Los checks se guardan únicamente en el navegador actual.

## Cómo instalarlo

### Android

Abre la URL en Chrome, usa **Instalar aplicación** o **Agregar a pantalla principal** y completa la instalación. La app debe instalarse antes de que Android pueda ofrecerla como destino para compartir.

### Computador

Abre la URL en Chrome o Edge y usa el icono **Instalar** de la barra de direcciones cuando esté disponible. También puede usarse sin instalar.

### iPhone/iOS

Abre la URL en Safari, toca **Compartir** y luego **Agregar a inicio**. iOS puede no ofrecer Web Share Target; usa siempre el método de selección de PDF como respaldo.

## Cómo actualizar el PAS

### Método 1: compartir desde WhatsApp

En Android, con la PWA instalada: abre el PDF en WhatsApp, toca **Compartir**, selecciona **PAS Family Planner**, revisa la vista previa y toca **Activar PAS**. El PDF no sale del dispositivo.

### Método 2: seleccionar PDF

Abre **Configuración → Actualizar PAS → Seleccionar PDF**, elige el archivo, revisa la vista previa y toca **Activar PAS**. Ambos métodos usan el mismo parser determinista.

## Limitaciones

- Share Target depende de la compatibilidad de Android, Chrome y la aplicación desde la que se comparte.
- El checklist es local al dispositivo; no hay cuentas ni sincronización multiusuario.
- El contenido extraído depende de que el PAS conserve la estructura usada por el colegio.
- iPhone/iOS y algunos navegadores no admiten compartir archivos hacia una PWA; en esos casos se debe seleccionar el PDF manualmente.

## Privacidad

No se transmiten PDFs, datos de estudiantes, checklist ni comportamiento. No hay backend, cookies de terceros, analytics ni trackers.
