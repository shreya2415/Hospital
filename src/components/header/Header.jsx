import React, { useState } from 'react';
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {DateRange } from 'react-date-range'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { faBed, faCalendarDays,faPerson,faCar,faPlane, faTaxi, faHospital, faStethoscope, faCapsules ,faPrescription , faCalendarCheck,faBookMedical} from '@fortawesome/free-solid-svg-icons'

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate:new Date(),
      key:'selection'
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotel", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
      <div className="headerList">
        
        <div className="headerListItem active">
          <FontAwesomeIcon icon={faCalendarCheck}/>
          <span>Book Appointment</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faHospital}/>
          <span>Find Hospital</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faStethoscope}/>
          <span>Consult Online</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faCapsules}/>
          <span>Buy Medicine</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faBookMedical}/>
          <span>View Health Record</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faPrescription}/>
          <span>View Last Prescriptiion</span>
        </div>
        </div>
        { type !== "list" && (
          <>
          <h1 className="headerTitle">The heart of your healthcare. </h1>
        <p className="headerDesc"><b> Virtual Aid</b> aims at providing the medical consultation and appointments with the smooth and simple procedure.
        </p>
        <button className="headerBtn">Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faBed} className="headerIcon"/>
            <input type="text"
             placeholder="Search for the clinic" 
             className="headerSearchInput"
             onChange={(e) => setDestination(e.target.value)}
             />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faCalendarDays} className="headerIcon"/>
          <span onClick={() => setOpenDate(!openDate)}className="headerSearchText" >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
          {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faPerson} className="headerIcon"/>
           <span  onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}
           </span>
           {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

          
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn1" onClick={handleSearch}>Search
            </button>
          </div>
        </div> 
        </>) }
      </div>
    </div>
  );
};

export default Header;
