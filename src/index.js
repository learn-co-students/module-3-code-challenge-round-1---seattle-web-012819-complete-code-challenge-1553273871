document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
})

let imageId = 2287 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

fetchPictureData()

function fetchPictureData() {
  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    updateThePage(json)
  })
}

function updateThePage(json) {
  console.log('updating page')

  let div = document.getElementById('image_card')

  let img = document.getElementById('image')
  img.src = json.url

  let h4 = document.getElementById('name')
  h4.textContent = json.name

  let likes = document.getElementById('likes')
  likes.textContent = json.like_count

  let likeBtn = document.getElementById('like_button')
  likeBtn.addEventListener('click', () => {
    likePicture(json);
    postLike(json);
  }
  )

  let form = document.getElementById('comment_form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let input = document.getElementById('comment_input').value
    appendNewComment(input)

    postNewComment(json, input)

    input = document.getElementById("comment_form").reset()
  })

  showComments(json)
  // let ul = document.getElementById('comments')
  // let li = document.createElement('li')
  // li.textContent = json.comments[0].content
  //
  // ul.appendChild(li)
}

function showComments(json) {
  for (let comment of json.comments ) {
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.textContent = comment.content

    ul.appendChild(li)
  }
}

function likePicture(json) {
  likes.textContent = (json.like_count + 1)
}

function postLike(json) {
  console.log('post like')

  data = {'image_id': json.id, 'like_count': (json.like_count + 1)}
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function appendNewComment(input) {
  let ul = document.getElementById('comments')
  let newLi = document.createElement('li')
  newLi.textContent = input

  ul.appendChild(newLi)
}

//close, but can't post yet
//does it have something to do with the
//content being nested in a comments array?
function postNewComment(json, input) {
  data = {'image_id': json.id, 'content': input}
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
