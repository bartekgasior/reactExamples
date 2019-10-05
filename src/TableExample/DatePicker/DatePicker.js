import moment from 'moment';
import React from 'react';
import './DatePicker.css';

const days_en = ['WK', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const days_pl = ['TK', 'Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob', 'Nie'];
const days_de = ['WK', '1', '2', '3', '4', '5', '6', '7'];
const months_pl = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const months_de = ['', '', '', '', '', '', '', '', '', '', '', ''];
const months_en = ['', '', '', '', '', '', '', '', '', '', '', ''];

const TopRow = ({ month, year, reduceMonth, increaseMonth }) =>
    <div className="topRow">
        <div
            onClick={reduceMonth}
            className="changeMonthButton"
            style={{ textAlign: 'left' }}>&#10094;
        </div>
        <div className="topRowDate">
            {month}
            {' '}
            {year}
        </div>
        <div
            onClick={increaseMonth}
            className="changeMonthButton"
            style={{ textAlign: 'right' }}>&#10095;

        </div>
    </div>

const DaysNames = ({ weekdays }) =>
    <div className="daysNames">
        {weekdays.map((day, index) => {
            if (index === 0) {
                return <div key={day} className="cell dayName" style={{ color: 'rgb(132, 140, 134)' }}>{day}</div>
            }
            return <div key={day} className="cell dayName">{day}</div>
        })}
    </div>

const DaysRow = ({ days, onClickFun }) =>
    <div className="daysRow">
        {days.map((day, index) => {
            if (index === 0) {
                return <div key={index} className="cell weekNumber">{day}</div>
            }
            if (day === '') { 
                return <div key={index} className={"cell"}>{day}</div>
            }
            return <div key={index} onClick={() => onClickFun(day)} className={"cell day"}>{day}</div>
        })}
    </div>

export default class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,
            currentDate: new Date(),
            days: [],
            months: [],
            currentMonth: '',
            currentYear: ''
        }
    }

    componentDidMount = () => {
        const { locale } = this.props;
        let days = days_de;
        let months = months_de;

        if (locale === 'en') { days = days_en; months = months_en; }
        else if (locale === 'pl') { days = days_pl; months = months_pl; }
        this.setState({ days, months }, () => this.setTopRow());

    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside);
    }

    toggleDatePicker = () => {
        this.setState({ showDatePicker: !this.state.showDatePicker }, () => {
            const { showDatePicker } = this.state;
            if (showDatePicker) {
                document.addEventListener('click', this.handleClickOutside);
            } else {
                document.removeEventListener('click', this.handleClickOutside);
            }
        });

    }

    setYear = date => {
        let year = moment(date).year();
        this.setState({ currentYear: year })
    }

    setMonth = date => {
        const { months } = this.state;
        let month = months[moment(date).month()];
        this.setState({ currentMonth: month })
    }

    setTopRow = () => {
        const { currentDate } = this.state;
        this.setYear(currentDate);
        this.setMonth(currentDate);
    }

    reduceMonth = () => {
        let { currentDate } = this.state;
        let newDate = new Date(moment(currentDate).subtract(1, 'months'));
        this.setState({ currentDate: newDate }, () => this.setTopRow());

    }

    increaseMonth = () => {
        let { currentDate } = this.state;
        let newDate = new Date(moment(currentDate).add(1, 'months'));
        this.setState({ currentDate: newDate }, () => this.setTopRow());
    }

    renderDays = () => {
        const { currentDate } = this.state;
        let rows = [];
        let days = [];
        const daysInMonth = moment(currentDate).daysInMonth();
        let startDay = moment(currentDate).startOf('month').day();
        /* if sunday */
        if (startDay === 0) { startDay = 7; }
        /* how many weeks in month*/
        const weeksInMonth = Math.ceil((daysInMonth + (startDay - 1)) / 7)

        days = this.calculateDaysInWeek(startDay, daysInMonth, weeksInMonth);

        for (let i = 0; i < weeksInMonth; i++) {
            rows.push(<DaysRow key={i} days={days[i]} onClickFun={this.onDateClicked} />);
        }

        return rows;
    }

    onDateClicked = (day) => {
        const { currentYear, currentDate } = this.state;
        let currentMonth = moment(currentDate).month() + 1;
        let currentDay = day;
        if (Number.parseInt(day) < 10) { currentDay = '0' + day; }
        if (Number.parseInt(currentMonth) < 10) { currentMonth = '0' + currentMonth; }
        const selectedDate = currentYear + '-' + currentMonth + '-' + currentDay;
        console.log(selectedDate);
        this.toggleDatePicker();
    }

    calculateDaysInWeek = (firstDay, daysInMonth, weeksInMonth) => {
        const { currentYear, currentDate } = this.state;
        const currentMonth = moment(currentDate).month();
        let currentDay = 1;
        let days = [];

        for (let week = 0; week < weeksInMonth; week++) {
            let isoWeekNumber = moment().year(currentYear).month(currentMonth).startOf('month').isoWeek();
            let daysInWeek = [isoWeekNumber + week]
            for (let i = 0; i < 7; i++) {
                if (currentDay < firstDay) {
                    daysInWeek.push('');
                    currentDay++;
                } else if ((currentDay - firstDay + 1) > daysInMonth) {
                    daysInWeek.push('');
                } else {
                    daysInWeek.push(currentDay - firstDay + 1);
                    currentDay++;
                }
            }
            days.push(daysInWeek);
        }
        return days;
    }

    handleClickOutside = (e) => {
        if (this.containerRef && !this.containerRef.contains(e.target) && this.state.showDatePicker) {
            this.toggleDatePicker();
        }
    }

    setContainerRef = (node) => {
        this.containerRef = node;
    }

    render() {
        const { showDatePicker, currentMonth, currentYear, days } = this.state;
        if (!showDatePicker) {
            return ( <button onClick={this.toggleDatePicker}>toggle calendar</button> )
        }
        return (
            <div ref={showDatePicker ? this.setContainerRef : null}>
                <button onClick={this.toggleDatePicker}>toggle calendar</button>
                <div id="datePicker">
                    <TopRow
                        month={currentMonth}
                        year={currentYear}
                        reduceMonth={this.reduceMonth}
                        increaseMonth={this.increaseMonth}
                    />
                    <DaysNames
                        weekdays={days}
                    />

                    {this.renderDays()}
                </div>
            </div>
        )
    }
}