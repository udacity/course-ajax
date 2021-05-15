(function () {
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
        Authorization: 'Client-ID nRQgo4D9Ip9s2k8YmeR39hV2B6-G9kzjyki9NQfvIrg'
        }
    }).then(response=> response.json())
    .then(addImage)
    //Again, because a Fetch request returns a Promise .catch() is available to us from the Promise API.
    //So let's add a .catch() method to handle errors:
    .catch(e => requestError(e, 'image'));

    function addImage(data) {
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
    // this function treated the error if no image orr network erro
    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }
    
    });
})();
