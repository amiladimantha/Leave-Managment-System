import React, { useEffect, useState, Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Decryption from "../../../Component/Decryption";
import Encryption from "../../../Component/Encryption";
import {
  Space,
  Table,
  Tag,
  Button,
  Input,
  DatePicker,
  Result,
  Modal,
  Popconfirm,
  message,
  Pagination,
} from "antd";
import "./users.css";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function UsersList() {
  const [data, setData] = useState([]);
  const [datam, setDataM] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(10);

  const accountTypes = ["Manager", "Staff"];
  const approved = ["No", "Yes"];
  const active = ["No", "Yes"];

  useEffect(() => {
    getData();
    getDataM();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7046/api/User/RegistrationList";
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
    const url = "https://localhost:7046/api/User/RegistrationListManager";
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
    const url = "https://localhost:7046/api/User/DeleteUser";
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
    const url = "https://localhost:7046/api/User/BlockUser";
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

//   const handleEditClick = (val, props) => {
//     setEditData(val);
//     const formWindow = window.open("", "formWindow", "height=500,width=800");
//     formWindow.document.body.innerHTML = `
//       <div>
//          <form>
//           <label>
//             ID:
//             <input type="text" value=${val.id} disabled />
//           </label>
//           <label>
//             Name:
//             <input type="text" value=${val.name} onChange=handleFormChange />
//           </label>
//           <label>
//             Email:
//             <input type="text" value=${val.email} onChange=handleFormChange />
//           </label>
//           <label>
//             Password:
//             <input type="text" value=${Decryption(
//               val.password
//             )} onChange=handleFormChange />
//           </label>
//           <label>
//             Phone:
//             <input type="text" value=${val.phone} onChange=handleFormChange />
//           </label>
//           <label>
//             Birthday:
//             <input type="date" value=${
//               val.birthday
//             } onChange=handleFormChange />
//           </label>
//           <label>
//             Address:
//             <input type="text" value=${
//               val.address
//             } onChange=handleFormChange />
//           </label>
//         </form>
//         <button onClick="handleSaveClick()">Save</button>
//         <button onClick="handleCancelClick()">Cancel</button> 
//       </div>
//     `;
//     <UsersList setEditData={setEditData} editData={editData} />

//     formWindow.handleFormChange = (event) => {
//       props.setEditData({ ...props.editData, [event.target.name]: event.target.value });
//     };
    

//     formWindow.handleSaveClick = () => {
//       console.log(val);
//       axios
//         .post("https://localhost:7046/api/User/EditUser", val)
//         .then((result) => {
//           if (result.status === 200) {
//             setData((prevData) =>
//               prevData.map((item) => {
//                 if (item.id === val.id) {
//                   return val;
//                 }
//                 return item;
//               })
//             );
//             formWindow.close();
//           }
//         })
//         .catch((error) => {
//           message.error(error);
//         });
//     };

//   formWindow.handleCancelClick = () => {
//     formWindow.close();
//   };
// };

  const handleActivate = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7046/api/User/ActivateUser";
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
    const url = "https://localhost:7046/api/User/ApproveUser";
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

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const handleChangePage2 = (page, pageSize) => {
    setCurrentPage2(page);
  };

  const handlePageSizeChange2 = (current, size) => {
    setPageSize2(size);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);
  const startIndex2 = (currentPage2 - 1) * pageSize2;
  const endIndex2 = startIndex2 + pageSize2;
  const currentDataM = datam.slice(startIndex2, endIndex2);

  const [sortByTable1, setSortByTable1] = useState({
    column: "id",
    order: "asc",
  });
  
  const handleSortTable1 = (column) => {
    const order =
      sortByTable1.column === column && sortByTable1.order === "asc" ? "desc" : "asc";
    setSortByTable1({ column, order });
  };
  
  const sortedDataTable1 = currentData.sort((a, b) => {
    const ascending = sortByTable1.order === "asc" ? 1 : -1;
    const descending = sortByTable1.order === "desc" ? 1 : -1;
    if (a[sortByTable1.column] < b[sortByTable1.column]) {
      return ascending;
    }
    if (a[sortByTable1.column] > b[sortByTable1.column]) {
      return descending;
    }
    return 0;
  });
  
  const getSortArrowTable1 = (column) => {
    if (sortByTable1.column === column) {
      return sortByTable1.order === "asc" ? "▲" : "▼";
    }
    return "";
  };
  
  const [sortByTable2, setSortByTable2] = useState({
    column: "id",
    order: "asc",
  });
  
  const handleSortTable2 = (column) => {
    const order =
      sortByTable2.column === column && sortByTable2.order === "asc" ? "desc" : "asc";
    setSortByTable2({ column, order });
  };
  
  const sortedDataTable2 = currentDataM.sort((a, b) => {
    const ascending = sortByTable2.order === "asc" ? 1 : -1;
    const descending = sortByTable2.order === "desc" ? 1 : -1;
    if (a[sortByTable2.column] < b[sortByTable2.column]) {
      return ascending;
    }
    if (a[sortByTable2.column] > b[sortByTable2.column]) {
      return descending;
    }
    return 0;
  });
  
  const getSortArrowTable2 = (column) => {
    if (sortByTable2.column === column) {
      return sortByTable2.order === "asc" ? "▲" : "▼";
    }
    return "";
  };


  const handleEditClick = (val) => {
    setEditData(val);
    setVisible(true);
  };

  const [id, setID] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();

  const handleSaveClick = (e) => {
    e.preventDefault();
    // const encryptedPassword = Encryption.encrypt(password);

    // const editData = {
    //     ID: id,
    //     Name: name,
    //     Email: email,
    //     Password: encryptedPassword,
    //     Phone: phone,
    //     Address:address,
    //     Birthday:birthday,
    // };

    const url = "https://localhost:7046/api/User/EditUser";
    axios
      .post(url, editData)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          message.success("User Edited Successfully");
        } else {
          message.error("User Editing Failed");
        }
        setVisible(false);
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
              {currentData ? (
                <table className="datatable">
                  <thead>
                    <tr>
                      <th scope="col" style={{ borderTopLeftRadius: "20px" }} onClick={() => handleSortTable1("id")}>
                        ID {getSortArrowTable1("id")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("name")}>
                        Name {getSortArrowTable1("name")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("email")}>
                        Email {getSortArrowTable1("email")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("password")}>
                        Password {getSortArrowTable1("password")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("phone")}>
                        Phone {getSortArrowTable1("phone")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("birthday")}>
                        Birthday {getSortArrowTable1("birthday")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("address")}>
                        Address {getSortArrowTable1("address")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("isActive")}>
                        Is Active {getSortArrowTable1("isActive")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("isApproved")}>
                        Is Approved {getSortArrowTable1("isApproved")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("accountType")}>
                        Account Type {getSortArrowTable1("accountType")}
                      </th>
                      <th scope="col">Approvals</th>
                      <th scope="col">Activate</th>
                      <th scope="col">Block</th>
                      <th scope="col">Edit</th>
                      <th scope="col" style={{ borderTopRightRadius: "20px" }}>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((val, index) => {
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
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this user?"
                                  )
                                )
                                  handleDelete(e, val.id);
                              }}
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
          );
        } else if (type === "1") {
          return (
            <div>
              {currentDataM ? (
                <table className="datatable">
                  <thead>
                    <tr>
                    <th scope="col" style={{ borderTopLefttRadius: "20px" }} onClick={() => handleSortTable2("id")}>
                        ID {getSortArrowTable2("id")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("name")}>
                        Name {getSortArrowTable2("name")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("email")}>
                        Email {getSortArrowTable2("email")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("password")}>
                        Password {getSortArrowTable2("password")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("phone")}>
                        Phone {getSortArrowTable2("phone")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("birthday")}>
                        Birthday {getSortArrowTable2("birthday")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("address")}>
                        Address {getSortArrowTable2("address")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("isActive")}>
                        Is Active {getSortArrowTable2("isActive")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("isApproved")}>
                        Is Approved {getSortArrowTable2("isApproved")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable2("accountType")}>
                        Account Type {getSortArrowTable2("accountType")}
                      </th>
                      <th scope="col">Approvals</th>
                      <th scope="col">Activate</th>
                      <th scope="col" style={{ borderTopRightRadius: "20px" }}>Block</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDataM.map((val, index) => {
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
          );
        }
      })()}
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


      <Modal
  title="Edit Record"
  visible={visible}
  onCancel={() => setVisible(false)}
  footer={null}
>
  <form>
    <div className="form-group">
      <label htmlFor="id">ID</label>
      <Input
        type="text"
        className="form-control"
        id="id"
        value={editData.id}
        disabled
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        className="form-control"
        id="name"
        value={editData.name}
        onChange={(e) =>
          setEditData({ ...editData, name: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Email</label>
      <Input
        type="text"
        className="form-control"
        id="email"
        value={editData.email}
        onChange={(e) =>
          setEditData({ ...editData, email: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Password</label>
      <Input
        type="text"
        className="form-control"
        id="password"
        value={editData.password}
        onChange={(e) =>
          setEditData({ ...editData, password: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Phone</label>
      <Input
        type="text"
        className="form-control"
        id="phone"
        value={editData.phone}
        onChange={(e) =>
          setEditData({ ...editData, phone: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Birthday</label>
      <DatePicker
      style={{ width: "100%" }}
        type="date"
        className="form-control"
        id="birthday"
        placeholder="Choose a birthday"
        onChange={(date) =>
          setEditData({ ...editData, birthday: date })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Address</label>
      <Input
        type="text"
        className="form-control"
        id="address"
        value={editData.address}
        onChange={(e) =>
          setEditData({ ...editData, address: e.target.value })
        }
      />
    </div>
    <br />
    <button type="submit" className="userEdit" onClick={handleSaveClick}>
      Save
    </button>
  </form>
</Modal>

    </>
  );
}
