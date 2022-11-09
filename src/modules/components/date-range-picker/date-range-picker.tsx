import React, { useEffect, useRef } from 'react';
import { Litepicker } from 'litepicker';
import { TDateFromTo } from '@modules/domain';
import './date-range-picker.less';

type TDateRangePicker = {
  dateFrom: Date;
  dateTo: Date;
  onDateRangeChanged: (props: TDateFromTo) => any;
};
export const DateRangePicker = ({
  dateFrom,
  dateTo,
  onDateRangeChanged,
}: TDateRangePicker): JSX.Element => {
  const dateFromRef = useRef();
  const dateToRef = useRef();

  useEffect(() => {
    const pickerFrom = new Litepicker({
      element: dateFromRef.current,
      singleMode: true,
      setup: (picker) => {
        picker.on('selected', (newDate) => {
          onDateRangeChanged({ dateFrom: newDate });
        });
      },
    });

    const pickerTo = new Litepicker({
      element: dateToRef.current,
      singleMode: true,
      setup: (picker) => {
        picker.on('selected', (newDate) => {
          onDateRangeChanged({ dateTo: newDate });
        });
      },
    });

    return () => {
      pickerFrom.destroy();
      pickerTo.destroy();
    };
  }, []);

  return (
    <div className="sch-date-range-picker">
      <label ref={dateFromRef}>{dateFrom.toDateString()}</label>
      <label>-- to --</label>
      <label ref={dateToRef}>{dateTo.toDateString()}</label>
    </div>
  );
};
