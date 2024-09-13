/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SITE_URL: string;
    readonly VITE_CURRENT_LOCALHOST: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
