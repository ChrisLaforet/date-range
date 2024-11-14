import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css'
import moment from 'moment';

interface DateRangePickerProps {
   startDate: string;
   endDate: string;
}

export default function DateRangePickerComponent({startDate, endDate}: DateRangePickerProps) {

    const pickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
console.log("1")
        if (pickerRef.current) {
console.log("2")
            // Initialize the date range picker
            $(pickerRef.current).daterangepicker({
                startDate: startDate,
                endDate: endDate,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            });
        }

        // Cleanup function to remove the date range picker instance on unmount
        return () => {
            if (pickerRef.current) {
                $(pickerRef.current).data('daterangepicker')?.remove();
            }
        };
    }, [startDate, endDate]);

    useEffect(() => {
        const start = moment().subtract(29, 'days');
        const end = moment();

        function cb(start, end) {
            $(pickerRef).html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $(pickerRef.current).daterangepicker({
            startDate: startDate,
            endDate: endDate,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        });
    }, []);

    return (
        <div id="{pickerRef}"
             style={{background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%'}}>
            <i className="fa fa-calendar"></i>&nbsp;
            <span></span> <i className="fa fa-caret-down"></i>
        </div>
    );
}
