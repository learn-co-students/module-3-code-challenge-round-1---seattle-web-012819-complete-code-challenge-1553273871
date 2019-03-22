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
    let c = renderComment(comment.content, comUL);
    c.setAttribute('comment-id', comment.id)
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

function createElmt(elmt, parent, callback = () => {}) {
  let e = document.createElement(elmt);
  callback(e);
  parent.appendChild(e);
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
  let e = createElmt('li', parent, (li) => li.innerText = content);

  let delButton = createElmt('button', e,
    (button) => button.innerText = 'delete')

  delButton.addEventListener('click', () => {
    deleteComment(e);
  })

  return e;
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
    .then(json => parent.lastChild.setAttribute('comment-id', json.id))
}

function deleteComment(li) {
  let comment_id = li.attributes[0].value
  li.remove()

  fetch(commentsURL + `/${comment_id}`, {
    method: 'DELETE'
  })
}
