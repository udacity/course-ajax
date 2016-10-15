(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb7305d4bf8f681d13b56d4abc3'
            }
        }).done(addImage);

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e6a9801dab184d89a4d77b94ff44048c`
        }).done(addArticles);
    });

    function addImage(images) {
        const firstImage = images.results[0];

        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        );
    }

    function addArticles(data) {
        const articlesInHTML = data.response.docs.map(article => `<li>
                <h2><a href="${article.web_url}">${article.headline.main}</a><h2>
                <p>${article.snippet}</p>
            </li>`
        ).join('');

        responseContainer.insertAdjacentHTML('beforeend', `<ul>${articlesInHTML}</ul>`);
    }
})();
