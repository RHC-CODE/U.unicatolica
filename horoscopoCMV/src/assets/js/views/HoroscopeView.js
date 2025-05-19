export class HoroscopeView {
    constructor() {
    this.form = document.getElementById('horoscope-form');
    this.birthdateInput = document.getElementById('birthdate');
    this.consultBtn = document.getElementById('consult-btn');
    this.horoscopeResult = document.getElementById('horoscope-result');
    this.horoscopeContent = document.getElementById('horoscope-content');
    
    // Configura máscara de fecha automática
    this.birthdateInput.addEventListener('input', this.formatDateInput.bind(this));
    }

  /**
   * Vincula el evento submit del formulario
   * @param {function} handler Función a ejecutar al enviar el formulario
   */
  bindSubmit(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const birthdate = this.birthdateInput.value;
      if (this.validateDate(birthdate)) {
        handler(birthdate);
      } else {
        this.displayError("Formato de fecha inválido. Use DD-MM-AAAA");
      }
    });
  }

  /**
   * Vincula el evento input para validación en tiempo real
   * @param {function} handler Función a ejecutar al cambiar el input
   */
  bindInputChange(handler) {
    this.birthdateInput.addEventListener('input', (event) => {
      const date = event.target.value;
      const isValid = this.validateDate(date);
      handler(date, isValid);
      this.toggleButton(isValid);
    });
  }

  /**
   * Formatea el input de fecha automáticamente
   */
  formatDateInput(event) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = `${value.slice(0, 2)}-${value.slice(2)}`;
    if (value.length > 5) value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
    event.target.value = value;
  }

  /**
   * Valida el formato de fecha DD-MM-AAAA
   */
  validateDate(dateString) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(dateString);
  }

  /**
   * Habilita/deshabilita el botón de consulta
   */
  toggleButton(enabled) {
    this.consultBtn.disabled = !enabled;
    this.consultBtn.classList.toggle('valid', enabled);
  }

  /**
   * Muestra estado de carga
   */
  showLoading() {
    this.consultBtn.innerHTML = '<i>Consultando...</i>';
    this.consultBtn.disabled = true;
    this.consultBtn.classList.add('loading');
  }

  /**
   * Oculta estado de carga
   */
  hideLoading() {
    this.consultBtn.innerHTML = '<strong>Consultar</strong>';
    this.consultBtn.disabled = false;
    this.consultBtn.classList.remove('loading');
  }

  /**
   * Muestra el resultado del horóscopo con formato
   */
  displayHoroscope(prediction, signInfo) {
    // Validación de datos
    const safePrediction = prediction?.data?.horoscope_data || 
      '<em>El universo tiene un mensaje especial para ti hoy.</em>';
    
    const safeSign = signInfo?.sign || 'Desconocido';
    const safeEmoji = signInfo?.emoji || '✨';

    // Formatea el texto con estilos
    const formattedPrediction = this.formatPredictionText(safePrediction);

    this.horoscopeContent.innerHTML = `
      <h3><strong>${safeSign.toUpperCase()}</strong> ${safeEmoji}</h3>
      <div class="prediction-text">${formattedPrediction}</div>
    `;

    // Animación de aparición
    this.horoscopeResult.classList.remove('hidden', 'fade-out');
    this.horoscopeResult.classList.add('visible', 'fade-in');

    // Efecto de éxito
    this.consultBtn.classList.add('success-effect');
    setTimeout(() => this.consultBtn.classList.remove('success-effect'), 1000);
  }

  /**
   * Da formato al texto de predicción con estilos
   */
  formatPredictionText(text) {
    return text
      // Palabras clave en negrita
      .replace(/(\b(hoy|today|dinero|money|amor|love)\b)/gi, '<strong>$1</strong>')
      // Frases importantes en cursiva
      .replace(/([^.!?]+[.!?])/g, (match) => {
        return match.length > 50 ? `<em>${match}</em>` : match;
      });
  }

  /**
   * Oculta el resultado del horóscopo con animación
   */
  hideHoroscope() {
    this.horoscopeResult.classList.add('fade-out');
    setTimeout(() => {
      this.horoscopeResult.classList.remove('visible');
      this.horoscopeResult.classList.add('hidden');
    }, 500);
  }

  /**
   * Muestra mensaje de error
   */
  displayError(message) {
    this.horoscopeContent.innerHTML = `
      <h3>❌ <strong>Error</strong></h3>
      <p><em>${message || 'Ocurrió un error inesperado'}</em></p>
    `;
    this.horoscopeResult.classList.remove('hidden', 'fade-out');
    this.horoscopeResult.classList.add('visible', 'fade-in');
  }
}