const postFooter = document.querySelector('#post-footer');
const commentForm = document.querySelector('#comment-form');
const commentBtn = document.querySelector('#commentBtn');
const commentBody = document.querySelector('#comment-body');
const replyBtn = document.querySelector('#replyBtn');
const cancelBtn = document.querySelector('#cancelBtn');

const toggleForm = async () => {
    if (commentForm.style.display === 'none') {
        commentForm.style.display = 'block';
        replyBtn.style.display = 'none';
    } else {
        commentBody.value = '';
        commentForm.style.display = 'none';
        replyBtn.style.display = 'flex'
    }
};

const createComment = async () => {
    const post = document.querySelector('#post-id');
    const id = post.getAttribute('data-id');

    console.log(commentBody.value);
    console.log(id);

    if (commentBody && id) {
        fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                body: commentBody.value,
                post_id: id
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Comment successfully posted', data);
            location.reload();
        })
        .catch(error => {
            console.error(`Error creating comment: ${error}`);
        })
    } else {
        console.error('Could not create comment');
    }
};

commentBtn.addEventListener('click', () => {
    createComment();
});

replyBtn.addEventListener('click', () => {
    toggleForm();
});

cancelBtn.addEventListener('click', () => {
    toggleForm();
});

commentForm.style.display = 'none';