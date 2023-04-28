define([
    'jquery',
    './echarts.min',
    './properties',
    'qlik'
],
    function ($, echarts, props, qlik) {
        //Number of initial rows used in qInitialDataFetch prop
        const initialRows = 625;


        function getDimensionArray(layout) {

            return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {
                return item[0].qText;
            });
        }

        function getColorType(layout, measurePosition) {

            return layout.qHyperCube.qMeasureInfo[measurePosition].colorType;
        }

        function getSerieValueItemStyleColor(layout, measurePosition, qMatrixItem) {

            var colorType = getColorType(layout, measurePosition);

            var color;

            //0 is single color 1 is color by expression
            if (colorType == 0) {
                color = layout.qHyperCube.qMeasureInfo[measurePosition].color.color
            } else if (colorType == 1) {
                color = qMatrixItem[measurePosition + 1].qAttrExps.qValues[0].qText
            }

            return color;
        }

        function getSerieValue(layout, measurePosition) {


            return layout.qHyperCube.qDataPages[0].qMatrix.map((item) => {

                var value = item[measurePosition + 1].qNum;

                //check if the number will be showed
                if (value == 0 && !layout.settings.others.showZeroBars) {
                    value = '-';
                }

                textValue = item[measurePosition + 1].qText

                //get custom label
                if (layout.qHyperCube.qMeasureInfo[measurePosition].customDataLabel && layout.qHyperCube.qMeasureInfo[measurePosition].customDataLabel.use) {
                    textValue = item[measurePosition + 1].qAttrExps.qValues[1].qText
                }

                return {
                    value: value
                    , valueText: textValue
                    //Make to get stack name in tool tip
                    , stack: layout.qHyperCube.qMeasureInfo[measurePosition].stack
                    , showInToolTip: layout.qHyperCube.qMeasureInfo[measurePosition].showInToolTip
                    , itemStyle: {
                        color: getSerieValueItemStyleColor(layout, measurePosition, item)
                    }
                }

            });
        }

        function getSerieLabel(layout, measurePosition) {

            settings = layout.settings

            var labelSettings = {
                show: settings.dataLabel.visibility,
                align: settings.dataLabel.align,
                fontSize: parseInt(settings.dataLabel.size),
                fontStyle: settings.dataLabel.style,
                position: settings.dataLabel.position,
                distance: parseInt(settings.dataLabel.distance),
                rotate: settings.dataLabel.rotate,
                formatter: function (params) {
                    return params.data.valueText;
                }
            }
            var measureInfo = layout.qHyperCube.qMeasureInfo[measurePosition];

            if (measureInfo.dataLabel.auto == false) {

                //set single color
                if (getColorType(layout, measurePosition) == 0) {

                    labelSettings.color = measureInfo.dataLabel.color.color;

                    //set color by expression
                } else if (getColorType(layout, measurePosition) == 1) {

                    labelSettings.color = measureInfo.dataLabel.colorExpression;
                }

                //Color Border
                if (measureInfo.dataLabel.border) {

                    labelSettings.textBorderWidth = measureInfo.dataLabel.border.width

                    if (getColorType(layout, measurePosition) == 0) {

                        labelSettings.textBorderColor = color = measureInfo.dataLabel.border.color.color;

                    } else if (getColorType(layout, measurePosition) == 1) {

                        labelSettings.textBorderColor = measureInfo.dataLabel.border.colorExpression;
                    }
                }

            }

            if (settings.dataLabel.family) {
                labelSettings.fontFamily = settings.dataLabel.family
            }

            if (settings.dataLabel.weight === 'custom') {
                labelSettings.fontWeight = parseInt(settings.dataLabel.weightCustom)
            } else {
                labelSettings.fontWeight = settings.dataLabel.weight
            }


            //Overwrite global settings
            if (measureInfo.globalSettings && !measureInfo.globalSettings.use) {

                labelSettings.show = measureInfo.globalSettings.dataLabel.visibility;
                labelSettings.align = measureInfo.globalSettings.dataLabel.align;
                labelSettings.fontSize = parseInt(measureInfo.globalSettings.dataLabel.size);
                labelSettings.position = measureInfo.globalSettings.dataLabel.position;
                labelSettings.distance = parseInt(measureInfo.globalSettings.dataLabel.distance);
                labelSettings.rotate = measureInfo.globalSettings.dataLabel.rotate;

                if (measureInfo.globalSettings.dataLabel.weight && measureInfo.globalSettings.dataLabel.weight === 'custom') {
                    labelSettings.fontWeight = parseInt(measureInfo.globalSettings.dataLabel.weightCustom)
                } else if (measureInfo.globalSettings.dataLabel.weight) {
                    labelSettings.fontWeight = measureInfo.globalSettings.dataLabel.weight
                }

                if (measureInfo.globalSettings.dataLabel.family) {
                    labelSettings.fontFamily = measureInfo.globalSettings.dataLabel.family
                }

            }

            return labelSettings;

        }

        function getAxisLabel(layout) {

            axisLabelLayout = layout.settings.axisLabel

            var labelSettings = {
                show: axisLabelLayout.visibility,
                align: axisLabelLayout.align,
                fontSize: parseInt(axisLabelLayout.size),
                fontWeight: axisLabelLayout.weight,
                fontStyle: axisLabelLayout.style,
                rotate: axisLabelLayout.rotate
            }


            //get text color
            if (axisLabelLayout.colorType >= 0) {

                if (axisLabelLayout.colorType == 0) {
                    labelSettings.color = axisLabelLayout.color.color

                } else if (axisLabelLayout.colorType == 1) {
                    labelSettings.color = axisLabelLayout.colorByExpression

                }
            }

            //Get text border
            if (axisLabelLayout.border) {

                labelSettings.textBorderWidth = axisLabelLayout.border.width

                if (axisLabelLayout.colorType == 0) {

                    labelSettings.textBorderColor = axisLabelLayout.border.color.color

                } else if (axisLabelLayout.colorType == 1) {

                    labelSettings.textBorderColor = axisLabelLayout.border.colorByExpression

                }

            }


            return labelSettings;

        }

        function getLabelLine(layout, measureInfo) {

            labelLineLayout = layout.settings.dataLabel.labelLine

            var labelLine = {
                show: true,
                length2: 5,
                lineStyle: {
                    width: parseInt(labelLineLayout.width),
                    opacity: labelLineLayout.opacity,
                    type: labelLineLayout.type
                }
            }


            //Define line color

            //Single Color
            if (labelLineLayout.colorType == 0) {

                labelLine.lineStyle.color = labelLineLayout.color.color
                //Color by expression
            } else if (labelLineLayout.colorType == 1) {

                labelLine.lineStyle.color = labelLineLayout.color.colorExpression

                //Keep Label Color
            } else if (labelLineLayout.colorType == 2) {

                if (measureInfo.colorType == 0) {
                    labelLine.lineStyle.color = measureInfo.dataLabel.color.color
                } else if (measureInfo.colorType == 1) {
                    labelLine.lineStyle.color = measureInfo.dataLabel.colorExpression
                }

            }

            return labelLine;

        }

        function getLabellabelLayout(layout) {

            var labelDrag = function (param) {
                return {
                    x: param.rect.x + (param.rect.width / 2),
                    y: param.labelRect.y,
                    draggable: true
                }
            };

            return labelDrag;

        }

        function getSerieCommumProperty(layout, measurePosition) {

            var measureInfo = layout.qHyperCube.qMeasureInfo[measurePosition];
            var settings = layout.settings;

            var commumProperty = {

                barGap: settings.barOptions.barGap,
                type: measureInfo.type,
                stack: measureInfo.stack,
                name: measureInfo.qFallbackTitle,
                largeThreshold: 7000
            };


            if (settings.grid.switchAxies) {
                commumProperty.xAxisIndex = measureInfo.yIndex;
            } else {
                commumProperty.yAxisIndex = measureInfo.yIndex;
            }

            if (measureInfo.line && measureInfo.type == 'line') {

                commumProperty.symbolSize = parseInt(measureInfo.line.symbolSize)
                commumProperty.lineStyle = {
                    width: parseInt(measureInfo.line.width),
                    type: measureInfo.line.type,
                }

                if (measureInfo.line.step)
                    commumProperty.step = measureInfo.line.step;
            }

            if (settings.dataLabel.drag && settings.dataLabel.drag.isDraggable) {
                commumProperty.labelLayout = getLabellabelLayout(layout)

                //Only show label line if labeldrag is active"
                if (settings.dataLabel.labelLine && settings.dataLabel.labelLine.show) {
                    commumProperty.labelLine = getLabelLine(layout, measureInfo)
                }
            }

            if (!settings.barOptions.barWidthAuto) {

                commumProperty.barWidth = settings.barOptions.barWidth
                commumProperty.barMaxWidth = settings.barOptions.maxBarWidth
                commumProperty.barMinWidth = settings.barOptions.minBarWidth
            }

            return commumProperty
        }

        function getEmphasis(layout) {

            var focus = layout.settings.focus

            //check if On Focus option is on
            if (!focus.on) {
                return { focus: 'none' }
            }

            var emphasis = {
                focus: 'series',
                label: {
                    fontSize: focus.label.size
                },
                itemStyle: {},
                lineStyle: {},

            };

            //Set single color
            if (focus.colorType == 0) {

                emphasis.label.color = focus.label.color.color
                emphasis.itemStyle.color = focus.item.color.color
                emphasis.lineStyle.color = focus.item.color.color

                //set expression colors if they not are ''    
            } else if (focus.colorType == 1) {

                if (!focus.label.colorExpression.color == '') {

                    emphasis.label.color = focus.label.colorExpression.color
                }
                if (!focus.item.colorExpression.color == '') {

                    emphasis.itemStyle.color = focus.item.colorExpression.color
                    emphasis.lineStyle.color = focus.item.colorExpression.color
                }
            }


            return emphasis;

        }

        function getSerieArray(layout) {
            serieArray = [];

            var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

            for (var x = 0; x < expressionNumber; x++) {

                serieArray[x] = getSerieCommumProperty(layout, x)
                serieArray[x].label = getSerieLabel(layout, x)
                serieArray[x].data = getSerieValue(layout, x)
                serieArray[x].emphasis = getEmphasis(layout)
            }

            if (layout.qHyperCube.qMeasureInfo)
                return serieArray;
        }

        function getExpressionColorArray(layout) {

            var expressionNumber = layout.qHyperCube.qMeasureInfo.length;
            var expressionColorArray = [];

            for (var x = 0; x < expressionNumber; x++) {

                expressionColorArray[x] = layout.qHyperCube.qMeasureInfo[x].color.color;

            }

            return expressionColorArray;

        }

        function getDimensionName(layout) {

            return layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0];
        }

        function getNumberVisibleItems(layout) {

            return layout.settings.others.numberVisibleItems - 1
        }

        function getDataZoom(layout) {

            visibleItens = getNumberVisibleItems(layout);
            qtdDimensionValues = getDimensionArray(layout).length

            //if to keep compatibility
            if (typeof (layout.settings.others.showDataZoom) === 'undefined') {

                showDataZoom = qtdDimensionValues >= visibleItens
            } else {

                showDataZoom = layout.settings.others.showDataZoom
            }

            let dataZoomProperty = {
                type: 'slider',
                show: showDataZoom,
                filterMode: 'empty'
            }

            if (layout.settings.grid.switchAxies) {
                dataZoomProperty.id = 'dataZoomY';
                dataZoomProperty.yAxisIndex = 0;
                dataZoomProperty.start = 100;
                dataZoomProperty.end = (1 - visibleItens / qtdDimensionValues) * 100;

            } else {
                dataZoomProperty.id = 'dataZoomX';
                dataZoomProperty.xAxisIndex = 0;
                dataZoomProperty.startValue = 0;
                dataZoomProperty.endValue = visibleItens
            }

            return [
                dataZoomProperty
            ];
        }


        function getGrid(layout) {

            gridLayout = layout.settings.grid

            var grid = {
                containLabel: gridLayout.containLabel,
                width: gridLayout.width,
                height: gridLayout.height
            }

            if (gridLayout.customGridPosition) {

                grid.left = gridLayout.position.left
                grid.right = gridLayout.position.right
                grid.top = gridLayout.position.top
                grid.bottom = gridLayout.position.bottom

            }


            return grid
        }

        function getLegendTextStyle(layout) {

            legendLayout = layout.settings.legend.text;

            var legendTextStyle = {
                fontSize: legendLayout.size
            }

            if (layout.settings.legend.colorType == 0) {

                legendTextStyle.color = legendLayout.color.color

            } else if (layout.settings.legend.colorType == 1) {

                legendTextStyle.color = legendLayout.colorExpression

            }

            if (legendLayout.border) {

                legendTextStyle.textBorderWidth = legendLayout.border.width

                if (layout.settings.legend.colorType == 0) {

                    legendTextStyle.textBorderColor = legendLayout.border.color.color

                } else if (layout.settings.legend.colorType == 1) {

                    legendTextStyle.textBorderColor = legendLayout.border.colorExpression

                }

            }



            return legendTextStyle

        }

        function getLegendPosition(legendLayout) {

            legendPosition = {}
            legendPosition[legendLayout.position] = legendLayout.distance

            if (legendLayout.position == 'left' || legendLayout.position == 'right') {
                legendPosition.orient = 'vertical'

            }

            return legendPosition;
        }

        function getLegendIcon(legendProperty, measureType) {

            //If measure type is bar or iconline don't exists
            if (measureType == 'bar' || !legendProperty.iconLine) {

                legendType = 'icon'

            } else if (measureType == 'line') {

                legendType = 'iconLine'

            }

            return legendProperty[legendType]
        }

        function geLegendData(layout) {

            var legendDataArray = [];
            var expressionNumber = layout.qHyperCube.qMeasureInfo.length;

            for (var x = 0; x < expressionNumber; x++) {

                if (typeof (layout.qHyperCube.qMeasureInfo[x].showInLegend) === 'undefined' || layout.qHyperCube.qMeasureInfo[x].showInLegend) {

                    measureInfo = layout.qHyperCube.qMeasureInfo[x];

                    icon = getLegendIcon(layout.settings.legend, measureInfo.type)
                    dataItem = {
                        name: measureInfo.qFallbackTitle,
                        icon: icon
                    }

                    legendDataArray.push(dataItem)
                }


            }

            return legendDataArray;
        }

        function getLegend(layout) {

            var legend = {
                show: layout.settings.legend.visibility,
                textStyle: getLegendTextStyle(layout),
                data: geLegendData(layout)
            }

            if (layout.settings.legend.position) {

                var legendPosition = getLegendPosition(layout.settings.legend)

                //put the selected position in legend object.
                for (x in legendPosition) {
                    legend[x] = legendPosition[x]
                }
            }

            return legend;

        }

        function getXAxis(layout) {

            var xAxis = {
                data: getDimensionArray(layout),
                axisLabel: getAxisLabel(layout)
            }


            return xAxis;

        }

        function getYAxisProperty(yAxis) {

            yAxisProperty = {
                show: yAxis.show,
                inverse: yAxis.inverse
            }

            if (!yAxis.autoInterval) {

                if (yAxis.intervalType == 0 || yAxis.intervalType == 2) {

                    yAxisProperty.min = yAxis.min
                }

                if (yAxis.intervalType == 1 || yAxis.intervalType == 2) {

                    yAxisProperty.max = yAxis.max
                }

            }

            if (yAxis.label && !yAxis.label.on) {
                yAxisProperty.axisLabel = {
                    formatter: function (value) {

                        options = {
                            style: yAxis.label.style,
                            currency: yAxis.label.currencySymbol,
                            minimumFractionDigits: parseInt(yAxis.label.minFractDigits)
                        }

                        return new Intl.NumberFormat(yAxis.label.locales, options).format(value)

                    }
                }
            }

            return yAxisProperty;

        }

        function getYAxis(layout) {

            if (layout.settings.yAxis) {

                var yAxis = [
                    getYAxisProperty(layout.settings.yAxis.left),
                    getYAxisProperty(layout.settings.yAxis.right)
                ]

            } else {

                var yAxis = [{ show: false }, { show: false }]
            }


            return yAxis;

        }

        //Get all date from the cube
        async function getWholeHyperCube(layout, self) {

            const totalRows = layout.qHyperCube.qSize.qcy;
            const totalColuns = layout.qHyperCube.qSize.qcx;

            //check if the initial dataset already is full
            if (initialRows / totalColuns >= totalRows) {
                return layout;

            }

            async function fetchPage(arrayLen) {

                var requestPage = [{
                    qTop: arrayLen,
                    qLeft: 0,
                    qWidth: totalColuns,
                    qHeight: Math.min(initialRows, totalRows - arrayLen)
                }];

                const aux = await self.backendApi.getData(requestPage)

                return aux[0].qMatrix;

            }

            let tempArray = [...layout.qHyperCube.qDataPages[0].qMatrix];
            const maxRowsNumber = totalRows;

            while (tempArray.length < maxRowsNumber) {
                tempArray = tempArray.concat(await fetchPage(tempArray.length));
            }

            layout.qHyperCube.qDataPages[0].qMatrix = [...tempArray];

            return layout;


        }

        function getToolTipFormatter(layout, tooltipSettings) {

            if (tooltipSettings.customFormatter.use) {
                return new Function('params', tooltipSettings.customFormatter.function);
            }

            if (tooltipSettings.customFormatter.sortByStack) {

                return function (params) {
                    tooltip = params[0].axisValue + '<br><br>'
                    measureArray = {}

                    params.forEach((variavel) => {
                        if (variavel.data.showInToolTip) {
                            if (!measureArray[variavel.data.stack])
                                measureArray[variavel.data.stack] = [];

                            tooltipTemp = ''

                            tooltipTemp = tooltipTemp + '<div style="min-width:' + tooltipSettings.minWidth + ';display: flex;justify-content: space-between;">'
                            tooltipTemp = tooltipTemp + '<span>' + variavel.marker + variavel.seriesName + ':</span>' + variavel.data.valueText
                            tooltipTemp = tooltipTemp + '</div>'
                            measureArray[variavel.data.stack].push(tooltipTemp)

                        }
                    })

                    for (stack in measureArray) {
                        tooltip = tooltip + stack + '<br>'
                        measureArray[stack].forEach((measures) => {
                            tooltip = tooltip + measures
                        })
                        tooltip = tooltip + '<br>'
                    }

                    return tooltip
                }
            }


            return function (params) {
                tooltip = params[0].axisValue

                params.forEach((variavel) => {
                    if (variavel.data.showInToolTip) {
                        tooltip = tooltip + '<div style="min-width:' + tooltipSettings.minWidth + ';display: flex;justify-content: space-between;">'
                        tooltip = tooltip + '<span>' + variavel.marker + variavel.seriesName + ':</span>' + variavel.data.valueText
                        tooltip = tooltip + '</div>'
                    }

                })

                return tooltip
            }

        }

        function getToolTip(layout) {

            var toolTip = {
                show: false,
                trigger: 'axis',
                textStyle: {}
            }

            if (!layout.settings.tooltip || !layout.settings.tooltip.show)
                return toolTip;

            tooltipSettings = layout.settings.tooltip
            toolTip.show = tooltipSettings.show
            toolTip.alwaysShowContent = tooltipSettings.alwaysShow
            toolTip.transitionDuration = tooltipSettings.transitionDuration
            toolTip.backgroundColor = tooltipSettings.backgroundColor
            toolTip.borderWidth = parseInt(tooltipSettings.borderWidth)
            toolTip.borderColor = tooltipSettings.borderColor
            toolTip.textStyle.textBorderWidth = tooltipSettings.text.border.width
            toolTip.textStyle.fontSize = parseInt(tooltipSettings.text.size)

            toolTip.formatter = getToolTipFormatter(layout, tooltipSettings)


            if (layout.settings.tooltip.colorType == 0) {

                toolTip.textStyle.color = tooltipSettings.text.color.color
                toolTip.textStyle.textBorderColor = tooltipSettings.text.border.color.color

            } else if (layout.settings.tooltip.colorType == 1) {

                toolTip.textStyle.color = tooltipSettings.text.colorExpression
                toolTip.textStyle.textBorderColor = tooltipSettings.text.border.colorByExpression

            }

            return toolTip;

        }

        return {

            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{
                        qWidth: 16,
                        qHeight: initialRows
                    }]
                }
            },
            definition: props,
            support: { snapshot: true, export: true, exportData: true },
            paint: async function ($element, layout) {

                echarts.dispose($element[0]);

                try {

                    layout = await getWholeHyperCube(layout, this);

                } catch (errorMsg) {
                    console.log(errorMsg)
                }


                var dimensionName = getDimensionName(layout);
                var serieArray = getSerieArray(layout);
                var expressionColorArray = getExpressionColorArray(layout)
                var legend = getLegend(layout);
                var dataZoomArray = getDataZoom(layout);
                var grid = getGrid(layout);
                var xAxis = getXAxis(layout);
                var yAxis = getYAxis(layout);
                var toolTip = getToolTip(layout);

                //Switch Axies
                //Is needed change dataZoom prop too
                if (layout.settings.grid.switchAxies) {
                    xAxis = getYAxis(layout);
                    yAxis = getXAxis(layout);
                }

                var myChart = echarts.init($element[0]);

                var option = {
                    color: expressionColorArray,
                    legend: legend,
                    dataZoom: dataZoomArray,
                    grid: grid,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    tooltip: toolTip,
                    series: serieArray
                };

                console.log(option)

                myChart.setOption(option);

                myChart.on('click', function (params) {
                    qlik.currApp(this).field(dimensionName).selectValues([params.name], true, true)

                });



                var defer = qlik.Promise.defer();

                /*Alert when the extension finish the rendering and wait one second*/
                myChart.on('finished', function () {
                    setTimeout(function () {
                        defer.resolve();
                    }, 1000);

                });

                return defer.promise;

            },
            resize: function ($element) {

                echarts.init($element[0]).resize()

            }

        }
    });