
function openTawkChat(n) {
    
    document.getElementById(`chatbot-container-coach_${n}`).style.display = "block";

    if (typeof Tawk_API === 'undefined') {
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        var script = document.createElement("script");
        script.async = true;
        script.src = 'https://embed.tawk.to/6758a23749e2fd8dfef5fa5d/1iep3jau7';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.getElementsByTagName('body')[0].appendChild(script);

        script.onload = function() {
           
            if (Tawk_API) {
                Tawk_API.onLoad = function () {
                    
                    Tawk_API.setOfflineMessage('Sorry, we are currently offline. Leave a message!');
                };
            }
        };
    }
}

