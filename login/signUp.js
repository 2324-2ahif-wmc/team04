document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');

    signUpForm.addEventListener('submit', async () => {
        const email = document.getElementsByClassName('email-input')[0].value;
        const username = document.getElementsByClassName('username-input')[0].value;
        const birthday = document.getElementsByClassName('birthday-input')[0].value;
        const password = document.getElementsByClassName('password-input')[0].value;

        const response = await fetch('http://localhost:3000/users', {
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
});