import React, { Component, Fragment } from 'react';
import './index.css';
import moment from 'moment';

export default class Calendar extends Component {
    constructor(props){
      super(props);
      this.displayCalendar = this.displayCalendar.bind(this);
      this.Decrement = this.Decrement.bind(this);
      this.Increment = this.Increment.bind(this);
      this.selectDate = this.selectDate.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.showCalendar = this.showCalendar.bind(this);
      this.hideCalendar = this.hideCalendar.bind(this);
      this.format = this.props.format ? this.props.format : "DD-MM-YYYY";
      this.time12hr = this.props.time12hr ? "hh:mm" : "HH:mm",
      this.month = this.props.value ? parseInt( moment(this.props.value , this.format).month()) : parseInt(moment().month());
      this.year = this.props.value ? parseInt( moment(this.props.value, this.format).year()) : parseInt(moment().year());
      
      this.state = { 
        date_field: this.props.value ? moment(this.props.value , this.format).format(this.props.format) :  moment().format(this.format),
        display: 'none', 
        month:this.month,
        year:this.year,
        yearDisplay: 'none',
        format:this.format,
        selectedColor: this.props.selectedColor ? this.props.selectedColor : '#e74c3c',
        selectedTextColor: this.props.selectedTextColor ? this.props.selectedTextColor : '#fff',
        selectedDate:this.props.value ? moment(this.props.value , this.format) :  moment(),
        type: this.props.type ? this.props.type : "date",
        time: (this.props.type=="datetime") ? moment(this.props.value , this.format).format(this.time12hr) : ""
      }
    }

    componentWillMount(){
      document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount(){
      document.removeEventListener('mousedown', this.handleClick, false);
    }

    weekDay(d){
        return new Date( this.state.year, this.state.month, d ).getDay();
    }


    daysInMonth(){
        return moment('1' +  '/' +  (this.state.month + 1)  +  '/' + this.state.year, 'DD/MM/YYYY').daysInMonth();
        // return new Date( this.state.year, this.state.month, d ).getDay();
        // return this.state.selectedDate.daysInMonth();
    }

    printDays(day, days_in_month){
      console.log()
      let days = [], td_key = 0, tr_key = 0;
      while ( day <= days_in_month ) {
         let tds = [], trs = [];
         for ( let i = 0; i < 7; i++ ) {

              this.weekDay(day) == i ? (
                (day == this.state.selectedDate.date() && this.month == this.state.selectedDate.month())
                ?
                  tds.push(<td onClick={this.selectDate} style={{background:this.state.selectedColor, color:this.state.selectedTextColor}} data-day={day} key={td_key}>{day}</td>)
                :
                  tds.push(<td onClick={this.selectDate} data-day={day} key={td_key}>{day}</td>)
                ,
                day++,
                td_key++
              ) : (
                tds.push(<td key={td_key}></td>),
                td_key++
              );
              if( day > days_in_month ) {
                  break;
              }
         }
         days.push(<tr key={tr_key} className="trow">{tds}</tr>);
         tr_key++;
      }
      return days;
    }


    selectDate(e){
      console.log(e.currentTarget.dataset.day +  '/' +  parseInt(this.state.month) +  '/' + this.state.year)
      let month = parseInt(this.state.month);

      let selectedDate = moment(e.currentTarget.dataset.day +  '/' +  (month + 1)  +  '/' + this.state.year, 'DD/MM/YYYY');

      let date = selectedDate;
      
      if(this.state.time)
      {
        let arr = this.state.time.split (":");
        date = this.state.selectedDate.set({HH: arr[0], mm: arr[1]});
        if(this.props.onSelect !== undefined)
          this.props.onSelect(date)

          this.setState({ 
            date_field:  date.format(this.state.format),
            selectedDate: selectedDate,
             });
    
      }
      else
      {
        if(this.props.onSelect !== undefined)
          this.props.onSelect(date)

          this.setState({ 
            date_field:  date.format(this.state.format),
            selectedDate: selectedDate,
            display: 'none' });
    
      }

      
      
    }

    handleClick = (e) => {
      if(this.node.contains(e.target)){

        return;
      }
      this.setState({display:'none'});
    }


    handleChange(e){
      this.setState({ date_field: e.target.value })

    }

    
    handleTimeChange(e){
      let arr = e.target.value.split (":");
      
      this.setState({ 
        time: e.target.value,
        date_field:  this.state.selectedDate.set({H: arr[0], m: arr[1]}).format(this.state.format),
      })
    }

    Decrement(){
      this.month == 0 ? (
          this.month = 11,
          this.year = this.year - 1,
          this.setState({month: this.month, year:this.year})
      ) : (
          this.month--,
          this.setState({month: this.month, year:this.year })
      )
    }

    Increment(){
      this.month == 11 ? (
          this.month = 0,
          this.year = this.year + 1,
          this.setState({month: this.month, year:this.year })
      ) : (
          this.month++,
          this.setState({ month:this.month, year:this.year })
      );
    }


    showCalendar(){
     console.log(this.state);
      this.setState({ display: 'block' });
    }

    hideCalendar(){
      this.setState({display:'none'});
    }


    displayCalendar(){
      let days = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ];
      let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
      // Print days of the week as the calendar's headers
      let day_headers = days.map((day, index)=>{
          return <th key={index}>{day}</th>;
      });
      var yearSelectorStyle = { display : this.state.yearDisplay};
      let days_in_month = this.daysInMonth(), day = 1, rows = this.printDays(day, days_in_month, this.state.selectedDate.month());
      return(
        <Fragment>
        <table>
          <tbody>
            <tr className="controls">
              <th><a className="prev" onClick={this.Decrement}><span className="fa fa-arrow-circle-left"></span></a></th>
              <th colSpan="5">
                 <h3>{months[this.state.month]}</h3>
                 <p className="year" onClick={()=>{this.setState({yearDisplay:"block"})}}>{this.state.year}</p>
                 <div className="year-picker" style={yearSelectorStyle}>
                    Select Year
                 </div>
              </th>
              <th><a className="next" onClick={this.Increment}><span className="fa fa-arrow-circle-right"></span></a></th>
            </tr>
          </tbody>
        </table>
        <div className="calendar-body" style={{margin:"10px"}}>
          <table>
            <tbody>
             <tr className="trow">{day_headers}</tr>
             {rows}
            </tbody>
          </table>
          {
            (this.state.type == "datetime")
            ?
              <div style={{marginTop:"5px"}}> 
                <span style={{fontSize:"10px"}}>Time: </span>
                <input type="time" value={this.state.time} onChange={this.handleTimeChange}/>
              </div>
            :
              null
          }
        </div>
        </Fragment>
      );
    }


    render(){
       var calendarStyle = { display: this.state.display }
       console.log(this.state);
       return(
          <div ref={node => this.node = node} className="calendar-container">
            <div className="form-group picker-wrapper">
              <label>{this.props.label}</label> 
              <input onClick={this.showCalendar} value={this.state.date_field} onChange={this.handleChange}  type='text' id='start_date' className='form-control' />
            </div>
            <div className="calendar" style={calendarStyle}>
                {this.displayCalendar()}
            </div>
          </div>       
       );
    }


}