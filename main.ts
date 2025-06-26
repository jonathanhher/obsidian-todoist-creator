// main.ts - Versión Final Corregida con Sincronización Bidireccional
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, MarkdownFileInfo, TFile } from 'obsidian';

interface TodoistPluginSettings {
    apiToken: string;
    defaultProject: string;
    taskTemplate: string;
    insertTaskInNote: boolean;
    taskNoteTemplate: string;
    autoRefresh: boolean;
    refreshInterval: number;
    language: 'en' | 'es';
    enableSync: boolean;
    syncInterval: number;
    defaultTime: string;
    defaultDuration: number;
}

const DEFAULT_SETTINGS: TodoistPluginSettings = {
    apiToken: '',
    defaultProject: '',
    taskTemplate: '{{content}}',
    insertTaskInNote: true,
    taskNoteTemplate: '- [ ] {{content}} [📋]({{url}}) {{priority}} {{labels}} {{due}} {{description}} #tasktodo',
    autoRefresh: false,
    refreshInterval: 300,
    language: 'es',
    enableSync: true,
    syncInterval: 60,
    defaultTime: '08:00',
    defaultDuration: 60
}

// Traducciones
const translations = {
    en: {
        'createTask': 'Create Todoist Task',
        'taskContent': 'Task Content',
        'taskContentPlaceholder': 'Write your task content...',
        'description': 'Description (optional)',
        'descriptionPlaceholder': 'Additional task description...',
        'project': 'Project',
        'inbox': 'Inbox',
        'priority': 'Priority',
        'deadline': 'Deadline',
        'dueTime': 'Due Time (optional)',
        'duration': 'Duration (optional)',
        'reminder': 'Reminder (optional)',
        'labels': 'Labels',
        'insertInNote': 'Insert reference in current note',
        'cancel': 'Cancel',
        'createTaskBtn': 'Create Task',
        'selectDate': 'Select Date',
        'selectTime': 'Select Time',
        'selectDuration': 'Select Duration',
        'noReminder': 'No reminder',
        'noDuration': 'No duration',
        'p1Urgent': 'P1 - Urgent',
        'p2High': 'P2 - High',
        'p3Medium': 'P3 - Medium',
        'p4Low': 'P4 - Low',
        '5minBefore': '5 minutes before',
        '15minBefore': '15 minutes before',
        '30minBefore': '30 minutes before',
        '1hourBefore': '1 hour before',
        '2hoursBefore': '2 hours before',
        '1dayBefore': '1 day before',
        'createTaskCommand': 'Create Todoist task',
        'createFromSelection': 'Create task from selection',
        'settingsTitle': 'Todoist Configuration',
        'apiToken': 'API Token',
        'apiTokenDesc': 'Your Todoist API token. Click to configure.',
        'defaultProject': 'Default Project',
        'defaultProjectDesc': 'Default project ID for new tasks (optional)',
        'taskTemplate': 'Task template in note',
        'taskTemplateDesc': 'Format of text inserted in note. Use {{content}}, {{url}}, {{id}}, {{priority}}, {{labels}}, {{due}}, {{description}}',
        'insertByDefault': 'Insert in note by default',
        'insertByDefaultDesc': 'Always insert task reference in current note',
        'autoRefresh': 'Auto refresh',
        'autoRefreshDesc': 'Automatically refresh projects and labels',
        'refreshInterval': 'Refresh interval (seconds)',
        'refreshIntervalDesc': 'How often to refresh data from Todoist',
        'language': 'Language',
        'languageDesc': 'Plugin interface language',
        'configureToken': 'Configure API Token',
        'taskCreated': 'Task created',
        'configureApiFirst': 'Configure your Todoist API token first',
        'selectTextFirst': 'Select text to create a task',
        'enterTaskContent': 'Enter task content',
        'errorCreatingTask': 'Error creating task',
        'tokenModalTitle': 'Configure Todoist API Token',
        'tokenModalDesc': 'Get your API token from Todoist integrations settings',
        'tokenPlaceholder': 'Enter your API token...',
        'getTokenLink': 'Get your token here',
        'save': 'Save',
        'tokenSaved': 'API token saved successfully',
        'creating': 'Creating task...',
        'enableSync': 'Enable synchronization',
        'enableSyncDesc': 'Sync task status between Obsidian and Todoist',
        'syncInterval': 'Sync interval (seconds)',
        'syncIntervalDesc': 'How often to check for task updates',
        'defaultTime': 'Default time',
        'defaultTimeDesc': 'Default time when creating tasks with due date',
        'defaultDuration': 'Default duration (minutes)',
        'defaultDurationDesc': 'Default task duration in minutes',
        'taskCompleted': 'Task completed in Todoist',
        'taskUncompleted': 'Task reopened in Todoist',
        'syncError': 'Sync error',
        'apiStatus': 'API Connection Status',
        'apiConnected': 'Connected',
        'apiDisconnected': 'Disconnected',
        'testConnection': 'Test Connection',
        'today': 'Today',
        'tomorrow': 'Tomorrow',
        'thisWeek': 'This Week',
        'nextWeek': 'Next Week',
        'customDate': 'Custom Date',
        'repeatTask': 'Repeat Task',
        'noRepeat': 'No repeat',
        'daily': 'Daily',
        'weekly': 'Weekly (same day)',
        'weekdays': 'Weekdays (Mon-Fri)',
        'monthly': 'Monthly',
        'yearly': 'Yearly',
        '15min': '15 minutes',
        '30min': '30 minutes',
        '45min': '45 minutes',
        '1hour': '1 hour',
        '1hour30min': '1 hour 30 minutes',
        '2hours': '2 hours',
        '2hours30min': '2 hours 30 minutes',
        '3hours': '3 hours',
        '4hours': '4 hours',
        '5hours': '5 hours',
        '6hours': '6 hours',
        '7hours': '7 hours',
        '8hours': '8 hours'
    },
    es: {
        'createTask': 'Crear Tarea en Todoist',
        'taskContent': 'Contenido de la Tarea',
        'taskContentPlaceholder': 'Escribe el contenido de tu tarea...',
        'description': 'Descripción (opcional)',
        'descriptionPlaceholder': 'Descripción adicional de la tarea...',
        'project': 'Proyecto',
        'inbox': 'Bandeja de Entrada',
        'priority': 'Prioridad',
        'deadline': 'Fecha Límite',
        'dueTime': 'Hora Límite (opcional)',
        'duration': 'Duración (opcional)',
        'reminder': 'Recordatorio (opcional)',
        'labels': 'Etiquetas',
        'insertInNote': 'Insertar referencia en la nota actual',
        'cancel': 'Cancelar',
        'createTaskBtn': 'Crear Tarea',
        'selectDate': 'Seleccionar Fecha',
        'selectTime': 'Seleccionar Hora',
        'selectDuration': 'Seleccionar Duración',
        'noReminder': 'Sin recordatorio',
        'noDuration': 'Sin duración',
        'p1Urgent': 'P1 - Urgente',
        'p2High': 'P2 - Alta',
        'p3Medium': 'P3 - Media',
        'p4Low': 'P4 - Baja',
        '5minBefore': '5 minutos antes',
        '15minBefore': '15 minutos antes',
        '30minBefore': '30 minutos antes',
        '1hourBefore': '1 hora antes',
        '2hoursBefore': '2 horas antes',
        '1dayBefore': '1 día antes',
        'createTaskCommand': 'Crear tarea en Todoist',
        'createFromSelection': 'Crear tarea desde selección',
        'settingsTitle': 'Configuración de Todoist',
        'apiToken': 'Token de API',
        'apiTokenDesc': 'Tu token de API de Todoist. Haz clic para configurar.',
        'defaultProject': 'Proyecto por Defecto',
        'defaultProjectDesc': 'ID del proyecto donde se crearán las tareas por defecto (opcional)',
        'taskTemplate': 'Plantilla de tarea en nota',
        'taskTemplateDesc': 'Formato del texto que se insertará en la nota. Usa {{content}}, {{url}}, {{id}}, {{priority}}, {{labels}}, {{due}}, {{description}}',
        'insertByDefault': 'Insertar en nota por defecto',
        'insertByDefaultDesc': 'Siempre insertar referencia de la tarea en la nota actual',
        'autoRefresh': 'Actualización automática',
        'autoRefreshDesc': 'Actualizar automáticamente proyectos y etiquetas',
        'refreshInterval': 'Intervalo de actualización (segundos)',
        'refreshIntervalDesc': 'Cada cuánto tiempo actualizar datos de Todoist',
        'language': 'Idioma',
        'languageDesc': 'Idioma de la interfaz del plugin',
        'configureToken': 'Configurar Token de API',
        'taskCreated': 'Tarea creada',
        'configureApiFirst': 'Configura tu token de API de Todoist primero',
        'selectTextFirst': 'Selecciona texto para crear una tarea',
        'enterTaskContent': 'Ingresa el contenido de la tarea',
        'errorCreatingTask': 'Error al crear tarea',
        'tokenModalTitle': 'Configurar Token de API de Todoist',
        'tokenModalDesc': 'Obtén tu token de API desde las configuraciones de integraciones de Todoist',
        'tokenPlaceholder': 'Ingresa tu token de API...',
        'getTokenLink': 'Obtén tu token aquí',
        'save': 'Guardar',
        'tokenSaved': 'Token de API guardado exitosamente',
        'creating': 'Creando tarea...',
        'enableSync': 'Habilitar sincronización',
        'enableSyncDesc': 'Sincronizar estado de tareas entre Obsidian y Todoist',
        'syncInterval': 'Intervalo de sincronización (segundos)',
        'syncIntervalDesc': 'Cada cuánto tiempo verificar actualizaciones de tareas',
        'defaultTime': 'Hora por defecto',
        'defaultTimeDesc': 'Hora predeterminada al crear tareas con fecha límite',
        'defaultDuration': 'Duración por defecto (minutos)',
        'defaultDurationDesc': 'Duración predeterminada de tareas en minutos',
        'taskCompleted': 'Tarea completada en Todoist',
        'taskUncompleted': 'Tarea reabierta en Todoist',
        'syncError': 'Error de sincronización',
        'apiStatus': 'Estado de Conexión API',
        'apiConnected': 'Conectado',
        'apiDisconnected': 'Desconectado',
        'testConnection': 'Probar Conexión',
        'today': 'Hoy',
        'tomorrow': 'Mañana',
        'thisWeek': 'Esta Semana',
        'nextWeek': 'Próxima Semana',
        'customDate': 'Fecha Personalizada',
        'repeatTask': 'Repetir Tarea',
        'noRepeat': 'No repetir',
        'daily': 'Diariamente',
        'weekly': 'Semanalmente (mismo día)',
        'weekdays': 'Días laborales (Lun-Vie)',
        'monthly': 'Mensualmente',
        'yearly': 'Anualmente',
        '15min': '15 minutos',
        '30min': '30 minutos',
        '45min': '45 minutos',
        '1hour': '1 hora',
        '1hour30min': '1 hora 30 minutos',
        '2hours': '2 horas',
        '2hours30min': '2 horas 30 minutos',
        '3hours': '3 horas',
        '4hours': '4 horas',
        '5hours': '5 horas',
        '6hours': '6 horas',
        '7hours': '7 horas',
        '8hours': '8 horas'
    }
};

