import Handlebars from 'handlebars';
import Overlay from './Overlay';

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
    const url = 'data.json';
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

export default ProductPage;