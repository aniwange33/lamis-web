var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#messages").html("");
}

function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.send("/app/start-capture", {});
        stompClient.subscribe('/topic/finger-touched', function (message) {
            showMessage(message.body);
        });
        stompClient.subscribe('/topic/finger-removed', function (message) {
            showMessage(message.body);
        });
        stompClient.subscribe('/topic/device-connected', function (message) {
            showMessage(message.body);
        });
        stompClient.subscribe('/topic/device-disconnected', function (message) {
            showMessage(message.body);
        });
        stompClient.subscribe('/topic/finger-quality', function (message) {
            showFingerQuality(message.body);
        });
        stompClient.subscribe('/topic/image-acquired', function (image) {
            showFingerPrint(image.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.send("/app/stop-capture", {});
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showMessage(message) {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
}

function showFingerQuality(message) {
    $("#quality").innerText = message;
}

function showFingerPrint(image) {
    $("#image").attr("src", image).show();
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#image").hide();
});