interface TodoistTask {
    id: string;
    content: string;
    description: string;
    project_id: string;
    url: string;
    priority: number;
    labels: string[];
    is_completed: boolean;
    due?: {
        date: string;
        string: string;
        datetime?: string;
        recurring?: boolean;
    };
    duration?: {
        amount: number;
        unit: string;
    };
}

interface TodoistProject {
    id: string;
    name: string;
    color: string;
}

interface TodoistLabel {
    id: string;
    name: string;
    color: string;
}

interface TaskCreationData {
    content: string;
    description?: string;
    project_id?: string;
    due_date?: string;
    due_datetime?: string;
    due_string?: string;
    priority: number;
    labels: string[];
    reminder?: string;
    duration?: number;
    duration_unit?: string;
}

interface TaskMapping {
    todoistId: string;
    file: string;
    line: number;
    lineContent: string; // Agregar contenido de línea para mejor detección
}

export default class TodoistPlugin extends Plugin {
    settings: TodoistPluginSettings;
    refreshInterval: NodeJS.Timeout | null = null;
    syncInterval: NodeJS.Timeout | null = null;
    
    // Cache optimizado
    private projectsCache: TodoistProject[] = [];
    private labelsCache: TodoistLabel[] = [];
    private lastFetch: number = 0;
    private cacheDuration: number = 5 * 60 * 1000;
    
    // Mapeo de tareas para sincronización mejorado
    private taskMappings: Map<string, TaskMapping> = new Map();
    public apiStatus: boolean = false;

    // Debounce para cambios del editor
    private debounceTimeout: NodeJS.Timeout | null = null;

    async onload() {
        await this.loadSettings();
        await this.loadTaskMappings();

        this.addCommand({
            id: 'create-todoist-task',
            name: this.t('createTaskCommand'),
            callback: () => {
                new CreateTaskModal(this.app, this).open();
            }
        });

        this.addCommand({
            id: 'create-task-from-selection',
            name: this.t('createFromSelection'),
            editorCallback: (editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    this.createTaskFromText(selection);
                } else {
                    new Notice(this.t('selectTextFirst'));
                }
            }
        });

        this.addSettingTab(new TodoistSettingTab(this.app, this));

        if (this.settings.autoRefresh) {
            this.startAutoRefresh();
        }

        if (this.settings.enableSync) {
            this.startSync();
        }

        // Escuchar cambios en archivos para detectar checkboxes - MEJORADO
        this.registerEvent(
            this.app.workspace.on('editor-change', (editor: Editor, view: MarkdownView | MarkdownFileInfo) => {
                if (this.settings.enableSync && view instanceof MarkdownView) {
                    this.debounceEditorChange(editor, view);
                }
            })
        );

        // También escuchar cambios en archivos (para cambios desde vista previa)
        this.registerEvent(
            this.app.vault.on('modify', (file: TFile) => {
                if (this.settings.enableSync && file.extension === 'md') {
                    this.debounceFileChange(file);
                }
            })
        );

