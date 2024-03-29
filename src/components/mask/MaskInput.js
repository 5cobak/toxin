import '~/inputmask/dist/jquery.inputmask.min';

class MaskInput {
  constructor(inputs) {
    this.inputs = inputs;
    this._init();
  }

  _appendErrorMessage(message, element) {
    const err = `
          <div class="validate-error">${message}</div>
        `;

    element.parentElement.insertAdjacentHTML('beforeend', err);
  }

  _deleteErrorMessage(element) {
    const err = element.parentElement.querySelector('.validate-error');
    if (err) err.remove();
  }

  _validateDate(value, element) {
    const input = element;
    const arrD = value.split('.');
    const deleteError = this._deleteErrorMessage.bind(this);
    const appendError = this._appendErrorMessage.bind(this);
    arrD[1] -= 1;

    const date = new Date(arrD[2], arrD[1], arrD[0]);

    if (date.getFullYear() !== +arrD[2]) {
      deleteError(element);
      appendError('Введена некорректная дата!', element);
      input.value = 'ДД.ММ.ГГГГ';
      element.focus();
      return false;
    } else if (date.getMonth() !== +arrD[1]) {
      deleteError(element);
      appendError('Введена некорректная дата!', element);
      input.value = 'ДД.ММ.ГГГГ';
      element.focus();
      return false;
    } else if (date.getDate() !== +arrD[0]) {
      deleteError(element);
      appendError('Введена некорректная дата!', element);
      input.value = 'ДД.ММ.ГГГГ';
      element.focus();
      return false;
    } else {
      deleteError(element);
      return true;
    }
  }

  _setMask() {
    const elements = this.inputs;
    const validate = this._validateDate.bind(this);
    elements.forEach((item) => {
      $(item).inputmask('99.99.9999', {
        placeholder: 'ДД.ММ.ГГГГ',
        oncomplete: () => {
          const val = $('.js-date-masked').val();

          validate(val, item);
        },
      });
    });
  }

  _init() {
    this._setMask();
  }
}

export default MaskInput;
