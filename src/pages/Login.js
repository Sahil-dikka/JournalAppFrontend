import { useState } from "react";
import Image from "../assets/frontImg.jpeg";
import TextInput from "../components/common/TextInput";
import usePost from "../Hooks/PostDetails";
import { useForm } from "react-hook-form";
import ApiRoutes from "../ApiRoutes/ApiRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { isLoading: loginLoading, mutate: fetchLoginData } = usePost();

  const LoginSubmit = (data) => {
    if (!data?.userName || !data?.password) {
      setError("Please enter both username and password.");
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
        onSuccess: (res) => {
          toast.success("Login successful!");
          localStorage.setItem("token", res); // make sure `res` is actually the token
          localStorage.setItem("userName", requestBody.userName);
          navigate("/dashboard");
        },
        onError: () => {
          setError("Invalid username or password.");
          toast.error("Login failed. Please check your credentials.");
        },
      }
    );
  };

  console.log("Render Login Component", loginLoading);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
      {/* Overlay Loader */}
      {loginLoading && (
        
          <Loader text="Logging in..." />
        
      )}

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

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <form onSubmit={handleSubmit(LoginSubmit)}>
              {/* Username */}
              <TextInput
                label="Username"
                id="username"
                {...register("userName")}
                required
              />

              {/* Password with eye toggle */}
              <div className="form-floating mb-3 position-relative">
                <TextInput
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
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

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loginLoading}
              >
                {loginLoading ? "Please wait..." : "Login"}
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
