const postButton = document.querySelector('#postBtn');
const postTitle = document.querySelector('#post-title');
const postBody = document.querySelector('#post-body');
const form = document.querySelector('#post-form');

const updatePost = async (e) => {
    e.preventDefault();

    const title = postTitle.value;
    const body = postBody.value;
    const id = form.getAttribute('data-postId');
    
    if (postTitle.value && postBody.value) {
        fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title, 
                body
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Post successfully updated', data);
            location.replace(`/post/${id}`);
        })
        .catch(error => {
            console.error(`Error creating post: ${error}`);
        })
    } else {
        console.error('Could not create comment');
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', updatePost);