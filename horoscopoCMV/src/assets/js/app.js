import { HoroscopeView } from './views/HoroscopeView.js';
import { HoroscopeController } from './controllers/HoroscopeController.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = new HoroscopeView();
    new HoroscopeController(view);
});