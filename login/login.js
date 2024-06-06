document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');

    if (user) {
        window.location.href = '../index.html';
    } else {
        const signUpForm = document.getElementById('sign-in-form');

        signUpForm.addEventListener('submit', async () => {
            const email = document.getElementsByClassName('email-input')[0].value;
            const password = document.getElementsByClassName('password-input')[0].value;

            const response = await fetch('http://localhost:3000/users');

            if (response.ok) {
                const users = await response.json();
                const user = users.find((user) => user.email === email && user.password === password);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
                    window.location.href = '../index.html';
                } else {
                    alert('sign in failed');
                }
            } else {
                alert('failed getting users');
            }
        });
    }
});