$(document).on("ready", function() {
    $.ajax({
        type: "GET",
        url: "/ip",
        success: function(resp) {
            document.getElementById("myIp").innerText = resp;
        }
    });

    $.ajax({
        type: "GET",
        url: "/keywords",
        success: function(resp) {
            document.getElementById("myKeywords").innerText = resp;
        }
    });
});
