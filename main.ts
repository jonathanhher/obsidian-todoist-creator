// main.ts - Versión Final Mejorada
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
    syncInterval: 60, // 1 minuto
    defaultTime: '08:00'
}

// Traducciones actualizadas
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
        'dueDate': 'Due Date (optional)',
        'dueTime': 'Due Time (optional)',
        'reminder': 'Reminder (optional)',
        'labels': 'Labels',
        'insertInNote': 'Insert reference in current note',
        'cancel': 'Cancel',
        'createTaskBtn': 'Create Task',
        'selectDate': 'Select Date',
        'selectTime': 'Select Time',
        'noReminder': 'No reminder',
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
        'taskCompleted': 'Task completed in Todoist',
        'taskUncompleted': 'Task reopened in Todoist',
        'syncError': 'Sync error'
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
        'dueDate': 'Fecha Límite (opcional)',
        'dueTime': 'Hora Límite (opcional)',
        'reminder': 'Recordatorio (opcional)',
        'labels': 'Etiquetas',
        'insertInNote': 'Insertar referencia en la nota actual',
        'cancel': 'Cancelar',
        'createTaskBtn': 'Crear Tarea',
        'selectDate': 'Seleccionar Fecha',
        'selectTime': 'Seleccionar Hora',
        'noReminder': 'Sin recordatorio',
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
        'taskCompleted': 'Tarea completada en Todoist',
        'taskUncompleted': 'Tarea reabierta en Todoist',
        'syncError': 'Error de sincronización'
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
    priority: number;
    labels: string[];
    reminder?: string;
}

interface TaskMapping {
    todoistId: string;
    file: string;
    line: number;
}

export default class TodoistPlugin extends Plugin {
    settings: TodoistPluginSettings;
    refreshInterval: NodeJS.Timeout | null = null;
    syncInterval: NodeJS.Timeout | null = null;
    
    // Cache para mejorar velocidad
    private projectsCache: TodoistProject[] = [];
    private labelsCache: TodoistLabel[] = [];
    private lastFetch: number = 0;
    private cacheDuration: number = 5 * 60 * 1000; // 5 minutos
    
    // Mapeo de tareas para sincronización
    private taskMappings: Map<string, TaskMapping> = new Map();

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

        // Escuchar cambios en archivos para detectar checkboxes
        this.registerEvent(
            this.app.workspace.on('editor-change', (editor: Editor, view: MarkdownView | MarkdownFileInfo) => {
                // Primero, verificas si la sincronización está habilitada
                if (this.settings.enableSync) {
                    
                    // AHORA, LA COMPROBACIÓN CLAVE:
                    // Solo continuamos si 'view' es una instancia de MarkdownView (un editor completo)
                    if (view instanceof MarkdownView) {
                        // Estando dentro de este 'if', TypeScript ya sabe que es seguro
                        // llamar a la función. El error desaparecerá.
                        this.handleEditorChange(editor, view);
                    }
                }
            })
        );

