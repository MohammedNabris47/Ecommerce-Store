import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import spin from "../../assets/spin.gif";
import Loader from "../../components/Loader";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User Registered Successfully!");
        navigate(redirect);
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div>
      <section className="pl-40 flex flex-wrap ">
        <div className="mr-14 mt-16">
          <h1 className="text-white font-semibold text-lg mb3">Sign Up</h1>
          <form className="container w-100" onSubmit={submitHandler}>
            <div className="my-8">
              <label
                htmlFor="name"
                className="block text-[13px] font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border border-gray-700 outline-0 rounded w-full text-white text-[12px]"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-8">
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border border-gray-700 outline-0 rounded w-full text-white text-[12px]"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2  rounded w-full text-white text-[12px]  border border-gray-700 outline-0"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-8">
              <label
                htmlFor="confirmPassword"
                className="block text-[13px] font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border border-gray-700 outline-0 rounded w-full text-white text-[12px]"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-white text-black font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-3">
            <p className="text-white text-[12px]">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-white hover:underline text-[11px] font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <img
          src={spin}
          alt="spin"
          className="h-100 w-[58%] xl:block md:hidden sm:hidden rounded-lg object-cover mt-10"
        />
      </section>
    </div>
  );
};

export default Register;
