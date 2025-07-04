# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
- `npm run dev` - Start development build with watch mode
- `npm run build` - Build for production with TypeScript checking
- `npm run clean` - Remove build artifacts (main.js, main.js.map)
- `npm run rebuild` - Clean and build from scratch
- `npm run lint` - Run TypeScript linting
- `npm run typecheck` - Run TypeScript type checking without emitting files

### Testing
No automated tests are configured. Manual testing is done by:
1. Building the plugin (`npm run build`)
2. Loading it in Obsidian's plugin directory
3. Testing functionality through the Obsidian interface

## Architecture Overview

This is an Obsidian plugin that integrates with Todoist API to create and sync tasks. Key architectural components:

### Core Structure
- **main.ts**: Single-file plugin containing all functionality (~2000+ lines)
- **manifest.json**: Plugin metadata and permissions
- **styles.css**: Custom CSS for Todoist-style UI components
- **esbuild.config.mjs**: Build configuration for TypeScript compilation

### Key Classes and Interfaces
- `TodoistPlugin`: Main plugin class extending Obsidian's Plugin
- `TodoistPluginSettings`: Configuration interface with API token, sync settings, UI preferences
- `TodoistTaskModal`: Modal for creating tasks with comprehensive form fields
- `ApiTokenModal`: Secure modal for API token configuration
- `TodoistSettingTab`: Settings tab with visual connection status indicators

### API Integration
- Todoist REST API v2 integration via fetch requests
- Task creation with full metadata (projects, labels, priorities, dates, recurrence)
- Bidirectional sync between Obsidian checkboxes and Todoist task completion
- Smart caching (5-minute cache for projects/labels)

### UI Components
- Custom date picker with relative dates (Today, Tomorrow, This Week, Next Week)
- Time selector with 15-minute intervals
- Duration selector (15min to 8 hours)
- Visual priority indicators (P1-P4 with colors)
- Label picker with preserved Todoist colors
- Responsive design optimized for mobile and desktop

### Synchronization System
- Debounced sync to avoid excessive API calls
- Task mapping persistence using Obsidian's data storage
- Automatic detection of checkbox state changes
- Configurable sync intervals (30-300 seconds)

### Multi-language Support
- Spanish and English translations
- Comprehensive translation object covering all UI elements
- Language-specific date formatting and validation

## Code Patterns

### Settings Management
Settings are stored in `TodoistPluginSettings` interface with defaults in `DEFAULT_SETTINGS`. All settings have visual indicators and validation.

### Error Handling
- Visual connection status indicators (green/red)
- Graceful fallbacks for API failures
- User-friendly error messages with translations
- Debounced retry mechanisms

### Data Flow
1. User creates task via command palette or modal
2. Task data validated and formatted
3. API call to Todoist with full metadata
4. Response processed and task reference inserted in note
5. Sync system monitors for changes and updates both systems

### Performance Optimizations
- Intelligent caching for API responses
- Debounced user input handling
- Throttled sync operations
- Efficient DOM manipulation for responsive UI

## Important Implementation Details

### Task Template System
Uses template variables like `{{content}}`, `{{url}}`, `{{priority}}`, `{{labels}}`, `{{due}}`, `{{description}}` for customizable task insertion format. Supports separate templates for regular tasks (#tasktodo) and repetitive tasks (#repeattodo).

### Recurrence Handling
Supports daily, weekly, monthly, and yearly recurrence patterns with proper Todoist API format conversion. Repetitive tasks automatically receive the #repeattodo tag for easy identification.

### Consolidated Note Generation
New feature that generates a unified view of all Todoist tasks:
- Fetches all tasks via Todoist API
- Filters by user-configured projects and labels
- Groups tasks by project with counters
- Sorts by priority and due date
- Creates formatted Obsidian note with direct links
- Includes statistical summary

### Optional Time Selection
Time selection is now completely optional and disabled by default:
- Controlled by `enableTimeSelection` setting
- When disabled, time fields are hidden from UI
- Simplifies task creation workflow
- Can be enabled in settings if needed

### Checkbox Sync Logic
Monitors markdown content changes and maps checkbox states to Todoist task IDs for bidirectional synchronization. Supports both #tasktodo and #repeattodo tags.

### Security Considerations
- API tokens stored securely in Obsidian's settings
- No sensitive data logged or exposed
- Secure token input modal with masked display
- Automatic directory creation with proper error handling