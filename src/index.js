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
      const li = document.createElement('li')
      li.textContent = comment.content
      imageCommentsUl.appendChild(li)
    })
  })
} // end of fetch image

//
function addLike(json){
// console.log(json)
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

}// end of add like function

commentForm.addEventListener('submit', addComment)

function addComment(e){
  e.preventDefault()
  const commentText = document.getElementById('comment_input')
  const newComment = commentText.value
  const imageCommentsUl = document.getElementById('comments')

  const li = document.createElement('li')
  li.textContent = newComment
  imageCommentsUl.appendChild(li)
  commentForm.reset();
  updateCommentDb(newComment)
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
  }).then(resp => resp.json())
}




fetchMyImage();
















})
