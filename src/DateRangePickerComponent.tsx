import React, { useEffect, useRef } from 'react';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css'
import moment from 'moment';
import daterangepicker from 'daterangepicker';
import {
    faCalendar,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DateRangePickerProps {
   startDate: string;
   endDate: string;
}

export default function DateRangePickerComponent({startDate, endDate}: DateRangePickerProps) {

    const pickerRef = useRef<HTMLDivElement | null>(null);
    const pickerTextRef = useRef<HTMLElement | null>(null);

    const showRange = (start: any, end: any): void  => {
        pickerTextRef.current!.innerText = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
    }

    const showDefaultRange = () => {
        const start = moment().subtract(29, 'days');
        const end = moment();
        showRange(start, end);
    };

    useEffect(() => {
        if (pickerRef.current == null) {
            console.log("NOTHING");
            return;
        }
        const start = moment().subtract(29, 'days');
        const end = moment();

        new daterangepicker(
            pickerRef.current!,
            {
                startDate: start,
                endDate: end,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, showRange);

        showDefaultRange();
    }, []);

    return (
        <div ref={pickerRef}
             style={{width: '26rem', color: 'black', background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc'}}>
            <FontAwesomeIcon icon={faCalendar} />&nbsp;
            <span ref={pickerTextRef}></span>
            &nbsp;<FontAwesomeIcon icon={faCaretDown} />
        </div>
    );
}