        this.preloadData();
    }

    onunload() {
        this.stopAutoRefresh();
        this.stopSync();
        this.saveTaskMappings();
    }

    t(key: string): string {
        return translations[this.settings.language][key] || key;
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

    // Sistema de sincronización
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
                
                if (lines[mapping.line]) {
                    const currentLine = lines[mapping.line];
                    const isCurrentlyChecked = currentLine.includes('- [x]');
                    const shouldBeChecked = task.is_completed;
                    
                    if (isCurrentlyChecked !== shouldBeChecked) {
                        if (shouldBeChecked) {
                            lines[mapping.line] = currentLine.replace('- [ ]', '- [x]');
                        } else {
                            lines[mapping.line] = currentLine.replace('- [x]', '- [ ]');
                        }
                        
                        await this.app.vault.modify(file, lines.join('\n'));
                    }
                }
            }
        } catch (error) {
            console.error('Error updating task in Obsidian:', error);
        }
    }

    async handleEditorChange(editor: Editor, view: MarkdownView) {
        const cursor = editor.getCursor();
        const line = editor.getLine(cursor.line);
        
        // Detectar si se cambió un checkbox
        const checkboxMatch = line.match(/- \[([ x])\].*#tasktodo/);
        if (checkboxMatch) {
            const taskIdMatch = line.match(/\/task\/(\d+)/);
            if (taskIdMatch) {
                const taskId = taskIdMatch[1];
                const isCompleted = checkboxMatch[1] === 'x';
                
                await this.updateTodoistTask(taskId, isCompleted);
            }
        }
    }

    async updateTodoistTask(taskId: string, isCompleted: boolean) {
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
            }
        } catch (error) {
            console.error('Error updating Todoist task:', error);
            new Notice(this.t('syncError'));
        }
    }

    async loadTaskMappings() {
        try {
            const data = await this.loadData();
            if (data?.taskMappings) {
                this.taskMappings = new Map(Object.entries(data.taskMappings));
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

        if (taskData.due_datetime) {
            requestData.due_datetime = taskData.due_datetime;
        } else if (taskData.due_date) {
            requestData.due_date = taskData.due_date;
        }

        if (taskData.labels && taskData.labels.length > 0) {
            requestData.labels = taskData.labels;
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
        
        // Crear texto con colores usando spans con clases CSS
        const priorityText = this.getPriorityTextWithColor(task.priority);
        const labelsText = task.labels ? task.labels.map(label => `<span class="todoist-label">${label}</span>`).join(', ') : '';
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
        
        // Guardar mapping para sincronización
        if (this.settings.enableSync) {
            const file = activeView.file;
            if (file) {
                this.taskMappings.set(task.id, {
                    todoistId: task.id,
                    file: file.path,
                    line: cursor.line
                });
                this.saveTaskMappings();
            }
        }
        
        const newLine = cursor.line + 1;
        editor.setCursor({ line: newLine, ch: 0 });
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

// Modal para configurar API Token
class ApiTokenModal extends Modal {
    plugin: TodoistPlugin;
    tokenInput: HTMLInputElement;

    constructor(app: App, plugin: TodoistPlugin) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: this.plugin.t('tokenModalTitle') });

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

// Modal para seleccionar fecha
class DatePickerModal extends Modal {
    onDateSelect: (date: string) => void;

    constructor(app: App, onDateSelect: (date: string) => void) {
        super(app);
        this.onDateSelect = onDateSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: 'Seleccionar Fecha' });

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        this.renderCalendar(contentEl, currentMonth, currentYear);
    }

    renderCalendar(container: HTMLElement, month: number, year: number) {
        container.empty();
        container.createEl('h3', { text: 'Seleccionar Fecha' });

        const headerEl = container.createDiv();
        headerEl.style.display = 'flex';
        headerEl.style.justifyContent = 'space-between';
        headerEl.style.alignItems = 'center';
        headerEl.style.marginBottom = '15px';

        const prevButton = headerEl.createEl('button', { text: '‹' });
        const monthYearEl = headerEl.createEl('span', { 
            text: new Date(year, month).toLocaleDateString('es', { month: 'long', year: 'numeric' })
        });
        const nextButton = headerEl.createEl('button', { text: '›' });

        prevButton.addEventListener('click', () => {
            const newDate = new Date(year, month - 1);
            this.renderCalendar(container, newDate.getMonth(), newDate.getFullYear());
        });

        nextButton.addEventListener('click', () => {
            const newDate = new Date(year, month + 1);
            this.renderCalendar(container, newDate.getMonth(), newDate.getFullYear());
        });

        const calendarEl = container.createDiv();
        calendarEl.style.display = 'grid';
        calendarEl.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarEl.style.gap = '5px';
        calendarEl.style.marginBottom = '15px';

        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        daysOfWeek.forEach(day => {
            const dayEl = calendarEl.createEl('div', { text: day });
            dayEl.style.textAlign = 'center';
            dayEl.style.fontWeight = 'bold';
            dayEl.style.padding = '8px';
            dayEl.style.color = 'var(--text-muted)';
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        for (let i = 0; i < firstDay; i++) {
            calendarEl.createDiv();
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = calendarEl.createEl('div', { text: day.toString() });
            dayEl.style.textAlign = 'center';
            dayEl.style.padding = '8px';
            dayEl.style.cursor = 'pointer';
            dayEl.style.borderRadius = '4px';
            dayEl.style.border = '1px solid transparent';

            const currentDate = new Date(year, month, day);
            const isToday = currentDate.toDateString() === today.toDateString();
            
            if (isToday) {
                dayEl.style.background = 'var(--interactive-accent)';
                dayEl.style.color = 'var(--text-on-accent)';
            }

            dayEl.addEventListener('click', () => {
                const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                this.onDateSelect(selectedDate);
                this.close();
            });

            dayEl.addEventListener('mouseenter', () => {
                if (!isToday) {
                    dayEl.style.background = 'var(--background-modifier-hover)';
                }
            });

            dayEl.addEventListener('mouseleave', () => {
                if (!isToday) {
                    dayEl.style.background = 'transparent';
                }
            });
        }

        const cancelButton = container.createEl('button', { text: 'Cancelar' });
        cancelButton.style.width = '100%';
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// Modal para seleccionar hora
class TimePickerModal extends Modal {
    onTimeSelect: (time: string) => void;

    constructor(app: App, onTimeSelect: (time: string) => void) {
        super(app);
        this.onTimeSelect = onTimeSelect;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h3', { text: 'Seleccionar Hora' });

        const timeContainer = contentEl.createDiv();
        timeContainer.style.maxHeight = '300px';
        timeContainer.style.overflowY = 'auto';
        timeContainer.style.marginBottom = '15px';

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const displayTime = new Date(0, 0, 0, hour, minute).toLocaleTimeString('es', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                });

                const timeEl = timeContainer.createEl('div', { text: displayTime });
                timeEl.style.padding = '10px';
                timeEl.style.cursor = 'pointer';
                timeEl.style.borderRadius = '4px';
                timeEl.style.marginBottom = '2px';

                timeEl.addEventListener('click', () => {
                    this.onTimeSelect(timeString);
                    this.close();
                });

                timeEl.addEventListener('mouseenter', () => {
                    timeEl.style.background = 'var(--background-modifier-hover)';
                });

                timeEl.addEventListener('mouseleave', () => {
                    timeEl.style.background = 'transparent';
                });
            }
        }

        const cancelButton = contentEl.createEl('button', { text: 'Cancelar' });
        cancelButton.style.width = '100%';
        cancelButton.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class CreateTaskModal extends Modal {
    plugin: TodoistPlugin;
    taskContent: string = '';
    taskDescription: string = '';
    selectedProject: string;
    selectedPriority: number = 1;
    selectedLabels: string[] = [];
    dueDate: string = '';
    dueTime: string = '';
    reminderTime: string = '';
    projects: TodoistProject[] = [];
    labels: TodoistLabel[] = [];
    dueDateButton: HTMLButtonElement;
    dueTimeButton: HTMLButtonElement;
    createButton: HTMLButtonElement;

    constructor(app: App, plugin: TodoistPlugin) {
        super(app);
        this.plugin = plugin;
        this.selectedProject = plugin.settings.defaultProject;
        this.dueTime = plugin.settings.defaultTime; // Hora por defecto 08:00
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: this.plugin.t('createTask') });

        const [projects, labels] = await Promise.all([
            this.plugin.getProjects(),
            this.plugin.getLabels()
        ]);
        
        this.projects = projects;
        this.labels = labels;

        this.createTaskContentField(contentEl);
        this.createDescriptionField(contentEl); // Ahora opcional
        this.createProjectSelector(contentEl);
        this.createPrioritySelector(contentEl);
        this.createDueDateFields(contentEl);
        this.createReminderField(contentEl);
        this.createLabelsSelector(contentEl);
        this.createInsertNoteCheckbox(contentEl);
        this.createButtons(contentEl);
    }

    createTaskContentField(contentEl: HTMLElement) {
        const taskContentContainer = contentEl.createDiv();
        taskContentContainer.createEl('label', { text: this.plugin.t('taskContent') + ' *' });
        const taskInput = taskContentContainer.createEl('input', {
            type: 'text',
            placeholder: this.plugin.t('taskContentPlaceholder')
        });
        taskInput.style.width = '100%';
        taskInput.style.marginTop = '5px';
        taskInput.addEventListener('input', (e) => {
            this.taskContent = (e.target as HTMLInputElement).value;
        });
        
        setTimeout(() => taskInput.focus(), 100);
    }

    createDescriptionField(contentEl: HTMLElement) {
        const descContainer = contentEl.createDiv();
        descContainer.style.marginTop = '15px';
        // Quitar el * para hacerlo opcional
        descContainer.createEl('label', { text: this.plugin.t('description') });
        
        const descTextarea = descContainer.createEl('textarea', {
            placeholder: this.plugin.t('descriptionPlaceholder')
        });
        descTextarea.style.width = '100%';
        descTextarea.style.marginTop = '5px';
        descTextarea.style.minHeight = '80px';
        descTextarea.addEventListener('input', (e) => {
            this.taskDescription = (e.target as HTMLTextAreaElement).value;
        });
    }

    createProjectSelector(contentEl: HTMLElement) {
        if (this.projects.length > 0) {
            const projectContainer = contentEl.createDiv();
            projectContainer.style.marginTop = '15px';
            projectContainer.createEl('label', { text: this.plugin.t('project') + ':' });
            
            const projectSelect = projectContainer.createEl('select');
            projectSelect.style.width = '100%';
            projectSelect.style.marginTop = '5px';
            
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
        const priorityContainer = contentEl.createDiv();
        priorityContainer.style.marginTop = '15px';
        priorityContainer.createEl('label', { text: this.plugin.t('priority') + ':' });
        
        const prioritySelect = priorityContainer.createEl('select');
        prioritySelect.style.width = '100%';
        prioritySelect.style.marginTop = '5px';
        
        const priorities = [
            { value: 4, key: 'p1Urgent', color: '#d1453b' },
            { value: 3, key: 'p2High', color: '#eb8909' },
            { value: 2, key: 'p3Medium', color: '#246fe0' },
            { value: 1, key: 'p4Low', color: '#666666' }
        ];
        
        priorities.forEach(priority => {
            const option = prioritySelect.createEl('option', { text: this.plugin.t(priority.key) });
            option.value = priority.value.toString();
            option.style.color = priority.color;
            option.style.fontWeight = 'bold';
            if (priority.value === this.selectedPriority) {
                option.selected = true;
            }
        });
        
        // Colorear el select también
        prioritySelect.style.color = priorities.find(p => p.value === this.selectedPriority)?.color || '#666666';
        prioritySelect.style.fontWeight = 'bold';
        
        prioritySelect.addEventListener('change', (e) => {
            this.selectedPriority = parseInt((e.target as HTMLSelectElement).value);
            const selectedPriority = priorities.find(p => p.value === this.selectedPriority);
            if (selectedPriority) {
                prioritySelect.style.color = selectedPriority.color;
            }
        });
    }

    createDueDateFields(contentEl: HTMLElement) {
        const dueDateContainer = contentEl.createDiv();
        dueDateContainer.style.marginTop = '15px';
        dueDateContainer.createEl('label', { text: this.plugin.t('dueDate') + ':' });
        
        const dateTimeContainer = dueDateContainer.createDiv();
        dateTimeContainer.style.display = 'flex';
        dateTimeContainer.style.gap = '10px';
        dateTimeContainer.style.marginTop = '5px';
        
        this.dueDateButton = dateTimeContainer.createEl('button', { 
            text: this.dueDate || this.plugin.t('selectDate') 
        });
        this.dueDateButton.style.flex = '1';
        this.dueDateButton.style.padding = '8px';
        this.dueDateButton.addEventListener('click', () => {
            new DatePickerModal(this.app, (selectedDate) => {
                this.dueDate = selectedDate;
                this.dueDateButton.setText(selectedDate);
            }).open();
        });
        
        this.dueTimeButton = dateTimeContainer.createEl('button', { 
            text: this.dueTime || this.plugin.t('selectTime') 
        });
        this.dueTimeButton.style.flex = '1';
        this.dueTimeButton.style.padding = '8px';
        this.dueTimeButton.addEventListener('click', () => {
            new TimePickerModal(this.app, (selectedTime) => {
                this.dueTime = selectedTime;
                this.dueTimeButton.setText(selectedTime);
            }).open();
        });
        
        // Establecer la hora por defecto en el texto del botón
        if (!this.dueTime && this.plugin.settings.defaultTime) {
            this.dueTime = this.plugin.settings.defaultTime;
            this.dueTimeButton.setText(this.plugin.settings.defaultTime);
        }
    }

    createReminderField(contentEl: HTMLElement) {
        const reminderContainer = contentEl.createDiv();
        reminderContainer.style.marginTop = '15px';
        reminderContainer.createEl('label', { text: this.plugin.t('reminder') + ':' });
        
        const reminderSelect = reminderContainer.createEl('select');
        reminderSelect.style.width = '100%';
        reminderSelect.style.marginTop = '5px';
        
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
            const optionElement = reminderSelect.createEl('option', { text: this.plugin.t(option.key) });
            optionElement.value = option.value;
        });
        
        reminderSelect.addEventListener('change', (e) => {
            this.reminderTime = (e.target as HTMLSelectElement).value;
        });
    }

    createLabelsSelector(contentEl: HTMLElement) {
        if (this.labels.length > 0) {
            const labelsContainer = contentEl.createDiv();
            labelsContainer.style.marginTop = '15px';
            labelsContainer.createEl('label', { text: this.plugin.t('labels') + ':' });
            
            const labelsGrid = labelsContainer.createDiv();
            labelsGrid.style.marginTop = '5px';
            labelsGrid.style.display = 'grid';
            labelsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
            labelsGrid.style.gap = '5px';
            labelsGrid.style.maxHeight = '120px';
            labelsGrid.style.overflowY = 'auto';
            labelsGrid.style.border = '1px solid var(--background-modifier-border)';
            labelsGrid.style.padding = '10px';
            labelsGrid.style.borderRadius = '4px';
            
            this.labels.forEach(label => {
                const labelContainer = labelsGrid.createDiv();
                labelContainer.style.display = 'flex';
                labelContainer.style.alignItems = 'center';
                labelContainer.style.gap = '5px';
                labelContainer.style.padding = '4px';
                labelContainer.style.borderRadius = '3px';
                labelContainer.style.border = `1px solid ${label.color || '#ddd'}`;
                labelContainer.style.backgroundColor = `${label.color || '#f0f0f0'}20`;
                
                const checkbox = labelContainer.createEl('input', { type: 'checkbox' });
                checkbox.addEventListener('change', (e) => {
                    if ((e.target as HTMLInputElement).checked) {
                        this.selectedLabels.push(label.name);
                        labelContainer.style.backgroundColor = `${label.color || '#f0f0f0'}40`;
                    } else {
                        this.selectedLabels = this.selectedLabels.filter(l => l !== label.name);
                        labelContainer.style.backgroundColor = `${label.color || '#f0f0f0'}20`;
                    }
                });
                
                const labelText = labelContainer.createEl('span', { text: label.name });
                labelText.style.fontSize = '0.9em';
                labelText.style.color = label.color || 'var(--text-normal)';
                labelText.style.fontWeight = '500';
            });
        }
    }

    createInsertNoteCheckbox(contentEl: HTMLElement) {
        const insertContainer = contentEl.createDiv();
        insertContainer.style.marginTop = '15px';
        
        const insertCheckbox = insertContainer.createEl('input', { type: 'checkbox' });
        insertCheckbox.checked = this.plugin.settings.insertTaskInNote;
        insertCheckbox.addEventListener('change', (e) => {
            this.plugin.settings.insertTaskInNote = (e.target as HTMLInputElement).checked;
            this.plugin.saveSettings();
        });
        
        const insertLabel = insertContainer.createEl('label', { text: ' ' + this.plugin.t('insertInNote') });
        insertLabel.style.marginLeft = '5px';
    }

    createButtons(contentEl: HTMLElement) {
        const buttonContainer = contentEl.createDiv();
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.textAlign = 'right';

        const cancelButton = buttonContainer.createEl('button', { text: this.plugin.t('cancel') });
        cancelButton.style.marginRight = '10px';
        cancelButton.addEventListener('click', () => {
            this.close();
        });

        this.createButton = buttonContainer.createEl('button', { text: this.plugin.t('createTaskBtn') });
        this.createButton.addClass('mod-cta');
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

            if (this.dueDate) {
                if (this.dueTime) {
                    taskData.due_datetime = `${this.dueDate}T${this.dueTime}:00`;
                } else {
                    taskData.due_date = this.dueDate;
                }
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

        // Token API
        new Setting(containerEl)
            .setName(this.plugin.t('apiToken'))
            .setDesc(this.plugin.t('apiTokenDesc'))
            .addButton(button => button
                .setButtonText(this.plugin.t('configureToken'))
                .onClick(() => {
                    new ApiTokenModal(this.app, this.plugin).open();
                }));

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
}