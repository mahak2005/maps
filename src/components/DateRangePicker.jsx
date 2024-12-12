import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ dateRange, setDateRange }) => {
    return (
        <div className="filter-section">
            <label>Date Range</label>
            <div className="date-picker-wrapper">
                <DatePicker
                    selected={dateRange.startDate}
                    onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                    selectsStart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={dateRange.endDate}
                    onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                    selectsEnd
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    minDate={dateRange.startDate}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="End Date"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
