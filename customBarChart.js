define( [
    'jquery',
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

            //Color Border
            if(measureInfo.dataLabel.border){

                labelSettings.textBorderWidth=measureInfo.dataLabel.border.width

                if(getColorType(layout,measurePosition)==0 ){

                    labelSettings.textBorderColor=color=measureInfo.dataLabel.border.color.color;

                }else if(getColorType(layout,measurePosition)==1 ){

                    labelSettings.textBorderColor=measureInfo.dataLabel.border.colorExpression;
                }
            }

        }

        return labelSettings;

    }

    function getAxisLabel(layout){

        axisLabelLayout = layout.settings.axisLabel

        var labelSettings={
            show:       axisLabelLayout.visibility,
            align:      axisLabelLayout.align,
            fontSize:   axisLabelLayout.size,
            fontWeight: axisLabelLayout.weight,
            fontStyle:  axisLabelLayout.style,
            rotate:     axisLabelLayout.rotate
        }


        //get text color
        if(axisLabelLayout.colorType>=0){

            if(axisLabelLayout.colorType==0){
                labelSettings.color =  axisLabelLayout.color.color

            }else if(axisLabelLayout.colorType==1){
                labelSettings.color =  axisLabelLayout.colorByExpression

            }
        }

        //Get text border
        if(axisLabelLayout.border){

            labelSettings.textBorderWidth =axisLabelLayout.border.width

            if(axisLabelLayout.colorType==0){

                labelSettings.textBorderColor =  axisLabelLayout.border.color.color
    
            }else if(axisLabelLayout.colorType==1){
    
                labelSettings.textBorderColor =  axisLabelLayout.border.colorByExpression
    
            }

        }
        

        return labelSettings;

    }

    function getLabelLine(layout,measureInfo){

        labelLineLayout = layout.settings.dataLabel.labelLine

        var labelLine={
            show:true,
            length2:5,
            lineStyle:{
                width: labelLineLayout.width,
                opacity:labelLineLayout.opacity,
                type: labelLineLayout.type
            }
        }

        //Define line color

        //Single Color
        if(labelLineLayout.colorType==0){

            labelLine.lineStyle.color=labelLineLayout.color.color
        //Color by expression
        }else if(labelLineLayout.colorType==1){

            labelLine.lineStyle.color=labelLineLayout.color.colorExpression
        
            //Keep Label Color
        }else if(labelLineLayout.colorType==2){

            if(measureInfo.colorType==0){
                labelLine.lineStyle.color=measureInfo.dataLabel.color.color
            }else if(measureInfo.colorType==1){
                labelLine.lineStyle.color=measureInfo.dataLabel.colorExpression
            }

        }

        return labelLine;

    }

    function getLabellabelLayout(layout){

        var labelDrag=function (param) {
            return {
                x: param.rect.x+(param.rect.width/2),
                y: param.labelRect.y,
                draggable:true
            }
        };

        return labelDrag;

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

        if(measureInfo.line && measureInfo.type=='line'){

            commumProperty.lineStyle={
                width: parseInt(measureInfo.line.width),
                type: measureInfo.line.type,
            }
        }

        if(settings.dataLabel.drag && settings.dataLabel.drag.isDraggable){
            commumProperty.labelLayout=getLabellabelLayout(layout)
            
            //Only show label line if labeldrag is active"
            if(settings.dataLabel.labelLine && settings.dataLabel.labelLine.show){
                commumProperty.labelLine = getLabelLine(layout,measureInfo)
            }
        }




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

        if(layout.qHyperCube.qMeasureInfo)
        return serieArray;
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
        qtdDimensionValues = getDimensionArray(layout).length
        
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


    function getGrid(layout){ 

        gridLayout = layout.settings.grid 

        var grid= {
            containLabel: gridLayout.containLabel,
            width: gridLayout.width,
            height: gridLayout.height
        }

        if(gridLayout.customGridPosition){

            grid.left=gridLayout.position.left
            grid.right=gridLayout.position.right
            grid.top=gridLayout.position.top
            grid.bottom=gridLayout.position.bottom

        }


        return grid
    }

    function getLegendTextStyle(layout){

        legendLayout = layout.settings.legend.text;

        var legendTextStyle= {
            fontSize: legendLayout.size
        }

        if(layout.settings.legend.colorType==0){

            legendTextStyle.color =  legendLayout.color.color

        }else if( layout.settings.legend.colorType==1){

            legendTextStyle.color =  legendLayout.colorExpression

        }

        if(legendLayout.border){

            legendTextStyle.textBorderWidth =legendLayout.border.width

            if(layout.settings.legend.colorType==0){

                legendTextStyle.textBorderColor =  legendLayout.border.color.color
    
            }else if( layout.settings.legend.colorType==1){
    
                legendTextStyle.textBorderColor =  legendLayout.border.colorExpression
    
            }

        }



        return legendTextStyle

    }

    function getLegend(layout){

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

        //Legend Data
        var legendDataArray=[];

        for(var x=0;x<expressionNumber;x++){

            dataItem={
                name:layout.qHyperCube.qMeasureInfo[x].qFallbackTitle,
                icon:layout.settings.legend.icon
            }

            legendDataArray[x] =  dataItem

        }
        

        return {
            show: layout.settings.legend.visibility,
            textStyle: getLegendTextStyle(layout),
            data: legendDataArray
        };

    }

    function getXAxis(layout){

        var xAxis =  {
            data: getDimensionArray(layout),
            axisLabel: getAxisLabel(layout)
         }

        
         return xAxis;

    }

    function getYAxisProperty(yAxis){

        yAxisProperty={
            show: yAxis.show,
            inverse: yAxis.inverse
        }

        if(!yAxis.autoInterval){

            if(yAxis.intervalType==0 || yAxis.intervalType==2){

                yAxisProperty.min=yAxis.min
            }

            if(yAxis.intervalType==1 || yAxis.intervalType==2){
                
                yAxisProperty.max=yAxis.max
            }

        }

        return yAxisProperty;

    }

    function getYAxis(layout){

        if(layout.settings.yAxis){

            var yAxis =  [
                getYAxisProperty(layout.settings.yAxis.left),
                getYAxisProperty(layout.settings.yAxis.right)
            ]

        }else{

            var yAxis =  [{show:false},{show:false}]
        }

        
         return yAxis;

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

            console.log(layout)
            echarts.dispose($element[0]); 

            var dimensionName           =   getDimensionName(layout);
            var serieArray              =   getSerieArray(layout);
            var expressionColorArray    =   getExpressionColorArray(layout)
            var legend                  =   getLegend(layout);
            var dataZoomArray           =   getDataZoom(layout);
            var grid                    =   getGrid(layout);
            var xAxis                   =   getXAxis(layout);
            var yAxis                   =   getYAxis(layout);

            var myChart = echarts.init($element[0]); 

            var option = {
                        color: expressionColorArray,
                        legend: legend,
                        dataZoom: dataZoomArray,
                        grid: grid,
                        xAxis:xAxis, 
                        yAxis: yAxis,
                        series: serieArray
            };

            console.log(option)

            myChart.setOption(option);


            myChart.on('click', function (params) {
                qlik.currApp(this).field(dimensionName).selectValues([params.name],true,true)

            });

        },
        resize: function($element) {

            echarts.init($element[0]).resize()

        }

}} );