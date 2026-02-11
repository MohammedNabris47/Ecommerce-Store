import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { Link } from "react-router";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User Updated Successfully!");
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 mt-12">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-white text-lg font-semibold mb-5 text-center">
            Update Profile
          </h2>

          <form className="container w-100" onSubmit={submitHandler}>
            <div className="my-4">
              <label
                htmlFor="name"
                className="block text-[13px] font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 bg-gray-900 outline-0 rounded w-full text-white text-[12px]"
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
                className="mt-1 p-2 bg-gray-900 outline-0 rounded w-full text-white text-[12px]"
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
                className="mt-1 p-2  rounded w-full text-white text-[12px]  bg-gray-900 outline-0"
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
                className="mt-1 p-2 bg-gray-900 outline-0 rounded w-full text-white text-[12px]"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                disabled={loadingUpdateProfile}
                type="submit"
                className="bg-white text-black font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>
              <Link
                to={"/user-orders"}
                className="bg-white text-black font-medium  px-3 py-1 rounded cursor-pointer my-4 outline-0 text-[12px]"
              >
                My Orders
              </Link>
            </div>
          </form>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
