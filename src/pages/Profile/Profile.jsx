import { useState, useEffect } from "react";
// -ReactIcons-
import { FaUserCircle } from "react-icons/fa";
// -Components-
import { Navbar } from "../../components";
// -Services-
import { fetchUserData } from "../../services/userService";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const fetchedUserData = await fetchUserData();
      if (fetchedUserData) {
        setUserData(fetchedUserData);
      }
    };

    getUserData();
  }, []);

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
      <div className="my-4 bg-white w-[90%] md:w-[60%] text-black text-center border-[1px] border-gray-300 mx-auto font-montserrat p-4 rounded-md shadow-2xl flex flex-col">
        <div className="flex items-center justify-center bg-emerald-600 mb-2 text-white">
          <div className="font-medium mr-1">{userData.firstName}</div>
          <div className="font-medium mr-1">{userData.lastName}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col mx-auto">
            <div className="text-blueColor flex items-center justify-center">
              {userData.imageUrl ? (
                <img
                  src={userData.imageUrl}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  className="rounded-full w-24 h-24 object-cover"
                />
              ) : (
                <FaUserCircle size={100} />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <div className="font-medium mr-1">{userData.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
