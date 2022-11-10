import * as d3 from 'd3';
import { PriceType, SymbolToTHLOCMap, Ticker } from '@modules/domain';
import moment from 'moment';

const PADDING = 30;

type DataPoint = {
  time: number;
  value: number;
};

export class LinesChart {
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  height: number;
  width: number;
  xScale: d3.AxisScale<number>;
  yScale: d3.AxisScale<number>;
  xAxis: d3.Axis<number>;
  yAxis: d3.Axis<number>;
  priceType: PriceType;
  hlocData: SymbolToTHLOCMap;
  selectedTickers: Array<Ticker>;
  dateFrom: Date;
  dateTo: Date;

  constructor(
    anchor: HTMLElement,
    dateFrom: Date,
    dateTo: Date,
    selectedTickers: Array<Ticker>,
    hlocData: SymbolToTHLOCMap
  ) {
    this.height = anchor.clientHeight;
    this.width = anchor.clientWidth;
    this.selectedTickers = selectedTickers;
    this.hlocData = hlocData;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;

    this.initialise(anchor);
  }

  resize = (anchor: HTMLElement) => {
    this.height = anchor.clientHeight;
    this.width = anchor.clientWidth;

    this.destroy();
    this.initialise(anchor);
  };

  initialise = (anchor: HTMLElement) => {
    this.xScale = d3
      .scaleLinear()
      .range([PADDING, this.width - PADDING])
      .domain([this.dateFrom.getTime(), this.dateTo.getTime()]);

    this.yScale = d3
      .scaleLinear()
      .range([PADDING, this.height - PADDING])
      .domain([100, 0]);
    this.xAxis = d3
      .axisBottom(this.xScale)
      .tickFormat((timestamp) => moment(timestamp).format('D-MMM'));
    this.yAxis = d3.axisLeft(this.yScale);

    this.svg = d3
      .select(anchor)
      .append('svg')
      .attr('class', 'sch-chart__svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg
      .append('g')
      .attr('class', 'sch-chart__svg__x-axis')
      .attr('transform', `translate(${0}, ${this.height - PADDING})`)
      .call(this.xAxis);

    this.svg
      .append('g')
      .attr('class', 'sch-chart__svg__y-axis')
      .attr('transform', `translate(${PADDING}, ${0})`)
      .call(this.yAxis);

    this.updateChart();
  };

  parseData = (hlocData: SymbolToTHLOCMap): any => {
    // Iterating through selectedTickers instead of hlocData to keep order, for colour, last fixes
    return this.selectedTickers
      .map((ticker) => {
        const { symbol } = ticker;

        if (!hlocData[symbol] || hlocData[symbol].s === 'no_data') {
          return null;
        }
        const times = hlocData[symbol]['t'];
        const values = hlocData[symbol][this.priceType];

        const dataPoints: Array<DataPoint> = times.map((time, index) => ({
          time,
          value: values[index],
        }));

        return {
          symbol,
          dataPoints,
          timeDomain: {
            max: Math.max.apply(null, times),
            min: Math.min.apply(null, times),
          },
          valueDomain: {
            max: Math.max.apply(null, values),
            min: Math.min.apply(null, values),
          },
        };
      })
      .filter((data) => !!data);
  };

  updateSelectedTickers = (selectedTickers: Array<Ticker>) => {
    this.selectedTickers = selectedTickers;
  };

  renderNewData = (hlocData: SymbolToTHLOCMap) => {
    this.hlocData = hlocData;
    this.updateChart();
  };

  updateChart = () => {
    if (!this.hlocData) {
      return;
    }
    const allSymbolsDataPoints = this.parseData(this.hlocData);

    const selection = this.svg
      .selectAll('.sch-chart__svg__line')
      .data(allSymbolsDataPoints, (lineInfo: any) => lineInfo.symbol);

    selection.exit().remove();

    selection
      .enter()
      .append('svg:path')
      .attr(
        'class',
        (data, index) => `sch-chart__svg__line sch-chart__svg__line-${index}`
      )
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('d', (lineInfo) => {
        // @ts-ignore
        this.xScale.domain([lineInfo.timeDomain.min, lineInfo.timeDomain.max]);
        // @ts-ignore
        this.yScale.domain([
          lineInfo.valueDomain.max,
          lineInfo.valueDomain.min,
        ]);

        const lineGen = d3
          .line<DataPoint>()
          .x((data) => this.xScale(data.time))
          .y((data) => this.yScale(data.value));

        // @ts-ignore
        return lineGen(lineInfo.dataPoints);
      });

    selection
      .attr(
        'class',
        (data, index) => `sch-chart__svg__line sch-chart__svg__line-${index}`
      )
      .attr('d', (lineInfo) => {
        // @ts-ignore
        this.xScale.domain([lineInfo.timeDomain.min, lineInfo.timeDomain.max]);
        // @ts-ignore
        this.yScale.domain([
          lineInfo.valueDomain.max,
          lineInfo.valueDomain.min,
        ]);

        const lineGen = d3
          .line<DataPoint>()
          .x((data) => this.xScale(data.time))
          .y((data) => this.yScale(data.value));

        // @ts-ignore
        return lineGen(lineInfo.dataPoints);
      });
  };

  renderPriceType = (priceType: PriceType) => {
    this.priceType = priceType;
    this.updateChart();
  };

  destroy = () => {
    this.svg.remove();
  };
}
