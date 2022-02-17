import type { Plugin } from "rollup"
import * as favicons from "favicons"
import { resolve } from "path"
import { promises as fs } from "fs"

const generateManifest = (options: PWAOptions) => Object.assign({
	"$schema": "https://json.schemastore.org/web-manifest-combined.json"
}, options.manifest) 

type DisplayType = "fullscreen" | "standalone" | "minimal-ui" | "browser"

interface WebManifest {
	background_color?: string;
	categories?: string[];
	description?: string;
	dir?: "ltr" | "rtl" | "auto"
	display?: DisplayType;
	display_override?: [DisplayType];
	iarc_rating_id?: string;
	icons?: [{
		src: string;
		sizes: string;
		type?: string;
	}],
	lang?: string;
	name: string;
	orientation: "any" | "natural" | "landscape" |
		"landscape-primary" | "landscape-secondary" | "portrait" |
		"portrait-primary" | "portrait-secondary";
	prefer_related_applications: boolean;
	protocol_handlers: [{
		protocol: string,
		url: string;
	}];
	related_applications: [{
		platform: string;
		url: string;
		id?: string;
	}];
	scope: string;
	screenshots: [{
		src: string;
		sizes: string;
		type: string;
		platform: "wide" | "narrow";
		label: string;
	}];
	shortcuts: [{
		name: string;
		url: string;
		description?: string;
	}];
	short_name?: string;
	start_url?: string;
	theme_color?: string;
	
}

export interface PWAOptions {
	icon_url: string;
	manifest_url: string
	manifest: WebManifest;
}

export default function pwa(options: PWAOptions): Plugin {
    return {
        name: 'pwa',
		load() {
			this.addWatchFile(resolve(options.icon_url));

			return null
		},
		generateBundle() {
			fs.writeFile(resolve(options.manifest_url), JSON.stringify(generateManifest(options)))
		}
    };
}
  