        this.preloadData();
        this.testApiConnection();
    }

    onunload() {
        this.stopAutoRefresh();
        this.stopSync();
        this.saveTaskMappings();
    }

    t(key: string): string {
        return translations[this.settings.language][key] || key;
    }

    // Debounce mejorado para cambios del editor
    private debounceEditorChange(editor: Editor, view: MarkdownView) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this.handleEditorChange(editor, view);
        }, 1000); // Aumentar a 1 segundo para mejor estabilidad
    }

    // Nuevo: Debounce para cambios de archivo
    private debounceFileChange(file: TFile) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this.handleFileChange(file);
        }, 1000);
    }

    async testApiConnection(): Promise<boolean> {
        if (!this.settings.apiToken) {
            this.apiStatus = false;
            return false;
        }

        try {
            const response = await fetch('https://api.todoist.com/rest/v2/projects', {
                headers: {
                    'Authorization': `Bearer ${this.settings.apiToken}`
                },
                body: JSON.stringify({
                    item_id: taskId,
                    due: { string: reminderTime }
                })
            });

            if (!response.ok) {
                console.warn('Error creating reminder:', response.status);
            }
        } catch (error) {
            console.warn('Error creating reminder:', error);
        }
    }

    async insertTaskInCurrentNote(task: TodoistTask) {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeView) {
            return;
        }

        const editor = activeView.editor;
        const cursor = editor.getCursor();
        
        const priorityText = this.getPriorityTextWithColor(task.priority);
        const labelsText = task.labels && task.labels.length > 0 ? 
            task.labels.map(label => {
                const labelColor = this.getLabelColor(label);
                return `<span class="todoist-label" style="background-color: ${labelColor}20; border-color: ${labelColor}; color: var(--text-normal);">${label}</span>`;
            }).join(' ') : '';
        const dueText = task.due ? `<span class="todoist-due">${task.due.string}</span>` : '';
        const descText = task.description ? `<span class="todoist-description">${task.description}</span>` : '';
        
        const taskText = this.settings.taskNoteTemplate
            .replace('{{content}}', task.content)
            .replace('{{url}}', task.url)
            .replace('{{id}}', task.id)
            .replace('{{priority}}', priorityText)
            .replace('{{labels}}', labelsText)
            .replace('{{due}}', dueText)
            .replace('{{description}}', descText);
        
        const finalText = taskText.includes('#tasktodo') ? taskText : `${taskText} #tasktodo`;
        
        editor.replaceRange(finalText + '\n', cursor);
        
        // MEJORADO: Guardar mapping para sincronización con contenido de línea
        if (this.settings.enableSync) {
            const file = activeView.file;
            if (file) {
                this.taskMappings.set(task.id, {
                    todoistId: task.id,
                    file: file.path,
                    line: cursor.line,
                    lineContent: finalText
                });
                this.saveTaskMappings();
                console.log(`Saved mapping for task ${task.id} at line ${cursor.line}`);
            }
        }
        
        const newLine = cursor.line + 1;
        editor.setCursor({ line: newLine, ch: 0 });
    }

    getLabelColor(labelName: string): string {
        const label = this.labelsCache.find(l => l.name === labelName);
        return label?.color || '#808080';
    }

    getPriorityText(priority: number): string {
        switch (priority) {
            case 4: return 'P1';
            case 3: return 'P2';
            case 2: return 'P3';
            case 1: return 'P4';
            default: return 'P4';
        }
    }

    getPriorityTextWithColor(priority: number): string {
        const text = this.getPriorityText(priority);
        const className = `todoist-priority-${text.toLowerCase()}`;
        return `<span class="${className}">${text}</span>`;
    }

    async getProjects(): Promise<TodoistProject[]> {
        if (!this.settings.apiToken) {
            return [];
        }

        const now = Date.now();
        if (this.projectsCache.length > 0 && (now - this.lastFetch) < this.cacheDuration) {
            return this.projectsCache;
        }

        try {
            const response = await fetch('https://api.todoist.com/rest/v2/projects', {
                headers: {
                    'Authorization': `Bearer ${this.settings.apiToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.projectsCache = await response.json();
            this.lastFetch = now;
            return this.projectsCache;
        } catch (error) {
            console.error('Error fetching projects:', error);
            return this.projectsCache;
        }
    }

    async getLabels(): Promise<TodoistLabel[]> {
        if (!this.settings.apiToken) {
            return [];
        }

        const now = Date.now();
        if (this.labelsCache.length > 0 && (now - this.lastFetch) < this.cacheDuration) {
            return this.labelsCache;
        }

        try {
            const response = await fetch('https://api.todoist.com/rest/v2/labels', {
                headers: {
                    'Authorization': `Bearer ${this.settings.apiToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.labelsCache = await response.json();
            return this.labelsCache;
        } catch (error) {
            console.error('Error fetching labels:', error);
            return this.labelsCache;
        }
    }
}

// Modal para configurar API Token con indicador de estado
class ApiTokenModal extends Modal {
    plugin: TodoistPlugin;
    tokenInput: HTMLInputElement;
    statusIndicator: HTMLElement;

    constructor(app: App, plugin: TodoistPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: this.plugin.t('tokenModalTitle') });

        // Indicador de estado
        const statusContainer = contentEl.createDiv({ cls: 'api-status-container' });
        statusContainer.createEl('span', { text: this.plugin.t('apiStatus') + ': ' });
        this.statusIndicator = statusContainer.createEl('span', { 
            cls: this.plugin.apiStatus ? 'api-status-connected' : 'api-status-disconnected',
            text: this.plugin.apiStatus ? this.plugin.t('apiConnected') : this.plugin.t('apiDisconnected')
        });

        const descEl = contentEl.createEl('p', { text: this.plugin.t('tokenModalDesc') });
        descEl.style.marginBottom = '20px';
        descEl.style.color = 'var(--text-muted)';

        const linkEl = contentEl.createEl('a', { 
            text: this.plugin.t('getTokenLink'),
            href: 'https://todoist.com/prefs/integrations'
        });
        linkEl.style.marginBottom = '15px';
        linkEl.style.display = 'block';
        linkEl.target = '_blank';

        const tokenContainer = contentEl.createDiv();
        tokenContainer.style.marginBottom = '20px';

        this.tokenInput = tokenContainer.createEl('input', {
            type: 'password',
            placeholder: this.plugin.t('tokenPlaceholder')
        });
        this.tokenInput.style.width = '100%';
        this.tokenInput.style.padding = '10px';
        this.tokenInput.style.border = '1px solid var(--background-modifier-border)';
        this.tokenInput.style.borderRadius = '4px';
        this.tokenInput.style.background = 'var(--background-primary)';
        this.tokenInput.style.color = 'var(--text-normal)';
        this.tokenInput.value = this.plugin.settings.apiToken;

        const buttonContainer = contentEl.createDiv();
        buttonContainer.style.textAlign = 'right';

        const testButton = buttonContainer.createEl('button', { text: this.plugin.t('testConnection') });
        testButton.style.marginRight = '10px';
        testButton.addEventListener('click', () => this.testConnection());

        const cancelButton = buttonContainer.createEl('button', { text: this.plugin.t('cancel') });
        cancelButton.style.marginRight = '10px';
        cancelButton.addEventListener('click', () => this.close());

        const saveButton = buttonContainer.createEl('button', { text: this.plugin.t('save') });
        saveButton.addClass('mod-cta');
        saveButton.addEventListener('click', () => this.saveToken());

        setTimeout(() => this.tokenInput.focus(), 100);

        this.tokenInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveToken();
            }
        });
    }

    async testConnection() {
        const token = this.tokenInput.value.trim();
        if (!token) return;

        const originalToken = this.plugin.settings.apiToken;
        this.plugin.settings.apiToken = token;
        
        const isConnected = await this.plugin.testApiConnection();
        
        this.statusIndicator.className = isConnected ? 'api-status-connected' : 'api-status-disconnected';
        this.statusIndicator.textContent = isConnected ? this.plugin.t('apiConnected') : this.plugin.t('apiDisconnected');
        
        if (!isConnected) {
            this.plugin.settings.apiToken = originalToken;
        }
    }

    async saveToken() {
        const token = this.tokenInput.value.trim();
        if (token) {
            this.plugin.settings.apiToken = token;
            await this.plugin.saveSettings();
            new Notice(this.plugin.t('tokenSaved'));
            this.close();
            this.plugin.refreshCache();
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal mejorado para seleccionar fecha con repetición integrada
class DatePickerModal extends Modal {
    plugin: TodoistPlugin;
    onDateSelect: (date: string, repeat?: string) => void;
    selectedRepeat: string = '';

    constructor(app: App, plugin: TodoistPlugin, onDateSelect: (date: string, repeat?: string) => void) {
        super(app);
        this.plugin = plugin;
        this.onDateSelect = onDateSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: this.plugin.t('deadline'), cls: 'modal-title' });

        // Opciones rápidas
        const quickOptions = contentEl.createDiv({ cls: 'date-quick-options' });
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        const thisWeekEnd = new Date(today);
        thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()));
        
        const nextWeekEnd = new Date(thisWeekEnd);
        nextWeekEnd.setDate(thisWeekEnd.getDate() + 7);

        const quickDates = [
            { label: this.plugin.t('today'), value: this.formatDate(today) },
            { label: this.plugin.t('tomorrow'), value: this.formatDate(tomorrow) },
            { label: this.plugin.t('thisWeek'), value: this.formatDate(thisWeekEnd) },
            { label: this.plugin.t('nextWeek'), value: this.formatDate(nextWeekEnd) }
        ];

        quickDates.forEach(dateOption => {
            const button = quickOptions.createEl('button', { 
                text: dateOption.label,
                cls: 'date-quick-button'
            });
            button.addEventListener('click', () => {
                this.onDateSelect(dateOption.value, this.selectedRepeat);
                this.close();
            });
        });

        // Separador
        contentEl.createEl('hr', { cls: 'date-separator' });
        
        // Repetición
        const repeatContainer = contentEl.createDiv({ cls: 'repeat-container' });
        repeatContainer.createEl('label', { text: this.plugin.t('repeatTask') + ':' });
        
        const repeatSelect = repeatContainer.createEl('select', { cls: 'repeat-select' });
        
        const repeatOptions = [
            { value: '', key: 'noRepeat' },
            { value: 'every day', key: 'daily' },
            { value: 'every week', key: 'weekly' },
            { value: 'every weekday', key: 'weekdays' },
            { value: 'every month', key: 'monthly' },
            { value: 'every year', key: 'yearly' }
        ];
        
        repeatOptions.forEach(option => {
            const optionElement = repeatSelect.createEl('option', { text: this.plugin.t(option.key) });
            optionElement.value = option.value;
        });
        
        repeatSelect.addEventListener('change', (e) => {
            this.selectedRepeat = (e.target as HTMLSelectElement).value;
        });
        
        // Texto para calendario personalizado
        contentEl.createEl('p', { 
            text: this.plugin.t('customDate'),
            cls: 'date-custom-label'
        });

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        this.renderCalendar(contentEl, currentMonth, currentYear);
    }

    formatDate(date: Date): string {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    renderCalendar(container: HTMLElement, month: number, year: number) {
        // Limpiar calendario anterior si existe
        const existingCalendar = container.querySelector('.calendar-container');
        if (existingCalendar) {
            existingCalendar.remove();
        }

        const calendarContainer = container.createDiv({ cls: 'calendar-container' });

        const headerEl = calendarContainer.createDiv({ cls: 'calendar-header' });

        const prevButton = headerEl.createEl('button', { text: '‹', cls: 'calendar-nav-button' });
        const monthYearEl = headerEl.createEl('span', { 
            text: new Date(year, month).toLocaleDateString(this.plugin.settings.language === 'es' ? 'es' : 'en', { 
                month: 'long', 
                year: 'numeric' 
            }),
            cls: 'calendar-month-year'
        });
        const nextButton = headerEl.createEl('button', { text: '›', cls: 'calendar-nav-button' });

        prevButton.addEventListener('click', () => {
            const newDate = new Date(year, month - 1);
            this.renderCalendar(container, newDate.getMonth(), newDate.getFullYear());
        });

        nextButton.addEventListener('click', () => {
            const newDate = new Date(year, month + 1);
            this.renderCalendar(container, newDate.getMonth(), newDate.getFullYear());
        });

        const calendarEl = calendarContainer.createDiv({ cls: 'calendar-grid' });

        const daysOfWeek = this.plugin.settings.language === 'es' 
            ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
        daysOfWeek.forEach(day => {
            const dayEl = calendarEl.createEl('div', { text: day, cls: 'calendar-day-header' });
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Días vacíos al inicio
        for (let i = 0; i < firstDay; i++) {
            calendarEl.createDiv({ cls: 'calendar-day-empty' });
        }

        // Días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = calendarEl.createEl('div', { text: day.toString(), cls: 'calendar-day' });

            const currentDate = new Date(year, month, day);
            const isToday = currentDate.toDateString() === today.toDateString();
            const isPast = currentDate < today;
            
            if (isToday) {
                dayEl.addClass('calendar-day-today');
            }
            
            if (isPast) {
                dayEl.addClass('calendar-day-past');
            }

            dayEl.addEventListener('click', () => {
                const selectedDate = this.formatDate(currentDate);
                this.onDateSelect(selectedDate, this.selectedRepeat);
                this.close();
            });
        }

        // Botón cancelar
        const cancelButton = calendarContainer.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'calendar-cancel-button'
        });
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal mejorado para seleccionar hora con hora actual
class TimePickerModal extends Modal {
    plugin: TodoistPlugin;
    onTimeSelect: (time: string) => void;

    constructor(app: App, plugin: TodoistPlugin, onTimeSelect: (time: string) => void) {
        super(app);
        this.plugin = plugin;
        this.onTimeSelect = onTimeSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: this.plugin.t('selectTime'), cls: 'modal-title' });

        const timeContainer = contentEl.createDiv({ cls: 'time-container' });

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = Math.floor(currentTime.getMinutes() / 15) * 15;

        // Generar horarios cada 15 minutos
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const displayTime = new Date(0, 0, 0, hour, minute).toLocaleTimeString(
                    this.plugin.settings.language === 'es' ? 'es' : 'en', 
                    { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                    }
                );

                const timeEl = timeContainer.createEl('div', { text: displayTime, cls: 'time-option' });

                // Destacar la hora actual
                if (hour === currentHour && minute === currentMinute) {
                    timeEl.addClass('time-option-current');
                    // Hacer scroll a la hora actual
                    setTimeout(() => {
                        timeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }

                timeEl.addEventListener('click', () => {
                    this.onTimeSelect(timeString);
                    this.close();
                });
            }
        }

        const cancelButton = contentEl.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'time-cancel-button'
        });
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal para seleccionar recordatorio
class ReminderPickerModal extends Modal {
    plugin: TodoistPlugin;
    onReminderSelect: (reminder: string) => void;

