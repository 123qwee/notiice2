export default {
    // title: {
    //     text: ''
    // },
    // tooltip: {
    //     trigger: 'axis'
    // },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
            interval: 0,
            rotate: 40
        },
        data: []
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        name: '',
        type: 'line',
        data: [],
        label: {
            normal: {
                show: true,
            }
        },
    }]
};
