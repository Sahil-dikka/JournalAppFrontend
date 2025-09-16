import { useState } from "react";
import RegisterImage from "../assets/registerImage.webp";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import usePost from "../Hooks/PostDetails";
import ApiRoutes from "../ApiRoutes/ApiRoutes";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const  registerEndpoint = ApiRoutes.POST.REGISTER
  const{isLoading: registerLoading, mutate: fetchRegisterData} = usePost();


  const FormRegisterSubmit = (data) => {
    console.log("Form data:", data);
    if (!data?.userName || !data?.email || !data?.password || !data?.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (data?.password !== data?.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const registerRequestBody = {
      userName: data?.userName,
      password: data?.password,
    }
    fetchRegisterData(
      {
        endpoint: registerEndpoint,
        formData: registerRequestBody

      },
      {
        onSuccess: ({ data }) => {
          toast.success("Registered successfully!");
          navigate("/");
        },
        onError: (error) => {
          toast.error("Registration failed. Please try again.");
        }
      }
    )


    
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
            src={RegisterImage}
            alt="Journal illustration"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right side - Register form */}
        <div className="col-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "300px" }}>
            <h3 className="text-center mb-4">Register</h3>

            <form onSubmit={handleSubmit(FormRegisterSubmit)}>
              {/* Username */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Username"
                  required
                  {...register("userName")}
                />
                <label htmlFor="userName">Username</label>
              </div>

              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  {...register("email")}
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* Password */}
              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  {...register("password")}
                />
                <label htmlFor="password">Password</label>
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

              {/* Confirm Password */}
              <div className="form-floating mb-3 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  {...register("confirmPassword")}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gray",
                  }}
                >
                  {showConfirmPassword ? "🔓" : "🔒"}
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>

            <div className="text-center mt-3">
              <small>
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Login here
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
