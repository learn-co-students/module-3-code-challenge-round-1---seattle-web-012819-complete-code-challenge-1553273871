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


function addLike(json){
// console.log(json)
imageLikes.textContent = json.like_count +=1
}

fetchMyImage();














})
