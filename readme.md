# Obsidian Todoist Creator Plugin

Un plugin completo y multiidioma para Obsidian que te permite crear tareas en Todoist directamente desde tus notas con todas las funcionalidades avanzadas de Todoist.

## 🚀 Características Principales

- **🔐 Configuración segura de API**: Modal dedicado para configurar tu token de forma segura (campo oculto)
- **🌍 Soporte multiidioma**: Español e inglés completamente soportados
- **📅 Calendario visual**: Selector de fecha con interfaz de calendario interactivo
- **⏰ Selector de tiempo**: Lista desplegable con opciones de hora cada 30 minutos
- **📝 Descripción obligatoria**: Campo de descripción requerido para mayor contexto
- **🔄 Auto-actualización**: Sistema configurable para refrescar proyectos y etiquetas (30-3600 segundos)
- **🏷️ Tag automático**: Incluye automáticamente el tag #tasktodo en las notas
- **⚡ Gestión completa de prioridades** (P1, P2, P3, P4) con codificación de colores
- **🔔 Sistema de recordatorios** configurables
- **🏷️ Gestión de etiquetas** de Todoist con selección múltiple
- **📁 Selección de proyectos** de tu cuenta de Todoist
- **🎨 Plantillas personalizables** para el texto insertado
- **⚡ Creación rápida** desde texto seleccionado

## 📥 Instalación

### Instalación Manual

1. Descarga todos los archivos del plugin
2. Crea una carpeta llamada `obsidian-todoist-creator` en tu carpeta de plugins de Obsidian: `VaultFolder/.obsidian/plugins/`
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
   - El token se oculta automáticamente por seguridad (campo password)
3. **Seleccionar idioma**: Español o English
4. **Configurar auto-actualización** (opcional):
   - Activa la actualización automática
   - Configura el intervalo en segundos (30-3600)
5. Personaliza otras configuraciones según tus preferencias

## 🎯 Uso del Plugin

### Comandos Disponibles

- **Crear tarea en Todoist**: Abre el modal completo para crear una nueva tarea
- **Crear tarea desde selección**: Crea una tarea rápida usando el texto seleccionado

### 📝 Crear una Tarea Completa

1. Usa `Ctrl+P` (o `Cmd+P` en Mac) para abrir la paleta de comandos
2. Busca "Crear tarea en Todoist" y selecciónalo
3. Completa los campos del modal:

#### **Campos Obligatorios:**
- **📋 Contenido**: Descripción principal de la tarea
- **📄 Descripción**: Información adicional detallada (ahora obligatorio)

#### **Campos Opcionales:**
- **📁 Proyecto**: Selecciona de tus proyectos de Todoist
- **⚡ Prioridad**: P1 (Urgente), P2 (Alta), P3 (Media), P4 (Baja)
- **📅 Fecha límite**: Haz clic para abrir el calendario visual
- **⏰ Hora límite**: Haz clic para abrir el selector de tiempo
- **🔔 Recordatorio**: Configura alertas antes del vencimiento
- **🏷️ Etiquetas**: Selecciona múltiples etiquetas con checkboxes

4. Decide si quieres insertar una referencia en tu nota actual
5. Haz clic en "Crear Tarea"

### 📅 Selector de Fecha Visual

- **Calendario interactivo** por meses
- **Navegación** entre meses con flechas ‹ ›
- **Día actual destacado** automáticamente
- **Selección fácil** con un clic
- **Diseño responsivo** para móviles

### ⏰ Selector de Tiempo

- **Lista desplegable** con opciones cada 30 minutos
- **Formato 24 horas** para precisión
- **Scroll fácil** para encontrar la hora deseada
- **Opciones desde 00:00 hasta 23:30**

### ⚡ Niveles de Prioridad

- **P1 (Urgente)** - 🔴 Rojo - Para tareas críticas
- **P2 (Alta)** - 🟠 Naranja - Para tareas importantes  
- **P3 (Media)** - 🔵 Azul - Para tareas normales
- **P4 (Baja)** - ⚫ Gris - Para tareas de baja prioridad

### 🔔 Opciones de Recordatorio

- 5 minutos antes
- 15 minutos antes
- 30 minutos antes
- 1 hora antes
- 2 horas antes
- 1 día antes

### 📝 Texto Insertado en Notas

Cuando creas una tarea, el plugin inserta automáticamente una referencia completa en tu nota:

```markdown
- [ ] Revisar propuesta de cliente [📋](https://todoist.com/task/123) P2 trabajo, urgente 📅 2025-01-15 Reunión con stakeholders #tasktodo
```

### 🎨 Variables de Plantilla

Puedes personalizar el formato usando estas variables:

- `{{content}}` - Contenido de la tarea
- `{{url}}` - Enlace directo a Todoist
- `{{id}}` - ID único de la tarea
- `{{priority}}` - Prioridad (P1, P2, P3, P4)
- `{{labels}}` - Etiquetas separadas por comas
- `{{due}}` - Fecha límite formateada
- `{{description}}` - Descripción de la tarea

### 📋 Ejemplos de Plantillas Personalizadas

