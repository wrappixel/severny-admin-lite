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
});