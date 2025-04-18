function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      document.getElementById('geoOutput').textContent =
        "Szélesség: " + position.coords.latitude +
        ", Hosszúság: " + position.coords.longitude;
    }, function (error) {
      document.getElementById('geoOutput').textContent = "Hiba: " + error.message;
    });
  } else {
    document.getElementById('geoOutput').textContent = "A böngésződ nem támogatja a Geolocation API-t.";
  }
}