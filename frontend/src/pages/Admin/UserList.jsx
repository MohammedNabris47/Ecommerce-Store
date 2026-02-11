import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User Deleted Successfully!");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      setEditableUserId(null);
      refetch();
      toast.success("User Updated Successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-lg font-semibold mb-4 text-white ml-4">Users List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />

          <table className="w-full mx-auto md:w-4/5">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-[12px] font-bold text-white">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-bold text-white">
                  NAME
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-bold text-white">
                  EMAIL
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-bold text-white">
                  ADMIN
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-bold text-white">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-left text-[11px] font-bold text-white">
                    {user._id}
                  </td>
                  <td className="px-4 py-2 text-left text-[11px] font-bold text-white">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 text-white rounded-lg outline-0 border bg-black border-gray-700"
                        />
                        <button
                          className="ml-2 text-white bg-black py-2 px-4 rounded-lg cursor-pointer outline-0 border border-gray-700"
                          onClick={() => updateHandler(user._id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          className="cursor-pointer outline-0 border-0"
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2 text-left text-[11px] font-bold text-white">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 text-white rounded-lg outline-0 border bg-black border-gray-700"
                        />
                        <button
                          className="ml-2 text-white bg-black border-gray-700 py-2 px-4 rounded-lg cursor-pointer outline-0 border"
                          onClick={() => updateHandler(user._id)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.email}{" "}
                        <button
                          className="cursor-pointer outline-0 border-0"
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-3" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-left text-[11px] font-bold text-white">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2 text-left text-[11px] font-bold text-white">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          className="cursor-pointer outline-0 border-0"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
