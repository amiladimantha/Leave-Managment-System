import React, { useEffect, useState, Component } from "react";
import { Space, Table, Tag, Button, Result, Modal, message } from "antd";
import "./leaves.css";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();  
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const approved = ["Pending", "Yes", "No" ];

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7068/api/ExtraLeaveList/ExtraLeaveList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listExtraLeave);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Array data", data);
  };

  
  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/DeleteExtraLeave/DeleteExtraLeave";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          alert("Record Deleted");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleApprove = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/ApproveExtraLeave/ApproveExtraLeave";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Approved");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/RejectExtraLeave/RejectExtraLeave";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Rejected");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleEditClick = (val) => {
    setEditData(val);
    const formWindow = window.open("", "formWindow", "height=500,width=800");
    formWindow.document.body.innerHTML = `
      <div>
        <form>
          <label>
            ID:
            <input type="text" value=${val.id} disabled />
          </label>
          <label>
            Creator ID:
            <input type="text" value=${val.creatorID} disabled />
          </label>
          <label>
            Creator Name:
            <input type="text" value=${val.creatorName} disabled />
          </label>
          <label>
            From Date:
            <input type="date" value=${val.fromDate} onChange={handleFormChange} />
          </label>
          <label>
            To Date:
            <input type="date" value=${val.toDate} onChange={handleFormChange} />
          </label>
          <label>
            No of Days:
            <input type="date" value=${val.noofDays} onChange={handleFormChange} />
          </label>
          <label>
            Reason:
            <input type="text" value=${val.reason} onChange={handleFormChange} />
          </label>
        </form>
        <button onClick="handleSaveClick()">Save</button>
        <button onClick="handleCancelClick()">Cancel</button>
      </div>
    `;
    formWindow.handleFormChange = (event) => {
      setEditData({ ...editData, [event.target.name]: event.target.value });
    };
       
    formWindow.handleSaveClick = () => {
      axios
        .post("https://localhost:7068/api/EditUserDetails/EditUserDetails", editData)
        .then((result) => {
          if (result.status === 200) {
            setData((prevData) =>
              prevData.map((item) => {
                if (item.id === editData.id) {
                  return editData;
                }
                return item;
              })
            );
            formWindow.close();
            console.log(editData)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    formWindow.handleCancelClick = () => {
      formWindow.close();
    };
  };


  return (
    <>
<div>
{(() => {
        if (type === "0") {
          return (
            <div>
      
      {data ? (
          <table className="datatable">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CreatorID</th>
                <th scope="col">Creator Name</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">No of Days</th>
                <th scope="col">Reason</th>
                <th scope="col">Is Approved</th>
                <th scope="col">Approvals</th>
                <th scope="col">Rejections</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.creatorID}</td>
                    <td>{val.creatorName}</td>
                    <td>{val.fromDate}</td>
                    <td>{val.toDate}</td>
                    <td>{val.noofDays}</td>
                    <td>{val.reason}</td>
                    <td>{approved[val.isApproved]}</td>
                    <td>
                    {val.isApproved != 1  ? (
                        <button
                          className="userApprove"
                          onClick={(e) => handleApprove(e, val.id)}
                        >
                          Approve
                        </button>
                      ):  (
                        "Already Approved"
                      )}                    
                    </td>
                    <td>
                    {val.isApproved != 2 ? (
                        <button
                          className="userBlock"
                          onClick={(e) => handleReject(e, val.id)}
                        >
                          Reject
                        </button>
                      ) : (
                        "Already Rejected"
                      )}
                    </td>
                    
                    <td>
                        <button
                          className="userEdit"
                          onClick={() => handleEditClick(val)} 
                        >
                          Edit
                        </button>
                    </td>
                    <td>
                    
                    <button
                      className="userDelete"
                      onClick={(e) => { if (window.confirm('Are you sure you wish to delete this record?')) handleDelete(e, val.id) }}
                    >
                      Delete
                    </button>
                </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No data found"
        )}
      </div>
          )
        } else {
          return (
            <div>
      
      {data ? (
          <table className="datatable">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CreatorID</th>
                <th scope="col">Creator Name</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">No of Days</th>
                <th scope="col">Reason</th>
                <th scope="col">Is Approved</th>
                <th scope="col">Approvals</th>
                <th scope="col">Reject</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, index) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.creatorID}</td>
                    <td>{val.creatorName}</td>
                    <td>{val.fromDate}</td>
                    <td>{val.toDate}</td>
                    <td>{val.noofDays}</td>
                    <td>{val.reason}</td>
                    <td>{approved[val.isApproved]}</td>
                    <td>
                    {val.isApproved != 1  ? (
                        <button
                          className="userApprove"
                          onClick={(e) => handleApprove(e, val.id)}
                        >
                          Approve
                        </button>
                      ):  (
                        "Already Approved"
                      )}                    
                    </td>
                    <td>
                    {val.isApproved != 2 ? (
                        <button
                          className="userBlock"
                          onClick={(e) => handleReject(e, val.id)}
                        >
                          Reject
                        </button>
                      ) : (
                        "Already Rejected"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No data found"
        )}
      </div>
          )
        } 
      })()}
</div>




    </>
  );
};

export default DataTable;









































