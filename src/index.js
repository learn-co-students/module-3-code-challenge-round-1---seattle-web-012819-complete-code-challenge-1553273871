document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 2278; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  let body = document.body;
  let img = document.getElementById("image");
  let h4 = document.getElementById("name");
  let likeSpan = document.getElementById("likes");
  let numLikes = 0;
  let likeBtn = document.getElementById("like_button");
  let comInput = document.getElementById("comment_input");
  let submitBtn = document.getElementById("com_submit");
  let ul = document.getElementById("comments");


  
  fetch(imageURL)
  .then(response => response.json())
  .then(json => {
    loadInfo(json)
  });

  function loadInfo(json) {
    img.setAttribute("src", json.url);
    h4.textContent = json.name;
    likeSpan.textContent = json.like_count;
    numLikes = json.like_count;

    for (const com of json.comments) {
      var li = document.createElement("li");
      li.textContent = com.content;
      ul.appendChild(li);
    }

    likeBtn.addEventListener("click", (ev) => {
      numLikes = addLike(numLikes, likeSpan);
      updateLikes();
    })

    submitBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      addComment(comInput.value);
      updateComment(comInput.value);
      comInput.value = "";
    })
  }

  function addLike(likes, span) {
    likes++;
    span.textContent = likes;
    return likes;
  }

  function updateLikes() {
    let data = {"image_id": imageId};

    fetch(likeURL, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  function addComment(content) {
    var li = document.createElement("li");
    li.textContent = content;
    ul.appendChild(li);
  }

  function updateComment(content) {
    let data = {
      "image_id": imageId,
      "content": content
    };

    fetch(commentsURL, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
  }











































})