    constructor(app: App, plugin: TodoistPlugin, onReminderSelect: (reminder: string) => void) {
        super(app);
        this.plugin = plugin;
        this.onReminderSelect = onReminderSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: this.plugin.t('reminder'), cls: 'modal-title' });

        const reminderContainer = contentEl.createDiv({ cls: 'reminder-container' });

        const reminderOptions = [
            { value: '', key: 'noReminder' },
            { value: '5 minutes before', key: '5minBefore' },
            { value: '15 minutes before', key: '15minBefore' },
            { value: '30 minutes before', key: '30minBefore' },
            { value: '1 hour before', key: '1hourBefore' },
            { value: '2 hours before', key: '2hoursBefore' },
            { value: '1 day before', key: '1dayBefore' }
        ];

        reminderOptions.forEach(option => {
            const reminderEl = reminderContainer.createEl('div', { 
                text: this.plugin.t(option.key),
                cls: 'reminder-option'
            });

            reminderEl.addEventListener('click', () => {
                this.onReminderSelect(option.value);
                this.close();
            });
        });

        const cancelButton = contentEl.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'reminder-cancel-button'
        });
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal para seleccionar duración
class DurationPickerModal extends Modal {
    plugin: TodoistPlugin;
    onDurationSelect: (duration: number) => void;

