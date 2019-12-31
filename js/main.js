function buildPage(data) {
  console.log(data)
}
const url = '/js/data.json';
fetch(url).then( resp => resp.json() ).then( data => buildPage(data) );

