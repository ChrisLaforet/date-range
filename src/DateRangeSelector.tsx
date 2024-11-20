import { DateRangePicker, DateRangePickerProps } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import type { RangeType } from 'rsuite/esm/DateRangePicker/types';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { DateRange } from 'rsuite/cjs/DateRangePicker';
import { useEffect } from 'react';

// first: npm install rsuite
// add to app: import 'rsuite/dist/rsuite-no-reset.min.css';

interface DateRangeSelectorProps {
    choiceEndsToday?: boolean;
    showToday?: boolean;
    showThisWeek?: boolean;
    showLast7Days?: boolean;
    showLast14Days?: boolean;
    showThisMonth?: boolean;
    showLast30Days?: boolean;
    showLastMonth?: boolean;
    showLast3Months?: boolean;
    showLast6Months?: boolean;
    showThisYear?: boolean;
    showLast2Years?: boolean;
    placeHolderPrompt?: string;
    onDateRangeChange: (start: string, end: string) => void;
}

export default function DateRangeSelector({showToday, showThisWeek, showLast7Days, showLast14Days, showThisMonth, showLast30Days,
                                              showLastMonth, showLast3Months, showLast6Months, showThisYear, showLast2Years,
                                              choiceEndsToday, placeHolderPrompt, onDateRangeChange}: DateRangeSelectorProps) {

    function handleDateRangeChange(value: DateRange | null) {
        if (value == null) {
            return;
        }
        const start = formatDate(value[0]);
        const end = formatDate(value[1]);
//console.log(start + " and " + end);
        onDateRangeChange(start, end);
    }

    function formatDate(value: Date): string {
        let day = ("0" + value.getDate()).slice(-2); // Format day to two digits
        let month = ("0" + (value.getMonth() + 1)).slice(-2); // Format month to two digits
        let year = value.getFullYear();
        return `${year}-${month}-${day}`;
    }

    function prepareRanges(): RangeType[] {
        const ranges: RangeType[] = [];
        if (showToday) {
            ranges.push({
                label: 'Today',
                value: [new Date(), new Date()],
                placement: 'left'
            });
        }
        if (showThisWeek) {
            ranges.push(        {
                label: 'This week',
                value: [startOfWeek(new Date()), endOfWeek(new Date())],
                placement: 'left'
            });
        }
        if (showLast7Days) {
            ranges.push({
                    label: 'Last 7 days',
                    value: [subDays(new Date(), 6), new Date()],
                    placement: 'left'
            });
        }
        if (showLast14Days) {
            ranges.push(        {
                label: 'Last 14 days',
                value: [subDays(new Date(), 13), new Date()],
                placement: 'left'
            });
        }
        if (showThisMonth) {
            ranges.push({
                label: 'This month',
                value: [startOfMonth(new Date()), new Date()],
                placement: 'left'
            });
        }
        if (showLast30Days) {
            ranges.push({
                label: 'Last 30 days',
                value: [subDays(new Date(), 29), new Date()],
                placement: 'left'
            });
        }
        if (showLastMonth) {
            ranges.push({
                label: 'Last month',
                value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
                placement: 'left'
            });
        }
        if (showLast3Months) {
            ranges.push({
                label: 'Last 3 months',
                value: [startOfMonth(addMonths(new Date(), -3)), endOfMonth(addMonths(new Date(), -1))],
                placement: 'left'
            });
        }
        if (showLast6Months) {
            ranges.push({
                label: 'Last 6 months',
                value: [startOfMonth(addMonths(new Date(), -6)), endOfMonth(addMonths(new Date(), -1))],
                placement: 'left'
            });
        }
        if (showThisYear) {
            ranges.push({
                label: 'This year',
                value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
                placement: 'left'
            });
        }
        if (showLast2Years) {
            ranges.push({
                label: 'Last 2 years',
                value: [new Date(new Date().getFullYear() - 2, 0, 1), new Date()],
                placement: 'left'
            });
        }
        return ranges;
    }

    function shouldDisableDate(date: Date): boolean {
        const now = new Date();
        if (date.getFullYear() > now.getFullYear()) {
            return true;
        } else if (date.getFullYear() == now.getFullYear()) {
            if (date.getMonth() > now.getMonth()) {
                return true;
            } else if (date.getMonth() == now.getMonth() && date.getDate() > now.getDate()) {
                return true;
            }
        }

        return false;
    }

    function getDynamicProps(): DateRangePickerProps {
        const props: DateRangePickerProps = {};

        if (choiceEndsToday) {
            props["shouldDisableDate"] = shouldDisableDate
        }
        if (placeHolderPrompt != null && placeHolderPrompt.length > 0) {
            props["placeholder"] = placeHolderPrompt;
        }
        console.log(props)
        return props;
    }

    return (
        <DateRangePicker
            {...getDynamicProps()}
            ranges={prepareRanges()}
            //placeholder="Enter range"
            style={{ width: 300 }}
            format={'MM/dd/yyyy'}
            character={" - "}
            onChange={handleDateRangeChange}

        />
    );
}
