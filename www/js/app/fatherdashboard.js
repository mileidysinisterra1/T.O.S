var FatherDashboard = (function () {
    return {
        signOut: function () {
            localStorage.removeItem('logged');
            localStorage.removeItem('userType');
            goto('/home/');
        },

        initMap: function () {
            var map = document.querySelector('#currentPositionMap');
            map.height = map.width;
            mapContext = map.getContext('2d');
            mapContext.fillStyle = "#dddddd";
            mapContext.fillRect(0, 0, map.width, map.height);
            mapContext.fillStyle = "#000000";
            mapContext.font = '10px sans-serif';
            mapContext.fillText('heavylabs Maps', 10, 10);
            var locationMarker = document.createElement('img');
            locationMarker.src = 'img/location_pin.png';
            locationMarker.onload = function () {
                mapContext.drawImage(locationMarker, (map.width / 2) - 16, (map.height / 2) - 16);
            }            
        },

        init: function () {
            if (true === true) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    alert('Latitud: ' + position.coords.latitude + ' Longitud: ' + position.coords.longitude);
                }, function (error) {
                    alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
                });
            }
            this.initMap();
        }
    }
})();

FatherDashboard.init();