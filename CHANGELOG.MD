# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [2.18.0] - 2025-09-06

### Added

- Add options to change these object CSS: Background-color, border-style, border-width, border-color

### Changed

- e-charts version updated to 6.0.0;


## [2.17.0] - 2023-06-08



## [2.16.0] - 2023-05-10

### Added

- Add option to change line symbol type


## [2.15.0] - 2023-04-28

### Added

- Add option to hide measures in legend

## [2.14.0] - 2023-04-01

### Addded

- Add line step option (Thanks to HG14 for this feature)


## [2.14.0] - 2023-04-01

### Addded

- Add Tooltip Section
- Add option to show/hide individual expression in tooltip

### Changed

- e-charts version updated to 5.4.2;

## [2.13.0] - 2022-11-04

### Addded

- Now you can pick custom font bold;
- Now you can pick font bold for individual measures;
- Now you can change font family of data label

### Changed

- e-charts version updated to 5.4.0;
- Data label rotation changed from slider to expression box

## [2.12.0] - 2022-08-13

### Addded

- Add axis label formatter option in 'yAxis: Left' and 'yAxis: Right' section.

## [2.11.0] - 2022-02-25

### Changed

- e-charts version updated to 5.3.3;
- parseInt line size

## [2.10.0] - 2022-02-25

### Changed

- e-charts version updated to 5.3;

### Addded

- Now the extension get the whole dataset using getData function from the api.

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
