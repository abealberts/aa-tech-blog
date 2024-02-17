const postButton = document.querySelector('#postBtn');
const postTitle = document.querySelector('#post-title');
const postBody = document.querySelector('#post-body');

const createPost = async (e) => {
    e.preventDefault();

    const title = postTitle.value;
    const body = postBody.value;
    
    if (postTitle.value && postBody.value) {
        fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({
                title, 
                body
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Post successfully created', data);
            location.replace(`/post/${data.id}`);
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
    .addEventListener('submit', createPost);