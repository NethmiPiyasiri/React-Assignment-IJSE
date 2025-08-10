import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/app.constants.ts";
import { useState } from "react";
import { axiosPublicInstance } from "../../utils/axios.instance.ts";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  password: Yup.string(),
});

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      const response = await axiosPublicInstance.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.accessToken);
      console.log("Login successful", response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;