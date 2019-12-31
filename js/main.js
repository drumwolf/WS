function editProductData(product) {
  // prepare initial variables
  const parser = new DOMParser;
  const priceRange = product.priceRange;
  const price = (priceRange && priceRange.selling && priceRange.selling.high && !isNaN(priceRange.selling.high) ) ? priceRange.selling.high : 0;
  // edit 'product' JSON object
  product.name = parser.parseFromString(product.name,'text/html').body.textContent;
  product.price = '$' + price.toFixed(2);
}
function buildPage(data) {
  console.log(data.groups);
  // parse individual data properties
  const productTemplate = document.getElementById('product-template');
  const renderProduct = Handlebars.compile(productTemplate.innerHTML);
  let finalHTML = '';
  // process metadata for each individual group
  data.groups.forEach( productData => {
    editProductData(productData);
    finalHTML += renderProduct(productData);
  });
  document.getElementById('main').innerHTML += finalHTML;
}
const url = '/js/data.json';
fetch(url).then( resp => resp.json() ).then( data => buildPage(data) );

