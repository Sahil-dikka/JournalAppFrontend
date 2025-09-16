import { useState } from "react";
import Image from "../assets/frontImg.jpeg";
import TextInput from "../components/common/TextInput";
import usePost from "../Hooks/PostDetails";
import { useForm } from "react-hook-form";
import ApiRoutes from "../ApiRoutes/ApiRoutes"; // <-- fixed import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm(); // <-- get register

  const navigate = useNavigate()


  const { isLoading: loginLoading, mutate: fetchLoginData } = usePost();

  const LoginSubmit = (data) => {
    console.log("form data",data);
    if (!data?.userName || !data?.password) {
      alert("Please enter both userName and password.");
      return;
    }
    const requestBody = {
      userName: data?.userName,
      password: data?.password,
    };
    fetchLoginData(
      {
        endpoint: ApiRoutes.POST.LOGIN,
        formData: requestBody,
      },
      {
        onSuccess: ( data ) => {
          toast.success("Login successful!");
          console.log("response",data);
          localStorage.setItem("token", data);
          localStorage.setItem("userName", requestBody.userName);
          navigate("/dashboard");
        },
        onError: (error) => {
          toast.error("Login failed. Please check your credentials.");
      }
    }
    );
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow d-flex flex-row overflow-hidden"
        style={{ width: "800px", height: "500px" }}
      >
        {/* Left side - Image */}
        <div className="col-6 p-0">
          <img
            src={Image}
            alt="Journal illustration"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right side - Login form */}
        <div className="col-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "300px" }}>
            <h3 className="text-center mb-4">Login</h3>

            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            <form onSubmit={handleSubmit(LoginSubmit)}>
              {/* Username */}
              <TextInput
                label="userName"
                id="username"
                {...register("userName")} // <-- register input
                required
              />

              {/* Password with inside-eye button */}
              <div className="form-floating mb-3 position-relative">
                <TextInput
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")} // <-- register input
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                {/* Eye button inside input */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                >
                  {showPassword ? "🔓" : "🔒"}
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <small>
                Don’t have an account?{" "}
                <a href="/register" className="text-decoration-none">
                  Register here
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}