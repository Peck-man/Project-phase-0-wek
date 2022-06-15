'strict'
var query = 'moon';
var filter = '';
var apiKey = 'iBjvG47fq2tkhHmckMSJ8TKWHKG5OfBn';
var body = document.querySelector('body');

fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=${filter}&api-key=${apiKey}`)
    .then(res => console.log(res))

fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&fq=${filter}&api-key=${apiKey}`)
    .then(res => res.json())
    .then(content => {
        console.log(content);
        console.log(content.response.docs);
        var data = content.response.docs;

        for (var i = 0; i < data.length; i++) {
            var oneArticle = document.createElement('ul');
            var headline = document.createElement('h3');
            var snippet = document.createElement('li');
            var pubDate = document.createElement('li');
            var permaLink = document.createElement('a');

            headline.innerHTML = data[i].headline.main;
            snippet.innerHTML = data[i].snippet;
            pubDate.innerHTML = data[i].pub_date;
            permaLink.innerHTML = 'link';
            permaLink.setAttribute('href', data[i].web_url);

            body.appendChild(oneArticle);
            oneArticle.appendChild(headline);
            oneArticle.appendChild(snippet);
            oneArticle.appendChild(pubDate);
            oneArticle.appendChild(permaLink);
        }
    })