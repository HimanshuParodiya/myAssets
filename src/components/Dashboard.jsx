import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets } from "../store/slice/assetSlice/getAllAssetSlice";
import { fetchAllTicket } from "../store/slice/ticketSlice/getAllTicketSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { assets } = useSelector((state) => state.allAssets);
  // console.log();
  const { ticket } = useSelector((state) => state.allTickets);
  // console.log(ticket.data, "ticket");
  useEffect(() => {
    dispatch(fetchAllAssets());
    dispatch(fetchAllTicket());
  }, [dispatch]);

  return (
    <div className="container dashboard-container">
      <h1>Overview</h1>
      <div className="dashboard-metrics">
        <div className="metric dashboard-metric-1">
          <h3>Total Assets</h3>
          <p>{assets?.data?.length}</p>
        </div>
        <div className="metric dashboard-metric-2">
          <h3>Operational</h3>
          <p>{assets?.data?.length - ticket?.data?.length || 0}</p>
        </div>
        <div className="metric dashboard-metric-3">
          <h3>Under Maintenance</h3>
          <p>{ticket?.data?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
