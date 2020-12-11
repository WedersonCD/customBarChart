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
            show:       settings.label.visibility,
            align:      settings.label.align,
            fontSize:   settings.label.size,
            fontWeight: settings.label.weight,
            fontStyle:  settings.label.style,
            position:   settings.label.position,
            distance:   settings.label.distance,
            rotate:      settings.label.rotate,
            formatter: function (params) {
                return params.data.valueText;
            }
        }
        var measureInfo =layout.qHyperCube.qMeasureInfo[measurePosition];

        if(measureInfo.label.auto == false){

            labelSettings.color=measureInfo.label.color.color;

        }

        return labelSettings;

    }

    function getSerieCommumProperty(layout,measurePosition){

        var measureInfo =layout.qHyperCube.qMeasureInfo[measurePosition];
        var settings    =layout.settings;

        return {
            barGap: settings.bar.gap,
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

            var dimensionArray      = getDimensionArray(layout);
            var dimensionName      = getDimensionName(layout);
            var serieArray          = getSerieArray(layout);
            var expressionNameArray = getExpressionsNameArray(layout)
            var expressionColorArray = getExpressionColorArray(layout)

            
            var myChart = echarts.init($element[0]); 

            var option = {
                        color: expressionColorArray,
                        legend: {
                            data: expressionNameArray
                        },
                        dataZoom: [        {
                            id: 'dataZoomX',
                            type: 'slider',
                            xAxisIndex: [0],
                            filterMode: 'filter'
                        },],
                        grid: {
                            left: '0%',
                            right: '0%'
                        },
                        xAxis: {
                           data: dimensionArray 
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