# Obsidian Todoist Creator Plugin - Versión Mejorada

Un plugin completo y multiidioma para Obsidian que te permite crear tareas en Todoist directamente desde tus notas con todas las funcionalidades avanzadas de Todoist.

## 🚀 Características Principales

### ✨ Nuevas Funcionalidades v2.0

- **🔗 Indicador de conexión API**: Indicador visual verde/rojo del estado de conexión en configuraciones
- **📅 Fechas relativas mejoradas**: Opciones rápidas como "Hoy", "Mañana", "Esta Semana", "Próxima Semana"
- **📅 Calendario compacto**: Diseño más pequeño y eficiente con navegación mejorada
- **⏰ Selector de tiempo cada 15 min**: Opciones de tiempo más precisas cada 15 minutos
- **⏱️ Duración de tareas**: Configurar duración desde 15min hasta 8 horas con selector visual
- **🔄 Tareas recurrentes**: Opciones de repetición (diario, semanal, días laborales, mensual, anual)
- **🎨 Colores de etiquetas mejorados**: Las etiquetas mantienen los colores solo en el borde/fondo
- **🔧 Sincronización optimizada**: Detección mejorada de cambios en checkboxes
- **📝 Descripción compacta**: Campo de descripción más pequeño visualmente
- **⚡ Rendimiento optimizado**: Cache mejorado y debounce para mejor rendimiento

### 🎯 Funcionalidades Base

- **🔐 Configuración segura de API**: Modal dedicado para configurar tu token de forma segura
- **🌍 Soporte multiidioma**: Español e inglés completamente soportados
- **📅 Calendario visual**: Selector de fecha con interfaz interactiva
- **📝 Campos opcionales**: Descripción y otros campos opcionales para flexibilidad
- **🔄 Sincronización bidireccional**: Sincroniza automáticamente el estado entre Obsidian y Todoist
- **🏷️ Tag automático**: Incluye automáticamente el tag #tasktodo en las notas
- **⚡ Gestión completa de prioridades** (P1, P2, P3, P4) con codificación de colores
- **🔔 Sistema de recordatorios** configurables
- **🏷️ Gestión de etiquetas** de Todoist con selección múltiple
- **📁 Selección de proyectos** de tu cuenta de Todoist
- **🎨 Plantillas personalizables** para el texto insertado
- **⚡ Creación rápida** desde texto seleccionado

## 📥 Instalación

### Instalación Manual

1. Descarga todos los archivos del plugin mejorado
2. Crea una carpeta llamada `obsidian-todoist-creator` en tu carpeta de plugins: `VaultFolder/.obsidian/plugins/`
3. Copia todos los archivos del plugin en esa carpeta
4. Ejecuta los siguientes comandos en la carpeta del plugin:
   ```bash
   npm install
   npm run build
   ```
5. Recarga Obsidian
6. Ve a Configuración > Plugins de comunidad y activa "Todoist Task Creator"

### ⚙️ Configuración Inicial

