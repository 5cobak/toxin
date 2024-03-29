class Header {
  constructor(header) {
    this.header = header;
    this._init();
  }

  _toggleMenu() {
    this.burger.classList.toggle('header__burger_active');
    this.nav.classList.toggle('header__nav_active');
    this.navShadow.classList.toggle('header__nav-shadow_active');
  }

  _handlerBurgerClick() {
    this._toggleMenu();
  }

  _handlerShadowClick() {
    this._toggleMenu();
  }

  _bindHandlers() {
    this._handlerBurgerClick = this._handlerBurgerClick.bind(this);
    this._handlerShadowClick = this._handlerShadowClick.bind(this);
  }

  _addEventHandlers() {
    this.burger.addEventListener('click', this._handlerBurgerClick);
    this.navShadow.addEventListener('click', this._handlerShadowClick);
  }

  _init() {
    this.burger = this.header.querySelector('.js-header__burger');
    this.burgerLayout = this.burger.querySelector('.js-header__burger-layout');
    this.navShadow = this.header.querySelector('.js-header__nav-shadow');
    this.nav = this.header.querySelector('.js-header__nav');
    this._bindHandlers();
    this._addEventHandlers();
  }
}

export default Header;
