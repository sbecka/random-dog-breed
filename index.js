'use strict';

//we need to target input value,
//value must be equal to url's value of breed
//access dog api with fetch and get the message of json
//message has image url

function fetchDogBreed() {

    let dogBreed = $("#dog-breed").val();

    //clean up input value incase of any uppercase letters, spaces, and other characters in regular expression for split()
    //if user inputs a sub-breed it will most likely be infront of the main breed
    //the url for the Dog API has breed before the sub-breed, for example: .../retriever/golden/
    //when the input is split, it becomes an array that can be reversed and allow organized access to the array index values

    let cleanDogBreed = dogBreed.toLowerCase().split(/[ ,!.?";:-]+/).reverse();
    //console.log(cleanDogBreed); ["retriever", "golden"]
    //console.log(cleanDogBreed[0]); retriever
    //console.log(cleanDogBreed[1]); golden

    if (cleanDogBreed.length === 2) {

    //https://dog.ceo/api/breed/retriever/golden/images/random
    fetch(`https://dog.ceo/api/breed/${cleanDogBreed[0]}/${cleanDogBreed[1]}/images/random`)
        .then((response) => response.json())
        .then(responseJson => showDogImage(responseJson))
        .catch(error => alert(`Dog API Server is down.`));

    } else if (cleanDogBreed.length === 1) {
        //if user just inputs a main breed
        fetch(`https://dog.ceo/api/breed/${cleanDogBreed[0]}/images/random`)
        .then((response) => response.json())
        .then(responseJson => showDogImage(responseJson))
        .catch(error => alert(`Dog API Server is down.`));
    }

};

function showDogImage(responseJson) {
    //console.log(responseJson.message);
    //console.log(responseJson.status);

    //if breed is not available and status is an "error"
    if (responseJson.status === "error") {

        return alert ("Sorry, we do not have pictures for that breed.");

    } else {

        //if breed is available
        $(".results").show();
        $('.dog-image').replaceWith(
            `<img src="${responseJson.message}" class="dog-image">`
        );
    }
};

function displayDogBreed() {
    $("form").submit(event => {
        event.preventDefault();
        fetchDogBreed();
        $("#dog-breed").val(""); //clear input after submit
    });
     
};

$(displayDogBreed());