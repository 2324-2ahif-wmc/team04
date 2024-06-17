const endpoint = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute using
        // getAttribute() method
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // Toggle the eye and bi-eye icon
        this.classList.toggle('bi-eye');
    });

    signUpForm.addEventListener('submit', async () => {
        const email = document.getElementsByClassName('email-input')[0].value;
        const username = document.getElementsByClassName('username-input')[0].value;
        const birthday = document.getElementsByClassName('birthday-input')[0].value;
        const password = document.getElementsByClassName('password-input')[0].value;

        const users = await getUsers();
        let response = undefined;
        if (users.some(user => user.email === email)) {
            alert('Email is already in use');
            return;
        }

        response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                birthday,
                password,
            }),
        });

        if (response.ok) {
            window.location.href = './login.html';
        } else {
            alert('sign up failed');
        }


    });

    async function getUsers() {
        const response = await fetch(endpoint);
        return await response.json();
    }
});