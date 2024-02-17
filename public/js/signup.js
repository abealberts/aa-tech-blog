const signupHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(username);
    console.log(email);
    console.log(password);

    if (username && email && password) {
        fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.location.replace('/');
        })
        .catch(error => {
            console.error(`Error creating user: ${error}`);
        });
    } else {
        alert('Error creating user. Please make sure form is filled out correctly and try again.');
    }
};

document
    .querySelector('#signup')
    .addEventListener('submit', signupHandler);