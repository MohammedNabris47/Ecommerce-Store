import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import loginBg from "../../assets/J4o.gif";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Logged In Successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div>
      <section className="pl-40 flex flex-wrap ">
        <div className="mr-14 mt-16">
          <h1 className="text-white font-semibold text-lg mb3">Sign In</h1>
          <form className="container w-100" onSubmit={submitHandler}>
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
                required
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-white text-black font-medium px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-3">
            <p className="text-white text-[12px]">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-white hover:underline text-[11px] font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src={loginBg}
          alt="bg"
          className="h-100 w-[58%] xl:block md:hidden sm:hidden rounded-lg object-cover mt-10"
        />
      </section>
    </div>
  );
};

export default Login;
