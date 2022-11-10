import React, { useRef, useState, useEffect } from 'react';
import { PriceType, SymbolToTHLOCMap, Ticker } from '@modules/domain';
import './chart.less';
import { LinesChart } from '@modules/components/chart/d3-chart';

type TChartProps = {
  priceType: PriceType;
  hlocData: SymbolToTHLOCMap;
  dateFrom: Date;
  dateTo: Date;
  selectedTickers: Array<Ticker>;
};

export const ChartWrapper = ({
  priceType,
  hlocData,
  dateFrom,
  dateTo,
  selectedTickers,
}: TChartProps): JSX.Element => {
  const d3ChartRef = useRef<LinesChart>();
  const chartContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    d3ChartRef.current = new LinesChart(
      chartContainerRef.current,
      dateFrom,
      dateTo,
      selectedTickers,
      hlocData
    );

    function handleResize() {
      // This needs to be throttled
      d3ChartRef.current.resize(chartContainerRef.current);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      d3ChartRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    d3ChartRef.current.renderPriceType(priceType);
  }, [priceType]);

  useEffect(() => {
    d3ChartRef.current.renderNewData(hlocData);
  }, [hlocData]);

  useEffect(() => {
    d3ChartRef.current.updateSelectedTickers(selectedTickers);
  }, [selectedTickers]);

  return <div className="sch-chart" ref={chartContainerRef}></div>;
};
