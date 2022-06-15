/* 
MY OLDER QUESTIONS
1. Import function error (tried .json "type": "module" got new error) (.js -> .mjs / module bundler)
2. fetch on endpoint which has more methods (want to console.log POST not GET)
3. How to redirect to a page with response? And how to automatically render a page with response?
4. Can I send response body in DELETE? Yes but not with status 204
*/

'use strict';

//DOM manpulation and FETCH

let submitForm = document.querySelector('form');

submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let urlInput = document.querySelector('#url');
    let url = document.querySelector('#url').value;
    let aliasInput = document.querySelector('#alias');
    let alias = document.querySelector('#alias').value;
    console.log(url);
    console.log(alias);
    let comment = document.querySelector('#comment');

   let data = {
        'url': url,
        'alias': alias
    }

    fetch('/api/links', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { if (data.alias == undefined) {
        console.log(data);
        comment.innerHTML = `Your alias is already used!`;
        comment.style.color = 'red';
        } else {
        console.log(data);
        comment.innerHTML = `Your URL is aliased to <span style="font-weight:bold">${data.alias}</span> and your secret code is <span style="font-weight:bold">${data.secretCode}</span>`;
        comment.style.color = 'black';
        urlInput.value = '';
        aliasInput.value = '';
        }
    });
});
