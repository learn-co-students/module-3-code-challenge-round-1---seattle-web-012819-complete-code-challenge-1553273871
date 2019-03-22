let imageId = 2296 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  getImage(imageURL)
})

function getImage(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => renderImg(json))
}

function renderImg(imgData) {
  grabElmt('image', (img) => img.src = imgData.url);
  grabElmt('name', (h4) => h4.innerText = imgData.name);
  let likes = grabElmt('likes', (span) => span.innerText = imgData.like_count);

  let likeBut = grabElmt('like_button', (button) => {
    button.addEventListener('click', () => {
      addLikes(imgData, likes);
    })
  })

  let comUL = grabElmt('comments')

  imgData.comments.forEach(function(comment) {
    renderComment(comment.content, comUL);
  })

  grabElmt('comment_form', (form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addComment(imgData, comUL);
    })
  });

}

function grabElmt(elmt, callback = () => {}) {
  let e = document.getElementById(elmt);
  callback(e);
  return e;
}

function addLikes(img, span) {
  img.like_count ++;
  span.innerText = img.like_count;

  let newBody = {
    'image_id': img.id,
    'like_count': img.like_count
  }

  fetch(likeURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBody)
  })
}

function renderComment(content, parent) {
  let li = document.createElement('li')
  li.innerText = content;
  parent.appendChild(li);
}

function addComment(img, parent) {
  renderComment(document.querySelector('#comment_input').value, parent)

  let newBody = {
    'image_id': img.id,
    'content': document.querySelector('#comment_input').value
  };

  fetch(commentsURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBody)
  })
    .then(res => res.json())
    .then()
}
