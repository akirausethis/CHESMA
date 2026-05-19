declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.css';

declare interface ImportMetaEnv {
  readonly VITE_OPENROUTER_API_KEY?: string;
  readonly VITE_OPENROUTER_UPLOAD_URL?: string;
  readonly VITE_OPENROUTER_CHAT_URL?: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
