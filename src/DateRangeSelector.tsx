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
import { useEffect, useRef, useState } from 'react';

// first: npm install rsuite
// add to app: import 'rsuite/dist/rsuite-no-reset.min.css';
// documentation: https://rsuitejs.com/components/date-range-picker/#aria-properties

interface DateRangeSelectorProps {
    id: string;
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
    setRangeToPreset?: string;
    onDateRangeChange: (start: string, end: string) => void;
}

export default function DateRangeSelector({id, showToday, showThisWeek, showLast7Days, showLast14Days, showThisMonth, showLast30Days,
                                              showLastMonth, showLast3Months, showLast6Months, showThisYear, showLast2Years,
                                              choiceEndsToday, placeHolderPrompt, setRangeToPreset, onDateRangeChange}: DateRangeSelectorProps) {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    function handleDateRangeChange(value: DateRange | null) {
        if (value == null || value[0] == null || value[1] == null) {
            return;
        }
        const start = value[0];
        const end = value[1];
        if (!isDateAllowed(start) || !isDateAllowed(end)) {
            return;
        }

        setStartDate(start);
        setEndDate(end);
    }

    function handleExit() {
        // if (startDate == null) {
        //     alert("Bad dates 1")
        // } else if (endDate == null) {
        //     alert("Bad dates 2")
        // } else if (startDate > endDate) {
        //     alert("Dates are backwards")
        // }
    }

    function handleExiting() {
        // const inputElement = document.getElementById(id) as HTMLInputElement;
        // if (inputElement) {
        //     alert("Got reference")
        //     inputElement.value = "10/01/2024 - 11/20/2024";
        //     //inputElement.innerText = "10/01/2024 - 11/20/2024";
        // }

        if (startDate != null && endDate != null) {
            onDateRangeChange(formatDate(startDate), formatDate(endDate));
        }
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

    function isDateAllowed(date: Date): boolean {
        const now = new Date();
        if (date.getFullYear() > now.getFullYear()) {
            return true;
        } else if (date.getFullYear() === now.getFullYear()) {
            if (date.getMonth() > now.getMonth()) {
                return true;
            } else if (date.getMonth() === now.getMonth() && date.getDate() > now.getDate()) {
                return true;
            }
        }

        return false;
    }

    function shouldDisableDate(date: Date): boolean {
        return isDateAllowed(date);
    }

    function prepareRangeProps(presetName: string, props: DateRangePickerProps) {
        let range: DateRange | null = null;
        switch (presetName.toUpperCase()) {
            case "TODAY":
                range = [new Date(), new Date()];
                break;
            case "THISWEEK":
                let end = new Date();
                if (endOfWeek(new Date()) <= end) {
                    end = endOfWeek(new Date());
                }
                range = [startOfWeek(new Date()), end];
                break;
            case "LAST7DAYS":
                range = [subDays(new Date(), 6), new Date()];
                break;
            case "LAST14DAYS":
                range = [subDays(new Date(), 13), new Date()];
                break;
            case "THISMONTH":
                range = [startOfMonth(new Date()), new Date()];
                break;
            case "LAST30DAYS":
                range = [subDays(new Date(), 29), new Date()];
                break;
            case "LASTMONTH":
                range = [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))];
                break;
            case "LAST3MONTHS":
                range = [startOfMonth(addMonths(new Date(), -3)), endOfMonth(addMonths(new Date(), -1))];
                break;
            case "LAST6MONTHS":
                range = [startOfMonth(addMonths(new Date(), -6)), endOfMonth(addMonths(new Date(), -1))];
                break;
            case "THISYEAR":
                range = [new Date(new Date().getFullYear(), 0, 1), new Date()];
                break;
            case "LAST2YEARS":
                range = [new Date(new Date().getFullYear() - 2, 0, 1), new Date()];
                break;
            default:
                console.log(`Invalid setRangeToPreset (${presetName} being passed to DateRangeSelector`)
        }
        if (range != null) {
            props["value"] = range;
        }
    }

    function getDynamicProps(): DateRangePickerProps {
        const props: DateRangePickerProps = {};

        if (choiceEndsToday) {
            props["shouldDisableDate"] = shouldDisableDate
        }
        if (placeHolderPrompt != null && placeHolderPrompt.length > 0) {
            props["placeholder"] = placeHolderPrompt;
        }
        if (setRangeToPreset != null) {
            prepareRangeProps(setRangeToPreset, props);
        }
//console.log(props)
        return props;
    }

    return (
        <DateRangePicker
            id={id}
            {...getDynamicProps()}
            ranges={prepareRanges()}
            //placeholder="Enter range"
            style={{ width: 300 }}
            format={'MM/dd/yyyy'}
            character={" - "}
            onExit={handleExit}
            onExiting={handleExiting}
            onChange={handleDateRangeChange}
        />
    );
}
