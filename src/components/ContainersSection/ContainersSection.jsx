import axios from "axios";
import { useEffect, useState } from "react";
import { environment } from "../../environments/environments";

const ContainersSection = () => {
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
          `${environment.apiBaseUrl}/Container/GetContainers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContainers(response.data);
        setFilteredContainers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContainers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = containers.filter((container) =>
        container.adress.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContainers(filtered);
    } else {
      setFilteredContainers(containers);
    }
  }, [searchQuery, containers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchLocation = (coordinates) => {
    window.open(`https://www.google.com/maps?q=${coordinates}`, "_blank");
  };

  const handleReportCondition = (containerId) => {
    console.log(`${containerId}`);
  };

  if (loading) {
    return <div>Učitavanje kontejnera...</div>;
  }

  if (error) {
    return <div>Greška: {error}</div>;
  }

  return (
    <div>
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-emerald-600">
          Containers
        </span>
      </h1>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by address..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full mb-4"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {filteredContainers.length > 0 ? (
          filteredContainers.map((container, index) => (
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-4 text-center border-[1px] border-opacity-25 border-black hover:border-blueColor ease-in-out duration-300"
              key={index}
            >
              <h2 className="text-xl font-bold mb-2">{container.name || ""}</h2>
              <p className="text-gray-600 mb-2">
                Address: {container.adress || ""}
              </p>
              <p className="text-gray-600 mb-2">
                Coordinates: {container.coordinates || ""}
              </p>
              <p className="text-gray-600 mb-2">Type: {container.type || ""}</p>
              <p className="text-gray-600 mb-2">
                Condition: {container.condition || ""}
              </p>
              <p className="text-gray-600 mb-2">
                Number of Reports: {container.numberOfReports || 0}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleSearchLocation(container.coordinates)}
                  className="bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-emerald-800 transition duration-300 ease-in-out"
                >
                  Location
                </button>
                <button
                  onClick={() => handleReportCondition(container.id)}
                  className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out"
                >
                  Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No containers available.</p>
        )}
      </div>
    </div>
  );
};

export default ContainersSection;
