import "./style/app.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [districtInfo, setDistrictInfo] = useState(null);
  const [dateInput, setDateInput] = useState(null);
  const [stateList, changeStateList] = useState(null);
  const [district, selectDistrict] = useState(null);
  const [centreInfo, setCentreInfo] = useState(null);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=570&date=14-05-2021`
      )
      .then((data) => {
        console.log(data.data);
        // setDistrictInfo(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const searchCentre = () => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${dateInput}`
      )
      .then((data) => {
        console.log(data.data);
        setCentreInfo(data.data);
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

  return (
    <div className="app">
      <div className="header">Covid Vaccine Registration - 2021</div>
      <div>
        <div className="search">
          <label>
            <strong>Select State</strong>
          </label>
          <select onChange={updateStateList} placeholder={"select"}>
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
            <strong>Select District</strong>
          </label>
          <select onChange={districtIdChange}>
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
            <strong>Select Date</strong>
          </label>
          <input onChange={dateChange} type="date"></input>

          <div className="search-btn">
            <button onClick={searchCentre}>
              Search Centre
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="weather-info">
          {centreInfo &&
            centreInfo.centers.map((center, index) => {
              return (
                <div className="info-div">
                  <h2>
                    {index + 1 + "."}
                    {center.center_id}
                  </h2>
                  <p>{center.name}</p>
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
      </div>
      <div>
        <footer id="page-footer">
          <h2 style={{ fontSize: "25px" }}>
            Creator :IndrasenYadav |@2021@HCL
          </h2>

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
    </div>
  );
}

export default App;
