const goToPost = async (e) => {
    const postID = e.target.getAttribute('data-id');
    if (postID) {
        document.location.replace(`/project/${postID}`);
    } else {
        alert('No Post ID');
    }
}

const posts = document.getElementsByClassName('.post');

for (let i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', goToPost, false);
}