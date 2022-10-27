async function signupFormHandler(event) {
    event.preventDefault();
    
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert('One of the fields are empty.'); // Create better error message
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
