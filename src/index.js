import $ from 'jquery';

const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];







function runApiGrabData(stateSelect, num){
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${stateSelect}&limit=${num}&api_key=jDdojP6N8InGJAbE4Neo6q5fXijXBcJx8d5vTPqT`)
    .then(function(response){
        return response.json()
    })
    .then(function(responseJson){
        console.log(responseJson);
        displayResults(responseJson);
    })
}





function displayResults(responseJson){
    let total = responseJson.total;
    for(let i = 0; i < total; i++){
        $('main').append(`<div class="each-result" style="padding: 5px;"><h3 style="text-decoration:underline; margin-bottom: 10px; width: 90%;">${responseJson.data[i].fullName}, ${responseJson.data[i].states}</h3>
        <p style="margin-bottom: 7px">${responseJson.data[i].latLong}</p>
        <p style="margin-bottom: 7px; line-height: 1.3;">${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">TO THE WEBSITE!!!</a></p></div>
        <hr>
        `)
    }
}


function handleSubmit(){
    $('body').submit('.submit-options', function(e){
        e.preventDefault();
        console.log('SUBMIT BUTTON PRESSED');
        let numResults = $(e.currentTarget).find('input[name="numbers"]').val();
        if(numResults === ''){
            numResults = 10;
        }
        console.log(numResults);
        $('#option-select option:selected').each(function(){
            var $this = $(this);
            if ($this.length) {
            var selText = $this.text();
            console.log(selText);
            runApiGrabData(selText, numResults);
            }
        })
    })
}
function handleReset(){
    $('body').on('click', '.reset-button', function(){
        console.log('RESET BUTTON CLICKED');
        location.reload(true);
    })
}
function renderOptions(){
    for(let i = 0; i < states.length; i++){
        $('.select-options').append(`<option>${states[i]}</option>`)
    }
}

function main() {
    console.log('DOM is loaded');
    renderOptions();
    handleSubmit();
    handleReset();
}

$(main);