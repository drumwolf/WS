class ProductPage {
  constructor() {
    // define variables
    this.products = [];
    // fetch JSON data
    const url = '/js/data.json';
    fetch(url).then( resp => resp.json() ).then( data => this.buildPage(data) );
  }

  buildPage(data) {
    // store product data
    this.products = data.groups;
    // parse individual data properties
    const productTemplate = document.getElementById('product-template');
    const renderProduct = Handlebars.compile(productTemplate.innerHTML);
    let finalHTML = '';
    // process metadata for each individual group
    this.products.forEach( productData => {
      this.editProductData(productData);
      finalHTML += renderProduct(productData);
    });
    document.getElementById('main').innerHTML += finalHTML;
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

}

new ProductPage();