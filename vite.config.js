// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
 root: 'src', // Указываем корневую директорию проекта
 build: {
    outDir: '../dist', // Указываем директорию для сборки
 },
 server: {
    open: true, // Автоматически открывать браузер при запуске сервера
 },
});