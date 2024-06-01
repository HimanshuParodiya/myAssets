import React, { useEffect, useState } from "react";
import "./Asset.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAssets } from "../store/slice/assetSlice/getAllAssetSlice";

const Asset = () => {
  const dispatch = useDispatch();

  const { assets } = useSelector((state) => state.allAssets);
  console.log("asset page", assets.data);

  useEffect(() => {
    dispatch(fetchAllAssets());
  }, [dispatch]);

  return (
    <div className="container asset-container">
      <div className="asset-container-header">
        <h1>Assets</h1>
        <button className="add-new-button">Add New</button>
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
      </div>
    </div>
  );
};

export default Asset;
