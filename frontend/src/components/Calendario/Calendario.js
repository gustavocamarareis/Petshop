import React, { useState } from 'react'
import * as dateFns from 'date-fns'

import './Calendario.css'

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const translateMonth = (month) => {
        let translatedMonth

        if(month.includes('January')) {
            translatedMonth = month.replace('January', 'Janeiro')
        } else if(month.includes('February')) {
            translatedMonth = month.replace('February', 'Fevereiro')
        } else if(month.includes('March')) {
            translatedMonth = month.replace('March', 'Março')
        } else if(month.includes('April')) {
            translatedMonth = month.replace('April', 'Abril')
        } else if(month.includes('May')) {
            translatedMonth = month.replace('May', 'Maio')
        } else if(month.includes('June')) {
            translatedMonth = month.replace('June', 'Junho')
        } else if(month.includes('July')) {
            translatedMonth = month.replace('July', 'Julho')
        } else if(month.includes('August')) {
            translatedMonth = month.replace('August', 'Agosto')
        } else if(month.includes('September')) {
            translatedMonth = month.replace('September', 'Setembro')
        } else if(month.includes('October')) {
            translatedMonth = month.replace('October', 'Outubro')
        } else if(month.includes('November')) {
            translatedMonth = month.replace('November', 'Novembro')
        } else if(month.includes('December')) {
            translatedMonth = month.replace('December', 'Dezembro')
        } else {
            translatedMonth = month
        }

        return translatedMonth
    }
    
    const translateDay = (day) => {
        let translatedDay

        if(day.includes('Sunday')) {
            translatedDay = day.replace('Sunday', 'Domingo')
        } else if(day.includes('Monday')) {
            translatedDay = day.replace('Monday', 'Segunda')
        } else if(day.includes('Tuesday')) {
            translatedDay = day.replace('Tuesday', 'Terça')
        } else if(day.includes('Wednesday')) {
            translatedDay = day.replace('Wednesday', 'Quarta')
        } else if(day.includes('Thursday')) {
            translatedDay = day.replace('Thursday', 'Quinta')
        } else if(day.includes('Friday')) {
            translatedDay = day.replace('Friday', 'Sexta')
        } else if(day.includes('Saturday')) {
            translatedDay = day.replace('Saturday', 'Sábado')
        } else {
            translatedDay = day
        }

        return translatedDay
    }

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={prevMonth}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                <span>
                {translateMonth(dateFns.format(currentMonth, dateFormat))}
                </span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
                <div className="icon">chevron_right</div>
            </div>
            </div>
        );
    }

    const renderDays = () => {
        const dateFormat = "eeee";
        const days = [];
        let startDate = dateFns.startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
            <div className="col col-center" key={i}>
                {translateDay(dateFns.format(dateFns.addDays(startDate, i), dateFormat))}
            </div>
            );
        }
        return <div className="days row">{days}</div>;
    }

    const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            days.push(
            <div
                className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}
            >
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
            </div>
            );
            day = dateFns.addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
            {days}
            </div>
        );
        days = [];
        }

        return <div className="body">{rows}</div>;
    }

    const onDateClick = (day) => {
        setSelectedDate(day)
    }

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    }

    return(
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    )
}

export default Calendar