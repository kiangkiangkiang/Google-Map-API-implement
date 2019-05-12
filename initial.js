$(document).ready(function() {
    $("#price").click(function() {
        $("#price").fadeOut();
        initMap();
    });
    $("#price").mouseover(function() {
        $("#price_des").fadeIn();
        document.getElementById("price").style.cursor = "pointer";
    });
    $("#price").mouseout(function() {
        $("#price_des").fadeOut();
    });
    $("#work_place").mouseover(function() {
        $("#workplace_des").fadeIn();
        document.getElementById("work_place").style.cursor = "pointer";
    });
    $("#work_place").mouseout(function() {
        $("#workplace_des").fadeOut();
    });
    $("#traffic").mouseover(function() {
        $("#traffic_des").fadeIn();
        document.getElementById("traffic").style.cursor = "pointer";
    });
    $("#traffic").mouseout(function() {
        $("#traffic_des").fadeOut();
    });
});
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 25.08,
            lng: 121.512
        },
        zoom: 11.7,
        layer: "traffic"
    });
}