
//mapbox layer - because it's pretty
var base1 = L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=', {
    attribution: 'MapBox',
    maxZoom: 18
});

var base2 = L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=', {
    attribution: 'MapBox',
    maxZoom: 18
});


/*stamen layers*/
var base3 =  new L.StamenTileLayer("terrain");

var base4 =  new L.StamenTileLayer("toner");

var base5 =  new L.StamenTileLayer("watercolor");

/* map groups*/
var baseMaps = {
    "mapbox terrain": base1,
    "stamen terrain": base3,
    "stamen toner": base4,
    "stamen watercolor": base5,
    
};

var overlayMaps = {

};

var map = L.map('map', {center: [40.54720023441049, 286.0153198242187], zoom: 4, layers: [base2]});


/*pointers*/
var gens = L.Icon.extend({
    options: {
        shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});


var gen1 = new gens({iconUrl: 'leaf-green.png'}),
    gen2 = new gens({iconUrl: 'leaf-red.png'}),
    gen3 = new gens({iconUrl: 'leaf-orange.png'});
    
L.icon = function (options) {
    return new L.Icon(options);
};

/*
L.marker([40, 280], {icon: gen1}).addTo(map).bindPopup("I am a green leaf.");
L.marker([40, 280], {icon: gen2}).addTo(map).bindPopup("I am a red leaf.");
L.marker([40, 280], {icon: gen3}).addTo(map).bindPopup("I am an orange leaf.");
*/


function onEachFeature(feature, layer) {
    var popupContent;


    if (feature.properties && feature.properties.popupContent) {
        popupContent = feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}



L.geoJson(generation3,  {

        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
             return L.marker(latlng, {
             icon: gen3
        });
    }
}).addTo(map);

L.geoJson(generation2,  {

        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
             return L.marker(latlng, {
             icon: gen2
        });
    }
}).addTo(map);

L.geoJson(generation1,  {

        style: function (feature) {
            return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
             return L.marker(latlng, {
             icon: gen1
        });
    }
}).addTo(map);

/*map*/


/*map controls*/
L.control.layers(baseMaps, overlayMaps).addTo(map);

var ll = L.popup();


function onMapClick(e) {
    ll
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

//map.setMaxBounds([[37.91145, -122.50099], [38.07623, -122.25655]]);


