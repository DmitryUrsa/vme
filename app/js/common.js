$(function() {

	$(".hamburger").click(function(){
    $(this).toggleClass("is-active");
    $('.menu').toggleClass("active");
  });

  $('.filter__input-current').click(function() {
  	if( $(this).hasClass('active') ) {
  		$(this).removeClass('active');
  		$(this).parent().find('.filter__dropdown').hide();
  	} else {
  		$('.filter__input-current.active').removeClass('active');
  		$('.filter__dropdown').hide();
	  	$(this).addClass('active');
	  	$(this).parent().find('.filter__dropdown').show();
	  }
  });

  $('.filter__dropdown-item').click(function() {
  	var newText = $(this).text();
  	$(this).parent().parent().find('.filter__input-current-text').text(newText);
  	$(this).parent().parent().find('.filter__input-current').removeClass('active');
  });

  $(document).click(function(event) { 
    if(!$(event.target).closest('.filter__input-current').length) {
        $('.filter__dropdown').hide();
        $('.filter__input-current').removeClass('active');
    }        
	});
$( "#polzunok" ).slider({
    animate: "slow",
    range: "min",    
    value: 50
});

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 64,
    values: [ 8, 64 ],
    slide: function( event, ui ) {
      $( ".price-range-min" ).text( ui.values[ 0 ] );
      $( ".price-range-max" ).text( ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );

$('.ui-slider-handle:eq(0)').append('<span class="price-range-min range-value">' + $('#slider-range').slider('values', 0 ) + '</span>');

$('.ui-slider-handle:eq(1)').append('<span class="price-range-max range-value">' + $('#slider-range').slider('values', 1 ) + '</span>');
		$.ajax({
        type: "POST",
        data: "action=get_players_stats&csrf_token=" + $('meta[name=csrf_token]').attr("content"),
        success: function (html) {
            var data_load = [];
            $.each(jQuery.parseJSON(html), function (i, value) {
                data_load.push([Number(value.time), Number(value.val)]);
            });

            $(function () {
                Highcharts.setOptions({
                    lang: {
                        rangeSelectorZoom: 'Период',
                        rangeSelectorFrom: 'С',
                        rangeSelectorTo: 'По',
                        printChart: 'Печать диаграммы',
                        downloadPNG: 'Скачать PNG изображение',
                        downloadJPEG: 'Скачать JPEG изображение',
                        downloadPDF: 'Скачать PDF документ',
                        downloadSVG: 'Скачать SVG изображение',
                        contextButtonTitle: 'Контекстное меню графика',
                        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        shortMonths: ['Янв.', 'Фев.', 'Март.', 'Апр.', 'Май.', 'Июнь.', 'Июль.', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.']
                    },
                    global: {
                       useUTC: false,
                       timezoneOffset: 5 * 60
                    }
                });

                $('#server-statistic').highcharts('StockChart', {
                    colors: ['rgba(232, 122, 65, 0.58)', "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
                    chart: {
                        alignTicks: false,
                        backgroundColor: "",
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%e.%m',
                            week: '',
                            month: '%m',
                            year: '%Y'
                        }
                    },
                    yAxis: {
                        allowDecimals: false,
                        min: 0
                    },
                    rangeSelector: {
                        selected: 0,
                        buttonTheme: {
                            fill: 'none',
                            stroke: 'none',
                            'stroke-width': 0,
                            width: 50,
                            r: 8,
                            style: {
                                color: '#FF8508',
                                fontWeight: 'bold'
                            },
                            states: {
                                hover: {
                                },
                                select: {
                                    fill: '#FF8508',
                                    style: {
                                        color: 'white'
                                    }
                                }
                            }
                            
                        },
                        buttons: [{
                                type: 'day',
                                count: 1,
                                text: 'ДЕНЬ'
                            }, {
                                type: 'week',
                                count: 1,
                                text: 'НЕДЕЛЯ'
                            }, {
                                type: 'month',
                                count: 1,
                                text: 'МЕСЯЦ'
                            }, {
                                type: 'year',
                                count: 1,
                                text: 'ГОД'
                            }, {
                                type: 'all',
                                text: 'ВЕСЬ'
                            }]
                    },
                    navigator: {
                        handles: {
                            backgroundColor: '#FF7F24',
                            borderColor: '#AAA'
                        },
                        outlineColor: '#CCC',
                        maskFill: 'rgba(232, 122, 65, 0.58)',
                        series: {
                            color: '#FF7F24',
                            lineColor: '#FF7F24'
                        },
                    },
                    scrollbar: {
                        barBackgroundColor: '#FFA54F',
                        barBorderColor: '#FFA54F',
                        buttonArrowColor: '#CCC',
                        buttonBackgroundColor: '#FF7F24',
                        buttonBorderColor: '#FF7F24',
                        rifleColor: '#FFF',
                        trackBackgroundColor: '#EE9A49',
                        trackBorderColor: '#EE9A49'
                    },
                    tooltip: {
                        formatter: function () {

                            var s = '<b>Дата: ' + Highcharts.dateFormat('%e.%m.%Y - %H:%M', this.x) + '</b>';

                            $.each(this.points, function (i, point) {
                                s += '<br/>Онлайн : ' + Math.round(point.y);
                            });
                            return s;
                        }
                    },
                    series: [{
                            name: 'График загруженности сервера',
                            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                            type: 'area',
                            tooltip: {
                                valueDecimals: 2
                            }
                        }]
                });

            });
        }
    });
});
