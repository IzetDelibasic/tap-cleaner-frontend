import axios from "axios";
import { useEffect, useState } from "react";

const ContainersSection = () => {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const loggedInUserData = localStorage.getItem("loggedInUserData");

        if (!loggedInUserData) {
          console.error("Korisnički podaci nisu pronađeni u lokalnoj pohrani.");
          return;
        }

        const parsedUserData = JSON.parse(loggedInUserData);
        const token = parsedUserData.jwtToken;
        if (!token) {
          throw new Error("Token nije pronađen u lokalnoj pohrani.");
        }

        const response = await axios.get(
          "https://localhost:7072/Container/GetContainers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContainers(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContainers();
  }, []);

  if (loading) {
    return <div>Učitavanje kontejnera...</div>;
  }

  if (error) {
    return <div>Greška: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kontejneri</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {containers.length > 0 ? (
          containers.map((container, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold">{container.name || ""}</h3>
              <p className="text-sm text-gray-600">
                Adresa: {container.adress || ""}
              </p>
              <p className="text-sm text-gray-600">
                Koordinate: {container.coordinates || ""}
              </p>
              <p className="text-sm text-gray-600">
                Tip: {container.type || ""}
              </p>
              <p className="text-sm text-gray-600">
                Stanje: {container.condition || ""}
              </p>
              <p className="text-sm text-gray-600">
                Broj izvještaja: {container.numberOfReports || 0}
              </p>
            </div>
          ))
        ) : (
          <p>Nema kontejnera za prikaz.</p>
        )}
      </div>
    </div>
  );
};

export default ContainersSection;
