import React, { useEffect, useState, Component } from "react";
import { Space, Table, Tag, Button, Result, Modal, message, Pagination } from "antd";
import "./leaves.css";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();  
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const approved = ["Pending", "Yes", "No" ];

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7046/api/ExtraLeave/ExtraLeaveList";
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
    const url = "https://localhost:7046/api/ExtraLeave/DeleteExtraLeave";
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
    const url = "https://localhost:7046/api/ExtraLeave/ApproveExtraLeave";
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
    const url = "https://localhost:7046/api/ExtraLeave/RejectExtraLeave";
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

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const [sortBy, setSortBy] = useState({
    column: "id",
    order: "asc",
  });

  const handleSort = (column) => {
    const order =
      sortBy.column === column && sortBy.order === "asc" ? "desc" : "asc";
    setSortBy({ column, order });
  };

  const sortedData = data.sort((a, b) => {
    const ascending = sortBy.order === "asc" ? 1 : -1;
    const descending = sortBy.order === "desc" ? 1 : -1;
    if (a[sortBy.column] < b[sortBy.column]) {
      return ascending;
    }
    if (a[sortBy.column] > b[sortBy.column]) {
      return descending;
    }
    return 0;
  });

  const getSortArrow = (column) => {
    if (sortBy.column === column) {
      return sortBy.order === "asc" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <>
<div>
{(() => {
        if (type === "0") {
          return (
            <div>
      <h3>Extra Leaves</h3>
      {currentData ? (
          <table className="datatable">
            <thead>
              <tr>
              <th scope="col" style={{borderTopLeftRadius: '20px'}} onClick={() => handleSort("id")}>
                        ID {getSortArrow("id")}</th>
                <th scope="col" onClick={() => handleSort("creatorID")}>CreatorID {getSortArrow("creatorID")}</th>
                <th scope="col" onClick={() => handleSort("creatorName")}>Creator Name {getSortArrow("creatorName")}</th>
                <th scope="col" onClick={() => handleSort("fromDate")}>From Date {getSortArrow("fromDate")}</th>
                <th scope="col" onClick={() => handleSort("toDate")}>To Date {getSortArrow("toDate")}</th>
                <th scope="col" onClick={() => handleSort("noofDays")}>No of Days {getSortArrow("noofDays")}</th>
                <th scope="col" onClick={() => handleSort("reason")}>Reason {getSortArrow("reason")}</th>
                <th scope="col" onClick={() => handleSort("isApproved")}>Is Approved {getSortArrow("isApproved")}</th>
                <th scope="col">Approvals</th>
                <th scope="col">Rejections</th>
                <th scope="col">Edit</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((val, index) => {
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
      <h3>Extra Leaves</h3>
      {currentData ? (
          <table className="datatable">
            <thead>
              <tr>
              <th scope="col" style={{borderTopLeftRadius: '20px'}} onClick={() => handleSort("id")}>
                        ID {getSortArrow("id")}</th>
                <th scope="col" onClick={() => handleSort("creatorId")}>CreatorID {getSortArrow("creatorId")}</th>
                <th scope="col" onClick={() => handleSort("creatorName")}>Creator Name {getSortArrow("creatorName")}</th>
                <th scope="col" onClick={() => handleSort("fromDate")}>From Date {getSortArrow("fromDate")}</th>
                <th scope="col" onClick={() => handleSort("toDate")}>To Date {getSortArrow("toDate")}</th>
                <th scope="col" onClick={() => handleSort("noofDays")}>No of Days {getSortArrow("noofDays")}</th>
                <th scope="col" onClick={() => handleSort("reason")}>Reason {getSortArrow("reason")}</th>
                <th scope="col" onClick={() => handleSort("isApproved")}>Is Approved {getSortArrow("isApproved")}</th>
                <th scope="col">Approvals {getSortArrow("approvals")}</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}}>Reject</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((val, index) => {
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
<br />
<Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handleChangePage}
          onShowSizeChange={handlePageSizeChange}
          showSizeChanger={true}
          pageSizeOptions={[10, 20, 50, 100]}
          style={{ textAlign: "center" }}
        />
<br />



    </>
  );
};

export default DataTable;









































