export class HoroscopeModel {
    constructor() {
        this.horoscopeData = null;
        this.signs = {
            'aries': { emoji: '♈', dates: [[21, 3], [19, 4]] },
            'tauro': { emoji: '♉', dates: [[20, 4], [20, 5]] },
            'geminis': { emoji: '♊', dates: [[21, 5], [20, 6]] },
            'cancer': { emoji: '♋', dates: [[21, 6], [22, 7]] },
            'leo': { emoji: '♌', dates: [[23, 7], [22, 8]] },
            'virgo': { emoji: '♍', dates: [[23, 8], [22, 9]] },
            'libra': { emoji: '♎', dates: [[23, 9], [22, 10]] },
            'escorpio': { emoji: '♏', dates: [[23, 10], [21, 11]] },
            'sagitario': { emoji: '♐', dates: [[22, 11], [21, 12]] },
            'capricornio': { emoji: '♑', dates: [[22, 12], [19, 1]] },
            'acuario': { emoji: '♒', dates: [[20, 1], [18, 2]] },
            'piscis': { emoji: '♓', dates: [[19, 2], [20, 3]] }
        };
    }

    setHoroscopeData(data) {
        this.horoscopeData = data;
    }

    getHoroscopeData() {
        return this.horoscopeData;
    }

    getSign(birthdate) {
        const [day, month] = birthdate.split('-').map(Number);
        
        for (const [sign, data] of Object.entries(this.signs)) {
            const [startDate, endDate] = data.dates;
            
            if ((month === startDate[1] && day >= startDate[0]) || 
                (month === endDate[1] && day <= endDate[0])) {
                return { sign, emoji: data.emoji };
            }
        }
        
        return { sign: 'unknown', emoji: '❓' };
    }
}