var $$ = Dom7;
var Firebase = {};
var Application = {};

var app = new Framework7({
  root: '#app',
  reloadAll: true,
  name: 'Time Out School',
  id: 'co.com.heavylabs.timeoutschool',
  panel: {
    swipe: 'left',
  },
  routes: [
    {
      path: '/home/',
      url: 'app.html'
    },
    {
      path: '/signin/',
      url: 'signin.html'
    },
    {
      path: '/signup/',
      url: 'signup.html'
    },
    {
      path: '/fatherdashboard/',
      url: 'fatherdashboard.html'
    },
    {
      path: '/children/',
      url: 'children.html'
    }
  ],
});

$$(document).on('page:afterin', function (e) {
    var currentPage = document.querySelector('.page-current');
    if (currentPage.dataset.script) {
        var scriptElement = document.createElement("script");
        scriptElement.src = 'js/app/' + currentPage.dataset.script;
        document.body.appendChild(scriptElement);
    }
});

function initFirebase () {
  var config = {
    apiKey: "AIzaSyA4W0FMwjZIW2bGjx6ZRKmhANtb_Kihnsc",
    authDomain: "time-out-school.firebaseapp.com",
    databaseURL: "https://time-out-school.firebaseio.com",
    projectId: "time-out-school",
    storageBucket: "time-out-school.appspot.com",
    messagingSenderId: "125456034273"
  };
  firebase.initializeApp(config);
  Firebase.Database = firebase.database();
}

var mainView = app.views.create('.view-main');
var router = mainView.router;

function goto (location) {
  router.navigate(location);
}

initFirebase();

if (localStorage.getItem('logged') !== null) {
  if (localStorage.getItem('userType') === 'father') {
    goto('/fatherdashboard/');
  } else if (localStorage.getItem('userType') === 'teacher') {
    goto('/teacherdashboard/');
  }
}

document.addEventListener('deviceready', function () {
  Application.Status = 'READY';
});