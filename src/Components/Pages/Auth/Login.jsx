import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axiosPublic from "../../hooks/UseAxisosPublic";
const Login = () => {
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Email/Password login
  const handleLogin = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn(email, password);

      // // JWT token
      // const tokenResponse = await axiosPublic.post("/jwt", { email: result.user.email });
      // localStorage.setItem("accessToken", tokenResponse.data.token);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // Google login
  const handleGoogleLogIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = { email: result.user.email, name: result.user.displayName };

      await axiosPublic.post("/users", userInfo);

      const tokenResponse = await axiosPublic.post("/jwt", { email: result.user.email });
      localStorage.setItem("accessToken", tokenResponse.data.token);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:w-1/2 mx-auto p-8">
      <h2 className="text-2xl border-b border-black font-semibold text-gray-700 text-center mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="input input-bordered w-full" placeholder="Type here" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="input input-bordered w-full" placeholder="Enter your password" />
        </div>
        <button className="btn text-white border-none bg-green-400 w-full">Sign In</button>
      </form>
      <p className="text-sm text-center mt-4">
        New here? <Link to="/registration" className="text-primary font-medium">Create a New Account</Link>
      </p>
      <div className="divider">Or sign in with</div>
      <div className="flex justify-center gap-4">
        <button onClick={handleGoogleLogIn} className="btn w-full btn-outline"><FaGoogle /></button>
      </div>
    </div>
  );
};

export default Login;