```markdown
# Formato minimalista
{{content}} [📋]({{url}}) #tasktodo

# Formato detallado
- [ ] {{content}} 
  - 📄 {{description}}
  - ⚡ Prioridad: {{priority}}
  - 🏷️ Etiquetas: {{labels}}
  - 📅 Vence: {{due}}
  - [Ver en Todoist]({{url}}) #tasktodo

# Formato con emojis
🎯 {{content}} {{priority}} {{labels}} {{due}} [📋]({{url}}) #tasktodo

# Formato de tabla
| Tarea | Prioridad | Etiquetas | Vencimiento | Link |
|-------|-----------|-----------|-------------|------|
| {{content}} | {{priority}} | {{labels}} | {{due}} | [📋]({{url}}) | #tasktodo
```

## ⚙️ Configuraciones Avanzadas

### 🔐 Token de API Seguro
- **Modal dedicado** para configuración
- **Campo password** oculto por seguridad
- **Enlace directo** a configuraciones de Todoist
- **Validación automática** del token

### 🔄 Auto-actualización
- **Configurable** de 30 segundos a 1 hora
- **Actualiza automáticamente** proyectos y etiquetas
- **Slider intuitivo** para configurar intervalo
- **Se puede activar/desactivar** fácilmente

### 🌍 Soporte Multiidioma
- **Español** (por defecto)
- **Inglés** completo
- **Cambio dinámico** sin reiniciar
- **Interfaz completamente traducida**

## 📁 Archivos del Plugin

```
obsidian-todoist-creator/
├── main.ts              # Código principal con todas las funcionalidades
├── manifest.json        # Metadatos del plugin
├── package.json         # Dependencias (sin ESLint)
├── tsconfig.json        # Configuración TypeScript moderna
├── esbuild.config.mjs   # Configuración de build
├── styles.css           # Estilos completos (calendario, modales, etc.)
├── .gitignore          # Archivos a ignorar
└── README.md           # Esta documentación
```

## 🛠️ Desarrollo

### Requisitos
- Node.js 18+
- npm o yarn

### Configuración del Entorno
```bash
# Instalar dependencias
npm install

# Desarrollo (modo watch)
npm run dev

# Build para producción
npm run build

# Limpiar archivos de build
npm run clean

# Rebuild completo
npm run rebuild
```

### Scripts Disponibles
- `npm run dev` - Desarrollo con watch mode
- `npm run build` - Compilación para producción
- `npm run clean` - Limpia archivos generados
- `npm run rebuild` - Limpia y compila

## 🔧 API de Todoist Utilizada

Este plugin utiliza la **API REST v2 de Todoist** y accede a:

- **Tasks** - Creación de tareas con todos los campos
- **Projects** - Lista de proyectos del usuario
- **Labels** - Lista de etiquetas del usuario  
- **Reminders** - Creación de recordatorios

## 🐛 Solución de Problemas

### Error de Autenticación
- ✅ Verifica que tu token de API sea correcto
- ✅ Asegúrate de que tu cuenta de Todoist esté activa
- ✅ Usa el modal seguro para configurar el token

### No se Cargan Proyectos/Etiquetas
- ✅ Revisa tu conexión a internet
- ✅ Verifica los permisos de tu token de API
- ✅ Activa auto-refresh si el problema persiste

### Errores de Fecha
- ✅ Usa el calendario visual para seleccionar fechas
- ✅ Verifica que la fecha no sea en el pasado
- ✅ Combina fecha y hora si necesitas tiempo específico

### Problemas de Compilación
- ✅ Ejecuta `npm install` para instalar dependencias
- ✅ Usa `npm run clean && npm run build` para rebuild
- ✅ Verifica que tienes Node.js 18+ instalado

## 🎉 Funcionalidades Implementadas

✅ **Modal seguro para API Token** (campo password oculto)  
✅ **Sistema de auto-refresh configurable** (30-3600 segundos)  
✅ **Calendario visual** para selección de fechas  
✅ **Selector de tiempo** con lista desplegable  
✅ **Campo descripción obligatorio**  
✅ **Tag #tasktodo automático** en todas las notas  
✅ **Soporte completo para español e inglés**  
✅ **Plantilla extendida** con todas las variables  
✅ **Prioridades con colores** (P1-P4)  
✅ **Recordatorios configurables**  
✅ **Selección múltiple de etiquetas**  
✅ **Proyectos dinámicos** desde Todoist  
✅ **Diseño responsivo** para móviles  
✅ **Sin dependencias de ESLint** (build limpio)  

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
- Revisa la sección de solución de problemas
- Verifica que tienes la última versión
- Abre un issue con detalles del problema

## 🏆 Changelog

### v1.0.0 - Release Completo
- ✨ Funcionalidad completa de creación de tareas
- 🔐 Modal seguro para API token
- 🌍 Soporte multiidioma (ES/EN)
- 📅 Calendario visual interactivo
- ⏰ Selector de tiempo cada 30 minutos
- 📝 Descripción obligatoria
- 🔄 Sistema de auto-refresh configurable
- 🏷️ Tag #tasktodo automático
- ⚡ Prioridades con colores
- 🔔 Recordatorios configurables
- 🏷️ Selección múltiple de etiquetas
- 📁 Proyectos dinámicos
- 🎨 Plantillas personalizables avanzadas
- 📱 Diseño responsivo
- 🛠️ Build limpio sin ESLint

---

**¡Tu plugin está completo y listo para usar! 🚀**