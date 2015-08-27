//Generico
//google maps functions
var idName, lugar, imgloc;
var directionDisplay;
var directionsService;

//when document is ready
$(document).ready(function () {
	/*$("#readTweets").click(function () {
        getTweets();
    });*/
	$("#seePhotos").click(function () {
        getPhotos();
    });
	$("#seeVideos").click(function () {
        getVideos();
    });
    $("#readFeed").click(function () {
        getFeed();
    });
    $("#amembers").click(function () {
        loadMap('BasiC', 'Spain, Spain');
    });
    $("#Genesys").click(function () {
        loadMap('Genesys', 'Sevilla, Spain')
    });
    $("#rt_NK").click(function () {
        loadMap('rt_NK', 'Almeria, Spain')
    });
    $("#Jstyl_8").click(function () {
        loadMap('Jstyl_8', 'Almeria, Spain')
    });
    $("#Blade").click(function () {
        loadMap('Blade', 'Almeria, Spain')
    });
    $("#Funch").click(function () {
        loadMap('Funch', 'Almeria, Spain')
    });
    $("#Zoack").click(function () {
        loadMap('Zoack', 'Madrid, Spain')
    });
    $("#Quinto").click(function () {
        loadMap('Quinto', 'Murcia, Spain')
    });
    $("#Noa").click(function () {
        loadMap('Noa', 'Almeria, Spain')
    });
    $("#Harri").click(function () {
        loadMap('Harri', 'Almeria, Spain')
    });
    $("#Rogon").click(function () {
        loadMap('Rogon', 'Almeria, Spain')
    });
    $("#Hunter").click(function () {
        loadMap('Hunter', 'Almeria, Spain')
    });
    $("#Wallas").click(function () {
        loadMap('Wallas', 'Almeria, Spain')
    });
    $("#Xtra").click(function () {
        loadMap('Xtra', 'Madrid, Spain')
    });
    $("#Sino").click(function () {
        loadMap('Sino', 'Madrid, Spain')
    });
    $("#Showman").click(function () {
        loadMap('Showman', 'Galicia, Spain')
    });
    $("#Bainc").click(function () {
        loadMap('Bainc', 'Barcelona, Spain')
    });
});

