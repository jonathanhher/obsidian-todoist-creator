# Obsidian Todoist Creator Plugin - Versión Completa

Un plugin avanzado y multiidioma para Obsidian que te permite crear tareas en Todoist directamente desde tus notas con todas las funcionalidades avanzadas de Todoist y un diseño optimizado.

![Plugin Version](https://img.shields.io/badge/version-2.1.0-blue)
![Obsidian](https://img.shields.io/badge/obsidian-compatible-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Características Principales

### ✨ Diseño Optimizado v2.1

- **🎨 Interfaz compacta**: Diseño similar a Todoist con layout optimizado
- **📱 Completamente responsive**: Se adapta perfectamente a móvil y desktop
- **🔗 Indicador de conexión API**: Estado visual verde/rojo en configuraciones
- **⚡ Campos inline**: Proyecto + Prioridad en la misma línea
- **🏷️ Etiquetas visuales**: Lista de tags con colores preservados de Todoist
- **📅 Dos campos de fecha**: "Fecha" y "Fecha Límite" separados
- **⏰ Selector optimizado**: Tiempo cada 15 minutos en interfaz compacta

### 🎯 Funcionalidades Avanzadas

- **🔐 Configuración segura de API**: Modal dedicado con prueba de conexión
- **🌍 Soporte multiidioma**: Español e inglés completamente soportados
- **📅 Fechas relativas mejoradas**: "Hoy", "Mañana", "Esta Semana", "Próxima Semana"
- **📅 Calendario compacto**: Navegación intuitiva con diseño optimizado
- **⏱️ Duración de tareas**: Desde 15 minutos hasta 8 horas
- **🔄 Tareas recurrentes**: Diario, semanal, mensual, anual
- **🔄 Sincronización bidireccional**: Estado entre Obsidian y Todoist
- **🏷️ Tag automático**: Incluye #tasktodo automáticamente
- **⚡ Gestión completa de prioridades** (P1-P4) con colores
- **🔔 Sistema de recordatorios** configurables
- **📁 Selección de proyectos** dinámicos
- **🎨 Plantillas personalizables**

## 📥 Instalación

### Instalación Manual

1. **Descarga los archivos** del plugin
2. **Crea la carpeta** `obsidian-todoist-creator` en `VaultFolder/.obsidian/plugins/`
3. **Copia todos los archivos** en esa carpeta
4. **Instala dependencias y construye**:
   ```bash
   npm install
   npm run build
   ```
5. **Recarga Obsidian**
6. **Activa el plugin** en Configuración > Plugins de comunidad

### ⚙️ Configuración Inicial

1. **Ve a Configuración** > Plugins de comunidad > Todoist Task Creator
2. **Configura tu API Token**:
   - Haz clic en "Configurar Token de API"
   - Obtén tu token desde [Todoist Integrations](https://todoist.com/prefs/integrations)
   - **Verifica la conexión**: Indicador verde ✓ = conectado, rojo ✗ = error
3. **Selecciona tu idioma**: Español o English
4. **Habilita sincronización** (recomendado):
   - Activa sincronización bidireccional
   - Configura intervalo (30-300 segundos)
5. **Personaliza configuraciones** según tus preferencias

## 🎯 Uso del Plugin

### 📝 Crear Tarea Completa

**Método 1:** Comando de paleta
1. `Ctrl+P` (o `Cmd+P` en Mac)
2. Busca "Crear tarea en Todoist"
3. Completa el formulario optimizado

**Método 2:** Desde texto seleccionado
1. Selecciona texto en tu nota
2. `Ctrl+P` → "Crear tarea desde selección"

### 🎨 Interfaz Optimizada

#### **Layout Compacto:**
```
┌─────────────────────────────────────┐
│ Nombre de la tarea                  │
│ Descripción                         │
│ Proyecto        │ Prioridad         │
│ Fecha          │ Fecha Límite       │
│ Hora           │ Duración           │
│ Recordatorio   │ Etiquetas │ Insert │
│ [Cancelar]        [Crear Tarea]     │
└─────────────────────────────────────┘
```

#### **Campos del Formulario:**

**📋 Obligatorios:**
- **Contenido**: Descripción principal de la tarea

**📄 Opcionales:**
- **Descripción**: Información adicional (campo compacto)
- **Proyecto**: Selecciona de tus proyectos de Todoist
- **Prioridad**: P1 (Urgente), P2 (Alta), P3 (Media), P4 (Baja)
- **Fecha**: Campo genérico para programación
- **Fecha Límite**: Deadline específico
- **Hora**: Selector cada 15 minutos (00:00, 00:15, 00:30...)
- **Duración**: 15min a 8 horas
- **Recordatorio**: Alertas antes del vencimiento
- **Etiquetas**: Lista visual con colores preservados
- **Insertar en nota**: Checkbox para incluir referencia

### 📅 Selector de Fecha Mejorado

#### **🚀 Opciones Rápidas:**
- **Hoy** - Fecha actual
- **Mañana** - Día siguiente  
- **Esta Semana** - Final de semana actual
- **Próxima Semana** - Final de próxima semana

#### **📅 Calendario Personalizado:**
- Diseño compacto y eficiente
- Navegación con flechas ‹ ›
- Día actual destacado automáticamente
- Días pasados atenuados visualmente

### ⏰ Selector de Tiempo Optimizado

- **🎯 Precisión cada 15 min**: 00:00, 00:15, 00:30, 00:45...
- **📋 Lista compacta** con scroll automático
- **🕐 Formato 24 horas**
- **⚡ Hora actual destacada**

### ⏱️ Duración de Tareas

Configura tiempo estimado de completación:
- **15-45 minutos**: Tareas rápidas
- **1-2 horas**: Tareas estándar  
- **3-8 horas**: Proyectos extensos

### 🔄 Tareas Recurrentes

Crea tareas que se repiten automáticamente:
- **Diariamente**: Cada día
- **Semanalmente**: Mismo día cada semana
- **Días laborales**: Lunes a Viernes únicamente
- **Mensualmente**: Mismo día cada mes
- **Anualmente**: Fechas especiales

### ⚡ Prioridades con Colores

- **P1 (Urgente)** - 🔴 Rojo - Tareas críticas
- **P2 (Alta)** - 🟠 Naranja - Tareas importantes  
- **P3 (Media)** - 🔵 Azul - Tareas normales
- **P4 (Baja)** - ⚫ Gris - Tareas de baja prioridad

### 🏷️ Etiquetas Visuales Mejoradas

- **🎨 Lista visual**: Muestra tags como pastillas coloridas
- **🔄 Colores preservados**: Mantiene colores de Todoist
- **📦 Vista compacta**: Primeras 3 etiquetas + "..." si hay más
- **✅ Selección clara**: Check verde en etiquetas seleccionadas

### 🔄 Sincronización Bidireccional

- **✅ Marcar en Obsidian**: Actualiza automáticamente en Todoist
- **⬅️ Sincronización automática**: Cambios de Todoist reflejados en Obsidian
- **⚡ Sistema optimizado**: Debounce para evitar llamadas excesivas
- **🔍 Detección precisa**: Reconoce cambios específicos en checkboxes

### 📝 Referencia en Notas

Cuando creas una tarea, se inserta automáticamente:

```markdown
- [ ] Revisar propuesta [📋](https://todoist.com/task/123) P2 trabajo, urgente 📅 2025-01-15 Descripción detallada #tasktodo
```

### 🎨 Variables de Plantilla

Personaliza el formato con:
- `{{content}}` - Contenido de la tarea
- `{{url}}` - Enlace directo a Todoist
- `{{id}}` - ID único de la tarea
- `{{priority}}` - Prioridad con colores (P1-P4)
- `{{labels}}` - Etiquetas con colores preservados
- `{{due}}` - Fecha límite formateada
- `{{description}}` - Descripción de la tarea

## ⚙️ Configuraciones Avanzadas

### 🔗 Estado de Conexión API

- **✅ Indicador verde**: API conectada correctamente
- **❌ Indicador rojo**: Problema de conexión o token inválido
- **🧪 Botón de prueba**: Verifica conexión antes de guardar
- **🔄 Actualización automática**: Se actualiza al cambiar configuraciones

### ⏱️ Configuraciones de Tiempo

- **⏰ Hora por defecto**: Hora predeterminada (ej: 08:00)
- **⏱️ Duración por defecto**: Duración estándar (15-480 minutos)
- **🎯 Sliders intuitivos**: Configuración fácil con tooltips

### 🔄 Sincronización Optimizada

- **🔧 Intervalo configurable**: 30-300 segundos
- **⚡ Sistema eficiente**: Debounce para mejor rendimiento
- **🎯 Detección precisa**: Solo cambios relevantes

### 🎨 Personalización

- **🌍 Idioma**: Español o English
- **📁 Proyecto por defecto**: ID de proyecto predeterminado
- **📝 Plantilla personalizable**: Formato de texto insertado
- **🔄 Auto-refresh**: Actualización automática de datos
- **💾 Insertar por defecto**: Siempre incluir referencia en nota

## 🛠️ Optimizaciones de Rendimiento

### ⚡ Cache Inteligente
- **📦 Cache de 5 minutos** para proyectos y etiquetas
- **🔄 Actualización selectiva** solo cuando necesario
- **💾 Persistencia local** de mappings de tareas

### 🎯 Optimizaciones de UX
- **⏱️ Debounce de 1 segundo** en cambios del editor
- **🔄 Throttling** en llamadas a API
- **⚡ Procesamiento asíncrono** para mejor experiencia
- **📱 Diseño completamente responsive**

## 🐛 Solución de Problemas

### 🔴 Indicador Rojo de API
- ✅ Verifica que tu token de API sea correcto
- ✅ Usa "Probar Conexión" en configuración
- ✅ Confirma que tu cuenta Todoist esté activa
- ✅ Revisa tu conexión a internet

### ❌ Sincronización No Funciona
- ✅ Habilita sincronización en configuraciones
- ✅ Confirma indicador de API verde
- ✅ Verifica que tareas tengan tag #tasktodo
- ✅ Reduce intervalo de sincronización

### 🎨 Etiquetas No Aparecen
- ✅ Configura etiquetas en Todoist primero
- ✅ Activa auto-refresh en configuraciones
- ✅ Refresca datos manualmente

### 📱 Problemas de Diseño
- ✅ Recarga Obsidian después de cambios
- ✅ Verifica que tengas la última versión
- ✅ Limpia cache del navegador si es necesario

## 📁 Estructura del Plugin

```
obsidian-todoist-creator/
├── main.ts              # Código principal optimizado
├── manifest.json        # Metadatos del plugin
├── package.json         # Dependencias
├── tsconfig.json        # Configuración TypeScript
├── esbuild.config.mjs   # Configuración de build
├── styles.css           # Estilos optimizados estilo Todoist
├── .gitignore          # Archivos a ignorar
└── README.md           # Esta documentación
```

## 🏆 Changelog

### v2.1.0 - Release Optimizado 🎨
- 🎨 **MEJORADO**: Diseño completamente rediseñado estilo Todoist
- 🎨 **MEJORADO**: Layout inline optimizado (Proyecto + Prioridad)
- 🎨 **MEJORADO**: Etiquetas como lista visual con colores
- 🎨 **MEJORADO**: Dos campos de fecha separados
- 🎨 **MEJORADO**: Checkbox sin superposiciones
- 📱 **MEJORADO**: Diseño completamente responsive
- ⚡ **OPTIMIZADO**: Interfaz más compacta y eficiente
- 🐛 **CORREGIDO**: Problemas de alineación y espaciado

### v2.0.0 - Release Completo 🚀
- ✨ **NUEVO**: Indicador visual de estado de conexión API
- ✨ **NUEVO**: Fechas relativas (Hoy, Mañana, Esta/Próxima Semana)
- ✨ **NUEVO**: Duración de tareas configurable (15min-8h)
- ✨ **NUEVO**: Tareas recurrentes completas
- 🎨 **MEJORADO**: Calendario más compacto y eficiente
- 🎨 **MEJORADO**: Selector de tiempo cada 15 minutos
- ⚡ **OPTIMIZADO**: Sincronización con debounce
- ⚡ **OPTIMIZADO**: Cache inteligente y rendimiento
- 🐛 **CORREGIDO**: Múltiples bugs de sincronización

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
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📧 Soporte

Si encuentras problemas o tienes sugerencias:

- 📋 **Revisa la sección de solución de problemas**
- 🔗 **Verifica que el indicador de API esté verde**
- 📦 **Confirma que tienes la última versión v2.1**
- 🐛 **Abre un issue** con detalles del problema

## 🌟 Características Destacadas v2.1

### 🎯 Experiencia de Usuario Superior
- **⚡ Más rápido**: Cache inteligente y optimizaciones
- **🎨 Más bonito**: Diseño compacto estilo Todoist real
- **📱 Más accesible**: Responsive design optimizado
- **🔧 Más confiable**: Indicadores de estado y mejor manejo de errores

### 🚀 Productividad Maximizada
- **⏰ Fechas rápidas**: "Hoy" o "Mañana" con un clic
- **⏱️ Duración precisa**: Planificación mejorada
- **🔄 Repetición automática**: Hábitos y rutinas
- **🎨 Visual mejorado**: Identificación instantánea de prioridades
- **🏷️ Etiquetas claras**: Lista visual con colores preservados

---

**¡Plugin completamente optimizado y listo para uso profesional! 🚀✨**

> *Desarrollado con ❤️ para la comunidad de Obsidian*