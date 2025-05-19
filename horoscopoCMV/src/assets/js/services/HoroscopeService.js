export class HoroscopeService {
    constructor() {
        this.baseUrl = 'https://corsproxy.io/?https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily';
        this.signMap = {
            aries: 'aries',
            tauro: 'taurus',
            géminis: 'gemini',
            geminis: 'gemini',
            cáncer: 'cancer',
            cancer: 'cancer',
            leo: 'leo',
            virgo: 'virgo',
            libra: 'libra',
            escorpio: 'scorpio',
            sagitario: 'sagittarius',
            capricornio: 'capricorn',
            acuario: 'aquarius',
            piscis: 'pisces' 
        };
    }

    async getHoroscope(sign) {
        try {
            const spanishSign = sign.toLowerCase();
            const normalizedSign = this.signMap[spanishSign];

            if (!normalizedSign) {
                throw new Error(`Signo zodiacal no válido: ${sign}`);
            }

            const url = `${this.baseUrl}?sign=${normalizedSign}&day=today`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            return result;

        } catch (error) {
            console.error('Error al obtener el horóscopo:', error.message);
            return {
                data: {
                    horoscope_data: `No se pudo obtener el horóscopo para ${sign}. Intenta nuevamente más tarde.`
                }
            };
        }
    }
}
