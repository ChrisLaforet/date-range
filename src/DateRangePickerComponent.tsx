import React, { useEffect, useRef } from 'react';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css'
import moment from 'moment';
import daterangepicker, { Options } from 'daterangepicker';
import {
    faCalendar,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Reference is at: https://www.daterangepicker.com/

interface DateRangePickerProps {
   days?: number;
   minDate?: string;
   maxDate?: string;
   maxDateIsToday: boolean;
   alwaysShowCalendars?: boolean;
   showMonthYearDropdowns?: boolean;
}

export default function DateRangePickerComponent({days, minDate, maxDate, maxDateIsToday, alwaysShowCalendars, showMonthYearDropdowns}: DateRangePickerProps) {

    const pickerRef = useRef<HTMLDivElement | null>(null);
    const pickerTextRef = useRef<HTMLElement | null>(null);

    const showRange = (start: any, end: any): void  => {
        pickerTextRef.current!.textContent = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
    }

    useEffect(() => {
        if (pickerRef.current == null) {
            console.log("NOTHING");
            return;
        }
        const start = moment().subtract(days != null ? days : 7, 'days');
        const end = moment();

        const parameters: Options = {
            startDate: start,
            endDate: end,
            showDropdowns: true,
            timePicker24Hour: true,
            ranges: {
                'Today': [moment(), moment()],
                // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 2 Weeks': [moment().subtract(13, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Last 3 Months': [moment().subtract(2, 'month').startOf('month'), moment().endOf('month')]
            }
        };

        if (alwaysShowCalendars != null && alwaysShowCalendars) {
            parameters.alwaysShowCalendars = alwaysShowCalendars;
        }

        if (minDate != null) {
            parameters.minDate = minDate;
        }
        if (maxDateIsToday != null && maxDateIsToday) {
            parameters.maxDate = moment();
        } else if (maxDate != null) {
            parameters.maxDate = maxDate;
        }
        if (showMonthYearDropdowns != null && showMonthYearDropdowns) {
            parameters.showDropdowns = showMonthYearDropdowns;
        }

        new daterangepicker(pickerRef.current!, parameters, showRange);

        showRange(start, end);
    }, []);

    return (
        <div ref={pickerRef} id='reportrange'
             className="date-range-picker"
             // style={{width: '26rem', color: 'black', background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc'}}
        >
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp;
            <span ref={pickerTextRef}></span>
            &nbsp;
            <FontAwesomeIcon icon={faCaretDown} />
        </div>
    );
}
