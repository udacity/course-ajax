let responseData;

function handleResponse() {
    responseData = JSON.parse(this.responseText);

    addMemesToPage( responseData.data.memes );
}

function addMemesToPage( memes ) {
    const memesImageHtml = memes.map(meme => `<figure>
            <img src="${meme.url}" alt="${meme.name}">
            <figcaption>${meme.name}</figcaption>
        </figure>`);
    document.querySelector('#container').innerHTML = `<div>${memesImageHtml.join('</div><div>')}</div>`
}

var imgRequest = new XMLHttpRequest();
imgRequest.onload = handleResponse;
imgRequest.open('GET', 'https://api.imgflip.com/get_memes');
imgRequest.send();
