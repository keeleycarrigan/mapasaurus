(function (window, document, undefined) {
	var tLiz = window.tLiz || {};
	
	tLiz.components = tLiz.components || {};
	
	var extend = function() {
			var extended = {};

			for (var key in arguments) {
				var argument = arguments[key];
				for (var prop in argument) {
					if (Object.prototype.hasOwnProperty.call(argument, prop)) {
						extended[prop] = argument[prop];
					}
				}
			}

			return extended;
		},
		defaults = {
			zoom: 5,
			center: {
				lat: -34.397,
				lng: 150.644
			}
		},
		mapasaurus = function (el, options) {
			options = options || {};
			this.$el = document.querySelector(el);
			this.options = extend(defaults, options);
			
			// this.options.center = new google.maps.LatLng(this.options.center.lat, this.options.center.lng);
		};
		
		mapasaurus.prototype =  {
			getLocation: function (address) {
				var geocoder = new google.maps.Geocoder(),
					results = {
						lat: null,
						lng: null,
						address: null
					};
				
				geocoder.geocode({ 'address': address }, function (res, status) {
					console.log(res);
					if (status == google.maps.GeocoderStatus.OK) {
						results.lat = res[0].geometry.location.lat();
						results.lng = res[0].geometry.location.lng();
						results.address = res[0].formatted_address;
					} else {
						console.log('Geolocation Request Failed');
					}
					console.log(results);
					return results;
				});
			},
			getUserLocation: function (position) {
				console.log(position);
			},
			makeCenter: function (lat, lng) {
				return new google.maps.LatLng(lat, lng);
			},
			setCenter: function (newLat, newLng) {
				this.map.setCenter(this.makeCenter(newLat, newLng));
			},
			setLocationCenter: function (address) {
				if (!address) {
					navigator.geolocation.getCurrentPosition(this.getUserLocation);
				}
			},
			init: function () {
				this.map = new google.maps.Map(this.$el, this.options);
			}
		};
	
	tLiz.components.mapasaurus = mapasaurus;
	window.tLiz = tLiz;

})(window, document);
