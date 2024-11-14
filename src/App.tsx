import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import DateRangePickerComponent from './DateRangePickerComponent';

function App() {


    const initializePicker = () => {

    }


    useEffect(() => {
        initializePicker();
    }, []);

  return (
    <div className="App">
        <header className="App-header">
            <DateRangePickerComponent startDate={"November 11, 2024"} endDate={"November 14, 2024"} />
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
