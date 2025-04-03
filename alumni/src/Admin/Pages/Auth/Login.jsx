import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [admin_id, setId] = useState(sessionStorage.getItem("admin"));
  const currentYear = new Date().getFullYear();
  const [credentias , setCredential] = useState({
    username:"",
    password:""
  })

 const handleInputChange = (e)=>{
  const{name,value} = e.target;
  setCredential({...credentias ,[name]:value});
 }

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
   const username = credentias.username;
   const password = credentias.password;
   try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/Login`,{username,password});
    if(res.data.success === 1){
      toast.success(res.data.message , {theme:"colored"})
      sessionStorage.setItem("adminId",res.data.id);
      setTimeout(() => {
        navigate('/Dashboard');
      }, [1000]);
    }else if(res.data.success === 0){
      toast.error(res.data.message , {theme:"colored"});
    }
   } catch (error) {
    toast.error(error);
   }
  };
  return (
    <>
      <div
        class="position-absolute w-100  min-height-300 top-0"
        style={{
          backgroundImage: "url('../assets/img/curved-images/banner1.jpg')",
          backgroundPositionY: "50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "-1",
        }}
      >
        <span class="mask bg-primary opacity-6"></span>
      </div>
      <main class="main-content  mt-0">
        <section>
          <div class="col-md-12">
            <div class="container">
              <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div class="card card-plain mt-11">
                  <div class="card">
                    <div class="card-header pb-0 text-left bg-transparent">
                      <h3 class="font-weight-bolder text-info text-gradient">
                        Welcome back ADMIN
                      </h3>
                      <p class="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <label>Username</label>
                        <div class="mb-3">
                          <input
                            type="text"
                            name="username"
                            value={credentias.username}
                            class="form-control"
                            placeholder="Username"
                            onChange={handleInputChange}
                          />
                        </div>
                        <label>Password</label>
                        <div class="mb-3">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            name="password"
                            value={credentias.password}
                            onChange={handleInputChange}
                          />
                        </div>

                        <p style={{ color: "red" }}>{error}</p>

                        <div class="text-center">
                          <button
                            type="button"
                            class="btn bg-gradient-info w-100 mt-4 mb-0"
                            onClick={submitHandle}
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="footer pt-7  ">
          <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
              <div class="col-xl-3 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div class="copyright text-center text-sm text-muted text-lg-start">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  © {currentYear}
                  <script>document.write(new Date().getFullYear())</script>,
                  made by
                  <span class="font-weight-bold"> K A R M A Production</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <ToastContainer/>
      </main>
    </>
  );
}
