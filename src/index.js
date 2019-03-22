document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  main();
  form();
})
let imageId = 2281 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

const likeURL = `https://randopic.herokuapp.com/likes/`;

const commentsURL = `https://randopic.herokuapp.com/comments/`;
const commentForm = document.getElementById('comment_form');
const imageCard = document.getElementById('image_card');
const commentUl = document.getElementById('comments')
const commentLi = document.createElement('li');

function main(){
  const mainDiv = document.querySelector('.container');

  fetch(imageURL)
  .then(resp => resp.json())
  .then(image =>{
    displayImage(image);
    console.log(image.comments[0].content);
  })
}
//to display image and contents to the index page.
function displayImage(image){
  const commentImage = document.getElementById('image');
  const h4Name = document.getElementById('name');
  const spanLike = document.getElementById('likes');
  const buttonLike = document.getElementById('like_button');

  commentImage.src = image.url;
  h4Name.textContent = image.name;
  spanLike.textContent = image.like_count;
  buttonLike.textContent = "Like";
  commentLi.textContent = image.comments[0].content;
  commentUl.appendChild(commentLi);
  imageCard.appendChild(commentImage);
  imageCard.appendChild(h4Name);
  imageCard.appendChild(spanLike);
  imageCard.appendChild(buttonLike);
  imageCard.appendChild(commentForm);
  imageCard.appendChild(commentUl);

  buttonLike.addEventListener('click', ()=>{
    console.log("click");
    image.like_count ++;
    fetch('https://randopic.herokuapp.com/likes',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:
        JSON.stringify({
          like_count: image.like_count,
          image_id: imageId
        })

    })
    spanLike.textContent = image.like_count;
    //console.log(image.like_count)
//URL is not working on patch + `/${image.id}`
  })


}

function form (){
  const formInput = document.getElementById('comment_input');
  const newLi = document.createElement('li');
  commentForm.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const newli = document.createElement('li');
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({

          content: formInput.value,
          image_id: imageId
      })
    })
    .then(resp => resp.json())
    .then(json =>{
      console.log("Form POST",json);
      newLi.textContent = json.content;
      commentUl.appendChild(newLi);
    })
  })
}
