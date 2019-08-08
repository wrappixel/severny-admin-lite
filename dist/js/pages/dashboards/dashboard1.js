$(function () {

    var bar_ctx = document.getElementById('bar-chart').getContext('2d');

    var purple_info_gradient = bar_ctx.createLinearGradient(0, 0, 0, 150);
    purple_info_gradient.addColorStop(0.5, '#3f50f6');
    purple_info_gradient.addColorStop(1, '#3f50f6');

    var white_danger_gradient = bar_ctx.createLinearGradient(0, 0, 0, 150);
    white_danger_gradient.addColorStop(0.5, '#e5e9f2');
    white_danger_gradient.addColorStop(1, '#e5e9f2');

    var bar_chart = new Chart(bar_ctx, {
        type: 'bar',
        data: {
            labels: [
                'Jun1',
                'Jun2',
                'Jun3',
                'Jun4',
                'Jun5',
                'Jun6',
                'Jun7'
            ],
            datasets: [{
                    label: 'Week 1',
                    data: [1.1, 1.5, 1.3, 2.2, 1.2, 0.6, 1.8],
                    backgroundColor: purple_info_gradient,
                    hoverBackgroundColor: purple_info_gradient,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#3f50f6',
                    borderDash: [10, 5]
                },
                {
                    label: 'Week 2',
                    data: [1.9, 1, 0.7, 1.8, 1.8, 1.6, 1.2],
                    backgroundColor: white_danger_gradient,
                    hoverBackgroundColor: white_danger_gradient,
                    hoverBorderWidth: 1,
                    hoverBorderColor: '#e5e9f2'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    barPercentage: 0.7,
                    categoryPercentage: 0.6,
                    ticks: {
                        fontFamily: "'Rubik', sans-serif",
                        fontSize: 13,
                        fontColor: '#8392a5'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false,
                        zeroLineColor: '#f2f3f2'
                    },
                    ticks: {
                        fontFamily: "'Rubik', sans-serif",
                        fontSize: 13,
                        fontColor: '#8392a5',
                        min: 0,
                        max: 2,
                        stepSize: 1,
                        suggestedMax: 2.5,
                        callback: function (label, index, labels) {
                            return label + 'k';
                        },
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // ==============================================================
    // campaign
    // ==============================================================

    var chart1 = c3.generate({
        bindto: '#campaign',
        data: {
            columns: [
                ['Direct Sales', 25],
                ['Referral Sales', 15],
                ['Afilliate Sales', 10],
                ['Indirect Sales', 15]
            ],

            type: 'donut',
            tooltip: {
                show: true
            }
        },
        donut: {
            label: {
                show: false
            },
            title: 'Sales',
            width: 40
        },

        legend: {
            hide: true
        },
        color: {
            pattern: [
                '#3f50f6',
                '#02cccd',
                '#ff3ca6',
                '#f2f6fb'
            ]
        }
    });

    d3.select('#campaign .c3-chart-arcs-title').style('font-family', 'Rubik');

    // ==============================================================
    // sales ratio
    // ==============================================================
    var chart = new Chartist.Line('.sales', {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            [11, 10, 15, 21, 14, 23, 12]
        ]
    }, {
        low: 0,
        high: 28,
        showArea: true,
        fullWidth: true,
        plugins: [
            Chartist.plugins.tooltip()
        ],
        axisY: {
            onlyInteger: true,
            scaleMinSpace: 40,
            offset: 20,
            labelInterpolationFnc: function (value) {
                return (value / 1) + 'k';
            }
        },
    });

    // Offset x1 a tiny amount so that the straight stroke gets a bounding box
    // Straight lines don't get a bounding box 
    // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
    chart.on('draw', function (ctx) {
        if (ctx.type === 'area') {
            ctx.element.attr({
                x1: ctx.x1 + 0.001
            });
        }
    });

    // Create the gradient definition on created event (always after chart re-render)
    chart.on('created', function (ctx) {
        var defs = ctx.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': 'rgba(255, 255, 255, 1)'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(80, 153, 255, 1)'
        });
    });

    $(window).on('resize', function () {
        chart.update();
    });
});