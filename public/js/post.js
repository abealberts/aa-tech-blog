const goToPost = async (e) => {
    const postID = e.target.getAttribute('data-id');
    console.log(`Clicked! PostID: ${postID}`);
    if (postID) {
        document.location.replace(`/post/${postID}`);
    }
}

const posts = document.getElementsByClassName('post');

for (let i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', goToPost, false);
}