    constructor(app: App, plugin: TodoistPlugin, onDurationSelect: (duration: number) => void) {
        super(app);
        this.plugin = plugin;
        this.onDurationSelect = onDurationSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: this.plugin.t('selectDuration'), cls: 'modal-title' });

        const durationContainer = contentEl.createDiv({ cls: 'duration-container' });

        const durations = [
            { minutes: 15, key: '15min' },
            { minutes: 30, key: '30min' },
            { minutes: 45, key: '45min' },
            { minutes: 60, key: '1hour' },
            { minutes: 90, key: '1hour30min' },
            { minutes: 120, key: '2hours' },
            { minutes: 150, key: '2hours30min' },
            { minutes: 180, key: '3hours' },
            { minutes: 240, key: '4hours' },
            { minutes: 300, key: '5hours' },
            { minutes: 360, key: '6hours' },
            { minutes: 420, key: '7hours' },
            { minutes: 480, key: '8hours' }
        ];

        durations.forEach(duration => {
            const durationEl = durationContainer.createEl('div', { 
                text: this.plugin.t(duration.key),
                cls: 'duration-option'
            });

            durationEl.addEventListener('click', () => {
                this.onDurationSelect(duration.minutes);
                this.close();
            });
        });

        const cancelButton = contentEl.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'duration-cancel-button'
        });
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal principal de creación de tareas
class CreateTaskModal extends Modal {
    plugin: TodoistPlugin;
    taskContent: string = '';
    taskDescription: string = '';
    selectedProject: string;
    selectedPriority: number = 1;
    selectedLabels: string[] = [];
    dueDate: string = '';
    dueTime: string = '';
    taskDuration: number = 0;
    reminderTime: string = '';
    repeatOption: string = '';
    projects: TodoistProject[] = [];
    labels: TodoistLabel[] = [];
    dueDateButton: HTMLButtonElement;
    dueTimeButton: HTMLButtonElement;
    durationButton: HTMLButtonElement;
    reminderButton: HTMLButtonElement;
    labelsButton: HTMLButtonElement;
    createButton: HTMLButtonElement;

    constructor(app: App, plugin: TodoistPlugin) {
        super(app);
        this.plugin = plugin;
        this.selectedProject = plugin.settings.defaultProject;
        this.dueTime = plugin.settings.defaultTime;
        this.taskDuration = plugin.settings.defaultDuration;
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.addClass('todoist-modal');
        contentEl.createEl('h2', { text: this.plugin.t('createTask'), cls: 'modal-title' });

        const [projects, labels] = await Promise.all([
            this.plugin.getProjects(),
            this.plugin.getLabels()
        ]);
        
        this.projects = projects;
        this.labels = labels;

        this.createTaskContentField(contentEl);
        this.createDescriptionField(contentEl);
        this.createProjectSelector(contentEl);
        this.createPrioritySelector(contentEl);
        this.createDueDateFields(contentEl);
        this.createReminderField(contentEl);
        this.createLabelsSelector(contentEl);
        this.createInsertNoteCheckbox(contentEl);
        this.createButtons(contentEl);
    }

    createTaskContentField(contentEl: HTMLElement) {
        const taskContentContainer = contentEl.createDiv({ cls: 'field-container' });
        taskContentContainer.createEl('label', { text: this.plugin.t('taskContent') + ' *', cls: 'field-label' });
        const taskInput = taskContentContainer.createEl('input', {
            type: 'text',
            placeholder: this.plugin.t('taskContentPlaceholder'),
            cls: 'task-input'
        });
        taskInput.addEventListener('input', (e) => {
            this.taskContent = (e.target as HTMLInputElement).value;
        });
        
        setTimeout(() => taskInput.focus(), 100);
    }

    createDescriptionField(contentEl: HTMLElement) {
        const descContainer = contentEl.createDiv({ cls: 'field-container' });
        descContainer.createEl('label', { text: this.plugin.t('description'), cls: 'field-label' });
        
        const descTextarea = descContainer.createEl('textarea', {
            placeholder: this.plugin.t('descriptionPlaceholder'),
            cls: 'description-textarea'
        });
        descTextarea.addEventListener('input', (e) => {
            this.taskDescription = (e.target as HTMLTextAreaElement).value;
        });
    }

    createProjectSelector(contentEl: HTMLElement) {
        if (this.projects.length > 0) {
            const projectContainer = contentEl.createDiv({ cls: 'field-container' });
            projectContainer.createEl('label', { text: this.plugin.t('project'), cls: 'field-label' });
            
            const projectSelect = projectContainer.createEl('select', { cls: 'project-select' });
            
            const defaultOption = projectSelect.createEl('option', { text: this.plugin.t('inbox') });
            defaultOption.value = '';
            
            this.projects.forEach(project => {
                const option = projectSelect.createEl('option', { text: project.name });
                option.value = project.id;
                if (project.id === this.selectedProject) {
                    option.selected = true;
                }
            });
            
            projectSelect.addEventListener('change', (e) => {
                this.selectedProject = (e.target as HTMLSelectElement).value;
            });
        }
    }

    createPrioritySelector(contentEl: HTMLElement) {
        const priorityContainer = contentEl.createDiv({ cls: 'field-container' });
        priorityContainer.createEl('label', { text: this.plugin.t('priority'), cls: 'field-label' });
        
        const prioritySelect = priorityContainer.createEl('select', { cls: 'priority-select' });
        
        const priorities = [
            { value: 4, key: 'p1Urgent', color: '#d1453b' },
            { value: 3, key: 'p2High', color: '#eb8909' },
            { value: 2, key: 'p3Medium', color: '#246fe0' },
            { value: 1, key: 'p4Low', color: '#666666' }
        ];
        
        priorities.forEach(priority => {
            const option = prioritySelect.createEl('option', { text: this.plugin.t(priority.key) });
            option.value = priority.value.toString();
            if (priority.value === this.selectedPriority) {
                option.selected = true;
            }
        });
        
        prioritySelect.addEventListener('change', (e) => {
            this.selectedPriority = parseInt((e.target as HTMLSelectElement).value);
        });
    }

    createDueDateFields(contentEl: HTMLElement) {
        const dueDateContainer = contentEl.createDiv({ cls: 'field-container' });
        dueDateContainer.createEl('label', { text: this.plugin.t('deadline'), cls: 'field-label' });
        
        const dateTimeContainer = dueDateContainer.createDiv({ cls: 'date-time-duration-container' });
        
        this.dueDateButton = dateTimeContainer.createEl('button', { 
            text: this.dueDate || this.plugin.t('selectDate'),
            cls: 'todoist-button date-button'
        });
        this.dueDateButton.addEventListener('click', () => {
            new DatePickerModal(this.app, this.plugin, (selectedDate, repeat) => {
                this.dueDate = selectedDate;
                this.repeatOption = repeat || '';
                this.dueDateButton.setText(selectedDate);
            }).open();
        });
        
        this.dueTimeButton = dateTimeContainer.createEl('button', { 
            text: this.dueTime || this.plugin.t('selectTime'),
            cls: 'todoist-button time-button'
        });
        this.dueTimeButton.addEventListener('click', () => {
            new TimePickerModal(this.app, this.plugin, (selectedTime) => {
                this.dueTime = selectedTime;
                this.dueTimeButton.setText(selectedTime);
            }).open();
        });
        
        this.durationButton = dateTimeContainer.createEl('button', { 
            text: this.taskDuration > 0 ? this.formatDuration(this.taskDuration) : this.plugin.t('selectDuration'),
            cls: 'todoist-button duration-button'
        });
        this.durationButton.addEventListener('click', () => {
            new DurationPickerModal(this.app, this.plugin, (selectedDuration) => {
                this.taskDuration = selectedDuration;
                this.durationButton.setText(this.formatDuration(selectedDuration));
            }).open();
        });
    }

