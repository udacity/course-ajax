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

        // Use Ajax to handle api request from NYtimes
        $.ajax({
            url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=W1fdekfDs1A43nsSvHyyZUK368U2TjKQ`,
        }).done(addArticles);

        function addArticles (articles) {
                console.log(articles);
                let htmlContenet ='';
                //convert rsposnse to java script
                //const data = JSON.parse(this.responseText);
                // check if there is a response article 
                if (articles.response && articles.response.docs && articles.response.docs.length > 1){
                 // place result articles in an unordered list 
                    htmlContenet ='<ul>' + articles.response.docs.map(article => `<li class="articles">
                    <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                    </li>`).join('' + '</ul');
                }else {
                    htmlContenet = '<div class="error-no-article">Nor Articles Available</div>';
                }

                responseContainer.insertAdjacentHTML('beforeend',htmlContenet);



            }

    });
})();
