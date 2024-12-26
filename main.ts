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
			// When creating a new TFile override the basename with the configured filename
			this.registerEvent(this.app.vault.on('create', file => {
				let filename = this.settings.defaultFilename;
				if (filename.length == 0) {
					filename = uuidv4();
				}
				if (file instanceof TFile) {
					file.basename = this.getLowestNonColidingFilename(filename);
				}
			}));  
		});
	}

	private getLowestNonColidingFilename(filename: string) {		
		// get all the filenames that contain our desired filename as a substring
		const files = this.app.vault.getMarkdownFiles();
		const potentially_coliding_files = files.filter((file) => file.basename.includes(filename));
		const potentially_coliding_filenames = new Set(potentially_coliding_files.map((file) => file.basename));
		// iterate through potential filenames until we find one that doesn't already exist
		// this should require at most potentially_coliding_filenames.length + 1 attempts
		for (let i = 0; i < potentially_coliding_filenames.size + 1; i++) {
			let file_name_to_attempt = filename;
			if (i > 0) {
				file_name_to_attempt = `${filename} ${i}`; 
			}
			if (!potentially_coliding_filenames.has(file_name_to_attempt)) {
				return file_name_to_attempt;
			}
		}
		throw new Error("Encountered Logic Mistake When Trying To Create New File");
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
			.setName('Default filename')
			.setDesc('Filename to create new notes with. (Leave blank to generate a UUID).')
			.addText(text => text
				.setPlaceholder('New filename')
				.setValue(this.plugin.settings.defaultFilename)
				.onChange(async (value) => {
					this.plugin.settings.defaultFilename = value;
					await this.plugin.saveSettings();
				}));
	}
}
