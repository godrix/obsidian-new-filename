import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

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

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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
