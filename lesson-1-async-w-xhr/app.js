(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        
        //const searchedForText = searchField.value;
        //console.log(searchedForText);
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload= addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID nRQgo4D9Ip9s2k8YmeR39hV2B6-G9kzjyki9NQfvIrg')
        unsplashRequest.send()
        
        // this function will add image fetched from Asynchronus Http Request to the page withot the need to reload the page 
        function addImage(){
           // debugger;
           let htmlContenet ='';
           //convert rsposnse to java script
           const data = JSON.parse(this.responseText);
            //check if there is a response image or not
           if (data && data.results && data.results[0]){
               const firstImage = data.results[0];
               htmlContenet = `<figure>
               <img src="${firstImage.urls.regular}" alt="${searchedForText}">
               <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
               </figure>`;
           }else{
               htmlContenet = `<div class="error-no-image"> No images available</div>`;
           }
           //update page with returned imag from API Uspalsh
           responseContainer.insertAdjacentHTML('afterbegin', htmlContenet);
        }

        
        // then make another XHR request to get the articles from NYTimes newspaper related to search
            const articleRequest = new XMLHttpRequest();
            // when the request retrun it calls the addArticle function
            articleRequest.onload = addArticles;
            //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=us&api-key=W1fdekfDs1A43nsSvHyyZUK368U2TjKQ
            console.log(searchedForText);
            articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=W1fdekfDs1A43nsSvHyyZUK368U2TjKQ`);
            articleRequest.send();
// this function will add the article fitched from NewYourkTimes related to the search field 
            function addArticles () {
                let htmlContenet ='';
                //convert rsposnse to java script
                const data = JSON.parse(this.responseText);
                // check if there is a response article 
                if (data.response && data.response.docs && data.response.docs.length > 1){
                 // place result articles in an unordered list 
                    htmlContenet ='<ul>' + data.response.docs.map(article => `<li class="articles">
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
