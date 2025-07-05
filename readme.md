# Obsidian Todoist Creator Plugin - Versión Completa

Un plugin avanzado y multiidioma para Obsidian que te permite crear tareas en Todoist directamente desde tus notas con todas las funcionalidades avanzadas de Todoist, tareas repetitivas, nota consolidada y un diseño optimizado.

![Plugin Version](https://img.shields.io/badge/version-2.2.1-blue)
![Obsidian](https://img.shields.io/badge/obsidian-compatible-purple)
![License](https://img.shields.io/badge/license-MIT-green)
![Author](https://img.shields.io/badge/author-Jonathan%20Hernandez-orange)

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

**Método 3:** Generar nota consolidada
1. `Ctrl+P` (o `Cmd+P` en Mac)
2. Busca "Generar nota consolidada"
3. Se crea automáticamente una vista unificada de todas tus tareas

### 🎨 Interfaz Optimizada

#### **Layout Ultra-Compacto v2.2.1:**
```
┌─────────────────────────────────────┐
│ Nombre de la tarea                  │
│ Descripción                         │
│ [Proyecto]      │ [Prioridad]       │
│ [Fecha] [Repetir] │ [Fecha Límite]  │
│ [Hora]          │ [Duración]        │
│ [Recordatorio] │ [Etiquetas] │☑Insert│
│ [Cancelar]        [Crear Tarea]     │
└─────────────────────────────────────┘
```

**🎯 Mejoras de la interfaz:**
- **Sin etiquetas**: Botones auto-descriptivos sin labels adicionales
- **Más espacio**: Diseño vertical optimizado
- **Identificación visual**: Cada botón tiene color específico
- **Función Repetir**: Botón independiente junto a Fecha

#### **Campos del Formulario:**

**📋 Obligatorios:**
- **Contenido**: Descripción principal de la tarea

**📄 Opcionales (interfaz de botones):**
- **Descripción**: Información adicional (campo compacto)
- **[Proyecto]**: Botón azul - despliega lista de proyectos
- **[Prioridad]**: Botón naranja - P1 a P4 con colores
- **[Fecha]**: Botón verde - calendario y opciones rápidas
- **[Repetir]**: Botón morado - opciones de recurrencia
- **[Fecha Límite]**: Botón rojo - deadline específico
- **[Hora]**: Botón gris - selector cada 15 minutos (si habilitado)
- **[Duración]**: Botón morado - 15min a 8 horas
- **[Recordatorio]**: Botón verde - alertas configurables
- **[Etiquetas]**: Botón gris - selección múltiple
- **☑ Insertar en nota**: Checkbox compacto sin label

**🎨 Identificación por colores:**
- 🔵 **Azul**: Proyecto
- 🟠 **Naranja**: Prioridad  
- 🟢 **Verde**: Fecha y Recordatorio
- 🟣 **Morado**: Repetir y Duración
- 🔴 **Rojo**: Fecha Límite
- ⚫ **Gris**: Hora y Etiquetas

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

### 🔄 Función de Repetir **NUEVO** v2.2.1

**🔘 Botón independiente de repetición:**
Ahora junto al botón "Fecha" encontrarás un botón "Repetir" separado que te permite configurar tareas recurrentes de forma más intuitiva.

**🎯 Opciones disponibles:**
- **Cada día**: Repetición diaria
- **Cada semana**: Mismo día cada semana
- **Cada día laboral**: Solo lunes a viernes
- **Cada mes**: Mismo día cada mes
- **Cada año**: Fechas especiales anuales

**💡 Ventajas del nuevo diseño:**
- **🔘 Acceso directo**: Un clic en "Repetir" abre las opciones
- **👁️ Visibilidad clara**: Estado de repetición siempre visible
- **⚡ Configuración rápida**: Modal específico para repeticiones
- **🎨 Identificación visual**: Botón morado distintivo

**🏷️ Funcionalidad automática:**
- **#repeattodo**: Etiqueta automática en tareas repetitivas
- **🔄 Sincronización**: Compatible con Todoist nativo
- **📋 Plantilla específica**: Formato personalizable para recurrentes

### 📋 Nota Consolidada **NUEVO** v2.2

Genera automáticamente una vista unificada de todas tus tareas de Todoist:

**🎯 Funcionalidades:**
- **📊 Vista centralizada**: Todas las tareas en una sola nota de Obsidian
- **🔍 Filtrado inteligente**: Por proyectos y etiquetas específicas
- **📁 Organización por proyecto**: Agrupación automática con contadores
- **⚡ Priorización automática**: Ordenado por prioridad y fecha límite
- **📈 Resumen estadístico**: Contador total de tareas y proyectos
- **🔗 Enlaces directos**: Cada tarea enlaza directamente a Todoist
- **🎨 Formato enriquecido**: Prioridades visuales y etiquetas con formato

**🛠️ Configuración:**
1. **Ruta de nota**: Define dónde se creará la nota consolidada
2. **Filtros por proyecto**: Selecciona proyectos específicos (opcional)
3. **Filtros por etiqueta**: Selecciona etiquetas específicas (opcional)
4. **Generación automática**: Un comando genera toda la vista

**📋 Ejemplo de salida:**
```markdown
# Tareas Consolidadas de Todoist

*Generado el: 4/7/2025, 10:30:00*

## Trabajo (5)
- [ ] **Revisar propuesta cliente** [📋](https://todoist.com/task/123) P1 #urgente 📅 hoy
- [ ] **Preparar presentación** [📋](https://todoist.com/task/124) P2 #meeting 📅 mañana

## Personal (3)
- [ ] **Comprar víveres** [📋](https://todoist.com/task/125) P3 #compras 📅 esta semana

---

**Resumen**: 8 tareas en 2 proyectos
```

### ⏰ Tiempo Opcional **NUEVO** v2.2

La función de tiempo ahora es completamente opcional:

**🔧 Configuración:**
- **❌ Deshabilitada por defecto**: El selector de tiempo no aparece automáticamente
- **⚙️ Activación manual**: Habilita en configuraciones si necesitas tiempo específico
- **🎯 Enfoque simplificado**: Interfaz más limpia sin campos innecesarios
- **⚡ Mejor rendimiento**: Menos elementos en el formulario

**💡 Beneficios:**
- **🚀 Creación más rápida**: Menos campos que completar
- **🎨 Interfaz más limpia**: Solo lo esencial visible
- **🔧 Control total**: Activas solo si lo necesitas
- **📱 Mejor en móvil**: Menos elementos táctiles

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

### v2.2.1 - Interfaz Compacta y Función de Repetir 🎨
- 🔄 **NUEVO**: Botón "Repetir" independiente junto al botón de fecha con opciones: Cada día, Cada semana, Cada día laboral, Cada mes, Cada año
- 🎨 **NUEVO**: Interfaz completamente rediseñada con botones sin etiquetas para mayor compacidad
- 🔘 **NUEVO**: Proyecto, Prioridad, Fecha, Fecha Límite, Duración como botones desplegables
- 📱 **OPTIMIZADO**: Interfaz más compacta - eliminadas etiquetas de Recordatorio, Etiquetas e Insertar Nota
- ⚡ **MEJORADO**: Experiencia de usuario más fluida con modales específicos para cada selección
- 🎯 **MEJORADO**: Diseño responsive optimizado para móvil y desktop
- 🎨 **MEJORADO**: Códigos de colores específicos para cada tipo de botón
- 📏 **OPTIMIZADO**: Uso eficiente del espacio vertical en el formulario

### v2.2.0 - Release con Tareas Repetitivas y Nota Consolidada 🚀
- 🔄 **NUEVO**: Tareas repetitivas con etiqueta #repeattodo automática
- 📋 **NUEVO**: Funcionalidad de nota consolidada con filtros por proyecto y etiquetas
- ⏰ **NUEVO**: Función de tiempo 100% opcional (deshabilitada por defecto)
- 🎯 **NUEVO**: Comando para generar vista unificada de todas las tareas
- 📊 **NUEVO**: Resumen estadístico en nota consolidada
- 🔧 **NUEVO**: Configuración granular de filtros para nota consolidada
- ⚡ **OPTIMIZADO**: Mejor manejo de errores y rendimiento
- 🌍 **MEJORADO**: Traducciones más completas para nuevas funcionalidades
- 🏷️ **MEJORADO**: Mejor formateo de etiquetas en nota consolidada
- 📁 **MEJORADO**: Creación automática de directorios para nota consolidada
- 👤 **ACTUALIZADO**: Información del autor (Jonathan Hernandez)
- 🔗 **ACTUALIZADO**: Enlaces al repositorio GitHub

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
- 📦 **Confirma que tienes la última versión v2.2.1**
- 🐛 **Abre un issue** con detalles del problema

## 🌟 Características Destacadas v2.2

### 🎯 Experiencia de Usuario Superior
- **⚡ Más rápido**: Cache inteligente y optimizaciones
- **🎨 Más bonito**: Diseño compacto estilo Todoist real
- **📱 Más accesible**: Responsive design optimizado
- **🔧 Más confiable**: Indicadores de estado y mejor manejo de errores
- **📋 Más organizado**: Vista consolidada de todas las tareas

### 🚀 Productividad Maximizada
- **⏰ Fechas rápidas**: "Hoy" o "Mañana" con un clic
- **⏱️ Duración precisa**: Planificación mejorada
- **🔄 Repetición automática**: Hábitos y rutinas con #repeattodo
- **🎨 Visual mejorado**: Identificación instantánea de prioridades
- **🏷️ Etiquetas claras**: Lista visual con colores preservados
- **📊 Vista unificada**: Consolidación inteligente por proyecto y etiquetas
- **⚙️ Control granular**: Tiempo opcional, filtros personalizables

---

**¡Plugin completamente optimizado con interfaz compacta y función Repetir independiente! 🚀✨**

> *Desarrollado con ❤️ por Jonathan Hernandez para la comunidad de Obsidian*
> 
> **Repositorio**: [https://github.com/jonathanhher/obsidian-todoist-creator](https://github.com/jonathanhher/obsidian-todoist-creator)
> 
> **Versión actual**: 2.2.1 - Interfaz compacta con función Repetir independiente