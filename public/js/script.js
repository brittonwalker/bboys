$(document).ready(function() {
  console.log('working');
  // set map default view
  var myMap = L.map("map").setView([40.7305991, -73.9865812], 13);

  // set up map tiling
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'brittonwalker.okh8c6b8',
    accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
  }).addTo(myMap);

  $("#submit").click(function() {
    event.preventDefault();

    var keyword = $("input").val();
    console.log(keyword);
    var url = 'https://api.opencagedata.com/geocode/v1/json?q=' + keyword + '&key=9856c49448b1c927e9fd4080d7c55fad';

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json"
    }).done(function(res) {
      console.log(res.results);
      if (res.results && res.results.length > 0) {
        var display = '<option value="">Locations matching "' + keyword + '"...</option>';

        $.each(res.results, function(i, response) {
          console.log(response);
          display += ['<option value="">', response.components.city + ', ' + response.components.state, ', ', response.components.country + '</option>'].join('');
        })
        $('#location-select').show().html(display);
      }
      var response = res.results[0];
      var lat = response.geometry.lat;
      var lng = response.geometry.lng;
      L.marker([lat, lng]).addTo(myMap);
    }).then(function(data) {
      var obj = {
        name: data.results[0].formatted,
        address: data.results[0].formatted,
        lat: data.results[0].geometry.lat,
        long: data.results[0].geometry.lng
      };
      var url = 'https://localhost:3000/api/locations'
      $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: obj
      }).done(function(res) {
        console.log(res);
      })
    })
  });

  // place markers from database
  var getInfo = function() {
    var url = 'https://localhost:3000/api/locations'
    $.ajax({
      url: url,
      type: "GET",
      dataType: 'json'
    }).done(function(res) {
      for (var i = 0; i < res.length; i++) {
        var mark = L.marker([res[i].lat, res[i].long]).addTo(myMap);
        mark.bindPopup("<b>" + "<a href='/api/locations/" + res[i]._id + "' >" + res[i].name + "</a></b><br>");
      }
    })
  };

  $('#form').click(function(event) {
    console.log('clicked');
    var formData = {
      'name': $('input[name=name]').val(),
      'video_url': $('input[name=video_url]').val(),
      'description': $('input[name=description]').val()
    };

    $.ajax({
        type: 'POST',
        url: 'https://localhost:3000/api/locations/5696ce1876a82787d519c5c1/posts',
        data: formData,
        dataType: 'json',
        encode: true
      })
      .done(function(data) {
        console.log(data);
      });
    // event.preventDefault();
  });
  getInfo();

  $('#location-select').on('change', function() {
    console.log(this.text);
  })

  myMap.scrollWheelZoom.disable();
  myMap.touchZoom.disable();


});
