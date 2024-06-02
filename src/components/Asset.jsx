import React, { useEffect, useState } from "react";
import "./Asset.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsset,
  fetchAllAssets,
  updateAsset,
} from "../store/slice/assetSlice/getAllAssetSlice";
import { addAsset } from "../store/slice/assetSlice/addAssetSlice";
import { Link } from "react-router-dom";

const Asset = () => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleEditClick = (asset) => {
    setShowEditForm(true);
    setFormData(asset);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
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
      ...formData,
      installationDate: formattedInstallationDate,
      lastMaintenanceDate: formattedLastMaintenanceDate,
    };

    dispatch(addAsset(assetData))
      .then(() => dispatch(fetchAllAssets())) // Fetch all assets after adding
      .then(() => {
        setShowAddForm(false);
        setFormData({
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
        }); // Reset form fields
      });
  };
  const handleEditSubmit = (e) => {
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
      ...formData,
      installationDate: formattedInstallationDate,
      lastMaintenanceDate: formattedLastMaintenanceDate,
    };

    // console.log("Updating asset with data:", assetData); // Add this line to log the data being sent

    dispatch(updateAsset({ assetId: formData._id, assetData })).then(() => {
      dispatch(fetchAllAssets()); // Fetch all assets after updating
      setShowEditForm(false);
      setFormData({
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
      }); // Reset form fields
    });
  };
  const handleClose = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setFormData({
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
    }); // Reset form fields
  };

  const handleDeleteAsset = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (isConfirm) {
      dispatch(deleteAsset(id)).then(() => dispatch(fetchAllAssets())); // Fetch all assets after deletion
    }
  };

  useEffect(() => {
    dispatch(fetchAllAssets());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading .....</h1>;
  }
  // console.log("formData", formData);
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
                  <button
                    className="asset-table-button edit-button"
                    onClick={() => handleEditClick(asset)}
                  >
                    Edit
                  </button>
                  <button
                    className="asset-table-button remove-button"
                    onClick={() => handleDeleteAsset(asset._id)}
                  >
                    Remove
                  </button>
                  <Link
                    to={`/assets/${asset._id}`}
                    className="asset-table-button details-button"
                  >
                    Details
                  </Link>
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
            <form onSubmit={handleAddSubmit} className="add-form">
              {/* Add form fields */}
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
        {showEditForm && (
          <div className="overlay">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <form onSubmit={handleEditSubmit} className="edit-form">
              {/* Edit form fields, same as add form fields */}
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
                  value={formData.installationDate.split("T")[0]} // Extract date part
                  onChange={handleChange}
                  required
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
                  value={formData.lastMaintenanceDate.split("T")[0]}
                  onChange={handleChange}
                  required
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
                  value={formData.specifications[0].power}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="voltage">Voltage:</label>
                <input
                  type="text"
                  id="voltage"
                  name="voltage"
                  value={formData.specifications[0].voltage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="current">Current:</label>
                <input
                  type="text"
                  id="current"
                  name="current"
                  value={formData.specifications[0].current}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="speed">Speed:</label>
                <input
                  type="text"
                  id="speed"
                  name="speed"
                  value={formData.specifications[0].speed}
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
