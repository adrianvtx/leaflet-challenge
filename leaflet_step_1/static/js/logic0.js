// Creating map object
var map = L.map("map", {
    center: [37.0902, 0.00],
    zoom: 2
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: "pk.eyJ1IjoiYW5kZXJzamgiLCJhIjoiY2sxODNlMDBzMDZ6cTNvcDFwZTh0eGJnNyJ9.UOYs4mSt5CSEuifzIxu1tA"
}).addTo(map);

var data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";
data.hasFeatures = function () {
    return !!(_data.map && _data.map.features && _data.map.features.length);
};


data.set = function (obj, src) {
    for (var k in obj) {
        _data[k] = (typeof obj[k] === 'object') ? clone(obj[k], false) : obj[k];
    }
    if (obj.dirty !== false) data.dirty = true;
    context.dispatch.change({
        obj: obj,
        source: src
    });
    return data;
};


data.clear = function () {
    data.set(_getData());
};


data.mergeFeatures = function (features, src) {
        function coerceNum(feature) {
            var props = feature.properties,
                keys = Object.keys(props),
                length = keys.length;


            for (var i = 0; i < length; i++) {
                var key = keys[i];
                var value = props[key];
                feature.properties[key] = losslessNumber(value);
            }


            return feature;
        }


        function losslessNumber(x) {
            var fl = parseFloat(x);
            if (fl.toString() === x) return fl;
            else return x;
        }


        _data.map.features = (_data.map.features || []).concat(features.map(coerceNum));
        return data.set({
            map: _data.map
        }, src);

        var myLayer = hasFeatures(data).addTo(map);
        myLayer.addData(data);

        // d3.json(link, function (data) {
        //             L.geoJson(data, {
        //                 //     //   style: function (features) {
        //                 //     //     return {
        //                 //     //       color: "white",
        //                 //     //       fillColor: chooseColor(features),
        //                 //     //       fillOpacity: 0.5,
        //                 //     //       weight: 1.5
        //                 //     //     };
        //                 //     //   },
        //                 onEachFeature: function (features, layer) {
        //                     layer.bindPopup("<h1>" + features.Feature.properties.mag + "</h1> <hr> <h3>Points: " + features.Feature.properties.location + "</h3>").addTo(myMap);
        //                 }

    // // Function that will determine the color based on the mag
    // function chooseColor(mag) {
    //     switch (mag) {
    //         case features.Feature.properties.mag > 5:
    //             return "yellow";
    //         case 3 > features.properties.mag > 4:
    //             return "red";
    //         case 2 > features.Feature.properties.mag > 3:
    //             return "orange";
    //         case 1 > features.Feature.properties.mag > 2:
    //             return "green";
    //         case .5 > features.Feature.properties.mag > 1:
    //             return "purple";
    //         default:
    //             return "black";
    //     }
    // }
});

        // chooseColor(link)