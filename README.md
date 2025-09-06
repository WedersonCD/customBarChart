
### Custom Bar Chart

A custom bar/line chart created based in [echarts library](https://echarts.apache.org/en/index.html "echarts library").

See the changes [here](https://github.com/WedersonCD/customBarChart/blob/main/CHANGELOG.MD "Changed Log"), updated in 2025-09-06.

- Expression Options
- Data Label Settings
- Axis Label Settings
- Legend
- On Focus
- Bar Options
- yAxis
- Grid Settings
- Tooltip Settings
- Object Style
- Others Settings
- Samples


### Expression Options

------------

- stack: Stack the measures on your on way! if two or more measures have the same stack property they are satcked;

- type: How the measure will be presented, in bar or line;

- line type: If 'type' option is 'Line' you can choose between 'Solid','Dashed' or 'Dotted' line types;

- line width: If 'type' option is 'Line' you can define the line width;

- line symbol size: change the line simbol size;

- y-axis: Defines which y-axis the measure will follow;

- color: Define the measure color;

- label Weight: font thick weight.

- label color auto: Let Echarts select the right color;

- label color: select label color. (label color auto option must be off);

- label border width: Change border width;

- label border border: Change border color.


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

- Label Formatter Auto: Show/Hide formatter options.

- Label Formatter Style: Style of the number.(Currency,percent and decimal)

- Label Formatter Currency Symbol: Currency symbol. (in  ISO 4217 partner,see more [here](https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=isin) )

- Label Formatter Currency Locales: Currency locales format. (in BCP 47 partner, see more [here](https://www.techonthenet.com/js/language_tags.php))

- Interval: Choose between custom and auto axis interval. You can set custom Max and Min values.

- Inverse: Invert the axis.

### Grid Options

------------
- Switch Axis: Switch X and Y axis making the graph horizontal.

- Contain Label: Change the grid size based on label. ( see more [here](https://echarts.apache.org/en/option.html#grid.containLabel) )

- Custom Grid Position: Enable grid position options

- Left\Right\Top\Bottom: Define the position of the chart relative to each side. Can be absolute values like '60' or percentage values like '10%'.

- width\height: Define the Height and width of the chart, can be absolute values, percentage values or 'auto' to let eCharts define the values.

### Tooltip Settings

------------

- Show: On/Off Tooltip

- Always Show: Whether to show tooltip content all the time. 

- Group By Stack: Group measures by value on stack property in individual measures.

- Transition Duration: Speed of tool tip.

- Use Custom Formatter: You can write a javascript function to draw the tooltip. ( see more [here](https://echarts.apache.org/en/option.html#tooltip.formatter) )

### Object Style

------------

- Use Object Style: Enable/Disable object style settings (On/Off). Default: Off.

- Include Object Title: Include the object title when applying the object style (On/Off). Default: Off.

- Background Color: Background color for the object (CSS color string). Default: rgba(255,255,255,0.7).

- Border Width (px): Border width in pixels. Default: 5.

- Border Color: Border color (CSS color string). Default: #333.

- Border Style: Border style (e.g., solid, dashed, dotted). Default: solid.


### Others Settings

------------

- Show Zero Values: Hide 0 values.

- Number Visible Items: Number of visible items in X axis.

### Samples

------------
![](https://i.imgur.com/X32MBv4.png)
![](https://i.imgur.com/FNvoj4D.png)
![](https://i.imgur.com/iLLN8VO.png)
![](https://i.imgur.com/2x4x4nc.png)
![](https://i.imgur.com/iQHXxPH.png)
![](https://i.imgur.com/zgBTdmw.png)
![](https://i.imgur.com/TP99m1c.png)
![](https://i.imgur.com/KhJFj3D.png)