    formatDuration(minutes: number): string {
        if (minutes < 60) {
            return `${minutes}min`;
        } else if (minutes % 60 === 0) {
            return `${minutes / 60}h`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}h ${mins}min`;
        }
    }

    createReminderField(contentEl: HTMLElement) {
        const reminderContainer = contentEl.createDiv({ cls: 'field-container' });
        reminderContainer.createEl('label', { text: this.plugin.t('reminder'), cls: 'field-label' });
        
        this.reminderButton = reminderContainer.createEl('button', {
            text: this.reminderTime || this.plugin.t('noReminder'),
            cls: 'todoist-button reminder-button full-width'
        });
        
        this.reminderButton.addEventListener('click', () => {
            new ReminderPickerModal(this.app, this.plugin, (selectedReminder) => {
                this.reminderTime = selectedReminder;
                this.reminderButton.setText(selectedReminder || this.plugin.t('noReminder'));
            }).open();
        });
    }

    createLabelsSelector(contentEl: HTMLElement) {
        if (this.labels.length > 0) {
            const labelsContainer = contentEl.createDiv({ cls: 'field-container' });
            labelsContainer.createEl('label', { text: this.plugin.t('labels'), cls: 'field-label' });
            
            this.labelsButton = labelsContainer.createEl('button', {
                text: this.selectedLabels.length > 0 ? `${this.selectedLabels.length} ${this.plugin.t('labels').toLowerCase()}` : this.plugin.t('labels'),
                cls: 'todoist-button labels-button full-width'
            });
            
            this.labelsButton.addEventListener('click', () => {
                new LabelsPickerModal(this.app, this.plugin, this.labels, this.selectedLabels, (selectedLabels) => {
                    this.selectedLabels = selectedLabels;
                    this.labelsButton.setText(
                        selectedLabels.length > 0 
                            ? `${selectedLabels.length} ${this.plugin.t('labels').toLowerCase()}` 
                            : this.plugin.t('labels')
                    );
                }).open();
            });
        }
    }

    createInsertNoteCheckbox(contentEl: HTMLElement) {
        const insertContainer = contentEl.createDiv({ cls: 'field-container checkbox-container' });
        
        const insertCheckbox = insertContainer.createEl('input', { type: 'checkbox' });
        insertCheckbox.checked = this.plugin.settings.insertTaskInNote;
        insertCheckbox.addEventListener('change', (e) => {
            this.plugin.settings.insertTaskInNote = (e.target as HTMLInputElement).checked;
            this.plugin.saveSettings();
        });
        
        const insertLabel = insertContainer.createEl('label', { text: this.plugin.t('insertInNote'), cls: 'checkbox-label' });
    }

    createButtons(contentEl: HTMLElement) {
        const buttonContainer = contentEl.createDiv({ cls: 'button-container' });

        const cancelButton = buttonContainer.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'cancel-button'
        });
        cancelButton.addEventListener('click', () => {
            this.close();
        });

        this.createButton = buttonContainer.createEl('button', { 
            text: this.plugin.t('createTaskBtn'),
            cls: 'create-button'
        });
        this.createButton.addEventListener('click', async () => {
            await this.createTask();
        });
    }

    async createTask() {
        if (!this.taskContent.trim()) {
            new Notice(this.plugin.t('enterTaskContent'));
            return;
        }
        
        this.createButton.disabled = true;
        this.createButton.setText(this.plugin.t('creating'));
        
        try {
            const taskData: TaskCreationData = {
                content: this.taskContent,
                description: this.taskDescription,
                project_id: this.selectedProject,
                priority: this.selectedPriority,
                labels: this.selectedLabels,
                reminder: this.reminderTime
            };

            // Manejar fecha y hora con repetición
            if (this.dueDate) {
                let dueString = this.dueDate;
                
                if (this.dueTime) {
                    dueString += ` at ${this.dueTime}`;
                }
                
                if (this.repeatOption && this.repeatOption.trim() !== '') {
                    dueString += ` ${this.repeatOption}`;
                }
                
                taskData.due_string = dueString;
            }

            // Agregar duración si está establecida
            if (this.taskDuration > 0) {
                taskData.duration = this.taskDuration;
                taskData.duration_unit = 'minute';
            }

            const task = await this.plugin.createTodoistTask(taskData);
            
            if (this.plugin.settings.insertTaskInNote) {
                await this.plugin.insertTaskInCurrentNote(task);
            }
            
            new Notice(`${this.plugin.t('taskCreated')}: ${task.content}`);
            this.close();
        } catch (error) {
            new Notice(`${this.plugin.t('errorCreatingTask')}: ${error.message}`);
            console.error('Error creating task:', error);
            
            this.createButton.disabled = false;
            this.createButton.setText(this.plugin.t('createTaskBtn'));
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal para seleccionar etiquetas
class LabelsPickerModal extends Modal {
    plugin: TodoistPlugin;
    labels: TodoistLabel[];
    selectedLabels: string[];
    onLabelsSelect: (labels: string[]) => void;
    private tempSelectedLabels: string[];

    constructor(app: App, plugin: TodoistPlugin, labels: TodoistLabel[], selectedLabels: string[], onLabelsSelect: (labels: string[]) => void) {
        super(app);
        this.plugin = plugin;
        this.labels = labels;
        this.selectedLabels = selectedLabels;
        this.onLabelsSelect = onLabelsSelect;
        this.tempSelectedLabels = [...selectedLabels];
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: this.plugin.t('labels'), cls: 'modal-title' });

        const labelsContainer = contentEl.createDiv({ cls: 'labels-picker-container' });

        this.labels.forEach(label => {
            const labelButton = labelsContainer.createEl('button', {
                text: label.name,
                cls: 'label-picker-button'
            });

            // Aplicar colores de la etiqueta
            labelButton.style.borderColor = label.color || '#ccc';
            labelButton.style.backgroundColor = this.tempSelectedLabels.includes(label.name) 
                ? `${label.color}20` 
                : 'transparent';

            if (this.tempSelectedLabels.includes(label.name)) {
                labelButton.addClass('selected');
            }

            labelButton.addEventListener('click', () => {
                if (this.tempSelectedLabels.includes(label.name)) {
                    // Remover etiqueta
                    this.tempSelectedLabels = this.tempSelectedLabels.filter(l => l !== label.name);
                    labelButton.removeClass('selected');
                    labelButton.style.backgroundColor = 'transparent';
                } else {
                    // Agregar etiqueta
                    this.tempSelectedLabels.push(label.name);
                    labelButton.addClass('selected');
                    labelButton.style.backgroundColor = `${label.color}20`;
                }
            });
        });

        // Botones de acción
        const buttonContainer = contentEl.createDiv({ cls: 'button-container' });

        const cancelButton = buttonContainer.createEl('button', { 
            text: this.plugin.t('cancel'),
            cls: 'cancel-button'
        });
        cancelButton.addEventListener('click', () => this.close());

        const saveButton = buttonContainer.createEl('button', { 
            text: this.plugin.t('save'),
            cls: 'create-button'
        });
        saveButton.addEventListener('click', () => {
            this.onLabelsSelect(this.tempSelectedLabels);
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Configuraciones del plugin
class TodoistSettingTab extends PluginSettingTab {
    plugin: TodoistPlugin;

    constructor(app: App, plugin: TodoistPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: this.plugin.t('settingsTitle') });

        // Token API con indicador de estado
        const apiSetting = new Setting(containerEl)
            .setName(this.plugin.t('apiToken'))
            .setDesc(this.plugin.t('apiTokenDesc'));

        // Crear contenedor para el botón y el indicador
        const apiContainer = apiSetting.controlEl.createDiv({ cls: 'api-setting-container' });
        
        const configButton = apiContainer.createEl('button', { text: this.plugin.t('configureToken') });
        configButton.addEventListener('click', () => {
            new ApiTokenModal(this.app, this.plugin).open();
        });

        const statusIndicator = apiContainer.createEl('span', { 
            cls: this.plugin.apiStatus ? 'api-status-connected' : 'api-status-disconnected',
            text: this.plugin.apiStatus ? ' ✓ ' + this.plugin.t('apiConnected') : ' ✗ ' + this.plugin.t('apiDisconnected')
        });

        // Idioma
        new Setting(containerEl)
            .setName(this.plugin.t('language'))
            .setDesc(this.plugin.t('languageDesc'))
            .addDropdown(dropdown => dropdown
                .addOption('es', 'Español')
                .addOption('en', 'English')
                .setValue(this.plugin.settings.language)
                .onChange(async (value: 'en' | 'es') => {
                    this.plugin.settings.language = value;
                    await this.plugin.saveSettings();
                    this.display();
                }));

        // Sincronización
        new Setting(containerEl)
            .setName(this.plugin.t('enableSync'))
            .setDesc(this.plugin.t('enableSyncDesc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableSync)
                .onChange(async (value) => {
                    this.plugin.settings.enableSync = value;
                    await this.plugin.saveSettings();
                    this.display();
                }));

        // Intervalo de sincronización
        if (this.plugin.settings.enableSync) {
            new Setting(containerEl)
                .setName(this.plugin.t('syncInterval'))
                .setDesc(this.plugin.t('syncIntervalDesc'))
                .addSlider(slider => slider
                    .setLimits(30, 300, 30)
                    .setValue(this.plugin.settings.syncInterval)
                    .setDynamicTooltip()
                    .onChange(async (value) => {
                        this.plugin.settings.syncInterval = value;
                        await this.plugin.saveSettings();
                    }));
        }

        // Hora por defecto
        new Setting(containerEl)
            .setName(this.plugin.t('defaultTime'))
            .setDesc(this.plugin.t('defaultTimeDesc'))
            .addText(text => text
                .setPlaceholder('08:00')
                .setValue(this.plugin.settings.defaultTime)
                .onChange(async (value) => {
                    this.plugin.settings.defaultTime = value;
                    await this.plugin.saveSettings();
                }));

        // Duración por defecto
        new Setting(containerEl)
            .setName(this.plugin.t('defaultDuration'))
            .setDesc(this.plugin.t('defaultDurationDesc'))
            .addSlider(slider => slider
                .setLimits(15, 480, 15)
                .setValue(this.plugin.settings.defaultDuration)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.defaultDuration = value;
                    await this.plugin.saveSettings();
                }));

        // Auto refresh
        new Setting(containerEl)
            .setName(this.plugin.t('autoRefresh'))
            .setDesc(this.plugin.t('autoRefreshDesc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoRefresh)
                .onChange(async (value) => {
                    this.plugin.settings.autoRefresh = value;
                    await this.plugin.saveSettings();
                    this.display();
                }));

        if (this.plugin.settings.autoRefresh) {
            new Setting(containerEl)
                .setName(this.plugin.t('refreshInterval'))
                .setDesc(this.plugin.t('refreshIntervalDesc'))
                .addSlider(slider => slider
                    .setLimits(30, 3600, 30)
                    .setValue(this.plugin.settings.refreshInterval)
                    .setDynamicTooltip()
                    .onChange(async (value) => {
                        this.plugin.settings.refreshInterval = value;
                        await this.plugin.saveSettings();
                    }));
        }

        // Proyecto por defecto
        new Setting(containerEl)
            .setName(this.plugin.t('defaultProject'))
            .setDesc(this.plugin.t('defaultProjectDesc'))
            .addText(text => text
                .setPlaceholder('ID del proyecto')
                .setValue(this.plugin.settings.defaultProject)
                .onChange(async (value) => {
                    this.plugin.settings.defaultProject = value;
                    await this.plugin.saveSettings();
                }));

        // Plantilla
        new Setting(containerEl)
            .setName(this.plugin.t('taskTemplate'))
            .setDesc(this.plugin.t('taskTemplateDesc'))
            .addTextArea(text => text
                .setPlaceholder('- [ ] {{content}} [📋]({{url}}) {{priority}} {{labels}} {{due}} {{description}} #tasktodo')
                .setValue(this.plugin.settings.taskNoteTemplate)
                .onChange(async (value) => {
                    this.plugin.settings.taskNoteTemplate = value;
                    await this.plugin.saveSettings();
                }));

        // Insertar por defecto
        new Setting(containerEl)
            .setName(this.plugin.t('insertByDefault'))
            .setDesc(this.plugin.t('insertByDefaultDesc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.insertTaskInNote)
                .onChange(async (value) => {
                    this.plugin.settings.insertTaskInNote = value;
                    await this.plugin.saveSettings();
                }));
    }
} ${this.settings.apiToken}`
                }
            });
            this.apiStatus = response.ok;
            return this.apiStatus;
        } catch (error) {
            this.apiStatus = false;
            return false;
        }
    }

    async preloadData() {
        if (this.settings.apiToken) {
            try {
                await Promise.all([
                    this.getProjects(),
                    this.getLabels()
                ]);
            } catch (error) {
                console.log('Preload failed, will load on demand');
            }
        }
    }

    startAutoRefresh() {
        this.stopAutoRefresh();
        if (this.settings.autoRefresh && this.settings.refreshInterval > 0) {
            this.refreshInterval = setInterval(async () => {
                await this.refreshCache();
            }, this.settings.refreshInterval * 1000);
        }
    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    startSync() {
        this.stopSync();
        if (this.settings.enableSync && this.settings.syncInterval > 0) {
            this.syncInterval = setInterval(async () => {
                await this.syncTasks();
            }, this.settings.syncInterval * 1000);
        }
    }

    stopSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    async syncTasks() {
        if (!this.settings.apiToken || this.taskMappings.size === 0) {
            return;
        }

        try {
            for (const [taskId, mapping] of this.taskMappings) {
                const task = await this.getTodoistTask(taskId);
                if (task) {
                    await this.updateTaskInObsidian(task, mapping);
                }
            }
        } catch (error) {
            console.error('Sync error:', error);
        }
    }

    async getTodoistTask(taskId: string): Promise<TodoistTask | null> {
        try {
            const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${this.settings.apiToken}`
                }
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching task:', error);
        }
        return null;
    }

    async updateTaskInObsidian(task: TodoistTask, mapping: TaskMapping) {
        try {
            const file = this.app.vault.getAbstractFileByPath(mapping.file);
            if (file instanceof TFile) {
                const content = await this.app.vault.read(file);
                const lines = content.split('\n');
                
                if (lines[mapping.line] && lines[mapping.line].includes('#tasktodo')) {
                    const currentLine = lines[mapping.line];
                    const isCurrentlyChecked = currentLine.includes('- [x]');
                    const shouldBeChecked = task.is_completed;
                    
                    if (isCurrentlyChecked !== shouldBeChecked) {
                        if (shouldBeChecked) {
                            lines[mapping.line] = currentLine.replace('- [ ]', '- [x]');
                        } else {
                            lines[mapping.line] = currentLine.replace('- [x]', '- [ ]');
                        }
                        
                        // Actualizar el mapping con el nuevo contenido
                        mapping.lineContent = lines[mapping.line];
                        
                        await this.app.vault.modify(file, lines.join('\n'));
                    }
                }
            }
        } catch (error) {
            console.error('Error updating task in Obsidian:', error);
        }
    }

    // MEJORADO: Manejar cambios en el editor
    async handleEditorChange(editor: Editor, view: MarkdownView) {
        try {
            const cursor = editor.getCursor();
            const currentLine = editor.getLine(cursor.line);
            
            // Buscar tareas con #tasktodo en la línea actual
            const taskMatch = this.findTaskInLine(currentLine);
            if (taskMatch) {
                const { taskId, isCompleted } = taskMatch;
                console.log(`Detected task ${taskId} change to ${isCompleted ? 'completed' : 'uncompleted'}`);
                
                // Actualizar en Todoist
                const success = await this.updateTodoistTask(taskId, isCompleted);
                if (success) {
                    // Actualizar el mapping local
                    const mapping = this.taskMappings.get(taskId);
                    if (mapping) {
                        mapping.lineContent = currentLine;
                        mapping.line = cursor.line;
                        this.saveTaskMappings();
                    }
                }
            }
        } catch (error) {
            console.error('Error handling editor change:', error);
        }
    }

    // NUEVO: Manejar cambios en archivos
    async handleFileChange(file: TFile) {
        try {
            const content = await this.app.vault.read(file);
            const lines = content.split('\n');
            
            // Revisar todas las líneas que tienen mappings en este archivo
            for (const [taskId, mapping] of this.taskMappings) {
                if (mapping.file === file.path && lines[mapping.line]) {
                    const currentLine = lines[mapping.line];
                    
                    // Verificar si la línea ha cambiado
                    if (currentLine !== mapping.lineContent && currentLine.includes('#tasktodo')) {
                        const taskMatch = this.findTaskInLine(currentLine);
                        if (taskMatch && taskMatch.taskId === taskId) {
                            console.log(`File change detected for task ${taskId}: ${taskMatch.isCompleted ? 'completed' : 'uncompleted'}`);
                            
                            const success = await this.updateTodoistTask(taskId, taskMatch.isCompleted);
                            if (success) {
                                mapping.lineContent = currentLine;
                                this.saveTaskMappings();
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error handling file change:', error);
        }
    }

    // NUEVO: Función para encontrar tareas en una línea
    private findTaskInLine(line: string): { taskId: string; isCompleted: boolean } | null {
        // Buscar patrón de checkbox con #tasktodo
        const checkboxMatch = line.match(/- \[([ x])\].*#tasktodo/);
        if (checkboxMatch) {
            // Buscar ID de tarea en el enlace de Todoist
            const taskIdMatch = line.match(/todoist\.com\/(?:app\/)?(?:task\/)?(\d+)/);
            if (taskIdMatch) {
                return {
                    taskId: taskIdMatch[1],
                    isCompleted: checkboxMatch[1] === 'x'
                };
            }
        }
        return null;
    }

    async updateTodoistTask(taskId: string, isCompleted: boolean): Promise<boolean> {
        try {
            const url = isCompleted 
                ? `https://api.todoist.com/rest/v2/tasks/${taskId}/close`
                : `https://api.todoist.com/rest/v2/tasks/${taskId}/reopen`;
                
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.settings.apiToken}`
                }
            });

            if (response.ok) {
                const message = isCompleted ? this.t('taskCompleted') : this.t('taskUncompleted');
                new Notice(message);
                return true;
            } else {
                console.error('Failed to update Todoist task:', response.status, response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error updating Todoist task:', error);
            new Notice(this.t('syncError'));
            return false;
        }
    }

    async loadTaskMappings() {
        try {
            const data = await this.loadData();
            if (data?.taskMappings) {
                this.taskMappings = new Map();
                for (const [taskId, mapping] of Object.entries(data.taskMappings)) {
                    this.taskMappings.set(taskId, mapping as TaskMapping);
                }
            }
        } catch (error) {
            console.error('Error loading task mappings:', error);
        }
    }

    async saveTaskMappings() {
        try {
            const data = await this.loadData() || {};
            data.taskMappings = Object.fromEntries(this.taskMappings);
            await this.saveData(data);
        } catch (error) {
            console.error('Error saving task mappings:', error);
        }
    }

    async refreshCache() {
        this.lastFetch = 0;
        await Promise.all([
            this.getProjects(),
            this.getLabels()
        ]);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        
        if (this.settings.autoRefresh) {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }

        if (this.settings.enableSync) {
            this.startSync();
        } else {
            this.stopSync();
        }

        await this.testApiConnection();
    }

    async createTaskFromText(content: string) {
        if (!this.settings.apiToken) {
            new Notice(this.t('configureApiFirst'));
            return;
        }

        const loadingNotice = new Notice(this.t('creating'), 0);
        
        try {
            const taskData: TaskCreationData = {
                content: content,
                project_id: this.settings.defaultProject,
                priority: 1,
                labels: []
            };

            const task = await this.createTodoistTask(taskData);
            
            loadingNotice.hide();
            
            if (this.settings.insertTaskInNote) {
                await this.insertTaskInCurrentNote(task);
            }
            
            new Notice(`${this.t('taskCreated')}: ${task.content}`);
        } catch (error) {
            loadingNotice.hide();
            new Notice(`${this.t('errorCreatingTask')}: ${error.message}`);
            console.error('Error creating Todoist task:', error);
        }
    }

    async createTodoistTask(taskData: TaskCreationData): Promise<TodoistTask> {
        const url = 'https://api.todoist.com/rest/v2/tasks';
        
        const requestData: any = {
            content: taskData.content,
            priority: taskData.priority
        };

        if (taskData.project_id && taskData.project_id !== '') {
            requestData.project_id = taskData.project_id;
        }

        if (taskData.description && taskData.description.trim() !== '') {
            requestData.description = taskData.description;
        }

        if (taskData.due_string) {
            requestData.due_string = taskData.due_string;
        } else if (taskData.due_datetime) {
            requestData.due_datetime = taskData.due_datetime;
        } else if (taskData.due_date) {
            requestData.due_date = taskData.due_date;
        }

        if (taskData.labels && taskData.labels.length > 0) {
            requestData.labels = taskData.labels;
        }

        if (taskData.duration && taskData.duration_unit) {
            requestData.duration = taskData.duration;
            requestData.duration_unit = taskData.duration_unit;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.settings.apiToken}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const task = await response.json();

        if (taskData.reminder && task.id) {
            this.createReminder(task.id, taskData.reminder).catch(console.warn);
        }

        return task;
    }

    async createReminder(taskId: string, reminderTime: string): Promise<void> {
        try {
            const response = await fetch('https://api.todoist.com/rest/v2/reminders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer