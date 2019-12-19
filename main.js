$(document).ready(function() {
    $(function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth();
      var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var yyyy = today.getFullYear();
   
      today = dd + ' ' + month[mm] + ' ' + yyyy;
      //month[mm]="August";
      if(month[mm]==="December" || month[mm]==="January"||
      month[mm]==="February"){
        $(".intro").css({
          "background-image": 'url("https://images.pexels.com/photos/833013/pexels-photo-833013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
        });
      }else if (month[mm]==="March" || month[mm]==="April"||
      month[mm]==="May"){
        $(".intro").css({
          "background-image": 'url("https://images.pexels.com/photos/2104881/pexels-photo-2104881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
        });
      }else if (month[mm]==="June" || month[mm]==="July"||
      month[mm]==="August"){
        $(".intro").css({
          "background-image": 'url("https://images.pexels.com/photos/1170572/pexels-photo-1170572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
        });
      }else if (month[mm]==="September" || month[mm]==="October"||
      month[mm]==="November"){
        $(".intro").css({
          "background-image": 'url("https://images.pexels.com/photos/688830/pexels-photo-688830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'
        });
      }
      $("#currentDate").text("Today's date: " + today);
    });
     
    var city = [];
    $(".main").hide();
    $(".forecast").hide();
    $('#send').click(function(e) {
      e.preventDefault();
      var grad = $('#grad_value').val();
      if (grad !== '') {
        $.ajax({
          type: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?q=' + grad + '&appid=7c0fe914bbb115ec1f664f2d087f17cb&units=metric',
          dataType: 'jsonp',
          success: function(podaci) {
            $(".main").show();
            city.push(grad);
            $('#weather').empty().text(podaci.weather[0].description);
            $("#grad").html("<img id='locationLogo' src='https://www.bing.com/th?id=OIP.Vr0IsnNZaY3cxmBtOtSqqAHaNN&pid=Api&rs=1' title='Image from freeiconspng.com'>"+podaci.name);
            if(Math.round(parseInt(podaci.main.temp))>0){
              $('#temperatura').text("+"+Math.round(parseInt(podaci.main.temp)) + "°C");
              $('#minTemp').empty().append("+"+Math.round(parseInt(podaci.main.temp_min)) + "°C");
            $('#maxTemp').empty().append("+" +Math.round(parseInt(podaci.main.temp_max)) + "°C");
            }else{
              $('#temperatura').text("-"+Math.round(parseInt(podaci.main.temp)) + "°C");
              $('#minTemp').empty().append("-"+Math.round(parseInt(podaci.main.temp_min)) + "°C");
            $('#maxTemp').empty().append("-" +Math.round(parseInt(podaci.main.temp_max)) + "°C");
            }
            
            $('#pressure').empty().append(podaci.main.pressure + " hPa");
            $('#humidity').empty().append(podaci.main.humidity + " %");
            
            $('#windSpeed').empty().append(podaci.wind.speed + " m/s");
            $('#forecastWeather').empty();
            $('#ikon').attr('src', 'http://openweathermap.org/img/w/' + podaci.weather[0].icon + '.png');
            $('#currentWeather').mouseover(function(){
              $(".data1").css({
                "color":"rgb(255, 163, 26)",
            });
            });
            $('#currentWeather').mouseout(function(){
              $(".data1").css({
                "color":"white",
               
            });
            });
            $('html, body').animate({
              scrollTop: $(".main").offset().top
            }, 1000);
          }
        })
      } else {
        $("#grad_value").attr("placeholder", "Empty field");
        alert("Empty search field");
      }
      
    });
   
    $('#gumb').click(function(e) {
      e.preventDefault();
      var grad2 = city.slice(-1)[0];
      $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + grad2 + '&appid=9dcd8991f9f548f9d28bc5cf37a80c4e&units=metric',
        dataType: 'jsonp',
        success: function(podaci) {
          
          $(".forecast").show();
          for (var i = 6; i < podaci.list.length; i += 8) {
            
           var div=$('<div></div>');
           $(div).attr("class","days");
           $(div).append('<p class="details">Date:'+podaci.list[i].dt_txt.split(' ')[0]);
           $(div).append('<p class="details">Temperature:'+Math.round(parseInt(podaci.list[i].main.temp))+"°C");
           $(div).append('<p class="details">Weather:'+podaci.list[i].weather[0].description);
           $(div).append('<p class="details">Minimum temperature:'+Math.round(parseInt(podaci.list[i].main.temp_min))+"°C");
           $(div).append('<p class="details">Maximum temperature:'+Math.round(parseInt(podaci.list[i].main.temp_max))+"°C");
           $(div).append('<p class="details">Pressure:'+podaci.list[i].main.pressure+"hPa");
           $(div).append("<div class='dLogo'><img id='wLogo' src='http://openweathermap.org/img/w/" + podaci.list[i].weather[0].icon + ".png'></div>");
           $("#forecastWeather").append(div);
          }
          $("#nextDays").empty().append("5 Day weather forecast for " + podaci.city.name);
          
          $('.days').mouseover(function(){
            $(this).css({
              "color":"rgb(255, 163, 26)",
              "font-weight": "600"
              
          });
          });
          $('.days').mouseout(function(){
            $(this).css({"color":"white",
            "font-weight": "300"
          });
          })
          
          $("#reset").click(function(){
            $('html, body').animate({
              scrollTop: $(".intro").offset().top,
            }, 2500);
              $('.main').show();
              $("#grad_value").val("");
              $('.forecast').fadeOut(1000);
              $('.main').fadeOut(1000);
             
          })
          $("#reset1").click(function(){
            $('.main').fadeIn(1000);
            $('.forecast').fadeOut(1000);
            $('#forecastWeather').empty();
          })

          
          $('.main').fadeOut(1000);
        }
      })
    });
    
    
  });