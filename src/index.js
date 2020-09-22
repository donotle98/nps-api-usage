import $ from 'jquery';


let npsUrl = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=jDdojP6N8InGJAbE4Neo6q5fXijXBcJx8d5vTPqT';

function formTemplate(){
    const temp = `
        
    `;
}

function runApiGrabData(){
    fetch(npsUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            }
        )
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
          });
}

function main() {
  console.log('DOM is loaded');
  runApiGrabData();
}

$(main);