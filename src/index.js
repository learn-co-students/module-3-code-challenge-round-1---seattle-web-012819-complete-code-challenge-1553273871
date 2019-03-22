document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2277 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let img = document.getElementById("image")
  let name = document.getElementById("name")
  let likes = document.getElementById("likes")
  let likeButton = document.getElementById("like_button")
  let commentForm = document.getElementById("comment_form")
  let commentInput = document.getElementById("comment_input")
  let commentsUl = document.getElementById("comments")

  fetch(imageURL)
  .then(resp => resp.json())
  .then(json => {
    img.setAttribute("src", json.url)
    name.innerText = json.name
    likes.innerText = json.like_count
    for (i = 0; i < json.comments.length; i++){
      let li = document.createElement("li")
      li.innerText = json.comments[i].content
      li.setAttribute("comment_id", json.comments[i].id)
      addDeleteButton(li)
      commentsUl.appendChild(li)
    }
  })

  likeButton.addEventListener("click", () => {
    let like
    like = parseInt(likes.textContent)
    like += 1
    likes.innerText = like
    fetch(likeURL, {
      method: "POST",
      headers:{ "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({image_id: 2277})
    })
  })

  commentForm.addEventListener("submit", (ev) => {
    ev.preventDefault()
    let li = document.createElement("li")
    li.innerText = commentInput.value
    addDeleteButton(li)
    commentsUl.appendChild(li)
    fetch(commentsURL, {
      method: "POST",
      headers:{ "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({image_id: 2277, content: commentInput.value})
    })
    .then(resp => resp.json())
    .then(json => {
      li.setAttribute("comment_id", json.id)
    })
    commentInput.value = ""
  })

  function addDeleteButton(element){
    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    element.appendChild(deleteButton)
    deleteButton.addEventListener("click", () => {
      fetch(`https://randopic.herokuapp.com/comments/${element.getAttribute("comment_id")}`, {
        method: "DELETE"
      })
      element.remove()
    })
  }
})
