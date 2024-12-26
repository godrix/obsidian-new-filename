import { App, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import {v4 as uuidv4} from 'uuid';

interface NewFilenameSettings {
	defaultFilename: string;
}

const DEFAULT_SETTINGS: NewFilenameSettings = {
	defaultFilename: 'Untitled'
}

export default class NewFileNamePlugin extends Plugin {
	settings: NewFilenameSettings;

	async onload() {
		// Setup the settings
		await this.loadSettings();
		this.addSettingTab(new NewFIleNameSettingTab(this.app, this));

		// Configure a callback on the create event which only runs after the vault has loaded
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(this.app.vault.on('create', file => {
				var filename = this.settings.defaultFilename;
				if (filename.length == 0) {
					filename = uuidv4();
				}
				if (file instanceof TFile) {
					
				}
				console.log(filename);
			}));  
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class NewFIleNameSettingTab extends PluginSettingTab {
	plugin: NewFileNamePlugin;

	constructor(app: App, plugin: NewFileNamePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Default Filename')
			.setDesc('Filename to create new notes with. (Leave blank to generate a UUID).')
			.addText(text => text
				.setPlaceholder('New Filename')
				.setValue(this.plugin.settings.defaultFilename)
				.onChange(async (value) => {
					this.plugin.settings.defaultFilename = value;
					await this.plugin.saveSettings();
				}));
	}
}
