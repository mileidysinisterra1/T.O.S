var SignUp = (function () {

    var checkForm = function () {
        var validForm = true;
        validForm &= SignUp.fullnameTextField.value.length > 3;
        validForm &= SignUp.idTextField.value.length > 3;
        validForm &= /[0-9]+/.test(SignUp.idTextField.value);
        validForm &= cellphoneTextField.value.length > 3;
        validForm &= (SignUp.fatherRadioField.checked === true ? SignUp.addressTextField.value.length > 3 : SignUp.classTextField.value.length > 3);
        validForm &= SignUp.passwordTextField.value.length > 3;
        return validForm;
    };

    var registerUser = function (args) {
        Firebase.Database.ref('/user/' + args.id + '/').set(args);
        app.toast.create({
            text: 'Usuario creado exitosamente.',
            position: 'center',
            closeTimeout: 2000
        }).open();
        setTimeout(function () {
            if (args.userType === 'father') {
                localStorage.setItem('userType', 'father');
                goto('/fatherdashboard/');
            } else {
                localStorage.setItem('userType', 'teacher');
                goto('/teacherdashboard/');
            }
        })
    };

    var checkUserExistence =  function (userId) {
        Firebase.Database.ref('/user/' + userId + '/').once('value').then( function (snapshot) {
            if (snapshot.val() === null) {
                var userObject = {
                    id: SignUp.idTextField.value,
                    fullname: SignUp.fullnameTextField.value,
                    cellphone: SignUp.cellphoneTextField.value,
                    password: SignUp.passwordTextField.value
                };
                if (SignUp.fatherRadioField.checked === true) {
                    userObject.address = SignUp.addressTextField.value;
                    userObject.children = null;
                    userObject.userType = 'father';
                } else {
                    userObject.class = SignUp.classTextField.value;
                    userObject.userType = 'teacher';
                }

                registerUser(userObject);
            } else {
                app.toast.create({
                    text: 'Ya existe un usuario con el numero de cedula ingresado.',
                    position: 'center',
                    closeTimeout: 2000
                }).open();
            }
        });
    };

    return {
        addressField: document.querySelector('#addressField'),
        addressTextField: document.querySelector('#addressTextField'),
        cellphoneTextField: document.querySelector('#cellphoneTextField'),
        childrenField: document.querySelector('#childrenField'),
        childrenButton: document.querySelector('#childrenButton'),
        classField: document.querySelector('#classField'),
        classTextField: document.querySelector('#classTextField'),
        fatherRadioField: document.querySelector('#fatherRadioField'),
        fullnameTextField: document.querySelector('#fullnameTextField'),
        idTextField: document.querySelector('#idTextField'),
        passwordTextField: document.querySelector('#passwordTextField'),
        registerButton: document.querySelector('#registerButton'),

        checkRadios: function () {
            if (SignUp.fatherRadioField.checked === true) {
                SignUp.addressField.classList.remove('display-none');
                SignUp.childrenField.classList.remove('display-none');
                SignUp.classField.classList.add('display-none');
            } else {
                SignUp.addressField.classList.add('display-none');
                SignUp.classField.classList.remove('display-none');
                SignUp.childrenField.classList.add('display-none');
            }
        },

        

        setEventListeners: function () {
            this.fatherRadioField.addEventListener('check', function () {
                if (SignUp.fatherRadioField.checked === true) {
                    SignUp.addressField.classList.remove('display-none');
                }
            });

            this.registerButton.addEventListener('click', function () {
                if (checkForm()) {
                    checkUserExistence(SignUp.idTextField.value);
                } else {
                    app.toast.create({
                        text: 'Ingrese todos los datos requeridos e intentelo nuevamente.',
                        position: 'center',
                        closeTimeout: 2000
                    }).open();
                }
            });

            this.childrenButton.addEventListener('click', function () {
                goto('/children/');
            })
        },

        init: function () {
            SignUp.setEventListeners();            
        }
    };
})();

SignUp.init();