1. Ve a **Configuración > Plugins de comunidad > Todoist Task Creator**
2. **Configurar Token de API**:
   - Haz clic en "Configurar Token de API"
   - Se abrirá un modal seguro para ingresar tu token
   - Obtén tu token desde [Todoist Integrations](https://todoist.com/prefs/integrations)
   - **🆕 Indicador de estado**: Verás un indicador verde ✓ si la conexión es exitosa o rojo ✗ si hay problemas
3. **Seleccionar idioma**: Español o English
4. **Configurar sincronización** (recomendado):
   - Activa la sincronización bidireccional
   - Configura el intervalo de sincronización (30-300 segundos)
5. **Duración por defecto**: Configura la duración predeterminada de tareas (15-480 minutos)
6. Personaliza otras configuraciones según tus preferencias

## 🎯 Uso del Plugin

### 📝 Crear una Tarea Completa

1. Usa `Ctrl+P` (o `Cmd+P` en Mac) para abrir la paleta de comandos
2. Busca "Crear tarea en Todoist" y selecciónalo
3. Completa los campos del modal:

#### **Campos Obligatorios:**
- **📋 Contenido**: Descripción principal de la tarea

#### **Campos Opcionales:**
- **📄 Descripción**: Información adicional (campo más compacto)
- **📁 Proyecto**: Selecciona de tus proyectos de Todoist
- **⚡ Prioridad**: P1 (Urgente), P2 (Alta), P3 (Media), P4 (Baja)
- **📅 Fecha**: Opciones rápidas o calendario personalizado
- **⏰ Hora**: Selector cada 15 minutos
- **⏱️ Duración**: Desde 15 minutos hasta 8 horas
- **🔔 Recordatorio**: Configura alertas antes del vencimiento
- **🔄 Repetición**: Tareas recurrentes (diario, semanal, mensual, etc.)
- **🏷️ Etiquetas**: Selecciona múltiples etiquetas con colores

### 📅 Selector de Fecha Mejorado

#### **🚀 Opciones Rápidas:**
- **Hoy** - Fecha actual
- **Mañana** - Día siguiente
- **Esta Semana** - Final de la semana actual
- **Próxima Semana** - Final de la próxima semana

#### **📅 Calendario Personalizado:**
- **Calendario compacto** y fácil de usar
- **Navegación** entre meses con flechas ‹ ›
- **Día actual destacado** automáticamente
- **Días pasados** atenuados visualmente
- **Diseño responsivo** optimizado para móviles

### ⏰ Selector de Tiempo Mejorado

- **🎯 Precisión cada 15 minutos**: 00:00, 00:15, 00:30, 00:45...
- **📋 Lista compacta** con scroll suave
- **🕐 Formato 24 horas** para mayor precisión
- **⚡ Selección rápida** con un clic

### ⏱️ Duración de Tareas (Nuevo)

Configura cuánto tiempo tomará completar la tarea:
- **15 minutos** - Tareas rápidas
- **30 minutos** - Tareas cortas
- **45 minutos** - Tareas medianas
- **1 hora** - Tareas estándar
- **1 hora 30 minutos** - Tareas largas
- **2-8 horas** - Proyectos extensos

### 🔄 Tareas Recurrentes (Nuevo)

Crea tareas que se repiten automáticamente:
- **Diariamente** - Cada día
- **Semanalmente** - Mismo día cada semana
- **Días laborales** - Lunes a Viernes únicamente
- **Mensualmente** - Mismo día cada mes
- **Anualmente** - Fecha especial anual

### ⚡ Niveles de Prioridad Mejorados

- **P1 (Urgente)** - 🔴 Rojo brillante - Para tareas críticas
- **P2 (Alta)** - 🟠 Naranja brillante - Para tareas importantes
- **P3 (Media)** - 🔵 Azul brillante - Para tareas normales
- **P4 (Baja)** - ⚫ Gris - Para tareas de baja prioridad

### 🏷️ Etiquetas con Colores Mejorados

- **🎨 Colores preservados**: Las etiquetas mantienen los colores de Todoist
- **🖼️ Solo bordes/fondo**: Los colores se aplican al contenedor, no al texto
- **📖 Texto legible**: El texto siempre mantiene un color legible
- **🔄 Sincronización**: Los colores se actualizan automáticamente

### 🔄 Sincronización Bidireccional Mejorada

- **✅ Marcar en Obsidian**: Al marcar una tarea como completada en Obsidian, se actualiza en Todoist
- **⬅️ Sincronización automática**: Los cambios en Todoist se reflejan en Obsidian
- **⚡ Optimizado**: Sistema de debounce para evitar llamadas excesivas a la API
- **🔍 Detección mejorada**: Reconoce cambios en checkboxes de forma más precisa

### 📝 Texto Insertado en Notas

Cuando creas una tarea, el plugin inserta automáticamente una referencia completa:

```markdown
- [ ] Revisar propuesta [📋](https://todoist.com/task/123) P2 trabajo, urgente 📅 2025-01-15 Descripción detallada #tasktodo
```

### 🎨 Variables de Plantilla Actualizadas

- `{{content}}` - Contenido de la tarea
- `{{url}}` - Enlace directo a Todoist
- `{{id}}` - ID único de la tarea
- `{{priority}}` - Prioridad con colores (P1, P2, P3, P4)
- `{{labels}}` - Etiquetas con colores preservados
- `{{due}}` - Fecha límite formateada
- `{{description}}` - Descripción de la tarea
- `{{duration}}` - Duración estimada (nuevo)

## ⚙️ Configuraciones Avanzadas

### 🔗 Estado de Conexión API (Nuevo)

- **✅ Indicador verde**: API conectada correctamente
- **❌ Indicador rojo**: Problema de conexión o token inválido
- **🧪 Botón de prueba**: Testa la conexión antes de guardar
- **🔄 Actualización automática**: Se actualiza al cambiar configuraciones

### ⏱️ Configuración de Duración (Nuevo)

- **⏰ Duración por defecto**: Establece la duración predeterminada (15-480 minutos)
- **🎯 Slider intuitivo**: Configura fácilmente con incrementos de 15 minutos
- **💡 Tooltip dinámico**: Muestra el valor actual mientras ajustas

### 🔄 Sincronización Mejorada

- **🔧 Intervalo optimizado**: Configure entre 30-300 segundos
- **⚡ Modo eficiente**: Usa debounce para evitar llamadas innecesarias
- **🎯 Detección precisa**: Identifica cambios específicos en checkboxes

## 🛠️ Optimizaciones de Rendimiento

### ⚡ Cache Inteligente
- **📦 Cache de 5 minutos** para proyectos y etiquetas
- **🔄 Actualización selectiva** solo cuando es necesario
- **💾 Persistencia local** de mappings de tareas

### 🎯 Debounce y Throttling
- **⏱️ Debounce de 500ms** en cambios del editor
- **🔄 Throttling** en llamadas a la API
- **⚡ Procesamiento asíncrono** para mejor UX

### 📱 Diseño Responsivo Mejorado
- **📱 Móvil optimizado**: Layouts adaptados para pantallas pequeñas
- **🖥️ Desktop mejorado**: Mejor uso del espacio en pantallas grandes
- **🎨 Animaciones suaves**: Transiciones y efectos optimizados

## 🐛 Solución de Problemas

### 🔴 Indicador Rojo de API
- ✅ Verifica que tu token de API sea correcto
- ✅ Usa el botón "Probar Conexión" en el modal de configuración
- ✅ Asegúrate de que tu cuenta de Todoist esté activa
- ✅ Revisa tu conexión a internet

### ❌ Sincronización No Funciona
- ✅ Verifica que la sincronización esté habilitada en configuraciones
- ✅ Confirma que el indicador de API esté verde
- ✅ Revisa que las tareas tengan el tag #tasktodo
- ✅ Intenta reducir el intervalo de sincronización

### 🎨 Colores de Etiquetas No Aparecen
- ✅ Verifica que tengas etiquetas configuradas en Todoist
- ✅ Actualiza la cache usando auto-refresh
- ✅ Refresca manualmente los datos del plugin

### 📅 Fechas Relativas No Funcionan
- ✅ Usa las opciones rápidas del modal de fecha
- ✅ Verifica que la fecha seleccionada no esté en el pasado
- ✅ Combina con hora si necesitas tiempo específico

## 🎉 Funcionalidades Implementadas v2.0

### ✅ Nuevas Características
✅ **Indicador de estado de API** (verde/rojo)  
✅ **Fechas relativas** (Hoy, Mañana, Esta/Próxima Semana)  
✅ **Calendario compacto** y optimizado  
✅ **Selector de tiempo cada 15 min**  
✅ **Duración de tareas** (15min a 8h)  
✅ **Tareas recurrentes** (diario, semanal, mensual, anual)  
✅ **Colores de etiquetas mejorados**  
✅ **Sincronización optimizada** con debounce  
✅ **Campo descripción compacto**  
✅ **Rendimiento mejorado** con cache inteligente  

### ✅ Características Base Mantenidas
✅ **Modal seguro para API Token**  
✅ **Sistema de auto-refresh configurable**  
✅ **Soporte completo multiidioma** (ES/EN)  
✅ **Prioridades con colores**  
✅ **Recordatorios configurables**  
✅ **Selección múltiple de etiquetas**  
✅ **Proyectos dinámicos**  
✅ **Plantillas personalizables**  
✅ **Diseño responsivo**  
✅ **Build optimizado**  

## 📁 Archivos del Plugin

```
obsidian-todoist-creator/
├── main.ts              # Código principal con todas las mejoras v2.0
├── manifest.json        # Metadatos del plugin
├── package.json         # Dependencias optimizadas
├── tsconfig.json        # Configuración TypeScript
├── esbuild.config.mjs   # Configuración de build
├── styles.css           # Estilos mejorados y responsivos
├── .gitignore          # Archivos a ignorar
└── README.md           # Esta documentación actualizada
```

## 🏆 Changelog

### v2.0.0 - Release Mejorado 🚀
- ✨ **NUEVO**: Indicador visual de estado de conexión API
- ✨ **NUEVO**: Fechas relativas (Hoy, Mañana, Esta/Próxima Semana)
- ✨ **NUEVO**: Duración de tareas configurable (15min-8h)
- ✨ **NUEVO**: Tareas recurrentes completas
- 🎨 **MEJORADO**: Calendario más compacto y eficiente
- 🎨 **MEJORADO**: Selector de tiempo cada 15 minutos
- 🎨 **MEJORADO**: Colores de etiquetas preservados correctamente
- 🎨 **MEJORADO**: Campo descripción más compacto
- ⚡ **OPTIMIZADO**: Sincronización con debounce
- ⚡ **OPTIMIZADO**: Cache inteligente y rendimiento
- ⚡ **OPTIMIZADO**: Detección mejorada de cambios en checkboxes
- 📱 **MEJORADO**: Diseño responsivo para móviles
- 🐛 **CORREGIDO**: Múltiples bugs de sincronización
- 🐛 **CORREGIDO**: Problemas de colores en etiquetas

### v1.0.0 - Release Inicial
- 🎉 Funcionalidad base completa de creación de tareas
- 🔐 Modal seguro para API token
- 🌍 Soporte multiidioma (ES/EN)
- 📅 Calendario visual básico
- ⚡ Prioridades con colores
- 🔄 Sistema de sincronización básico

## 📄 Licencia

MIT License - Libre para usar, modificar y distribuir.

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el repositorio
2. Crea una rama para tu característica
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📧 Soporte

Si encuentras problemas o tienes sugerencias:
- Revisa la sección de solución de problemas actualizada
- Verifica que el indicador de API esté verde
- Verifica que tienes la última versión v2.0
- Abre un issue con detalles del problema

## 🌟 Características Destacadas v2.0

### 🎯 Experiencia de Usuario Mejorada
- **⚡ Más rápido**: Cache inteligente y debounce optimizado
- **🎨 Más bonito**: Diseño compacto y colores mejorados
- **📱 Más accesible**: Mejor soporte móvil y responsivo
- **🔧 Más confiable**: Indicadores de estado y mejor error handling

### 🚀 Productividad Aumentada
- **⏰ Fechas rápidas**: Selecciona "Hoy" o "Mañana" con un clic
- **⏱️ Duración precisa**: Planifica mejor con duraciones configurables
- **🔄 Repetición automática**: Configura hábitos y rutinas
- **🎨 Visual mejorado**: Identifica prioridades y etiquetas al instante

---

**¡Plugin completamente optimizado y listo para uso intensivo! 🚀✨**