import axios from "axios";
import { useEffect } from "react";
import { ContainersSection, Navbar } from "../../components";
import { environment } from "../../environments/environments";

const Dashboard = () => {
  //const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUserData = localStorage.getItem("loggedInUserData");

        if (!loggedInUserData) {
          console.error("Korisnički podaci nisu pronađeni u lokalnoj pohrani.");
          return;
        }

        const parsedUserData = JSON.parse(loggedInUserData);
        const email = parsedUserData.email;
        const token = parsedUserData.jwtToken;

        if (!email || !token) {
          console.error("Email ili token nisu pronađeni u lokalnoj pohrani.");
          return;
        }

        await axios.post(
          `${environment.apiBaseUrl}/User/GetUserByEmail`,
          email,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        //setUserData(response.data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka korisnika:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <ContainersSection />
    </div>
  );
};

export default Dashboard;
