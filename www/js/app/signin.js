var SignIn = (function () {
    var checkForm  = function () {
        var validForm = true;
        validForm &= SignIn.idTextField.value.length > 3;
        validForm &= /[0-9]+/.test(SignIn.idTextField.value);
        validForm &= SignIn.passwordTextField.value.length > 3;
        return validForm;
    };

    var signIn = function (args) {
        Firebase.Database.ref('/user/' + args.id + '/').once('value').then( function (snapshot) {
            if (snapshot.val() !== null && snapshot.val().password === args.password) {
                if (snapshot.val().userType === 'father') {
                    localStorage.setItem('userType', 'father');
                    goto('/fatherdashboard/');
                } else if (snapshot.val().userType === 'teacher') {
                    localStorage.setItem('userType', 'teacher');
                    goto('/teacherdashboard/');
                }
                localStorage.setItem('logged', '');
            } else {
                app.toast.create({
                    text: 'Datos de acceso incorrectos. Verifique los datos de acceso e ingrese nuevamente.',
                    position: 'center',
                    closeTimeout: 2000
                }).open();
            }
        });
    }

    return {
        idTextField: document.querySelector('#idTextField'),
        passwordTextField: document.querySelector('#passwordTextField'),
        signInButton: document.querySelector('#signInButton'),

        setEventListeners: function () {
            this.signInButton.addEventListener('click', function () {
                if (checkForm()) {
                    signIn({
                        id: SignIn.idTextField.value,
                        password: passwordTextField.value,
                    });
                } else {
                    app.toast.create({
                        text: 'Ingrese todos los datos requeridos e intentelo nuevamente.',
                        position: 'center',
                        closeTimeout: 2000
                    }).open();
                }
            });
        },

        init: function () {
            this.setEventListeners();
        }
    };
})();

SignIn.init();