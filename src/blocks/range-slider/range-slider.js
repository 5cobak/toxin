$(document).ready(() => {
  const input = document.querySelectorAll('.js-range-slider__input');
  input.forEach((item) => {
    const parentEl = item.parentElement;
    const domValues = parentEl.querySelector('.range-slider__values');

    function writeValues() {
      const from = parentEl.querySelector('.irs-from');
      const to = parentEl.querySelector('.irs-to');

      domValues.innerHTML = `${from.innerHTML}₽ - ${to.innerHTML}₽`;
    }

    $(item).ionRangeSlider({
      type: 'double',
      skin: 'round',
      min: 0,
      max: 15000,
      from: 5000,
      to: 10000,
      onFinish: () => {
        writeValues();
      },
      onChange: () => {
        writeValues();
      },
      hide_min_max: true,
    });
  });
});
