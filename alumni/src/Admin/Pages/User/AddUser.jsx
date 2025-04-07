import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function Add_users() {

const [formaData,setFormData] = useState({
  firstname:"",
  lastname:"",
  username:"",
  password:"",
  address:"",
  dob:"",
  email:"",
  phone:"",
})
  const [photo, setImg] = useState("");
  const [gender, setgender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [passing_year, setpassing_year] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = location.pathname.split("/")[2]
    ? location.pathname.split("/")[2]
    : "";
 

  const handleInputChange = (e)=>{
    const{name,value}= e.target;
    setFormData({...formaData,[name]:value})
  }
  const handleFileChange = (e)=>{
    const {name , files} = e.target;
    setImg(files[0]);
  }

  const validate = () => {
    const error = {};

    if (!formaData.username) {
      error.username = "Please Enter Your User name";
    }

    if (!formaData.password) {
      error.password = "Password is required Broooo!!!";
    }
    return error;
  };

  const firstname = formaData.firstname;
  const lastname = formaData.lastname;
  const dob = formaData.dob;
  const email = formaData.email;
  const phone = formaData.phone;
  const address = formaData.address;
  const password = formaData.password;

  const submitbtn = async (e) => {
    e.preventDefault();
    setFormErrors(validate());
    
    // Create a new FormData object and append the data
    const formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("dob", dob);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("address", address);
    formdata.append("password", password);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("gender", gender);
    formdata.append("passing_year", passing_year);
    formdata.append("photo", photo); 

    // Log the formdata entries to check what’s inside
    for (let pair of formdata.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
    }

    try {
        // Send the formdata directly to the server
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/AddUser`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct header is set
            }
        });

        // Handle the response here
        console.log(res.data);  // Add your response handling here
    } catch (error) {
        console.error("Error submitting form", error);
    }
};

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-gray-100">
        <Header />
        
          <div
            style={{
              marginTop: "50px",
              marginLeft: "260px",
              marginRight: "20px",
            }}
          >
            <div class="row">
              <div class="col-12">
                <div class="card mb-4">
                  <div class="card-header pb-0">
                    <h3
                      style={{
                        background: "linear-gradient(to right, black, grey)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Add User
                    </h3>
                    <p class="mb-0">Add users here</p>
                    <form>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                First name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Firstname"
                                name="firstname"
                                value={formaData.firstname}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Last name
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Lastname"
                                name="lastname"
                                value={formaData.lastname}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Phone
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="phone"
                                placeholder="Enter Phone"
                                value={formaData.phone}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Email address
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Enter Email Address"
                                value={formaData.email}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Username
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="username"
                                placeholder="Enter Username @"
                                value={formaData.username}
                                onChange={handleInputChange}
                              />
                              <p style={{ color: "red" }}>
                                {formErrors.username}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Profile Pic
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Date Of Birth
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                name="dob"
                                value={formaData.dob}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Passing Year
                              </label>
                              <select
                                name="status"
                                class="form-control"
                                defaultValue={passing_year}
                                onChange={(e) =>
                                  setpassing_year(e.target.value)
                                }
                              >
                                <option>Year</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Gender
                              </label>
                              <select
                                name="status"
                                class="form-control"
                                defaultValue={gender}
                                onChange={(e) => setgender(e.target.value)}
                              >
                                <option>Choose</option>
                                <option value="Male">Male</option>
                                <option value="Female">FeMale</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                Password
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formaData.password}
                                onChange={handleInputChange}
                              />
                              <p style={{ color: "red" }}>
                                {formErrors.password}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                City
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter City"
                                defaultValue={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                htmlFor="example-text-input"
                                className="form-control-label"
                              >
                                State
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter State"
                                defaultValue={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label                              
                                className="form-control-label"
                              >
                                Address
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={formaData.address}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                       <div className="flex justify-center">
                       <button
                          type="button"
                          class="btn bg-gradient-info w-1/5 mt-4 mb-0"
                          onClick={submitbtn}
                        >
                          Submit
                        </button>
                       </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
