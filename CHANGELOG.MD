# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.9.0] - 2021-11-25

### Changed

- 'Settings' section name changed to 'Global Settings'
- e-charts version updated to 5.2.1;

### Addded

- Option to use a custom data label;
- Option 'Use Global Settings' in measure, now you can overwrite global settings for one particular measure giving more control in the visualization;
- 'Switch Axis' option on 'Grid' section that invert 'X' and 'Y' axis;
- Option to Show/Hide the data zoom.
- Add more samples


## [2.8.1] - 2021-06-20

### Changed

- fix bug problem that make line width always be 0

## [2.8.0] - 2021-06-15

### Addded

- Now you can export the extension as image and PDF. ( It is working on StoryTelling);
- e-charts version updated to 5.1.2;
- Now can you select different icons to line and bar measure type;
- Now can you change the symbol size of line measures.


## [2.7.0] - 2021-06-05

### Addded

- Add 'Keep Colors' on 'On Focus' option;



## [2.6.0] - 2021-05-27

### Addded

- Now you can change legend position;
- Now you can change legend distance of the corner based in legend position.

### Changed

- Now you can add 15 measures;
- Paint method return qlik.promise.

## [2.5.0] - 2021-04-03

### Added

- You can now change the line width;
- Now you can choose between 'Solid','Dashed' or 'Dotted' line types;
- Add option to put border on data labels and choose their color;
- Option to allow users to drag and drop the position of the data label (only works when the border width is 0), with this functionality you can enable the label line option as well;
- You can define axis label color with expression;
- You can put border on axis label and choose its color;
- You can put border on legend text and choose its color;
- Add 'yAxis: Left' and 'yAxis: Right' settings to define custom max and min values and define its visibility

## [2.4.0] - 2021-03-31

### Added

- Now you can change the chart position with Grid options. 

### Changed

- DataZoom appears correct now.
- update 'README.md' file.

## [2.3.0] - 2021-03-26

### Added

- Add legend text size option

## [2.2.0] - 2021-03-17

### Added

- Add bar options in settings (barWidth,minBarWidth,maxBarWidth)

### Changed

- Bar Gap options changed from 'Other' to 'Bar Options'

## [2.1.0] - 2021-03-10

### Added

- Add option to change legend text color.

### Changed

- Add label in 'change icon' dropdow.


## [2.0.0] - 2021-03-06

### Added

- This changelog file
- 'Legend' section is added into 'Settings', now you can: Hide/Show the legend and  change legends icon.
- 'On Focus' section is added into 'Settings', now you can hight the measures on mouse hover.
- In 'Others' section you can hide zero values in graph.

### Changed

- Echarts version updated to [5.0](https://echarts.apache.org/en/tutorial.html#New%20features%20in%20ECharts%205)
- Metrics colors can be seted by expression.
- Is possible choose between 'By expression' and 'Single Color' in expression section.
- Don't shows 'Label Color' component when 'Label Color Auto' is setted as 'on'.
- Now DataZoom only appear when the number of dimension values is greater than 'Number Visible Items' in 'Others' section.
