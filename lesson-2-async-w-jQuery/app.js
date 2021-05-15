/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // use Ajax instead of XHR to handle API request
        $.ajax({
            url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {Authorization: 'Client-ID nRQgo4D9Ip9s2k8YmeR39hV2B6-G9kzjyki9NQfvIrg'}
        }).done(addImage);

        // this function will add image fetched from Asynchronus Http Request to the page withot the need to reload the page 
        function addImage(images){
            // debugger;
            console.log(images);
            let htmlContenet ='';
            //no need to convert rsposnse to java script as ajaax do this 
            //const data = JSON.parse(this.responseText);
             //check if there is a response image or not

            if (images && images.results && images.results[0]){
                const firstImage = images.results[0];
                htmlContenet = `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            }else{
                htmlContenet = `<div class="error-no-image"> No images available</div>`;
            }
            //update page with returned imag from API Uspalsh
            responseContainer.insertAdjacentHTML('afterbegin', htmlContenet);
         }

    });
})();
