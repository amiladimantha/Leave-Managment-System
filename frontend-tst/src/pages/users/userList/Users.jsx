import React, { useEffect, useState, Component } from "react";
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import Decryption from "../../../Component/Decryption";
import ResponsiveSidebar from "../../../Component/sidebar/Rsidebar";
import { Space, Table, Tag, Button, DatePicker, Result, Modal, Popconfirm, message} from "antd";
import "./users.css";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import axios from "axios";
import CryptoJS from "crypto-js";



export default function UsersList() {
  const [data, setData] = useState([]);
  const [datam, setDataM] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const accountTypes = ["Manager", "Staff"];
  const approved = ["No", "Yes"];
  const active = ["No", "Yes"];
  
 



  useEffect(() => {
    getData();
    getDataM();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

//   const decryptedPassword = (password) => {
//     const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
//     const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
//     const decrypted = CryptoJS.AES.decrypt(
//         password,
//         key,
//         {
//             keySize: 128 / 8,
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }
//     );
//     return decrypted.toString(CryptoJS.enc.Utf8);
// }


  const getData = () => {
    const url = "https://localhost:7068/api/RegistrationList/RegistrationList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listRegistration);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log("Array data", data);
  };

  const getDataM = () => {
    const url = "https://localhost:7068/api/RegistrationList/RegistrationListManager";
    axios
      .get(url, datam)
      .then((result) => {
        const datam = result.data;
        if (datam.statusCode === 200) {
          setDataM(datam.listRegistrationManager);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log("Array data", datam);
  };

  
  const handleDelete = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/DeleteUser/DeleteUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Deleted");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleBlock = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/BlockUser/BlockUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Blocked");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
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
            Name:
            <input type="text" value=${val.name} onChange={handleFormChange} />
          </label>
          <label>
            Email:
            <input type="text" value=${val.email} onChange={handleFormChange} />
          </label>
          <label>
            Password:
            <input type="text" value=${Decryption(val.password)} onChange={handleFormChange} />
          </label>
          <label>
            Phone:
            <input type="text" value=${val.phone} onChange={handleFormChange} />
          </label>
          <label>
            Birthday:
            <input type="date" value=${val.birthday} onChange={handleFormChange} />
          </label>
          <label>
            Address:
            <input type="text" value=${val.address} onChange={handleFormChange} />
          </label>
        </form>
        <button onClick="handleSaveClick()">Save</button>
        <button onClick="handleCancelClick()">Cancel</button> 
      </div>
    `
    formWindow.handleFormChange = (event) => {
      setEditData({ ...editData, [event.target.name]: event.target.value });
    };
       
    formWindow.handleSaveClick = () => {
      console.log(editData)
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
          message.error(error);
        });
    };
    
    formWindow.handleCancelClick = () => {
      formWindow.close();
    };
  };
  
  
  const handleActivate = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/ActivateUser/ActivateUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Activated");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleApprove = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7068/api/ApproveUser/ApproveUser";
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

  return (
    <>
    
    {(() => {
      
        if (type === "0") {
          return (
            
            <div>
      
    {data ? (
        <table className="datatable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Phone</th>
              <th scope="col">Birthday</th>
              <th scope="col">Address</th>
              <th scope="col">Is Active</th>
              <th scope="col">Is Approved</th>
              <th scope="col">Account Type</th>
              <th scope="col">Approvals</th>              
              <th scope="col">Activate</th>
              <th scope="col">Block</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{Decryption(val.password)}</td>
                  <td>{val.phone}</td>
                  <td>{val.birthday}</td>
                  <td>{val.address}</td>
                  <td>{active[val.isActive]}</td>
                  <td>{approved[val.isApproved]}</td>
                  <td>{accountTypes[val.accountType - 1]}</td>
                  <td>
                    {val.isApproved === 0 ? (
                      <button
                        className="userApprove"
                        onClick={(e) => handleApprove(e, val.id)}
                      >
                        Approve
                      </button>
                    ) : (
                      "Already Approved"
                    )}                     
                  </td>
                  <td>
                  {val.isActive === 0 ? (
                      <button
                        className="userActive"
                        onClick={(e) => handleActivate(e, val.id)}
                      >
                        Activate
                      </button>
                    ) : (
                      "Active"
                    )}
                    </td>
                    <td>
                  {val.isActive === 1 ? (
                      <button
                        className="userBlock"
                       onClick={(e) => handleBlock(e, val.id)}
                      >
                        Block
                      </button>
                    ) : (
                      "Blocked"
                    )}
                  </td>
                  <td>
                  <button className="userEdit" onClick={() => handleEditClick(val)}>
                        Edit
                      </button>                     
            </td>
                  <td>
                  
                  <button
                    className="userDelete"
                    onClick={(e) => { if (window.confirm('Are you sure you wish to delete this user?')) handleDelete(e, val.id) }}
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
        } else if (type === '1') {
          return (
            <div>
      
    {datam ? (
        <table className="datatable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Phone</th>
              <th scope="col">Birthday</th>
              <th scope="col">Address</th>
              <th scope="col">Is Active</th>
              <th scope="col">Is Approved</th>
              <th scope="col">Account Type</th>
              <th scope="col">Approvals</th>             
              <th scope="col">Activate</th>
              <th scope="col">Block</th>
            </tr>
          </thead>
          <tbody>
            {datam.map((val, index) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{Decryption(val.password)}</td>
                  <td>{val.phone}</td>
                  <td>{val.birthday}</td>
                  <td>{val.address}</td>
                  <td>{active[val.isActive]}</td>
                  <td>{approved[val.isApproved]}</td>
                  <td>{accountTypes[val.accountType - 1]}</td>
                  <td>
                    {val.isApproved === 0 ? (
                      <button
                        className="userApprove"
                        onClick={(e) => handleApprove(e, val.id)}
                      >
                        Approve
                      </button>
                    ) : (
                      "Already Approved"
                    )}                     
                  </td>
                  <td>
                  {val.isActive === 0 ? (
                      <button
                        className="userActive"
                        onClick={(e) => handleActivate(e, val.id)}
                      >
                        Activate
                      </button>
                    ) : (
                      "Active"
                    )}
                    </td>
                    <td>
                  {val.isActive === 1 ? (
                      <button
                        className="userBlock"
                       onClick={(e) => handleBlock(e, val.id)}
                      >
                        Block
                      </button>
                    ) : (
                      "Blocked"
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

    </>
  );
}


































