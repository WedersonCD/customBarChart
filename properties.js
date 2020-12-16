
define( [], function () {
    return {
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
                            color: "#4477aa",
                            index: "-1"
                          }
                    },
                    LabelAutoColor: {
                        ref: "qDef.dataLabel.auto",
                        type: "boolean",
                        component: "switch",
                        label: "Label Color Auto",
                        options: [{
                            value: true,
                            label: "On"
                        }, {
                            value: false,
                            label: "Off"
                        }],
                        defaultValue: true
                    },
                    LabelColor:{
                        ref: "qDef.dataLabel.color",
                        component: "color-picker",
                        label: "label color",
                        type: "object",
                        defaultValue: {
                            color: "#fff",
                            index: "-1"
                          }
                    },
                    
                }
            },
            Settings:{
                component: "expandable-items",
                label: "Settings",
                items:{
                    DataLabel:{
                        type: "items",
                        label: "Data Label",
                        items: {
                            LabelVisibility: {
                                ref: "settings.dataLabel.visibility",
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
                                ref: "settings.dataLabel.distance",
                                label: "Distance",
                                type: "string",
                                defaultValue: 5,
                                expression: "optional"
                            },
                            LabelRotate: {
                                type: "number",
                                component: "slider",
                                label: "Rotate",
                                ref: "settings.dataLabel.rotate",
                                min: -90,
                                max: 90,
                                step: 1,
                                defaultValue: 0
                            },
                            LabelPosition:{
                                ref: "settings.dataLabel.position",
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
                                ref: "settings.dataLabel.style",
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
                                ref: "settings.dataLabel.weight",
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
                                ref: "settings.dataLabel.size",
                                label: "Size",
                                type: "string",
                                defaultValue: 15,
                                expression: "optional"
                            },
                            LabelFontAlign:{
                                ref: "settings.dataLabel.align",
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
                    AxisLabel:{
                        type: "items",
                        label: "Axis Label",
                        items: {
                            LabelVisibility: {
                                ref: "settings.axisLabel.visibility",
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
                            LabelRotate: {
                                type: "number",
                                component: "slider",
                                label: "Rotate",
                                ref: "settings.axisLabel.rotate",
                                min: -90,
                                max: 90,
                                step: 1,
                                defaultValue: 0
                            },
                            LabelFontStyle:{
                                ref: "settings.axisLabel.style",
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
                                ref: "settings.axisLabel.weight",
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
                                ref: "settings.axisLabel.size",
                                label: "Size",
                                type: "string",
                                defaultValue: 15,
                                expression: "optional"
                            },
                            LabelFontAlign:{
                                ref: "settings.axisLabel.align",
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
                            LabelColor: {
                                ref: "settings.axisLabel.color",
                                component: "color-picker",
                                label: "font color",
                                type: "object",
                                defaultValue: {
                                    color: "#333",
                                    index: "-1"
                                  }
                            },
                        }
                    },
                    Others:{
                        type: "items",
                        label: "Others",
                        items: {
                            BarGap: {
                                ref: "settings.others.barGap",
                                label: "Bar Gap",
                                type: "string",
                                defaultValue: 0,
                                expression: "optional"
                            },
                            NumberVisibleItems:{
                                ref: "settings.others.numberVisibleItems",
                                label: "Number Visible Items",
                                type: "string",
                                defaultValue: 12,
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
    };
});