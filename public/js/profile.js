const deleteBtn = document.getElementsByClassName('deleteBtn');
const editBtn = document.getElementsByClassName('editBtn');

const handleEdit = async (e) => {
    const id = e.target.getAttribute('data-postID');
    if (id) {
        document.location.replace(`/update/${id}`);
    } else {
        alert('Unable to redirect');
    }
};

const handleDelete = async (e) => {
    const id = e.target.getAttribute('data-postID');
    try {
        await fetch(`api/posts/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            location.reload();
        })
    } catch (error) {
        console.log(error);
    }
};

for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', handleDelete, false);
};
for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', handleEdit, false);
};