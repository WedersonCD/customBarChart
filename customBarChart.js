define( [
    'jquery',
    //'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.0.2/echarts.min.js',
    './properties',
    'qlik'
],
function ( $, echarts, props, qlik ) {

    function getDimensionArray(layout){

        return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {
            return item[0].qText;
        }); 
    }

    function getColorType(layout,measurePosition){

        return layout.qHyperCube.qMeasureInfo[measurePosition].colorType;
    }

    function getSerieValueItemStyleColor(layout,measurePosition,qMatrixItem){

        var colorType = getColorType(layout,measurePosition);

        var color;

        //0 is single color 1 is color by expression
        if(colorType==0){
            color = layout.qHyperCube.qMeasureInfo[measurePosition].color.color
        }else if(colorType==1){
            color = qMatrixItem[measurePosition+1].qAttrExps.qValues[0].qText
        }
        
        return color;
    }

    function getSerieValue(layout,measurePosition){


        return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {
            
            var value=item[measurePosition+1].qNum;

            //check if the number will be showed
            if(value ==0 && !layout.settings.others.showZeroBars){
                value='-';
            }

            return {
                 value: value
                 ,valueText: item[measurePosition+1].qText
                 ,itemStyle: {
                     color: getSerieValueItemStyleColor(layout,measurePosition,item)
                }
           } 

        });
    }


    function getSerieLabel(layout,measurePosition){

        settings = layout.settings

        var labelSettings={
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

            //set single color
            if(getColorType(layout,measurePosition)==0 ){

                labelSettings.color=measureInfo.dataLabel.color.color;

            //set color by expression
            }else if(getColorType(layout,measurePosition)==1 ){

                labelSettings.color=measureInfo.dataLabel.colorExpression;
            }

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
        
        var commumProperty={

            barGap: settings.barOptions.barGap,
            type:   measureInfo.type,
            stack:  measureInfo.stack,
            yAxisIndex:  measureInfo.yIndex,
            name:   measureInfo.qFallbackTitle
        };

        if(!settings.barOptions.barWidthAuto){

            commumProperty.barWidth     =   settings.barOptions.barWidth
            commumProperty.barMaxWidth  =   settings.barOptions.maxBarWidth
            commumProperty.barMinWidth  =   settings.barOptions.minBarWidth
        }

        return commumProperty
    }

    function getEmphasis(layout){

        var focus = layout.settings.focus

        //check if On Focus option is on
        if(!focus.on){
            return {focus: 'none'}
        }

        var emphasis={
            focus:  'series',
            label:{
                fontSize: focus.label.size
            },
            itemStyle:{},
            lineStyle:{},

        };

        //Set single color
        if(focus.colorType==0){

            emphasis.label.color = focus.label.color.color
            emphasis.itemStyle.color= focus.item.color.color
            emphasis.lineStyle.color= focus.item.color.color

        //set expression colors if they not are ''    
        }else if (focus.colorType==1){

            if(!focus.label.colorExpression.color==''){

                emphasis.label.color=focus.label.colorExpression.color
            }
            if(!focus.item.colorExpression.color==''){

                emphasis.itemStyle.color= focus.item.colorExpression.color
                emphasis.lineStyle.color= focus.item.colorExpression.color
            }
        }


        return emphasis;

    }
    
    function getSerieArray(layout){
        serieArray=[];

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

        for(var x=0;x<expressionNumber;x++){

            serieArray[x]=getSerieCommumProperty(layout,x)
            serieArray[x].label=getSerieLabel(layout,x)
            serieArray[x].data=getSerieValue(layout,x)
            serieArray[x].emphasis=getEmphasis(layout)
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

    function getDataZoom(layout){

        visibleItens = getNumberVisibleItems(layout);
        qtdDimensionValues = layout.qHyperCube.qDimensionInfo[0].qCardinal  
        
        //only show if exists more dimensions values then visible itens.
        showDataZoom= qtdDimensionValues > visibleItens
        

        return [
            {
                id: 'dataZoomX',
                type: 'slider',
                show: showDataZoom,
                xAxisIndex: 0,
                filterMode: 'empty',
                startValue: 0,
                endValue: visibleItens
            }
        ];
    }

    function getLegend(layout){

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;
        var legendDataArray=[];


        for(var x=0;x<expressionNumber;x++){

            dataItem={
                name:layout.qHyperCube.qMeasureInfo[x].qFallbackTitle,
                icon:layout.settings.legend.icon
            }

            legendDataArray[x] =  dataItem

        }

        var textStyleColor;

        if( layout.settings.legend.colorType==0){

            textStyleColor =  layout.settings.legend.text.color.color

        }else if( layout.settings.legend.colorType==1){

            textStyleColor =  layout.settings.legend.text.colorExpression.color

        }

        return {
            show: layout.settings.legend.visibility,
            textStyle: {
                color: textStyleColor,
                fontSize: layout.settings.legend.text.size
            },
            data: legendDataArray
        };

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
        support:{snapshot: true,export: true,exportData: true},
        paint: function ( $element, layout ) {

            echarts.dispose($element[0]); 

            var dimensionArray          = getDimensionArray(layout);
            var dimensionName           = getDimensionName(layout);
            var serieArray              = getSerieArray(layout);
            var expressionColorArray    = getExpressionColorArray(layout)
            var axisLabel               = getAxisLabel(layout)
            var legend                  = getLegend(layout);
            var dataZoomArray           = getDataZoom(layout);
            
            var myChart = echarts.init($element[0]); 

            var option = {
                        color: expressionColorArray,
                        legend: legend,
                        dataZoom: dataZoomArray,
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