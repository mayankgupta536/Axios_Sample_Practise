import "./style/app.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function App() {
  const set_current_date = `${new Date().getFullYear()}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;

  const apiCall_date = `${new Date().getDate().toString().padStart(2, "0")}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${new Date().getFullYear()}`;
  const [districtInfo, setDistrictInfo] = useState(null);
  const [dateInput, setDateInput] = useState(set_current_date);
  const [stateList, changeStateList] = useState();
  const [district, selectDistrict] = useState(null);
  const [centreInfo, setCentreInfo] = useState(null);
  const [filter, setFilter] = useState(false);
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("dark");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=570&date=14-05-2021`
  //     )
  //     .then((data) => {
  //       console.log(data.data);
  //       //setDateInput("2021 - 05 - 15");
  //       // setDistrictInfo(data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/32`)
  //     .then((data) => {
  //       setDistrictInfo(data.data);
  //       console.log(data.data.districts);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await axios.get(
          `https://cdn-api.co-vin.in/api/v2/admin/location/states`
        );

        console.log(response.data);
        changeStateList(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
      // await axios
      // .get(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
      // .then((data) => {
      //   console.log(data.data);
      //   changeStateList(data.data);
      // })
      // .catch((err) => console.log(err));
    };
    fetchState();
  }, []);

  // console.log("this is obj", stateList);
  console.log("this is distric", districtInfo);

  const districtIdChange = (e) => {
    selectDistrict(e.target.value);
    console.log(district);
  };

  const dateChange = (e) => {
    console.log(e.target.value);
    var change = e.target.value.split("-").reverse().join("-");
    console.log(change);
    setDateInput(change);
  };

  const searchCentre = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${apiCall_date}`
      )
      .then((data) => {
        console.log(data.data);
        setCentreInfo(data.data);
        setFilter(true);
        console.log("centreInfo", centreInfo);
      });
  };

  const updateStateList = (e) => {
    const state_id = e.target.value;
    console.log(e.target.value);
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`
      )
      .then((data) => {
        console.log(data.data);
        setDistrictInfo(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getEmailHandler = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  const changeAgeHandler = (e) => {
    const ageValue = e.target.value;
    setAge(ageValue);
  };

  const paymentTypeHandler = (e) => {
    const paymentTypeValue = e.target.value;
    setPayment(paymentTypeValue);
  };

  const scheduleHandler = (e) => {
    e.preventDefault();
    console.log(e);
    const changeDateFormat = dateInput.split("-").reverse().join("/");
    const individual_obj = {
      email: email,
      district: district,
      payment: payment,
      type: age,
      date: changeDateFormat,
    };

    axios
      .post(`https://localhost:8080/createuser`, individual_obj)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(individual_obj);
  };

  // const ageFilterHandler = (e) => {
  //   setAge(e.target.value);
  //   setCentreInfo(centreInfo);
  // };

  return (
    <div className="app">
      <div className="header">Covid Vaccine Registration - 2021</div>
      <form onSubmit={searchCentre}>
        <div className="search">
          <label>
            <strong>Select State:</strong>
          </label>
          <select
            onChange={updateStateList}
            placeholder={"select"}
            className="state-select"
            required
          >
            <option value=""></option>
            {stateList &&
              stateList.states.map((state) => {
                return (
                  <option
                    key={state.state_id}
                    value={state.state_id}
                    label={state.state_name}
                  ></option>
                );
              })}

            {/* {stateList.data.states.map((state) => {
                return (
                  <option
                    value={state.state_id}
                    label={state.state_name}
                  ></option>
                );
              })} */}
          </select>
          <label>
            <strong>Select District:</strong>
          </label>
          <select onChange={districtIdChange} required>
            <option value="" placeholder="Select District"></option>
            {districtInfo &&
              districtInfo.districts.map((district) => {
                return (
                  <option
                    key={district.district_id}
                    value={district.district_id}
                    label={district.district_name}
                  ></option>
                );
              })}
          </select>
          <label>
            <strong>Date:</strong>
          </label>
          <input
            type="date"
            defaultValue={dateInput}
            disabled
            className="date-input"
          ></input>

          <div className="search-btn">
            <button>
              Search Centre
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>
      {filter ? (
        <form onSubmit={scheduleHandler}>
          <div className="filter-container">
            <h3> Choose Your Vaccine Type:</h3>
            <div className="filters">
              <label>
                <strong>Age:</strong>
              </label>
              <select onChange={changeAgeHandler} value={age} required>
                <option value=""></option>
                <option value="18" label="18-44"></option>
                <option value="45" label="45+"></option>
              </select>
              <label>
                <strong>Vaccine Brand:</strong>
              </label>

              <select required>
                <option value=""></option>
                <option value="COVISHIELD" label="COVISHIELD"></option>
                <option value="COVAXIN" label="COVAXIN"></option>
              </select>
              <label>
                <strong>Vaccine Type:</strong>
              </label>

              <select value={payment} onChange={paymentTypeHandler} required>
                <option value=""></option>
                <option value="Free" label="Free"></option>
                <option value="Paid" label="Paid"></option>
              </select>
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={getEmailHandler}
                value={email}
                required="Email is Required."
              ></input>
            </div>
            <div className="schedule-button">
              <button>Click To Schedule</button>
            </div>
          </div>
        </form>
      ) : null}
      <div className="weather-info">
        {centreInfo &&
          centreInfo.centers.map((center, index) => {
            return (
              <div className="info-div" key={center.center_id}>
                <h2>
                  {index + 1 + "."}
                  {center.address}
                </h2>
                <h3>{center.fee_type}</h3>
                <p>
                  <strong>Centre Name : </strong>
                  {center.name}
                </p>
              </div>
            );
          })}

        {/* <h2>{districtInfo && districtInfo.centers[0].name}</h2> */}
        <div className="condition">
          {/* <h3>{districtInfo && districtInfo.centers[0].center_id}</h3> */}
          {/* <img
                src={
                  districtInfo.centers.length > 0 &&
                  districtInfo.centers[0].name
                }
                alt=""
              ></img> */}
          <h3>{/* {districtInfo && districtInfo.centers[0].name} */}</h3>
        </div>
      </div>
      <footer>
        <h2 style={{ fontSize: "25px" }}>Creator :IndrasenYadav |@2021@HCL</h2>

        <small style={{ fontSize: "15px", margin: "0px", padding: "0px" }}>
          *****The data has been taken from the cowin.govin.api*****
        </small>
        <ul className="contact">
          <li>
            <a href="https://github.com/indrasen536">
              <FontAwesomeIcon
                color={theme == "light" ? "cyan" : "#012C48"}
                icon={faGithub}
              ></FontAwesomeIcon>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/indrasen-yadav-a45592126/">
              <FontAwesomeIcon
                color={theme == "light" ? "cyan" : "#012C48"}
                icon={faLinkedin}
              ></FontAwesomeIcon>
            </a>
          </li>
          <li>
            <a href="mailto:indrasen.i@hcl.com">
              <FontAwesomeIcon
                color={theme == "light" ? "cyan" : "#012C48"}
                icon={faEnvelope}
              ></FontAwesomeIcon>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
