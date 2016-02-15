"use strict";

(function() {
  angular
    .module("myApp")
    .directive("leaflet", function() {

      // set map default view
      var myMap = L.map("map").setView([40.7305991, -73.9865812], 13);

      // set up map tiling
      L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'brittonwalker.okh8c6b8',
        accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
      }).addTo(myMap);

      $("#submit").click(function() {
        event.preventDefault();

        var keyword = $("input").val();
        var url = 'http://api.opencagedata.com/geocode/v1/json?q=' + keyword + '&key=9856c49448b1c927e9fd4080d7c55fad';

        $.ajax({
          url: url,
          type: "GET",
          dataType: "json"
        }).done(function(res) {
          if (res.results && res.results.length > 0) {
            var display = '<option value="">Locations matching "' + keyword + '"...</option>';

            $.each(res.results, function(i, res) {
              display += ['<option data-lat="' + res.geometry.lat + '" data-lng="' + res.geometry.lng + '">', res.formatted + '</option>'].join('');
            })
            $('#location-select').show().html(display);
          }
        })
      });

      // place markers from database
      var getInfo = function() {
        var url = 'http://localhost:3000/api/locations'
        $.ajax({
          url: url,
          type: "GET",
          dataType: 'json'
        }).done(function(res) {
          for (var i = 0; i < res.length; i++) {
            var mark = L.marker([res[i].lat, res[i].long]).addTo(myMap);
            mark.bindPopup("<b><a href='/#/" + res[i]._id + "'>" + res[i].name + "</a></b><br>");
          }
        })
      };

      getInfo();

      $('#location-select').on('change', function() {
        var lat = $(this).find(":selected").data("lat");
        var lng = $(this).find(":selected").data("lng")
        var mark = L.marker([lat, lng]).addTo(myMap.setView([lat, lng], 13));
        mark.bindPopup('<input id="name" name="name" type="text" placeholder="name place"><button id="saveLocation">Save</button>').openPopup();
        createInput(mark);
      })

      function createInput(mark) {
        $('#saveLocation').on('click', function() {
          event.preventDefault();
          var url = 'http://localhost:3000/api/locations';
          var formData = {
            'name': $('input[name=name]').val(),
            'lat': $('#location-select').find(":selected").data("lat"),
            'long': $('#location-select').find(":selected").data("lng"),
            'address': $('#location-select').find(":selected").val()
          };
          console.log(formData);
          $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: formData
          }).done(function(res) {
            console.log(res);
            myMap.removeLayer(mark);
          })
          getInfo();
        });

      }

      myMap.scrollWheelZoom.disable();
      myMap.touchZoom.disable();

    })
}());
