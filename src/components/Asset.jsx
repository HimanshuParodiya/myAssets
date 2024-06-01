import React, { useEffect, useState } from "react";
import "./Asset.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets } from "../store/slice/assetSlice/getAllAssetSlice";
import { addAsset } from "../store/slice/assetSlice/addAssetSlice";

const Asset = () => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    motorId: "",
    name: "",
    description: "",
    location: "",
    manufacturer: "",
    modelNumber: "",
    serialNumber: "",
    installationDate: "",
    lastMaintenanceDate: "",
    status: "",
    power: "",
    voltage: "",
    current: "",
    speed: "",
  });
  const { assets, isLoading } = useSelector((state) => state.allAssets);
  console.log("asset page", assets.data);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format dates
    const formattedInstallationDate = formData.installationDate
      .split("-")
      .reverse()
      .join("-");
    const formattedLastMaintenanceDate = formData.lastMaintenanceDate
      .split("-")
      .reverse()
      .join("-");

    const assetData = {
      motorId: formData.motorId,
      name: formData.name,
      description: formData.description,
      location: formData.location,
      manufacturer: formData.manufacturer,
      modelNumber: formData.modelNumber,
      serialNumber: formData.serialNumber,
      installationDate: formattedInstallationDate,
      lastMaintenanceDate: formattedLastMaintenanceDate,
      status: formData.status,
      power: formData.power,
      voltage: formData.voltage,
      current: formData.current,
      speed: formData.speed,
    };

    dispatch(addAsset(assetData));
    setShowAddForm(!showAddForm); //
  };
  const handleClose = () => {
    // Logic to close the form, for example, setting showAddForm to false
    setShowAddForm(false);
  };
  useEffect(() => {
    dispatch(fetchAllAssets());
  }, [dispatch]);
  if (isLoading) {
    return <h1>Loading .....</h1>;
  }
  console.log(showAddForm);
  return (
    <div className="container asset-container">
      <div className="asset-container-header">
        <h1>Assets</h1>
        <button className="add-new-button" onClick={handleAddClick}>
          Add New
        </button>
      </div>
      <div className="asset-container-main">
        <table className="asset-table">
          <thead className="asset-table-head">
            <tr className="asset-table-row">
              <th className="asset-table-header">ID</th>
              <th className="asset-table-header">Name</th>
              <th className="asset-table-header">Status</th>
              <th className="asset-table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="asset-table-body">
            {assets?.data?.map((asset) => (
              <tr key={asset?._id} className="asset-table-row">
                <td className="asset-table-cell">{asset?.motorId}</td>
                <td className="asset-table-cell">{asset?.name}</td>
                <td className="asset-table-cell">{asset?.status}</td>
                <td className="asset-table-cell">
                  <button className="asset-table-button edit-button">
                    Edit
                  </button>
                  <button className="asset-table-button remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddForm && (
          <div className="overlay">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <form onSubmit={handleSubmit} className="add-form">
              <div className="form-group">
                <label htmlFor="motorId">Motor ID:</label>
                <input
                  type="text"
                  id="motorId"
                  name="motorId"
                  value={formData.motorId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer:</label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modelNumber">Model Number:</label>
                <input
                  type="text"
                  id="modelNumber"
                  name="modelNumber"
                  value={formData.modelNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serialNumber">Serial Number:</label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="installationDate">Installation Date:</label>
                <input
                  type="date"
                  id="installationDate"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastMaintenanceDate">
                  Last Maintenance Date:
                </label>
                <input
                  type="date"
                  id="lastMaintenanceDate"
                  name="lastMaintenanceDate"
                  value={formData.lastMaintenanceDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Operational">Operational</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="power">Power:</label>
                <input
                  type="text"
                  id="power"
                  name="power"
                  value={formData.power}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="voltage">Voltage:</label>
                <input
                  type="text"
                  id="voltage"
                  name="voltage"
                  value={formData.voltage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="current">Current:</label>
                <input
                  type="text"
                  id="current"
                  name="current"
                  value={formData.current}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="speed">Speed:</label>
                <input
                  type="text"
                  id="speed"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Asset;
