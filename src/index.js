document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2282 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const myImage = document.getElementById('image')
  const imageName = document.getElementById('name')
  const imageLikes = document.getElementById('likes')
  const imageCommentsUl = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', addComment)


// ********* fetch inital image *************
function fetchMyImage(){
  fetch(`${imageURL}`)
  .then(resp => resp.json())
  .then(json => {
    likeButton.addEventListener('click', () => {
      addLike(json)
    })
    myImage.src = json.url
    imageName.textContent = json.name
    imageLikes.textContent = json.like_count
    json.comments.forEach((comment) => {
      updateWithNewComment(comment.content, comment.id)
    })
  })
}
// ******************************************

// ****** add a new like *************************
function addLike(json){
  imageLikes.textContent = json.like_count +=1
  fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          image_id: 2282
      })
  })
  .then(response => response.json())

}
//****************************************************

// ****** Add a new comment ***************************
function addComment(e){
  e.preventDefault()
  const commentText = document.getElementById('comment_input')
  const newComment = commentText.value
  const imageCommentsUl = document.getElementById('comments')
  // updateWithNewComment(newComment)
  commentForm.reset();
  updateCommentDb(newComment)

}

function updateWithNewComment(commentText, commentId){
  const li = document.createElement('li')
  li.textContent = commentText
  li.classList.add('list-group-item')
  li.id = commentId
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'delete'
  deleteBtn.classList.add("btn-danger")
  deleteBtn.addEventListener('click', () => {
    deleteItem(li)
  })
  li.appendChild(deleteBtn)
  imageCommentsUl.appendChild(li)
}
// ****************************************************


// ******** Delete a comment ************************
function deleteItem(li){
  imageCommentsUl.removeChild(li)
  fetch(`https://randopic.herokuapp.com/comments/${li.id}`, {
    method: "DELETE"
  })
}

function updateCommentDb(newComment){
  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 2282,
      content: newComment
    })
  })
  .then(resp => resp.json())
  .then( data => {
    updateWithNewComment(data.content, data.id)
  })
}

// *********************************************************

// ** Actually call the fetch to start the whole thing rolling **
fetchMyImage();
})