function initialize() {
    //create the geocoder and the directions
    var geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    //options for the map
    var mapOptions = {
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    //create the map
    var map = new google.maps.Map(document.getElementById('location'),
    mapOptions);
    //establish the adress
    geocoder.geocode({
        'address': lugar
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            //establish the marker
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            //establish the infowindow
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<p><strong>' + idName + '</strong> lives in <strong>' + lugar + '</strong></p><p><img class="miniGoogle" src="' + imgloc + '" alt="' + imgloc + '" /></p>');
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    //fix where the direction will be showed
    directionsDisplay.setMap(map);
    //check if it uses the route
    var start = document.getElementById('texthome').value;
    if (start != '' && start != null && start != lugar) calcRoute(start);
}

function calcRoute(start) {
    var request = {
        origin: start,
        destination: lugar,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function fixPlace(place) {
    lugar = place;
    imgloc = './images/' + place.substr(0, place.indexOf(',')) + '.jpg';
}

function loadMap(id, place) {
    idName = id;
    fixPlace(place);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyASL3PUQ3vE8YpSW0CGP7nSr1Keyp6xkyA&sensor=false&callback=initialize';
    document.body.appendChild(script);
    //go to the location

    /*disabled in mobile
		//if(idName!='BasiC'){
			//jquery animation
			//$(document.body).animate({'scrollTop':   $('#h2location').offset().top}, 500);
			//simple way location.hash = '#h2location';
			//jquery way $(document.body).scrollTop($('#h2location').offset().top);
		}*/
}

//stripe
$(document).ready(function () {
    $(".tmembers tr").mouseover(function () {
        $(this).addClass("over");
    }).mouseout(function () {
        $(this).removeClass("over");
    });
    $(".tmembers tr:even").addClass("alt");
});

//ranks json ajax
$(document).ready(function () {
    $("#founder").click(function () {
        loadRank('founder');
    });
    $("#admin").click(function () {
        loadRank('admin');
    });
    $("#member").click(function () {
        loadRank('member');
    });
    $("#test").click(function () {
        loadRank('test');
    });
    $("#god").click(function () {
        loadRank('god');
    });
});
//ajax
function loadRank(rank) {
    $.getJSON('./resources/' + rank + '.json', function (data) {
        $.each(data, function (entryIndex, entry) {
            if (entry[rank]) {
                $.each(entry[rank], function (lineIndex, line) {
                    var border = $('#' + line).css("borderTopStyle");
                    if (border == "none") {
                        //$("#"+line).css("border","2px solid green");
                        $('#' + line).addClass('resaltar');
                    } else {
                        //$("#"+line).css("border","");
                        $('#' + line).removeClass();
                    }
                });
            }
        });
    });
}

var slider;
//swipe
$(document).ready(function () {
    slider = new Swipe(document.getElementById('slider'));
    $("#leftslide").click(function () {
        slider.prev();
        return false;
    });
    $("#rigthslide").click(function () {
        slider.next();
        return false;
    });
});
//autocomplete
$(document).ready(function (e) {
    var availableTags = [
        "Almeria, Spain",
        "Madrid, Spain",
        "Murcia, Spain",
        "Seville, Spain",
        "Valencia, Spain",
        "Galicia, Spain",
        "Barcelona, Spain",
        "Malaga, Spain",
        "London, England",
        "Paris, France",
        "Roma, Italy",
        "Dublin, Ireland",
        "Berlin, Germany",
        "Moscow, Russia",
        "Valladolid, Spain",
        "Cordoba, Spain",
        "Santander, Spain",
        "La Mojonera, Spain",
        "Bilbao, Spain"];

    $("#texthome").autocomplete({
        target: $('#suggestions'),
        source: availableTags,
        callback: function (e) {
            var $a = $(e.currentTarget);
            $('#texthome').val($a.text());
            $("#texthome").autocomplete('clear');
        },
        minLength: 1
    });
});

//change theme
$(document).ready(function () {
    $("#themeA").click(function () {
        $('body').removeClass();
        $('body').addClass('normal');
    });
    $("#themeB").click(function () {
        $('body').removeClass();
        $('body').addClass('large');
    });
    $("#themeC").click(function () {
        $('body').removeClass();
        $('body').addClass('small');
    });
});


//imageSelecctor
$(document).ready(function () {
    $("#dpartners div a img").click(function () {
        $("#selectedimage").attr("src", this.src);
        $("#selectedimage").attr("alt", this.alt);
        $("#selectedimage").attr("title", this.title);
		$("#selectedurl").attr("href", this.title);
    });
});
/* videos */
function getVideos() {
    getOnlineVideos('jl8');
};

var getOnlineVideos = function (user) {
    $('#videosTitle').text('Videos of ' + user);
    var script = document.createElement('script');
    script.setAttribute('src', 'https://gdata.youtube.com/feeds/api/users/' + user + '/uploads?alt=json-in-script&callback=listVideos&max-results=10')
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
};

function listVideos(data) {
    console.log(data);

    var output = '';
    for (var i = 0; i < data.feed.entry.length; i++) {

        var title = data.feed.entry[i].title.$t;
        var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
        var description = data.feed.entry[i].media$group.media$description.$t;
        var id = data.feed.entry[i].id.$t.substring(42);

        var blocktype = ((i % 2) === 1) ? 'b' : 'a';

        output += '<div class="ui-block-' + blocktype + '">';

        output += '<a href="#videoplayer" data-transition="fade" onclick="playVideo(\'' + id + '\',\'' + title + '\',\'' + escape(description) + '\')">';
        output += '<h3>' + title + '</h3>';
        output += '<img src="' + thumbnail + '" alt="' + title + '" />';
        output += "</a>";
        output += "</div>";
    }

    $('#videolist').html(output);
}

function playVideo(id, title, description) {
    var output = '<iframe height="200" src="http://www.youtube.com/embed/' + id + '?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>';
    output += '<h3>' + title + '</h3>';
    output += '<p>' + unescape(description) + '</p>';
    $('#myplayer').html(output);
}

/* feed */
var maxLength = 10;
$(document).ready(function () {
    var outAL = '';
    for (var i = 1; i <= maxLength; i++) {
        outAL += '<li id="list' + i + '"><a href="#article' + i + '" id="link' + i + '">&nbsp;</a></li>';
    }
    $('#articleList').html(outAL);

    var outPA = '';
    for (i = 1; i <= maxLength; i++) {

        outPA += '<div data-role="page" id="article' + i + '">' +
            '  <div data-role="header" data-position="inline">' +
            '    <a href="#feed" data-role="button" data-icon="home" data-back="true">Feed</a>' +
            '    <h1 id="articleHeader' + i + '">&nbsp;</h1>' +
            '    <a href="#" id="openButton' + i + '" data-role="button" data-icon="plus"' +
            '      class="ui-btn-right" rel="external">Open</a>' +
            '  </div>' +
            '  <div data-role="content">' +
            '    <div id="articleContent' + i + '" class="articleContent"></div>' +
            '    <div data-role="controlgroup" data-type="horizontal">' +
            '      <a href="#article' + String(i - 1) + '" data-role="button" data-icon="arrow-l"' +
            '        data-inline="true" class="prevButton">Prev</a>' +
            '      <a href="#article' + String(i + 1) + '" data-role="button" data-icon="arrow-r"' +
            '        data-inline="true" class="nextButton" data-iconpos="right">Next</a>' +
            '    </div>' +
            '  </div>' +
            '</div>'
    }
    $('#feed').after(outPA);
});

/* JSONP */
function getFeed() {
    getOnlineFeed('http://jstyl8.blogspot.com/feeds/posts/default');
};
/* functions */
var listEntries = function (json) {
    if (!json.responseData.feed.entries) return false;
    $('#widgetTitle').text(json.responseData.feed.title);
    var articleLength = json.responseData.feed.entries.length;
    articleLength = (articleLength > maxLength) ? maxLength : articleLength;
    for (var i = 1; i <= articleLength; i++) {
        var entry = json.responseData.feed.entries[i - 1];
        $('#link' + i).text(entry.title);
        $('#articleHeader' + i).text(entry.title);
        $('#openButton' + i).attr('href', entry.link);
        $('#articleContent' + i).append(entry.content);
    }
    $('#article1 .prevButton').remove();
    $('#article' + articleLength + ' .nextButton').remove();
    if (articleLength < maxLength) {
        for (i = articleLength + 1; i <= maxLength; i++) {
            $('#list' + i).remove();
            $('#article' + i).remove();
        }
    }
};
var getOnlineFeed = function (url) {
    var script = document.createElement('script');
    //callback->format of out
    //hl->languaje
    //output->type of ouput
    //q=url to get feed
    //v->version, num->max entries to get
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=listEntries&hl=es&output=json-in-script&q=' + encodeURIComponent(url) + '&v=1.0&num=' + maxLength);
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
};

/*Flickr*/
function getPhotos() {
    getOnlinePhotos('guildwars');
};

var getOnlinePhotos = function (user) {
	$('#photosTitle').text('Photos of '+ user);
    var script = document.createElement('script');
    script.setAttribute('src', 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags='+user)
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
};
function jsonFlickrFeed(data) {
	console.log(data);
	var output='';
	
	for (var i = 0; i < data.items.length; i++) {
		var title = data.items[i].title;
		var link = data.items[i].media.m.substring(0, 56);
		var blocktype =
			((i%3)===2) ? 'c':
			((i%3)===1) ? 'b':
			'a';
		output += '<div class="ui-block-' + blocktype + '">';
		// link to showphoto, onclick call showphoto and pass link and title
		output += '<a href="#showphoto" data-transition="fade"onclick="showPhoto(\'' + link +'\',\'' + title + '\')">';
		output += '<img src="' + link + '_q.jpg" alt="' + title + '" />';
		output += '</a>';
		output += '</div>';
	} // go through each photo
	$('#photolist').html(output);
} //jsonFlickrFeed

function showPhoto(link, title) {
	var output='<a href="#photos" data-transition="fade">';
	output += '<img src="' + link + '_b.jpg" alt="' + title +'" />';
	output += '</a>';
	$('#myphoto').html(output);
}

//twitter
/*
function getTweets() {
    getOnlineTweets('jstyl_8');
};

var getOnlineTweets = function (user) {
	$('#tweetsTitle').text('Tweets of '+ user);
    var script = document.createElement('script');
    script.setAttribute('src', 'http://twitter.com/status/user_timeline/'+user+'.json?count=30&callback=listTweets')
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script);
};
function listTweets(data) {
	console.log(data);
	var output = '<ul data-role="listview" data-theme="a">';
	// use jQuery each function because don't need to use a grid
	$.each(data, function(key, val) {
		var text = data[key].text;
		var thumbnail = data[key].user.profile_image_url;
		var name = data[key].user.name;
		
		output += '<li>';
		output += '<img src="' + thumbnail +'" alt="Photo of ' + name + '">';
		output += '<div>' + text + '</div>';
		output += '</li>';		
	}); //go through each tweet
	output += '</ul>';
	$('#tweetlist').html(output);
}*/