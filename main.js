document.addEventListener("DOMContentLoaded", function() {
    // Redirect to the English version after a short delay
    setTimeout(function() {
        window.location.href = "https://bmvipari.hu/en";
    }, 5000); // Redirects after 5 seconds

    // Function to switch to the Hungarian version
    document.getElementById("switch-to-hungarian").addEventListener("click", function() {
        window.location.href = "https://bmvipari.hu/hu";
    });
});