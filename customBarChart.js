define( [
    'jquery',
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js',
    './properties',
    'qlik'
],
function ( $, echarts, props, qlik ) {

    function getDimensionArray(layout){

        return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {
            return item[0].qText;
        }); 
    }

    function getSerieValue(layout,measurePosition){


        return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {
            
            return {
                 value: item[measurePosition+1].qNum
                 ,valueText: item[measurePosition+1].qText
           } 

        });
    }

    function getSerieLabel(layout,measurePosition){

        settings = layout.settings

        var labelSettings={
            //color:      'auto',
            show:       settings.dataLabel.visibility,
            align:      settings.dataLabel.align,
            fontSize:   settings.dataLabel.size,
            fontWeight: settings.dataLabel.weight,
            fontStyle:  settings.dataLabel.style,
            position:   settings.dataLabel.position,
            distance:   settings.dataLabel.distance,
            rotate:      settings.dataLabel.rotate,
            formatter: function (params) {
                return params.data.valueText;
            }
        }
        var measureInfo =layout.qHyperCube.qMeasureInfo[measurePosition];

        if(measureInfo.dataLabel.auto == false){

            labelSettings.color=measureInfo.dataLabel.color.color;

        }

        return labelSettings;

    }

    function getAxisLabel(layout){

        settings = layout.settings

        var labelSettings={
            color:      settings.axisLabel.color.color,
            show:       settings.axisLabel.visibility,
            align:      settings.axisLabel.align,
            fontSize:   settings.axisLabel.size,
            fontWeight: settings.axisLabel.weight,
            fontStyle:  settings.axisLabel.style,
            rotate:     settings.axisLabel.rotate
        }

        return labelSettings;

    }
    function getSerieCommumProperty(layout,measurePosition){

        var measureInfo =layout.qHyperCube.qMeasureInfo[measurePosition];
        var settings    =layout.settings;

        return {
            barGap: settings.others.barGap,
            type:   measureInfo.type,
            stack:  measureInfo.stack,
            yAxisIndex:  measureInfo.yIndex,
            name:   measureInfo.qFallbackTitle
        }
    }

    
    function getSerieArray(layout){
        console.log(layout)
        serieArray=[];

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

        for(var x=0;x<expressionNumber;x++){

            serieArray[x]=getSerieCommumProperty(layout,x)
            serieArray[x].label=getSerieLabel(layout,x)
            serieArray[x].data=getSerieValue(layout,x)

        }


        return serieArray;
    }

    function getExpressionsNameArray(layout){

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;
        var expressionTitleArray=[];

        for(var x=0;x<expressionNumber;x++){

            expressionTitleArray[x] =  layout.qHyperCube.qMeasureInfo[x].qFallbackTitle;
        }

        return expressionTitleArray;
    }

    function getExpressionColorArray(layout){

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;
        var expressionColorArray=[];

        for(var x=0;x<expressionNumber;x++){

            expressionColorArray[x] = layout.qHyperCube.qMeasureInfo[x].color.color;

        }

        return expressionColorArray;

    }

    function getDimensionName(layout){

        return layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0];
    }

    function getNumberVisibleItems(layout){

        return layout.settings.others.numberVisibleItems - 1
    }


    return {
        initialProperties: {
            qHyperCubeDef : {
                qDimensions : [],
                qMeasures : [],
                qInitialDataFetch : [{
                    qWidth : 10,
                    qHeight : 1000
                }]
            }
        },
        definition: props,
        support:{snapshot: true},
        paint: function ( $element, layout ) {

            echarts.dispose($element[0]); 

            var dimensionArray          = getDimensionArray(layout);
            var dimensionName           = getDimensionName(layout);
            var serieArray              = getSerieArray(layout);
            var expressionNameArray     = getExpressionsNameArray(layout)
            var expressionColorArray    = getExpressionColorArray(layout)
            var axisLabel               = getAxisLabel(layout)
            var numberVisibleItems      = getNumberVisibleItems(layout);

            var myChart = echarts.init($element[0]); 

            var option = {
                        color: expressionColorArray,
                        legend: {
                            data: expressionNameArray
                        },
                        dataZoom: [
                            {
                                id: 'dataZoomX',
                                type: 'slider',
                                xAxisIndex: 0,
                                filterMode: 'empty',
                                startValue: 0,
                                endValue: numberVisibleItems
                            }
                        ],
                        grid: {
                            containLabel: true,
                            left: '0%',
                            right: '0%'
                        },
                        xAxis: {
                           data: dimensionArray,
                           axisLabel: axisLabel
                        }, 
                        yAxis: [{ show: false},{ show: false}],
                       series: serieArray
            }; 
       
            myChart.setOption(option);


            myChart.on('click', function (params) {
                qlik.currApp(this).field(dimensionName).selectValues([params.name],true,true)


            });

        },
        resize: function($element) {

            echarts.init($element[0]).resize()

        }

}} );