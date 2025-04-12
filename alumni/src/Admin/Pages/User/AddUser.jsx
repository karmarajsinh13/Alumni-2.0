import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";

export default function Add_users() {
  const [formaData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    address: "",
    dob: "",
    email: "",
    phone: "",
    passingYear: "",
    gender: "",
  });
  const { id } = useParams();
  const [photo, setImg] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [passing_year, setpassing_year] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
    
  const yearOptions = [
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];
  const genderOptions = [
    { value: "", label: "Choose" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formaData, [name]: value });
  };
  const handleYearChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      passingYear: selectedOption ? selectedOption.value : "",
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImg(files[0]);
  };

  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formaData, gender: selectedOption.value });
  };

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

  

  const submitbtn = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("firstname", formaData.firstname);
    formDataToSend.append("lastname", formaData.lastname);
    formDataToSend.append("username", formaData.username);
    formDataToSend.append("password", formaData.password);
    formDataToSend.append("address", formaData.address);
    formDataToSend.append("dob", formaData.dob);
    formDataToSend.append("email", formaData.email);
    formDataToSend.append("phone", formaData.phone);
    formDataToSend.append("passingYear", formaData.passingYear);
    formDataToSend.append("gender", formaData.gender);
    formDataToSend.append("city", city);
    formDataToSend.append("state", state);
  
    if (photo && typeof photo !== "string") {
      formDataToSend.append("photo", photo);
    } else if (typeof photo === "string") {
      formDataToSend.append("existingPhoto", photo);
    }
       try {const config = {headers: {'Content-Type': 'multipart/form-data'}};
        let res;
        if (id > 0) {
            formDataToSend.append("id", id);
            res = await axios.post(`${process.env.REACT_APP_API_URL}/api/UpdateUser`, formDataToSend, config);
        } else {
            res = await axios.post(`${process.env.REACT_APP_API_URL}/api/AddUser`, formDataToSend, config);
        }
  
      if (res.data.success === 1) {
        toast.success(res.data.message,{theme:"colored"});
        setTimeout(() => {
          navigate("/Users");
        }, [1000]); 
      } else {
        toast.error(res.data.message,{theme:"colored"});
        
      }
    } catch (err) {
      console.error("Error in submit", err);
    }
  };
  const getUserData = async ()=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/GetUser`,{id:id});
    if(res.data.success === 1){
      console.log(res.data.singleuser);
      const user = res.data.singleuser;
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
        password: user.password || "",
        address: user.address || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        email: user.email || "",
        phone: user.phone || "",
        passingYear: user.passing_year ? String(user.passing_year) : "",
        gender: user.gender || "",
      });

      setCity(user.city || "");
      setState(user.state || "");
      setImg(user.photo || "");
    }
  }
  useEffect(() => {
    if (id) {
      getUserData();
    }
  }, [id]);

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
                            <Select
                              name="passingYear"
                              options={yearOptions}
                              value={yearOptions.find((option) =>option.value === formaData.passingYear)}
                              onChange={handleYearChange}
                              placeholder="Select Year"

                            />
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
                            <Select
                              name="gender"
                              options={genderOptions}
                              value={genderOptions.find((option) =>option.value === formaData.gender)}
                              onChange={handleGenderChange}
                              placeholder="Select Gender"

                            />
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
                            <label className="form-control-label">
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
      <ToastContainer/>
    </div>
  );
}
