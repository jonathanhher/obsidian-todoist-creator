# Changelog

All notable changes to the Todoist Task Creator plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2025-07-05

### Added
- **Material Design Architecture**: Complete CSS redesign with unified design system
- **SVG Icon System**: Material Design icons implemented via CSS masks in single color
- **Priority Flag Icons**: Color-coded flag icons for P1-P4 priorities (red, orange, blue, gray)
- **Unified Component Classes**: `.unified-select` and `.unified-button` for consistent styling
- **Absolute Icon Positioning**: Icons positioned absolutely to prevent movement on hover

### Changed
- **Labels Interface**: Changed from dropdown to modal-based selection for better functionality
- **Design Consistency**: All form elements now have identical behavior and appearance
- **Mobile Compatibility**: Enhanced responsive design for perfect mobile experience
- **CSS Architecture**: Complete restructuring with Material Design principles
- **Package Description**: Updated to reflect new Material Design architecture

### Fixed
- **Icon Movement**: Eliminated icon shifting on hover through absolute positioning
- **Label Dropdown**: Fixed non-functional label dropdown by implementing modal system
- **Priority Icons**: Replaced emoji flags with consistent CSS flag icons
- **Visual Inconsistencies**: Unified all UI elements for complete design consistency

### Technical
- Updated version to 2.4.0 in package.json and manifest.json
- Restructured CSS with Material Design classes and patterns
- Optimized icon loading with SVG masking for better performance
- Enhanced mobile touch interaction patterns

## [2.3.0] - 2025-07-04

### Added
- **Dropdown Interface**: Complete redesign with native dropdown components
- **Integrated Repeat Function**: Repeat option integrated within Date selector
- **Mobile Optimization**: Perfect responsive design for mobile devices
- **Color Identification**: Specific border colors for each dropdown type

### Changed
- **Compact Interface**: Ultra-compact layout with dropdowns replacing buttons
- **User Experience**: Faster selection with native dropdown controls
- **Plugin Standards**: Updated ID and name to meet Obsidian standards

### Fixed
- **Mobile Experience**: Improved touch interaction and responsive layouts
- **Performance**: Faster interaction with optimized dropdown system

## [2.2.1] - 2025-07-03

### Added
- **Independent Repeat Button**: Standalone repeat function with daily/weekly/monthly options
- **Compact Interface**: Button-based design without labels for space efficiency
- **Color Coding**: Specific colors for different button types

### Changed
- **Layout Design**: More compact vertical layout
- **User Interface**: Removed labels from Reminder, Labels, and Insert Note fields

## [2.2.0] - 2025-07-02

### Added
- **Repetitive Tasks**: Full support with automatic #repeattodo tagging
- **Consolidated Note**: Unified view of all Todoist tasks with filtering
- **Optional Time Selection**: Time input completely optional (disabled by default)
- **Statistical Summary**: Task and project counters in consolidated view
- **Granular Filtering**: Project and label filters for consolidated notes

### Changed
- **Time Interface**: Time selection now disabled by default
- **Task Templates**: Separate templates for regular and repetitive tasks
- **Author Information**: Updated to Jonathan Hernandez
- **Repository Links**: Updated GitHub repository references

### Fixed
- **Error Handling**: Improved API error management
- **Performance**: Better caching and sync optimization
- **Translations**: More complete internationalization

## [2.1.0] - 2025-07-01

### Added
- **Todoist-style Design**: Complete visual redesign matching Todoist aesthetic
- **Inline Layout**: Project and Priority fields in same row
- **Visual Labels**: Tag display with preserved Todoist colors
- **Dual Date Fields**: Separate Date and Deadline fields
- **Responsive Design**: Full mobile and desktop compatibility

### Changed
- **Interface Compactness**: More efficient use of screen space
- **Visual Consistency**: Unified design language throughout

### Fixed
- **Alignment Issues**: Resolved spacing and positioning problems
- **Checkbox Overlap**: Fixed visual interference with other elements

## [2.0.0] - 2025-06-30

### Added
- **API Connection Indicator**: Visual green/red status indicator
- **Relative Dates**: Quick options for Today, Tomorrow, This/Next Week
- **Task Duration**: Configurable duration from 15 minutes to 8 hours
- **Recurrent Tasks**: Complete recurring task functionality
- **Compact Calendar**: Optimized date picker interface
- **15-minute Time Intervals**: Precise time selection

### Changed
- **Sync System**: Improved with debouncing for better performance
- **Cache System**: Intelligent 5-minute caching for API responses
- **Performance**: Multiple optimizations for smoother operation

### Fixed
- **Sync Bugs**: Multiple synchronization issues resolved
- **Calendar Issues**: Various date picker improvements

## [1.0.0] - 2025-06-29

### Added
- **Core Functionality**: Complete task creation system
- **API Token Security**: Secure modal for API configuration
- **Multi-language Support**: Spanish and English interfaces
- **Visual Calendar**: Basic date picker implementation
- **Priority System**: Color-coded P1-P4 priorities
- **Basic Synchronization**: Initial sync between Obsidian and Todoist

### Technical Details
- Initial plugin architecture with TypeScript
- Basic CSS styling system
- Todoist REST API v2 integration
- Obsidian Plugin API implementation

---

## Legend

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Now removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes
- **Technical**: Development and build changes