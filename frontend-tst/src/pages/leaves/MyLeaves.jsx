import React, { useEffect, useState, Component } from "react";
import { Card, Col, Row, Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(10);

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
  const currentDataEx = dataex.slice(startIndex2, endIndex2);
  
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
  
  const sortedDataTable2 = currentDataEx.sort((a, b) => {
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
      {currentData ? (
          <table className="datatable" style={{borderRadius: '10px !important'}}>
            <thead >
              <tr>
                <th scope="col" style={{borderTopLeftRadius: '20px'}} onClick={() => handleSortTable1("id")}>ID {getSortArrowTable1("id")}</th>
                <th scope="col" onClick={() => handleSortTable1("creatorId")}>Creator ID {getSortArrowTable1("creatorId")}</th>
                <th scope="col" onClick={() => handleSortTable1("creatorName")}>Creator Name {getSortArrowTable1("creatorName")}</th>
                <th scope="col" onClick={() => handleSortTable1("fromDate")}>From Date {getSortArrowTable1("fromDate")}</th>
                <th scope="col" onClick={() => handleSortTable1("toDate")}>To Date {getSortArrowTable1("toDate")}</th>
                <th scope="col" onClick={() => handleSortTable1("noofDays")}>No of Days {getSortArrowTable1("noofDays")}</th>
                <th scope="col" onClick={() => handleSortTable1("type")}>Leave Type {getSortArrowTable1("type")}</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}} onClick={() => handleSortTable1("isApproved")}>Is Approved {getSortArrowTable1("isApproved")}</th>
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
      <div>
      <h3>My Extra Leaves</h3>
      {currentDataEx ? (
          <table className="datatable">
            <thead>
              <tr>
              <th scope="col" style={{borderTopLeftRadius: '20px'}} onClick={() => handleSortTable2("id")}>ID {getSortArrowTable2("id")}</th>
                <th scope="col" onClick={() => handleSortTable2("creatorId")}>Creator ID {getSortArrowTable2("creatorId")}</th>
                <th scope="col" onClick={() => handleSortTable2("creatorName")}>Creator Name {getSortArrowTable2("creatorName")}</th>
                <th scope="col" onClick={() => handleSortTable2("fromDate")}>From Date {getSortArrowTable2("fromDate")}</th>
                <th scope="col" onClick={() => handleSortTable2("toDate")}>To Date {getSortArrowTable2("toDate")}</th>
                <th scope="col" onClick={() => handleSortTable2("noofDays")}>No of Days {getSortArrowTable2("noofDays")}</th>
                <th scope="col" onClick={() => handleSortTable2("reason")}>Reason {getSortArrowTable2("reason")}</th>
                <th scope="col" style={{borderTopRightRadius: '20px'}} onClick={() => handleSortTable2("isApproved")}>Is Approved {getSortArrowTable2("isApproved")}</th>
              </tr>
            </thead>
            <tbody>
              {currentDataEx.map((val, index) => {
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
      <Pagination
          current={currentPage2}
          pageSize={pageSize2}
          total={dataex.length}
          onChange={handleChangePage2}
          onShowSizeChange={handlePageSizeChange2}
          showSizeChanger={true}
          pageSizeOptions={[10, 20, 50, 100]}
          style={{ textAlign: "center" }}
        />
      <br />


    </>
  );
};

export default DataTable;



































