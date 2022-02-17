import type { Plugin } from "rollup"
import * as favicons from "favicons"

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

interface PWAOptions {
	icon_url: string;
	manifest: WebManifest;
}

export default function pwa(options: PWAOptions): Plugin {
    return {
        name: 'pwa', // this name will show up in warnings and errors
        load(id) {
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"'; // the source code for "virtual-module"
            }
            return null; // other ids should be handled as usually
        }
    };
}
  