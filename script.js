
let data = {
  // API data send here
}

let controller = {
  init() {
    this.inputField = document.getElementById('inputField');
    this.inputField.addEventListener('keypress', function(e) {
        let key = e.which || e.keyCode; // what is this???:w
        if (key === 13) {
          controller.submitQuery()
        }
    });
    this.inputField.addEventListener('input', this.trackInput);
    this.randomButton = document.getElementById('mainButton');
    // this.randomButton.addEventListener('click', this.getRandom);
    
  },

  trackInput(e) {
    // let currentInput = e.target.value;
    data.currentInput = e.target.value;
    console.log(data.currentInput);
  },

  submitQuery() {
    console.log(data.currentInput);
    controller.generateQuery();
  },

  generateQuery() { // not separating the generate query from send query feels like a mistake
    var proxyCORS = "https://cors-anywhere.herokuapp.com/";
    let searchTerms = data.currentInput;
    searchTerms = searchTerms.replace(/ /g, '%20');
    console.log(searchTerms);
    let xhrRequest = function() {
        let xhr = new XMLHttpRequest();
        // xhr.open('GET', proxyCORS + `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchTerms})`);
        xhr.open('GET', proxyCORS + `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerms}&format=json&utf8=`);
        xhr.send(null);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var responseObj = JSON.parse(xhr.response);
                console.log(responseObj.query.search);
            }
            else if (xhr.status === 404) {
                console.log('Error, page not found');
            }
            else {
                console.log('Error, status code: ' + xhr.status);
            }
        }
    }
  console.log(xhrRequest()); 
    // fetch(proxyCORS + `https://en.wikipedia.org/w/api.php?action=query&titles=${searchTerms}&prop=revisions&rvprop=content&format=json`).then(function(response){
    //   return response
    // }).then(function(response) {
    //   console.log(response)
    // })
  },

parseResults(responseObj) {}




}

let view = {
  // move as much html in here as makes sense
}

controller.init();