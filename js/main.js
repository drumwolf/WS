class Overlay {
  constructor() {
    // dom elements
    this.overlay  = document.getElementById('overlay');
    this.modal    = this.overlay.querySelector('.ol-modal');
    this.closeBtn = this.overlay.querySelector('.ol-close-btn');
    this.prevBtn  = this.overlay.querySelector('.ol-prev-btn');
    this.nextBtn  = this.overlay.querySelector('.ol-next-btn');
    this.indicators = this.overlay.querySelectorAll('.ol-carousel-indicator-dot');
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
  }

  hide() {
    this.overlay.style.display = 'none';
  }

  selectIndicator(index) {
    this.indicators.forEach( obj => obj.classList.remove('active') );
    this.indicators[index].classList.add('active');
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

class ProductPage {
  constructor() {
    // define variables
    this.overlay = new Overlay();
    this.products = [];
    this.productContainer = document.getElementById('product-container');
    // fetch JSON data
    this.fetchJSON();
  }

  fetchJSON() {
    const url = '/js/data.json';
    fetch(url).then( resp => resp.json() ).then( data => {
      this.buildPage(data.groups);
      this.fillOverlay(data.groups);
      this.attachEvents();
    });
  }

  attachEvents() {
    this.productContainer.addEventListener('click', e => {
      if (e.target.classList.contains('product')) {
        const index = Array.prototype.indexOf.call(this.productContainer.children, e.target);
        this.showOverlay(index);
      }
    });
  }

  buildPage(products) {
    // store product data
    this.products = products;
    // parse individual data properties
    const productTemplate = document.getElementById('product-template');
    const renderProduct = Handlebars.compile(productTemplate.innerHTML);
    let finalHTML = '';
    // process metadata for each individual group
    this.products.forEach( productData => {
      this.editProductData(productData);
      finalHTML += renderProduct(productData);
    });
    this.productContainer.innerHTML += finalHTML;
  }

  editProductData(product) {
    // prepare initial variables
    const parser = new DOMParser;
    const priceRange = product.priceRange;
    const price = (priceRange && priceRange.selling && priceRange.selling.high && !isNaN(priceRange.selling.high) ) ? priceRange.selling.high : 0;
    // edit 'product' JSON object
    product.name = parser.parseFromString(product.name,'text/html').body.textContent;
    product.price = '$' + price.toFixed(2);
  }

  fillOverlay(index) {
    this.overlay.fill(index);
  }

  showOverlay(index) {
    this.overlay.show(index);
  }

}

new ProductPage();