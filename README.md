# Obsidian New FileName Plugin

A plugin for Obsidian that allows you to customize the default filename for new notes. If no filename is specified, it will generate a default filename in the format `YYYY-MM-DD`.

## Features

- Set a custom default filename for new notes.
- Automatically generate filenames based on the current date (`YYYY-MM-DD`) if the custom filename is left blank.
- Ensure filenames are unique by appending numbers to avoid collisions (e.g., `YYYY-MM-DD 1`, `YYYY-MM-DD 2`, etc.).

## Installation

### Manual Installation
1. Download the `main.js`, `manifest.json`, and `styles.css` (if applicable) files from the repository.
2. Place them in the `.obsidian/plugins/new-filename-plugin` directory in your Obsidian vault.
   - If the folder doesn't exist, create it.

### Installation via Community Plugins
If this plugin is added to the Obsidian community plugins directory:
1. Go to **Settings > Community Plugins** in Obsidian.
2. Search for "NewFileNamePlugin."
3. Install and enable the plugin.

## Usage

### Setting a Default Filename
1. Go to **Settings > New Filename Plugin**.
2. Enter a default filename in the "Default filename" field.
   - Example: `Meeting Notes`, `Task List`.
3. Leave the field blank if you want the filename to be generated based on the current date (`YYYY-MM-DD`).

### Filename Collision Handling
- When a note is created with the same name as an existing one, the plugin automatically appends a number to ensure uniqueness.
  - Example: If `2025-01-19` already exists, the next file will be named `2025-01-19 1`.

## Settings

| Setting             | Description                                                                      | Default       |
|---------------------|----------------------------------------------------------------------------------|---------------|
| **Default Filename** | Custom filename for new notes. If left blank, the plugin generates `YYYY-MM-DD`. | `Untitled`    |

## Development

### Prerequisites
- Node.js and npm installed on your system.

### Build
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile the plugin.

### Watching for Changes
Run `npm run dev` to watch for changes and recompile automatically during development.

## Support

If you encounter any issues or have feature requests, please open an issue in the [GitHub repository](#).

## License

This plugin is licensed under the MIT License. See the `LICENSE` file for more details.
