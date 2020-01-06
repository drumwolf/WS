class Overlay {
  constructor() {
    // dom elements
    this.overlay  = document.getElementById('overlay');
    this.modal    = this.overlay.querySelector('.ol-modal');
    this.closeBtn = this.overlay.querySelector('.ol-close-btn');
    this.prevBtn  = this.overlay.querySelector('.ol-prev-btn');
    this.nextBtn  = this.overlay.querySelector('.ol-next-btn');
    this.indicators = this.overlay.querySelector('.ol-carousel-indicators');
    // state properties
    this.products = [];
    this.selectedProductIndex = 0;
    // attach events to dom elements
    this.attachEvents();
  }

  attachEvents() {
    // close modal
    this.closeBtn.addEventListener('click', e => this.hide());
    // click arrows
    this.prevBtn.addEventListener('click', e => this.showPrev() );
    this.nextBtn.addEventListener('click', e => this.showNext() );
  }

  fill(products) {
    this.products = products;
    this.setIndicators();
  }

  hide() {
    this.overlay.style.display = 'none';
  }

  setIndicators() {
    let html = '';
    this.products.forEach( (obj, index) => { html += `<li class="ol-carousel-indicator-dot indicator-${index}"></li>`; });
    this.indicators.innerHTML = html;
  }

  selectIndicator(index) {
    this.indicators.setAttribute('data-selected-index', index);
  }

  show(index) {
    this.selectedProductIndex = index;
    this.overlay.style.display = 'block';
    this.modal.style.backgroundImage = `url(${this.products[index].thumbnail.href})`;
    this.selectIndicator(index);
  }

  showPrev() {
    this.showNext(-1);
  }

  showNext(increment = 1) {
    const len = this.products.length;
    const index = this.selectedProductIndex;
    const newIndex = ( index + increment + len) % len;
    this.show(newIndex);
  }
}

export default Overlay;