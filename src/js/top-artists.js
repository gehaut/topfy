// // TOP ARTISTS // //

// GET TOKEN FROM COOKIE

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var token = getCookie("topfy_token")

// AJAX REQUEST //

let getTopArtist = (term, offset) => {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/top/artists?time_range=' + term + '&limit=50&offset=' + offset,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token)
        }, success: function(data){
            console.log(data)
            var max = 50
            if (offset > 2) {
                var second = true;
                y = 1
            } else {
                var second = false
                y = 0
            }
            for (var i = y; i < max; i++) {
                /* $("#img_artist_" + i).attr("src", data.items[i].images[0].url)
                $("#name_artist_" + i).html(data.items[i].name); */
                console.log(data.items[i].name)
                var section = document.createElement("section");
                    section.setAttribute("id", "old")
                var a = document.createElement("a")
                    a.setAttribute("href", data.items[i].external_urls.spotify)
                    a.setAttribute("class", "image");
                var img = document.createElement("img");
                if (!(data.items[i].images[0])) {
                    console.error("No image found at position " + i)
                } else {
                    img.setAttribute("src", data.items[i].images[0].url);
                }
                    img.setAttribute("data-position", "center center");
                    a.appendChild(img);
                var div = document.createElement("div")
                    div.setAttribute("class", "content");
                var div1 = document.createElement("div");
                    div1.setAttribute("class", "inner");
                var header = document.createElement("header");
                    header.setAttribute("class", "major");
                var h3 = document.createElement("h3");
                if (second === true) {
                    var position = i + 1 + 49
                } else {
                    var position = i + 1 }
                    h3.innerHTML = "#" + position + ": " + data.items[i].name;
                        header.appendChild(h3)
                var ul = document.createElement("ul");
                    ul.setAttribute("class", "actions");
                var li = document.createElement("li");
                var a1 = document.createElement("a");
                    a1.setAttribute("href", data.items[i].external_urls.spotify)
                    a1.setAttribute("target", "_blank");
                    a1.setAttribute("class", "button icon solid fa-external-link-alt")
                    a1.innerHTML = "View " /*" + data.items[i].name + " */ + "on Spotify";
                    li.appendChild(a1);
                    ul.appendChild(li);
                    div1.appendChild(header);
                    div1.appendChild(ul);
                    div.appendChild(div1);
                    section.appendChild(a);
                    section.appendChild(div);
                document.getElementById("two").appendChild(section);
                var lastcount = document.createElement("p");
                    lastcount.setAttribute("countx", position - 1);
                    lastcount.setAttribute("id", "last");
                    lastcount.setAttribute("hidden", "");
                    document.getElementById("last").remove()

                document.getElementById("two").appendChild(lastcount);
            }
        }
    })
}

// SHOW MORE
// x = ammount of items that will be add.
const x = 5

document.getElementById("btn_showmore").addEventListener("click", function(){
    var period = document.getElementById("timeperiod").value;
    var offset = document.getElementById("last").getAttribute("countx")
    if (offset > 90) {
        $("#apierrormsg").fadeIn();
    } else {
    getTopArtist(period, offset); }
})



// Change time period

let changeTimePeriod = () => {
    var period = document.getElementById("timeperiod").value;
    var offset = parseInt(document.getElementById("last").getAttribute("countx")) + 1
    for (var i = 0; i < offset; i++) {
        var el = document.getElementById("old")
        el.remove();
    }
    getTopArtist(period, 0);
}

