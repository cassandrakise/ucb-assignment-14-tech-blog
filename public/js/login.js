async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let userData = await response.json();
            console.log('userData', userData.userData);
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
