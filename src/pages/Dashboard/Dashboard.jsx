import { useEffect } from "react";
import { ContainersSection, Navbar } from "../../components";
import { fetchUserData } from "../../services/userService";

const Dashboard = () => {
  //const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        console.log("Containers loading.");
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <ContainersSection />
    </div>
  );
};

export default Dashboard;
