import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DateRangePickerComponent from './DateRangePickerComponent';

function App() {


    const initializePicker = () => {

    }

    function onDateRangeChange(start: string, end: string): void {
        console.log("DATE RANGE CHANGED: " + start + " to " + end);
    }


    useEffect(() => {
        initializePicker();
    }, []);

  return (
    <div className="App">
        <header className="App-header">
            <DateRangePickerComponent
                onDateRangeChange={onDateRangeChange}
                days={7}
                maxDateIsToday={true}
                showMonthYearDropdowns={true}
                alwaysShowCalendars={true} />
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    </div>
  );
}

export default App;
