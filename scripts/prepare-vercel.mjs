import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'client', 'dist');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(distDir)) {
  throw new Error('client/dist not found. Run the client build before preparing Vercel assets.');
}

fs.rmSync(publicDir, { recursive: true, force: true });
fs.cpSync(distDir, publicDir, { recursive: true });

console.log('Copied client/dist to public/ for Vercel static hosting.');
