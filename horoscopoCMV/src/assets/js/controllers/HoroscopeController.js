import { HoroscopeModel } from "../models/HoroscopeModel.js";
import { HoroscopeService } from "../services/HoroscopeService.js";
import { validateDate } from "../utils/dateValidator.js";

export class HoroscopeController {
    constructor(view) {
        this.view = view;
        this.model = new HoroscopeModel();
        this.service = new HoroscopeService();
        this.timeoutId = null;

        this.view.bindSubmit(this.handleSubmit.bind(this));
        this.view.bindInputChange(this.handleInputChange.bind(this));
    }

    handleInputChange(dateString) {
        const isValid = validateDate(dateString);
        this.view.toggleButton(isValid);
    }

    async handleSubmit(birthdate) {
        try {
            this.view.toggleButton(false);
            
            const signInfo = this.model.getSign(birthdate);
            const horoscopeData = await this.service.getHoroscope(signInfo.sign);
            
            this.model.setHoroscopeData(horoscopeData);
            this.view.displayHoroscope(horoscopeData, signInfo);
            
            // Configurar el temporizador para ocultar el horóscopo después de 15 segundos
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            
            this.timeoutId = setTimeout(() => {
                this.view.hideHoroscope();
                this.view.toggleButton(true);
                this.timeoutId = null;
            }, 15000);
            
        } catch (error) {
            console.error('Error:', error);
            this.view.toggleButton(true);
        }
    }
}