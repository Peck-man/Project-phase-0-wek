'use strict'

let APIKEY = "OR976G5mF5Lty8eR3MxH4ZD2DtS66kr0";
// you will need to get your own API KEY
// https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); //to stop the page reload
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=16&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then((content) => content.json())
      .then((content) => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        for (var i = 0; i < content.data.length; i++) {
          let fig = document.createElement("figure");
          let img = document.createElement("img");
          let fc = document.createElement("figcaption");
          img.src = content.data[i].images.downsized.url;
          img.alt = content.data[i].title;
          fc.textContent = content.data[i].title;
          fig.appendChild(img);
          fig.appendChild(fc);
          let out = document.querySelector(".out");
          out.insertAdjacentElement("afterbegin", fig);
        }
        document.querySelector("#search").value = "";
      })
      .catch((err) => {
        console.error(err);
      });
  });
}