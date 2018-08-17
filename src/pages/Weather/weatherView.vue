<template>
    <div>
        <div class="weather">
            <div class="title">
                <span>王家磨社区环境监测质量</span>
                <span>优</span>
            </div>
            <div class="weather_txt">空气优质，可正常外出活动，但易敏感人群应减少外出。</div>
            <div class="weather_info">
                <div>实况天气</div>
                <div>温度：{{weather.sk.temp}}℃</div>
                <div>风向：{{weather.sk.wind_direction}}</div>
                <div>风力：{{weather.sk.wind_strength}}</div>
                <div>湿度：{{weather.sk.humidity}}</div>
                <div>更新时间：{{weather.sk.time}}</div>
            </div>
            <div class="weather_info">
                <div>今天天气</div>
                <div>温度：{{weather.today.temperature}}</div>
                <div>天气：{{weather.today.weather}}</div>
                <div>风向：{{weather.today.wind}}</div>
                <div>穿衣指数：{{weather.today.dressing_index}}</div>
                <div>穿衣建议：{{weather.today.dressing_advice}}</div>
                <div>紫外线强度：{{weather.today.uv_index}}</div>
                <div>舒适度指数：{{weather.today.comfort_index}}</div>
                <div>洗车指数：{{weather.today.wash_index}}</div>
                <div>旅游指数：{{weather.today.travel_index}}</div>
                <div>晨练指数：{{weather.today.exercise_index}}</div>
            </div>
        </div>
        <div id="weather" style="height: 300px;"></div>
        <div style="margin-top: 20px;"></div>
        <div id="environmental" style="height: 300px;"></div>
        <!-- "aqi": 56,空气质量指数
                "s": 13,二氧化硫
                "c": 0.9,一氧化碳 
                "n": 41,一氧化氮
                "p25": 29,pm2.5 
                "p10": 61,pm10
                "o": 69 臭氧 -->
    </div>
</template>
<script>
    import eChartOptions from './eChartOptions.js';
    export default {
        data() {
            return {
                lineOptionsW: _.cloneDeep(eChartOptions),
                weatherChart: null,

                lineOptionsE: _.cloneDeep(eChartOptions),
                environmentalChart: null,

                weather: { sk: "", today: "" },
                weather_1: "",
            }
        },
        created() {
            this.$bus.$emit("triIsChat", false);
        },
        mounted() {
            this.weatherChart = this.$echarts.init(this.$el.querySelector('#weather'));
            this.environmentalChart = this.$echarts.init(this.$el.querySelector('#environmental'));

            let that = this;
            if (this.$route.query.code) {
                this.getConfig(this.$route.query.code);
            } else if (constants.ENV == 'development') {
                this.getConfig("620502007001");
            };
        },
        methods: {
            // 获取配置
            getConfig(code) {
                let that = this;
                $.ajax({
                    url: "static/config/" + code + ".json",//json文件位置
                    type: "GET",//请求方式为get
                    dataType: "json", //返回数据格式为json
                    success: function (config) {//请求成功完成后要执行的方法 
                        that.getWeatherAllData(config);
                    }
                });
            },
            // 获取天气数据
            getWeatherAllData(config) {
                let that = this;
                // 全国数据
                this.$ajax.ajaxHttp({
                    type: 'post',
                    data: {
                        url: "http://v.juhe.cn/weather/geo",
                        lat: config.lonlat.lat,
                        lon: config.lonlat.lon,
                        key: config.weather_key,
                    },
                    url: '/communtiy/buss/cache/findCache/weather/' + constants.SaveTime,
                    successFunc: data => {
                        if (data.code == 200) {
                            let sData = JSON.parse(data.data);
                            if (sData.resultcode == 200) {
                                that.weather = sData.result;
                                that.wChart();
                            }
                        }
                    },
                });
                // 环境污染
                this.$ajax.ajaxHttp({
                    type: 'post',
                    data: {
                        url: "http://v.juhe.cn/xiangji_weather/fen_byCoor.php",
                        lat: config.lonlat.lat,
                        lon: config.lonlat.lon,
                        startTime: "2018062208",
                        endTime: "2018062217",
                        key: config.environmental_key,
                    },
                    url: '/communtiy/buss/cache/findCache/contaminated/' + constants.SaveTime,
                    successFunc: data => {
                        if (data.code == 200) {
                            let sData = JSON.parse(data.data);
                            if (sData.reason == "success") {
                                that.eChart(sData.result);
                            }
                        }
                    },
                });
            },
            //全国天气
            wChart() {
                let future = this.weather.future;

                this.lineOptionsW.legend.data = ["最低温度", "最高温度"];

                this.lineOptionsW.xAxis.data = _.map(_.map(future, "date"), item => {
                    let time = item.slice(4);
                    return (time.slice(0, 2) + "月" + time.slice(2) + "日");
                });

                let min = [], max = [];
                _.map(_.map(future, "temperature"), (item, index) => {
                    var temp = item.split("~")
                    min.push(temp[0].split("℃")[0]);
                    max.push(temp[1].split("℃")[0]);
                });
                this.lineOptionsW.yAxis = {
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                };
                _.map(this.lineOptionsW.legend.data, item => {
                    this.lineOptionsW.series.push({
                        name: item,
                        type: 'line',
                        data: item == "最低温度" ? min : max,
                        label: {
                            normal: {
                                show: true,
                            }
                        },
                    })
                });
                this.weatherChart.setOption(this.lineOptionsW);
                this.weatherChart.resize();
            },
            // 环境污染
            eChart(data) {
                this.lineOptionsE.legend.data = ["空气质量指数", "二氧化硫", "一氧化碳", "一氧化氮", "pm2.5", "pm10", "臭氧"];
                let xData = [];
                for (var i = data.startTime.slice(-2); i <= data.endTime.slice(-2); i++) {
                    xData.push(parseInt(i) + "点")
                };
                this.lineOptionsE.xAxis.data = xData;
                let obj = {
                    "空气质量指数": "aqi",
                    "二氧化硫": "s",
                    "一氧化碳": "c",
                    "一氧化氮": "n",
                    "pm2.5": "p25",
                    "pm10": "p10",
                    "臭氧": "o",
                };
                this.lineOptionsE.yAxis = {
                    axisLabel: {
                        formatter: '{value} μg/m3'
                    }
                };
                _.map(this.lineOptionsE.legend.data, item => {
                    this.lineOptionsE.series.push({
                        name: item,
                        type: 'line',
                        stack: "总量",
                        data: _.map(data.series, obj[item]),
                        label: {
                            normal: {
                                show: true,
                            }
                        },
                    })
                });
                this.environmentalChart.setOption(this.lineOptionsE);
                this.environmentalChart.resize();
            },
        }
    }
</script>
<style lang="scss">
    .weather {
        background: #fff;
        padding: 0 20px;
        .title {
            padding-top: 21.5px;
            span:first-child {
                color: #353A41;
                font-size: 17px;
                display: inline-block;
                vertical-align: middle;
            }
            span:last-child {
                color: #fff;
                font-size: 12px;
                display: inline-block;
                width: 22px;
                height: 21px;
                background: #31C464;
                border-radius: 3px;
                text-align: center;
                line-height: 22px;
                vertical-align: middle;
            }
        }
        .weather_txt {
            padding-top: 6.5px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e2dede;
            font-size: 13px;
            color: #928f8f;
        }
        .weather_info {
            div {
                padding: 11px 0;
                color: #666;
            }
            div:last-child {
                padding-bottom: 14px;
            }
        }
    }
</style>