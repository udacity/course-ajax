(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb7305d4bf8f681d13b56d4abc3'
            }
        })
        .then(response => {debugger; response.json()})
        .then(addImage)
        .catch(e => requestError(e, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e6a9801dab184d89a4d77b94ff44048c`)
        .then(response => response.json())
        // .then(addArticles)
        .then(response => Promise.reject(new Error('bad articles')))
        .catch(e => requestError(e, 'articles'));
    });

function addImage(data) {
    debugger;
    let htmlContent = '';
    const firstImage = data.results[0];

    if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    } else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

    function addArticles(data) {
        let htmlContent = '';
        const articles = data.response.docs;

        if (articles) {
            htmlContent = '<ul>' + articles.map(article => `<li>
                    <h2><a href="${article.web_url}">${article.headline.main}</a><h2>
                    <p>${article.snippet}</p>
                </li>`
            ).join('') + '</ul>';
        } else {
            htmlContent = 'Unfortunately, no articles matched your query.';
        }

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
})();
