define( [
    'jquery',
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js'
],
function ( $, echarts ) {

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

    function getSerieLabel(layout){

        settings = layout.settings

        return  {
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

        serieArray=[];

        var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

        for(var x=0;x<expressionNumber;x++){

            serieArray[x]=getSerieCommumProperty(layout,x)
            serieArray[x].label=getSerieLabel(layout)
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
        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    min: 1,
                    max: 1
                },
                measures: {
                    uses: "measures",
                    min: 1,
                    items:{
                        Stack:{
                            ref: "qDef.stack",
                            label: "stack",
                            type: "string",
                            defaultValue: '',
                            expression: "optional"
                        },
                        Type:{
                            ref: "qDef.type",
                            label: "type",
                            type: "string",
                            component: "dropdown",
                            defaultValue: 'bar',
                            options:[{value:"bar",label: "bar"},{value:"line",label:"line"}]
                        },
                        Yindex:{
                            ref: "qDef.yIndex",
                            label: "y-axis",
                            type: "string",
                            component: "dropdown",
                            defaultValue: '0',
                            options:[{value:"0",label: "left"},{value:"1",label:"right"}]
                        },
                        Color:{
                            ref: "qDef.color",
                            component: "color-picker",
                            label: "color",
                            type: "object",
                            defaultValue: {
                                color: "ff5866",
                                index: "-1"
                              }
                        }
                        
                    }
                },
                Settings:{
                    component: "expandable-items",
                    label: "Settings",
                    items:{
                        Label:{
                            type: "items",
                            label: "Label",
                            items: {
                                LabelVisibility: {
                                    ref: "settings.label.visibility",
                                    type: "boolean",
                                    component: "switch",
                                    label: "Visibility",
                                    options: [{
                                        value: true,
                                        label: "Show"
                                    }, {
                                        value: false,
                                        label: "Hide"
                                    }],
                                    defaultValue: true
                                },
                                LabelDistance: {
                                    ref: "settings.label.distance",
                                    label: "Distance",
                                    type: "string",
                                    defaultValue: 5,
                                    expression: "optional"
                                },
                                LabelRotate: {
                                    ref: "settings.label.rotate",
                                    label: "Rotate",
                                    type: "string",
                                    defaultValue: 0,
                                    expression: "optional"
                                },
                                LabelPosition:{
                                    ref: "settings.label.position",
                                    label: "Position",
                                    type: "string",
                                    component: "dropdown",
                                    defaultValue: 'inside',
                                    options:[
                                        {value:"bottom",label:"bottom"},
                                        {value:"inside",label:"inside"},
                                        {value:"insideBottom",label:"insideBottom"},
                                        {value:"insideBottomLeft",label:"insideBottomLeft"},
                                        {value:"insideBottomRight",label:"insideBottomRight"},
                                        {value:"insideLeft",label:"insideLeft"},
                                        {value:"insideRight",label:"insideRight"},
                                        {value:"insideTop",label:"insideTop"},
                                        {value:"insideTopLeft",label:"insideTopLeft"},
                                        {value:"insideTopRight",label:"insideTopRight"},
                                        {value:"left",label:"left"},
                                        {value:"right",label:"right"},
                                        {value:"top",label:"top"}
                                    ]
                                },
                                LabelFontStyle:{
                                    ref: "settings.label.style",
                                    label: "Style",
                                    type: "string",
                                    component: "dropdown",
                                    defaultValue: 'normal',
                                    options:[
                                        {value:"normal",label:"normal"},
                                        {value:"italic",label:"italic"},
                                        {value:"oblique",label:"oblique"}
                                    ]
                                },
                                LabelFontWeight:{
                                    ref: "settings.label.weight",
                                    label: "Weight",
                                    type: "string",
                                    component: "dropdown",
                                    defaultValue: 'normal',
                                    options:[
                                        {value:"normal",label:"normal"},
                                        {value:"bold",label:"bold"},
                                        {value:"bolder",label:"bolder"},
                                        {value:"lighter",label:"lighter"}
    
                                    ]
                                },
                                LabelFontSize: {
                                    ref: "settings.label.size",
                                    label: "Size",
                                    type: "string",
                                    defaultValue: 15,
                                    expression: "optional"
                                },
                                LabelFontAlign:{
                                    ref: "settings.label.align",
                                    label: "Align",
                                    type: "string",
                                    component: "dropdown",
                                    defaultValue: 'center',
                                    options:[
                                        {value:"left",label:"left"},
                                        {value:"center",label:"center"},
                                        {value:"right",label:"right"}
    
                                    ]
                                },
                            }
                        },
                        Bar:{
                            type: "items",
                            label: "bar",
                            items: {
                                BarGap: {
                                    ref: "settings.bar.gap",
                                    label: "Bar Gap",
                                    type: "string",
                                    defaultValue: 0,
                                    expression: "optional"
                                },
                            },

                        }
                    },
                },
                addons: {
                    uses: "addons",
                    items: {
                        dataHandling: {
                            uses: "dataHandling"
                        },
                    },
                },
                sorting: {
                    uses: "sorting"
                },
                appearance: {
                    uses: "settings",
                }
            }
        },
        paint: function ( $element, layout ) {
            
            echarts.dispose($element[0]); 

            console.log(layout);

            var dimensionArray      = getDimensionArray(layout);
            var serieArray          = getSerieArray(layout);
            var expressionNameArray = getExpressionsNameArray(layout)
            var expressionColorArray = getExpressionColorArray(layout)
            console.log(serieArray)

            
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

        },
        resize: function($element) {

            echarts.init($element[0]).resize()

        }

}} );