import React, { useEffect, useState } from "react";
import "./Maintenance.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTicket } from "../store/slice/ticketSlice/getAllTicketSlice";
import { addTicket } from "../store/slice/ticketSlice/addTicketSlice";

const Maintenance = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const dispatch = useDispatch();
  const { ticket, isLoading } = useSelector((state) => state.allTickets);
  console.log("ticket", ticket);
  const [formData, setFormData] = useState({
    motorId: "",
    issueDescription: "",
    dateRaised: "", // Corrected name to match the form input
    status: "",
  });
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
  const handleSubmitTicket = (e) => {
    e.preventDefault();

    const formattedDateRaised = formData.dateRaised
      .split("-")
      .reverse()
      .join("-");
    const ticketData = {
      ...formData,
      dateRaised: formattedDateRaised,
    };
    dispatch(addTicket(ticketData))
      .then(() => dispatch(fetchAllTicket())) // Fetch all assets after adding
      .then(() => {
        setShowAddForm(false);
        setFormData({
          motorId: "",
          issueDescription: "",
          dateRaised: "",
          status: "",
        }); // Reset form fields
      });
  };
  const handleClose = () => {
    setShowAddForm(false);
    setFormData({
      motorId: "",
      issueDescription: "",
      dateRaised: "",
      status: "",
    }); // Reset form fields
  };
  useEffect(() => {
    dispatch(fetchAllTicket());
  }, [dispatch]);

  return (
    <div className="container tickets-container">
      <h1 className="tickets-heading">Maintenance Tickets</h1>
      <button className="raise-ticket-button" onClick={handleAddClick}>
        Raise New Ticket
      </button>
      <table className="tickets-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Asset ID</th>
            <th className="table-header">issueDescription</th>
            <th className="table-header">Date Raised</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ticket?.data?.map((ticket) => (
            <tr key={ticket._id} className="table-row">
              <td className="table-data">{ticket.ticketId}</td>
              <td className="table-data">{ticket.motorId}</td>
              <td className="table-data">{ticket.issueDescription}</td>
              <td className="table-data">{ticket.dateRaised.split("T")[0]}</td>
              <td className="table-data">{ticket.status}</td>
              <td className="table-data">
                <button className="action-button edit-button">Edit</button>
                <button className="action-button delete-button">Delete</button>
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
          <form onSubmit={handleSubmitTicket} className="add-form">
            <div className="form-group">
              <label htmlFor="motorId">Asset ID:</label>
              <input
                type="text"
                id="motorId"
                name="motorId"
                value={formData.motorId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="issueDescription">issueDescription:</label>
              <textarea
                id="issueDescription"
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="dateRaised">Ticket Raised Date:</label>
              <input
                type="date"
                id="dateRaised" // Corrected id to match the name used in the state
                name="dateRaised" // Corrected name to match the state
                value={formData.dateRaised} // Corrected value to match the state
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
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
