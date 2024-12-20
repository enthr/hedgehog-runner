// Setup Asset URL Such That and Object Storage Public URL Prefix can be Attached
const ASSET_URL = (import.meta.env.VITE_ASSET_URL) ? `${import.meta.env.VITE_ASSET_URL}` : "";

// Game Sprites
export const sprite_background = `${ASSET_URL}/graphics/chemical-bg.png`;
export const sprite_platform = `${ASSET_URL}/graphics/platform.png`;
export const sprite_hedgehog = `${ASSET_URL}/graphics/hedgehog.png`;
export const sprite_ring = `${ASSET_URL}/graphics/ring.png`;
export const sprite_motobug = `${ASSET_URL}/graphics/motobug.png`;

// Game Fonts
export const font_mania = `${ASSET_URL}/fonts/mania.ttf`;

// Game Sounds
export const sound_city = `${ASSET_URL}/sounds/city.mp3`;
export const sound_destroy = `${ASSET_URL}/sounds/destroy.wav`;
export const sound_hurt = `${ASSET_URL}/sounds/hurt.wav`;
export const sound_hyperring = `${ASSET_URL}/sounds/hyperring.wav`;
export const sound_jump = `${ASSET_URL}/sounds/jump.wav`;
export const sound_ring = `${ASSET_URL}/sounds/ring.wav`;