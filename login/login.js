// Funktion, um die Hintergrundfarbe aus der db.json zu laden
function loadBackgroundColor() {
    fetch('http://localhost:3000/backgrounds')
        .then(response => response.json())
        .then(data => {
            const color = data.backgroundColor;
            if (color) {
                document.body.style.backgroundColor = color;
                // document.getElementById('colorOne').style.backgroundColor = color;
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Hintergrundfarbe:', error);
        });
}
document.addEventListener('DOMContentLoaded', loadBackgroundColor,() => {
    const user = localStorage.getItem('user');

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
                    const {password, ...userWithoutPassword} = user;
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