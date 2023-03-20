import React, { useState, useEffect } from "react";
import "./leaves.css";
import axios from "axios";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};


export default function ApplyLeaves() {

  const [data, setData] = useState([]);

  const leaveTypes = ["Half Day","Annual", "Maternity","Sick", "Unpaid" ];  
  const approved = ["Pending", "Yes", "No" ];


  useEffect(() => {
    getData();
    setUserID(localStorage.getItem("id"));    
    setUserName(localStorage.getItem("username"));
  }, []);



  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("Received values of form: ", values, id, username);
  };

  const [username, setUserName] = useState();
  const [id, setUserID] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [days, setNoofDays] = useState();

  const [leaveType, setLeaveType] = useState("");

  const handleLeaveTypeChange = (value) => {
    setLeaveType(value);
  };

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

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7046/api/Leave/ApplyLeave";

    const data = {
      CreatorID: id,
      CreatorName: username,
      FromDate: fromDate,
      ToDate: toDate,
      NoofDays: days,
      LeaveType: leaveType,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        alert(dt.statusMessage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const endOfThisYear = new Date(new Date().getFullYear(), 11, 31);
  const startOfThisYear = new Date(endOfThisYear.getFullYear(), 0, 1);


const sickLeaves = data.filter((val) => 
  leaveTypes[val.leaveType] === "Sick" && 
  approved[val.isApproved] === "Yes" && 
  Date.parse(val.fromDate) >= startOfThisYear.getTime() && 
  Date.parse(val.fromDate) <= endOfThisYear.getTime()
).length;


  const halfLeaves = data.filter((val) => 
  leaveTypes[val.leaveType] === "Half Day" &&
  approved[val.isApproved] === "Yes" && 
  Date.parse(val.fromDate) >= startOfThisYear.getTime() && 
  Date.parse(val.fromDate) <= endOfThisYear.getTime()
).length;

  const unpaidLeaves = data.filter((val) =>
   leaveTypes[val.leaveType] === "Unpaid" && 
   approved[val.isApproved] === "Yes" && 
   Date.parse(val.fromDate) >= startOfThisYear.getTime() && 
   Date.parse(val.fromDate) <= endOfThisYear.getTime()
 ).length;

  const maternityLeaves = data.filter((val) =>
   leaveTypes[val.leaveType] === "Maternity" && 
   approved[val.isApproved] === "Yes" && 
   Date.parse(val.fromDate) >= startOfThisYear.getTime() && 
   Date.parse(val.fromDate) <= endOfThisYear.getTime()
 ).length;

  const annualLeaves = data.filter((val) =>
   leaveTypes[val.leaveType] === "Annual" && 
   approved[val.isApproved] === "Yes" && 
   Date.parse(val.fromDate) >= startOfThisYear.getTime() && 
   Date.parse(val.fromDate) <= endOfThisYear.getTime()
 ).length;
  

  return (
    <>
    <h3>Apply Leave</h3>
   <Row>
    

        <Form
          style={{ width: "100%" }}
          {...formItemLayout}
          form={form}
          name="ApplyLeaves"
          onFinish={(values) => {
            console.log({ values });
          }}
          scrollToFirstError
        >
          <Form.Item name="userId" label="User ID">
            <Input placeholder={id} disabled={true} />
          </Form.Item>

          <Form.Item name="userName" label="Username">
            <Input placeholder={username} disabled={true} />
          </Form.Item>

          <Form.Item
            name="fromDate"
            label="From Date"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select a Date!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Choose starting Date"
              onChange={(date) => setFromDate(date)}
            />
          </Form.Item>

          <Form.Item
            name="toDate"
            label="To Date"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select a Date!",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Choose ending Date"
              onChange={(date) => setToDate(date)}
            />
          </Form.Item>

          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[
              {
                required: true,
                message: "Please select a Leave Type!",
              },
            ]}
          >
            <Select
              placeholder="Select Leave Type"
              onChange={(value) => handleLeaveTypeChange(value)}
            > <Select.Option value={0} disabled={halfLeaves >= 3}>Half Day Leave</Select.Option>
              <Select.Option value={1} disabled={annualLeaves >= 3}>Annual Leave</Select.Option>             
              <Select.Option value={2} disabled={maternityLeaves >= 3}>Maternity Leave</Select.Option>
              <Select.Option value={3} disabled={sickLeaves >= 3}>Sick Leave</Select.Option>
              <Select.Option value={4} disabled={unpaidLeaves >= 3}>Unpaid Leave</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="days"
            label="No of Days"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select the duration number!",
              },
            ]}
          >
            <Select
              label="Days"
              placeholder="Select no of Days"
              onChange={(value) => setNoofDays(value)}
            >
              <Select.Option value={0} disabled={leaveType != 0}>1/2 day</Select.Option>
              <Option value={1} disabled={leaveType === 0}>1 day</Option>
              <Option value={2} disabled={leaveType === 0}>2 days</Option>
              <Option value={3} disabled={leaveType === 0}>3 days</Option>
              <Option value={4} disabled={leaveType === 0}>4 days</Option>
              <Option value={5} disabled={leaveType === 0}>5 days</Option>
              <Option value={6} disabled={leaveType === 0}>6 days</Option>
              <Option value={7} disabled={leaveType === 0}>7 days</Option>
              <Option value={8} disabled={leaveType === 0}>8 days</Option>
              <Option value={9} disabled={leaveType === 0}>9 days</Option>
              <Option value={10} disabled={leaveType === 0}>10 days</Option>
              <Option value={11} disabled={leaveType === 0}>11 days</Option>
              <Option value={12} disabled={leaveType === 0}>12 days</Option>
              <Option value={13} disabled={leaveType === 0}>13 days</Option>
              <Option value={14} disabled={leaveType === 0}>14 days</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => handleSave(e)}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}
