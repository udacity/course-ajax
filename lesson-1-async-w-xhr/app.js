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

        function addImage(){
           // debugger;
           let htmlContenet ='';
           //convert rsposnse to java script
           const data = JSON.parse(this.responseText);

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

        function addArticles () {}
            const articleRequest = new XMLHttpRequest();
            articleRequest.onload = addArticles;
            articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=W1fdekfDs1A43nsSvHyyZUK368U2TjKQ`);
            articleRequest.send();


    });
})();
