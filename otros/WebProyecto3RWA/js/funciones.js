//Generico
function o(id) {
   return document.getElementById(id);
}
var capasHome=['home','miembros','juegos','contacto','aboutus'];

//opcionVisibilidad
function oculta (IDcapa) {
   o(IDcapa).style.visibility="hidden";
}
function muestra (IDcapa) {
   o(IDcapa).style.visibility="visible";
}
//opcionDisplay
function displayOFF (IDcapa) {
   o(IDcapa).style.display="none";
}
function displayON (IDcapa) {
   o(IDcapa).style.display="block";
}
//activacionCapas
function activarCapa(idActual,capas)
{
	elem = idActual.split('-');					
	texto = elem[1];	
   	for (i=0;i<capas.length;i++)
    {
		if(texto==capas[i])
			displayON("capa-"+capas[i]);			
		else               
			displayOFF("capa-"+capas[i]);
	}
}

//google maps functions
var idName,lugar,imgloc;
var directionDisplay;
var directionsService;

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
		geocoder.geocode( { 'address': lugar}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            //establish the marker
			var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
			 //establish the infowindow
			var infowindow = new google.maps.InfoWindow();
       	 	infowindow.setContent('<p><strong>'+idName+'</strong> lives in <strong>'+lugar+'</strong></p><p><img class="mini" src="'+imgloc +'" alt="' +imgloc +'" /></p>');
        	google.maps.event.addListener(marker, 'click', function() {
            	infowindow.open(map, marker);
			});
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        }); 
		//fix where the direction will be showed
		directionsDisplay.setMap(map);
		//check if it uses the route
		var start = document.getElementById('home').value;
		if(start!=''&&start!=null&&start!=lugar) calcRoute(start);
}

function calcRoute(start) {
        var request = {
            origin:start,
            destination:lugar,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
}
function fixPlace(place){
		lugar=place;
		//take only the name of the place
		imgloc= './images/'+place.substr(0,place.indexOf(','))+'.jpg';
}
function loadMap(id,place) {
		idName=id;
	    fixPlace(place);
		//asyncrono
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyASL3PUQ3vE8YpSW0CGP7nSr1Keyp6xkyA&sensor=false&callback=initialize';
        document.body.appendChild(script);
		//go to the location
		
		if(idName!='BasiC'){
			//jquery animation
			$(document.body).animate({'scrollTop':   $('#h2location').offset().top}, 500);
			//simple way location.hash = '#h2location';
			//jquery way $(document.body).scrollTop($('#h2location').offset().top);
		}
}

$(document).ready(function(){
	 SA.redirection_mobile ({noredirection_param:"noredirection", mobile_prefix : "mobile", cookie_hours : "2" });
 });

//jquery
//style switcher
//$(document).ready(function() { 
	//$("#print ul li a").click(function() { 
		//$("link#cssbase").attr("href",$(this).attr('href'));
		//return false;
	//});
//});

//style switecherv2
function changeStyle(className){
	$('body').removeClass();
    $('body').addClass(className);
}

//stripe
$(document).ready(function(){
	//when mouserover add class over, when mouseout remove the class
   $(".tmembers tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");});
   //using even get the stripe
   $(".tmembers tr:even").addClass("alt");
 });
//accordion
 $(function() {
        $( "#accordion" ).accordion({
			heightStyle: "content"
        });
		$( "#accordionh2" ).accordion({
			heightStyle: "content",
			header: "h2"
        });
    });
  //ajax
function loadRank(rank) {
 $(document).ready(function() {
	 $.getJSON('./resources/'+rank+'.json', function(data) {
      $.each(data, function(entryIndex, entry) {	
		if(entry[rank]){
          $.each(entry[rank], function(lineIndex, line) {
			var border=$("#"+line).css("border-style");
			//put or delete border
			if(border=="none")
				$("#"+line).css("border","2px solid green");
				else
				$("#"+line).css("border","none");
          });
		}
		});
	  });
   });
 }
 
 //resizable
 $(function() {
        $( "#home" ).resizable({
            containment: "#homelimit"
        });
    });
 
 //slideshow
 function theRotator() {
	//Set the opacity of all images to 0
	$('div.rotator ul li').css({opacity: 0.0});
	//Get the first image and display it (gets set to full opacity)
	$('div.rotator ul li:first').css({opacity: 1.0});
	//Call the rotator function to run the slideshow, 6000 = change to next image after 6 seconds
	setInterval('rotate()',6000);
	
}
function rotate() {	
	////if no IMGs have the show class, grab the first image
	var current = ($('div.rotator ul li.show')?  $('div.rotator ul li.show') : $('div.rotator ul li:first'));
    if ( current.length == 0 ) current = $('div.rotator ul li:first');

	//Get next image, when it reaches the end, rotate it back to the first image
	//if the current is not the last element and the next is not show, current will be the next to show
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div.rotator ul li:first') :current.next()) : $('div.rotator ul li:first'));
			
	//Set the fade in effect for the next image, the show class has higher z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);

	//Hide the current image
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
	
};
$(document).ready(function() {		
	//Load the slideshow
	theRotator();
	$('div.rotator').fadeIn(1000);
});

//autocomplete
$(function() {
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
            "Bilbao, Spain"
        ];
        $( "#home" ).autocomplete({
            source: availableTags
        });
    });

//Dialog
function goTo(url){
    $(function() {
        $( "#dialog" ).dialog({
			show:'slide',
            modal: true,
			resizable:false,
			buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
					window.open(url);
                }
            }
        });
    });
}

//imageSelecctor
 $(document).ready(function() {
        $("#lpartners a img").hover(function() {
			$("#selectedimage").attr("src",this.src);
			$("#selectedimage").attr("alt",this.alt);
			$("#selectedimage").attr("title",this.title);
        });
});