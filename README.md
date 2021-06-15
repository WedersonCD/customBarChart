![](http://soeva.com.br/wp-content/uploads/2020/12/Logo500x111-1.png)

------------

### Custom Bar Chart

A custom bar/line chart created based in [echarts library](https://echarts.apache.org/en/index.html "echarts library").

See the changes [here](https://github.com/WedersonCD/customBarChart/blob/main/CHANGELOG.MD "Changed Log"), updated in 2021-06-11.

- Expression Options
- Data Label Settings
- Axis Label Settings
- Legend
- On Focus
- Bar Options
- yAxis
- Grid Settings
- Others Settings
- Samples


### Expression Options

------------

- stack: Stack the measures on your on way! if two or more measures have the same stack property they are satcked.

- type: How the measure will be presented, in bar or line.

- line type: If 'type' option is 'Line' you can choose between 'Solid','Dashed' or 'Dotted' line types.

- line width: If 'type' option is 'Line' you can define the line width.

- line symbol size: change the line simbol size

- y-axis: Defines which y-axis the measure will follow.

- color: Define the measure color.

- label color auto: Let Echarts select the right color.

- label color: select label color. (label color auto option must be off) 

- label border width: Change border width

- label border border: Change border color


### Data Label Settings

------------

- visibility: Show/Hide

- distance: Distance to the host graphic element. Works when position is  value 'top' ou 'insideRight'.

- rotate: Rotate label, from -90 degree to 90, positive value represents rotate anti-clockwise.

- position: label position

- style: font style.

- Weight: font thick weight.

- Size: font size.

- Align: Horizontal alignment of text.

- Allow Drag&Drop: If this option is ennable allow to users change data label position. (Label border width must be 0)

- Show Lable Line: Place a connected line between the label and the Bar/Line


### Axis Label Settings

------------

- visibility: Show/Hide

- rotate: Rotate label, from -90 degree to 90, positive value represents rotate anti-clockwise.

- style: font style.

- Weight: font thick weight.

- Size: font size.

- Align: Horizontal alignment of text.

- text border width: Change border width

- text border border: Change border color


### Legend Settings

------------

- visibility: Show/Hide.

- position: legend position.

- distance: distance between the legend and the corner, can be absolute or relative values like 0,20,0%,20% etc.

- bar legend icon: legend icon shape of the bar measures.

- line legend icon: legend icon shape of the line measures.

- text size: font size.

- color type: change between single color or color by expression

- text color: text color.

- text border width: width value of the text vorder.

- text border color: color of the border


### On Focus

------------

- Focus: On/Off focus based in [emphasis](https://echarts.apache.org/en/option.html#series-bar.emphasis) echarts funcionality

- Color: Bar/line color.

- Label Color: Label color

- Label Size: Label Size.

### Bar Options

------------

- Bar Gap: gap between the bars in %, you can use '30%' or 0.3 values. Use '-100%' to overlap the bars.

- Bar Width Auto: Enable width bar options.

- Bar Width: Width of the bars, yout can use absolute values like '70' or percentage values like '20%'.

- Max\Min Bar Width: Define max and min values for bar width. 

### yAxis

------------

- visibility: Show/Hide the axis.

- Interval: Choose between custom and auto axis interval. You can set custom Max and Min values.

- Inverse: Invert the axis.

### Grid Options

------------

- Contain Label: Change the grid size based on label. ( see more [here](https://echarts.apache.org/en/option.html#grid.containLabel) )

- Custom Grid Position: Enable grid position options

- Left\Right\Top\Bottom: Define the position of the chart relative to each side. Can be absolute values like '60' or percentage values like '10%'.

- width\height: Define the Height and width of the chart, can be absolute values, percentage values or 'auto' to let eCharts define the values.


### Others Settings

------------

- Show Zero Values: Hide 0 values.

- Number Visible Items: Number of visible items in X axis.

### Samples

------------
![](https://i.imgur.com/X32MBv4.png)
![](https://i.imgur.com/FNvoj4D.png)
![](https://i.imgur.com/2x4x4nc.png)
![](https://i.imgur.com/U5t0ou2.png)
![](https://i.imgur.com/zgBTdmw.png)
![](https://i.imgur.com/zXC3fkG.png)
![](https://i.imgur.com/KhJFj3D.png)
