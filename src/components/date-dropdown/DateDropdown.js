import '~/air-datepicker/dist/js/datepicker.min';

class DateDropdown {
  constructor(dateDropdown) {
    this._init(dateDropdown);
  }

  _getConfig() {
    const handlerSelect = this._handlerSelect;

    return {
      showEvent: 'click',
      offset: 5,
      range: true,
      onSelect: handlerSelect,
      clearButton: true,
      minDate: new Date(),
      navTitles: {
        days: 'MM yyyy',
      },
    };
  }

  _getDaysLag() {
    if (!this.$firstInput.val()) {
      this.daysLag = 0;
      if (this.callback) this.callback(this.daysLag);
      return;
    }
    const date1 = this.$firstInput
      .val()
      .split('.')
      .map((item) => Number(item));
    const date2 = this.$secondInput
      .val()
      .split('.')
      .map((item) => Number(item));

    const firstDate = new Date(date1[2], date1[1] - 1, date1[0]);
    const secondDate = new Date(date2[2], date2[1] - 1, date2[0]);

    if (Number.isNaN(secondDate.getTime())) return;

    const daysLag = Math.ceil(
      Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24),
    );

    this.daysLag = daysLag;
    if (this.callback) this.callback(this.daysLag);
  }

  _formatDate(formattedDate, input) {
    this.formattedDate = formattedDate;
    const secondDate = formattedDate.split(',')[1];
    if (!secondDate) return;

    input.val(secondDate);
  }

  _hideDatepicker() {
    this.$datepickerInstance.hide();
  }

  _findInputs() {
    this.$firstInput = $(this.input);
    this.$secondInput = $(this.dateDropdown).find('.js-date-dropdown_input-second');
  }

  _findButton() {
    this.$clearButton = this.$calendar.find('.datepicker--button');
    this.$buttonsParent = this.$calendar.find('.datepicker--buttons');
  }

  _appendButtonSuccess() {
    this.$buttonsParent.append(
      '<button type="button" class="button button_no-bg">Применить</button>',
    );
  }

  _findButtonSuccess() {
    this.$buttonSuccess = this.$clearButton.next();
  }

  _createDateDropdown(config) {
    this.isDatepickerActive = false;

    this.$datepickerInstance = this.$firstInput.datepicker(config).data('datepicker');

    this.$calendar = this.$datepickerInstance.$datepicker;
  }

  _handlerInput(e) {
    if (e.keyCode === 9) return true;
    e.preventDefault();
    return false;
  }

  _handlerClickFirstInput() {
    this.isDatepickerActive = !this.isDatepickerActive;
    if (!this.isDatepickerActive) {
      this.$datepickerInstance.hide();
    }
  }

  _handleClickSecondInput() {
    this.isDatepickerActive = !this.isDatepickerActive;
    this.$datepickerInstance.show();
    if (!this.isDatepickerActive) {
      this.$datepickerInstance.hide();
    }
  }

  _handlerSelect(formattedDate) {
    this._formatDate(formattedDate, this.$secondInput);
    const firstDate = this.formattedDate.split(',')[0];
    this.input.value = firstDate;

    this._getDaysLag();
  }

  _handlerClickClearButton() {
    this.$secondInput.val('');
    this.$firstInput.val('');
    this._getDaysLag();
  }

  _handlerClickSuccessButton(e) {
    e.stopPropagation();
    this.isDatepickerActive = false;
    this._hideDatepicker();
  }

  _handlerClickOutside(e) {
    const { target } = e;

    const isTargetNotInput = target !== this.$firstInput && target !== this.$secondInput;
    if (isTargetNotInput) {
      this.isDatepickerActive = false;
    }
  }

  _handlerFocusOnInput() {
    this.$datepickerInstance.show();
  }

  _handlerBlurInput() {
    this.$datepickerInstance.hide();
  }

  _bindHandlers() {
    this._handlerSelect = this._handlerSelect.bind(this);
    this.handlerInput = this._handlerInput.bind(this);
    this.handleClickSecondInput = this._handleClickSecondInput.bind(this);
    this.handlerClickClearButton = this._handlerClickClearButton.bind(this);
    this.handlerClickSuccessButton = this._handlerClickSuccessButton.bind(this);
    this.handlerClickFirstInput = this._handlerClickFirstInput.bind(this);
    this.handlerClickOutside = this._handlerClickOutside.bind(this);
    this.handlerFocusOnInput = this._handlerFocusOnInput.bind(this);
    this.handlerBlurInput = this._handlerBlurInput.bind(this);
  }

  _addEventHandlers() {
    this.$clearButton.on('click', this.handlerClickClearButton);
    this.$secondInput.on('click', this.handleClickSecondInput);
    this.$secondInput.on('keydown', this.handlerInput);
    this.$secondInput.on('focus', this.handlerFocusOnInput);
    this.$secondInput.on('blur', this.handlerBlurInput);
    this.$firstInput.on('keydown', this.handlerInput);
    this.$firstInput.on('focus', this.handlerFocusOnInput);
    this.$firstInput.on('click', this.handlerClickFirstInput);
    this.$buttonSuccess.on('mouseup', this.handlerClickSuccessButton);
    $(document).on('click', this.handlerClickOutside);
  }

  _init(dateDropdown) {
    this.dateDropdown = dateDropdown;
    this.input = dateDropdown.querySelector('input');
    this._bindHandlers();
    this.config = this._getConfig();
    this._findInputs();
    this._createDateDropdown(this.config);
    this._findButton();
    this._appendButtonSuccess();
    this._findButtonSuccess();
    this._addEventHandlers();
  }
}

export default DateDropdown;
