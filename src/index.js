document.addEventListener('DOMContentLoaded', () => {
	console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

	let imageId = 2286;

	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

	const likeURL = `https://randopic.herokuapp.com/likes/`;

	const commentsURL = `https://randopic.herokuapp.com/comments/`;

	let ul = document.getElementById('comments');

	fetchPic();
	function fetchPic() {
		fetch(imageURL)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				renderPic(json);
			});
	}

	function renderPic(pic) {
		let img = document.getElementById('image');
		img.src = pic.url;

		let h4 = document.getElementById('name');
		h4.textContent = pic.name;

		let span = document.getElementById('likes');
		span.textContent = pic.like_count;

		let button = document.getElementById('like_button');

		button.addEventListener('click', () => {
			clickLike(pic, span);
		});

		console.log(pic.comments[0].content);
	}

	function clickLike(pic, span) {
		span.textContent = pic.like_count++;
		fetch(likeURL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image_id: imageId
			})
		});
	}
	const commentSubmitButton = document.getElementById('comment-submit-button');
	const commentForm = document.getElementById('comment_form');

	commentSubmitButton.addEventListener('click', (ev) => {
		ev.preventDefault;
		addComment();
	});

	function addComment() {
		let commentInput = document.getElementById('comment_input').value;

		let li = document.createElement('li');
		li.textContent = commentInput;
		console.log(commentInput);

		ul.appendChild(li);

		fetch(commentsURL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image_id: imageId,
				content: commentInput
			})
		});
	}
});
