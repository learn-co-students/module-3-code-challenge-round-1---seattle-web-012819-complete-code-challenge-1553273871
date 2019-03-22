'use strict'
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2288

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  fetchImage()
  function fetchImage() {
    fetch(imageURL)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        renderImage(json)
      })
  }

  function renderImage(image) {
    let name = document.getElementById('name')
    name.textContent = image.name

    let image_url = document.getElementById('image')
    image_url.src = image.url

    let span = document.getElementById('likes')
    span.innerHTML = image.like_count

    showComments(image)

    let lkbutton = document.getElementById('like_button')
    lkbutton.addEventListener('click', () => {
      span.innerHTML = image.like_count++
      fetch('https://randopic.herokuapp.com/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_id: 2288,
          likes: image.like_count,
        })
      })
    })
  }

  function showComments(image) {
    for (let comment of image.comments) {
      let ul = document.getElementById('comments')
      let li = document.createElement('li')
      li.textContent = comment.content
      ul.appendChild(li)
    }
  }

  let form = document.getElementById('comment_form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    addComment()
  })

  function addComment() {
    let ul = document.getElementById('comments')
    let input = document.getElementById('comment_input').value
    let newComment = document.createElement('li')
    newComment.textContent = input
    ul.appendChild(newComment)

    fetch('https://randopic.herokuapp.com/comments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_id: 2288,
        content: document.getElementById('comment_input').value,
      })
    })

  }


}) // Dom loader

