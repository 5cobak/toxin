export default class Burger {
  constructor(parent) {
    this.parent = parent;
    this._init();
  }

  _toggleMenu() {
    this.burgerLayout.classList.toggle('header__burger-layout_active');
    this.headerDropdown.classList.toggle('header__nav_dropdown-active');
    this.shadow.classList.toggle('header__nav-shadow_active');
    document.body.classList.toggle('stop-scrolling');
  }

  _handlerClickBurger(e) {
    this._toggleMenu(e);
  }

  _handlerClickOnShadow() {
    this._toggleMenu();
  }

  _addEvents() {
    const handlerClickBurger = this._handlerClickBurger.bind(this);
    const handlerClickOnShadow = this._handlerClickOnShadow.bind(this);

    this.burger.addEventListener('click', handlerClickBurger);
    this.shadow.addEventListener('click', handlerClickOnShadow);
  }

  _init() {
    this.burger = this.parent.querySelector('.js-header__burger');
    this.burgerLayout = this.burger.querySelector('.js-header__burger-layout');
    this.shadow = this.parent.querySelector('.js-header__nav-shadow');
    this.headerDropdown = this.parent.querySelector('.js-header__nav_dropdown');
    this._addEvents();
  }
}
