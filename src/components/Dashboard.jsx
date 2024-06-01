import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets } from "../store/slice/assetSlice/getAllAssetSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { assets } = useSelector((state) => state.allAssets);
  console.log();
  useEffect(() => {
    dispatch(fetchAllAssets());
  }, [dispatch]);

  return (
    <div className="container dashboard-container">
      <h1>Overview</h1>
      <div className="dashboard-metrics">
        <div className="metric dashboard-metric-1">
          <h3>Total Assets</h3>
          <p>{assets.data.length}</p>
        </div>
        <div className="metric dashboard-metric-2">
          <h3>Operational</h3>
          <p>8</p>
        </div>
        <div className="metric dashboard-metric-3">
          <h3>Under Maintenance</h3>
          <p>2</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
