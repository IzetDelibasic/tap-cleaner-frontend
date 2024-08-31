import { useState, useEffect } from "react";
import axios from "axios";
// -ReactIcons-
import { FaUserCircle } from "react-icons/fa";
// -Components-
import { Navbar } from "../../components";
// -Services-
import { fetchUserData } from "../../services/userService";
import { fetchContainers } from "../../services/containersService";
import { toast } from "react-toastify";
import { environment } from "../../environments/environments";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    firstName: "",
    lastName: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [containers, setContainers] = useState([]);
  const [loadingContainers, setLoadingContainers] = useState(true);
  const [errorContainers, setErrorContainers] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const fetchedUserData = await fetchUserData();
      if (fetchedUserData) {
        setUserData(fetchedUserData);
        setEditableData({
          firstName: fetchedUserData.firstName,
          lastName: fetchedUserData.lastName,
          imageUrl: fetchedUserData.imageUrl,
        });
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getContainers = async () => {
      try {
        const loggedInUserData = localStorage.getItem("loggedInUserData");

        if (!loggedInUserData) {
          toast.error("User data not found in local storage.");
          return;
        }

        const parsedUserData = JSON.parse(loggedInUserData);
        const token = parsedUserData.jwtToken;

        if (!token) {
          throw new Error("Token not found in local storage.");
        }

        const containersData = await fetchContainers(token);
        setContainers(containersData);
      } catch (err) {
        setErrorContainers(err.message);
      } finally {
        setLoadingContainers(false);
      }
    };

    getContainers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const loggedInUserData = localStorage.getItem("loggedInUserData");

      if (!loggedInUserData) {
        toast.error("User data not found in local storage.");
        return;
      }

      const parsedUserData = JSON.parse(loggedInUserData);
      const token = parsedUserData.jwtToken;
      const email = parsedUserData.email;

      if (!token) {
        throw new Error("Token not found in local storage.");
      }

      await axios.put(
        `${environment.apiBaseUrl}/User/UpdateUser/${email}`,
        editableData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData({
        ...userData,
        ...editableData,
      });
      toast.success("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      toast.error(`An error occurred: ${err.message}`);
    }
  };

  if (!userData) {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="text-center mt-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="my-4 bg-white w-[90%] md:w-[60%] lg:w-[45%] text-black text-center border-[1px] border-gray-300 mx-auto font-montserrat p-4 rounded-md shadow-2xl flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center w-[80%] mx-auto">
          <div className="mr-2">
            <div className="text-blueColor flex items-center justify-center">
              {editableData.imageUrl ? (
                <img
                  src={editableData.imageUrl}
                  alt={`${editableData.firstName} ${editableData.lastName}`}
                  className="rounded-full w-48 h-48 object-cover"
                />
              ) : (
                <FaUserCircle size={200} />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center bg-emerald-600 mb-2 text-white">
              <div className="font-medium mr-1">{editableData.firstName}</div>
              <div className="font-medium mr-1">{editableData.lastName}</div>
            </div>
            <div className="flex flex-col justify-center items-center mx-auto">
              <div className="font-medium mr-1">{userData.email}</div>
            </div>
          </div>
        </div>
        {isEditing ? (
          <div className="mt-4">
            <input
              type="text"
              name="firstName"
              value={editableData.firstName}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full mb-2"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={editableData.lastName}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full mb-2"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="imageUrl"
              value={editableData.imageUrl}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full mb-2"
              placeholder="Image URL"
            />
            <button
              onClick={handleUpdate}
              className="bg-emerald-600 text-white font-medium py-2 px-2 sm:px-4 rounded-3xl hover:bg-emerald-800 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white font-medium py-2 px-4 rounded-3xl hover:bg-gray-800 transition duration-300 ease-in-out ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-emerald-600 text-white w-[40%] mx-auto font-medium py-2 px-4 rounded-3xl hover:bg-emerald-800 transition duration-300 ease-in-out mt-4"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="my-4 bg-white w-[90%] md:w-[60%] lg:w-[45%] text-black text-center border-[1px] border-gray-300 mx-auto font-montserrat p-4 rounded-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Containers</h2>
        {loadingContainers ? (
          <div className="text-center">Loading containers...</div>
        ) : errorContainers ? (
          <div className="text-center text-red-600">
            Error: {errorContainers}
          </div>
        ) : (
          <div>
            {containers.length > 0 ? (
              containers.map((container, index) => (
                <div
                  className="bg-gray-100 rounded-lg p-4 mb-4 border border-gray-300"
                  key={index}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {container.name}
                  </h3>
                  <p>
                    <strong>Address:</strong> {container.adress}
                  </p>
                  <p>
                    <strong>Coordinates:</strong> {container.coordinates}
                  </p>
                  <p>
                    <strong>Type:</strong> {container.type}
                  </p>
                  <p>
                    <strong>Condition:</strong> {container.condition}
                  </p>
                  <p>
                    <strong>Number of Reports:</strong>{" "}
                    {container.numberOfReports}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No containers available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
