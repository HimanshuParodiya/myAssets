import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AssetDetails.css"; // Import your CSS file for styling

const AssetDetails = () => {
  const { id } = useParams();
  const [assetDetails, setAssetDetails] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/assets");
  };
  useEffect(() => {
    // Fetch asset details with the given ID
    const fetchAssetDetails = async () => {
      try {
        const response = await fetch(`/api/v1/assets/asset-details/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch asset details");
        }
        const data = await response.json();
        console.log(data);
        setAssetDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssetDetails();
  }, [id]);

  return (
    <div className="asset-details-container">
      <button onClick={handleClick} className="back-button">
        <span>Back</span>
      </button>
      <h2 className="asset-details-title">{assetDetails?.data.motorId}</h2>
      {assetDetails ? (
        <div className="asset-details">
          <div className="asset-details-item">
            <strong>Name:</strong> {assetDetails?.data.name}
          </div>
          <div className="asset-details-item">
            <strong>Description:</strong> {assetDetails?.data.description}
          </div>
          <div className="asset-details-item">
            <strong>Location:</strong> {assetDetails?.data.location}
          </div>
          <div className="asset-details-item">
            <strong>Manufacturer:</strong> {assetDetails?.data.manufacturer}
          </div>
          <div className="asset-details-item">
            <strong>Model Number:</strong> {assetDetails?.data.modelNumber}
          </div>
          <div className="asset-details-item">
            <strong>Serial Number:</strong> {assetDetails?.data.serialNumber}
          </div>
          <div className="asset-details-item">
            <strong>Installation Date:</strong>{" "}
            {assetDetails?.data.installationDate.split("T")[0]}
          </div>
          <div className="asset-details-item">
            <strong>Last Maintenance Date:</strong>{" "}
            {assetDetails?.data.lastMaintenanceDate.split("T")[0]}
          </div>
          <div className="asset-details-item">
            <strong>Status:</strong> {assetDetails?.data.status}
          </div>
          <div className="asset-details-item">
            <strong>Power:</strong> {assetDetails?.data.specifications[0].power}
          </div>
          <div className="asset-details-item">
            <strong>Voltage:</strong>{" "}
            {assetDetails?.data.specifications[0].voltage}
          </div>
          <div className="asset-details-item">
            <strong>Current:</strong>{" "}
            {assetDetails?.data.specifications[0].current}
          </div>
          <div className="asset-details-item">
            <strong>Speed:</strong> {assetDetails?.data.specifications[0].speed}
          </div>
        </div>
      ) : (
        <p>Loading asset details...</p>
      )}
    </div>
  );
};

export default AssetDetails;
