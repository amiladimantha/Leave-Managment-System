import React, { useEffect, useState, Component } from "react";
import { Card, Col, Row } from "antd";
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
  const [dataex, setDataEx] = useState([]);
  const [id, setUserID] = useState();

  const leaveTypes = ["Half Day","Annual", "Maternity","Sick", "Unpaid" ];  
  const approved = ["Pending", "Yes", "No" ];


  useEffect(() => {
    getData();
    getDataEx();
    setUserID(localStorage.getItem("id"));
  }, []);

  const getData = () => {
    const data = {
      CreatorID: localStorage.getItem("id"),
    };
    const url = "https://localhost:7046/api/Leave/MyLeaveList";
    
    
    axios
      .post(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listMyLeave);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("my leave data", data);
  };

  const getDataEx = () => {
   
    const postdataex = {
      CreatorID: localStorage.getItem("id"),
    };
    const url = "https://localhost:7046/api/ExtraLeave/MyExtraLeaveList";
    axios
      .post(url, postdataex)
      .then((result) => {
        const dataex = result.data;
        if (dataex.statusCode === 200) {
          setDataEx(dataex.listMyExtraLeave);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("my extra leave data", dataex);
  };

  
  const handleDelete = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7046/api/User/DeleteUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          alert("User Deleted");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const approvedCount = data.filter((val) => approved[val.isApproved] === "Yes").length + dataex.filter((val) => approved[val.isApproved] === "Yes").length;
  const rejectedCount = data.filter((val) => approved[val.isApproved] === "No").length + dataex.filter((val) => approved[val.isApproved] === "No").length;
  const pendingCount = data.filter((val) => approved[val.isApproved] === "Pending").length + dataex.filter((val) => approved[val.isApproved] === "Pending").length;

  const handleApprove = (e, id) => {
    e.preventDefault();
    const data = {
      ID: id,
    };
    const url = "https://localhost:7046/api/User/ApproveUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          alert("Approved");
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>

<Row gutter={[16, 16]}>
      
    <Col xs={24} sm={12} md={6}>
      <Card className="info-card-2" title="Approved Leaves" >
      <p style={{fontSize:'40px'}}>{approvedCount}</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card className="info-card-3" title="Rejected Leaves" >
        <p style={{fontSize:'40px'}}>{rejectedCount}</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card className="info-card-4" title="Pending Approvals" >
        <p style={{fontSize:'40px'}}>{pendingCount}</p>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={6}>
      <Card className="info-card-1" title="Total Leaves" >
        <p style={{fontSize:'40px'}}>{data.length + dataex.length}</p>
      </Card>
    </Col>
  </Row>
<br /><br />
      <div>
      <h3>My Leaves</h3>
      {data ? (
          <table className="datatable" style={{borderRadius: '10px !important'}}>
            <thead >
              <tr>
                <th scope="col" style={{borderTopLeftRadius: '20px'}}>ID</th>
                <th scope="col">CreatorID</th>
                <th scope="col">Creator Name</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">No of Days</th>
                <th scope="col">Leave Type</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}}>Is Approved</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No data found"
        )}
      </div>
<br />
<br />
      <div>
      <h3>My Extra Leaves</h3>
      {dataex ? (
          <table className="datatable">
            <thead>
              <tr>
                <th scope="col" style={{borderTopLeftRadius: '20px'}}>ID</th>
                <th scope="col">CreatorID</th>
                <th scope="col">Creator Name</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">No of Days</th>
                <th scope="col">Reason</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}}>Is Approved</th>
              </tr>
            </thead>
            <tbody>
              {dataex.map((val, index) => {
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No data found"
        )}
      </div>

      <br />
      <br />


    </>
  );
};

export default DataTable;









































