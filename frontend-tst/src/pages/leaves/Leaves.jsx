import React, { useEffect, useState, Component } from "react";
import ResponsiveSidebar from "../../Component/sidebar/Rsidebar";
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

  const leaveTypes = ["Half Day","Annual", "Maternity","Sick", "Unpaid" ];  
  const approved = ["Pending", "Yes", "No" ];

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7068/api/LeaveList/LeaveList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listLeave);
          console.log("Array data", data);
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
    const url = "https://localhost:7068/api/ApproveLeave/ApproveLeave";
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
        message.error(error);
      });
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/RejectLeave/RejectLeave";
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
        message.error(error);
      });
  };

  
  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/DeleteLeave/DeleteLeave";
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
            Type:
            <input type="text" value=${val.type} onChange={handleFormChange} />
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
        .post("https://localhost:7068/api/RegistrationList/UpdateRegistration", editData)
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
                <th scope="col">Leave Type</th>
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
                    <td>{leaveTypes[val.leaveType]}</td>
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
                <th scope="col">Leave Type</th>
                <th scope="col">Is Approved</th>
                <th scope="col">Approvals</th>
                <th scope="col">Rejections</th>
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
                    <td>{leaveTypes[val.leaveType]}</td>
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




































//******************************************************************************************


// import { Table, Divider } from "antd";
// import axios from "axios";
// import { useState, useEffect, useCallback } from "react";



// export default function UsersList() {
//   const [data, setData] = useState([]);
//   const [datam, setDataM] = useState([]);
//   const [type, setAccountType] = useState();
//   const [editData, setEditData] = useState({});
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     getData();
//     getDataM();
//     setAccountType(localStorage.getItem("accountType"));
//   }, []);

//   const getData = () => {
//     const url = "https://localhost:7068/api/RegistrationList/RegistrationList";
//     axios
//       .get(url, data)
//       .then((result) => {
//         const data = result.data;
//         if (data.statusCode === 200) {
//           setData(data.listRegistration);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("Array data", data);
//   };

//   const getDataM = () => {
//     const url =
//       "https://localhost:7068/api/RegistrationList/RegistrationListManager";
//     axios
//       .get(url, datam)
//       .then((result) => {
//         const datam = result.data;
//         if (datam.statusCode === 200) {
//           setDataM(datam.listRegistrationManager);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log("Array data", datam);
//   };

//   const handleDelete = useCallback((e, id) => {
//     e.preventDefault();
//     const data = {
//       ID: id,
//     };
//     const url = "https://localhost:7068/api/DeleteUser/DeleteUser";
//     axios
//       .post(url, data)
//       .then((result) => {
//         const dt = result.data;
//         if (dt.statusCode === 200) {
//           alert("User Deleted");
//           getData();
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     },[]);

//   const handleBlock = useCallback((e, id) => {
//     e.preventDefault();
//     const data = {
//       ID: id,
//     };
//     const url = "https://localhost:7068/api/BlockUser/BlockUser";
//     axios
//       .post(url, data)
//       .then((result) => {
//         const dt = result.data;
//         if (dt.statusCode === 200) {
//           alert("User Blocked");
//           getData();
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     },[]);

//   const  handleEditClick = useCallback((val) => {
//     setEditData(val);
//     setShowForm(true);
//   },[]);

//   const handleSaveClick = () => {
//     // code to save the edited data
//   };


//   const isColumnExist = (columns, columnName) => {
//     return columns.filter(column => column.title === columnName).length > 0;
//   }

//   const actionsColumn = !isColumnExist(columns, "Actions") ? 
//       {
//         title: 'Actions',
//         key: 'actions',
//         render: (text, record) => (
//           <span>
//             <a href="#" onClick={(e) => handleDelete(e, record.id)}>Delete</a>
//             <Divider type="vertical" />
//             <a href="#" onClick={(e) => handleBlock(e, record.id)}>Block</a>
//             <Divider type="vertical" />
//             <a href="#" onClick={() => handleEditClick(record)}>Edit</a>
//           </span>
//         ),
//       } : {};

//       const [columns, setColumns] = useState([])
//       const callback = useCallback(() => {
//         setColumns([{
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Birthday",
//       dataIndex: "birthday",
//       key: "birthday",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//     actionsColumn
//       ])
//   }, [])

//   return (
//     <div>
//        <Table dataSource={data} columns={columns} />
//       {type === "manager" ? <Table dataSource={datam} columns={columns} /> : null}
//       {showForm && (
//         <form>
//           {/* form to edit user data */}
//           <button onClick={handleSaveClick}>Save</button>
//         </form>
//       )}
//     </div>
//   );
// }




