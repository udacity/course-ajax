(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        //searchedForText = searchField.value;

        
        const searchedForText = 'hippos';
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload= addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID nRQgo4D9Ip9s2k8YmeR39hV2B6-G9kzjyki9NQfvIrg')
        unsplashRequest.send()

        function addImage(){
           // debugger;
        }

        function addArticles () {}
            const articleRequest = new XMLHttpRequest();
            articleRequest.onload = addArticles;
            articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=W1fdekfDs1A43nsSvHyyZUK368U2TjKQ`);
            articleRequest.send();


    });
})();
