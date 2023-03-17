// import React, { useState } from "react";
// import "./leaves.css";
// import { Button, DatePicker, Form, Input, Row, Select } from "antd";

// const { Option } = Select;

// const formItemLayout = {
//   labelCol: { span: 5 },
//   wrapperCol: { span: 15 },
// };
// const tailFormItemLayout = {
//   wrapperCol: { span: 5 },
// };

// export default function ExtraLeaves() {
//   const [form] = Form.useForm();
//   const onFinish = (values) => {
//     console.log("Received values of form: ", values);
//   };

//   return (
//     <>
//       <Row>
//         <Form
//           style={{ width: "100%" }}
//           {...formItemLayout}
//           form={form}
//           name="ApplyLeaves"
//           onFinish={onFinish}
//           scrollToFirstError
//         >
//           <Form.Item name="userId" label="User ID">
//             <Input />
//           </Form.Item>

//           <Form.Item name="userName" label="Username">
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="fromDate"
//             label="From Date"
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: "Please select a Date!",
//               },
//             ]}
//           >
//             <DatePicker
//               style={{ width: "100%" }}
//               picker="date"
//               placeholder="Choose starting Date"
//             />
//           </Form.Item>

//           <Form.Item
//             name="toDate"
//             label="To Date"
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: "Please select a Date!",
//               },
//             ]}
//           >
//             <DatePicker
//               style={{ width: "100%" }}
//               picker="date"
//               placeholder="Choose ending Date"
//             />
//           </Form.Item>

//           <Form.Item
//             name="days"
//             label="No of Days"
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: "Please select the duration number!",
//               },
//             ]}
//           >
//             <Select placeholder="Select no of Days">
//               <Select.Option value="one">1 day</Select.Option>
//               <Select.Option value="two">2 days</Select.Option>
//               <Select.Option value="three">3 days</Select.Option>
//               <Select.Option value="four">4 days</Select.Option>
//               <Select.Option value="five">5 days</Select.Option>
//               <Select.Option value="six">6 days</Select.Option>
//               <Select.Option value="seven">7 days</Select.Option>
//               <Select.Option value="eight">8 days</Select.Option>
//               <Select.Option value="nine">9 days</Select.Option>
//               <Select.Option value="ten">10 days</Select.Option>
//               <Select.Option value="eleven">11 days</Select.Option>
//               <Select.Option value="twelve">12 days</Select.Option>
//               <Select.Option value="thirteen">13 days</Select.Option>
//               <Select.Option value="fourteen">14 days</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item 
//           name="reason"
//             label="Reason"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input a Reason for requesting extra leaves!",
//               },
//             ]}>
//             <Input.TextArea />
//           </Form.Item>

//           <Form.Item {...tailFormItemLayout}>
//             <Button classname="submitbtn" type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Row>
//     </>
//   );
// }

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


export default function ApplyExtraLeaves() {
  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setUserID(localStorage.getItem("id"));
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
  const [reason, setReason] = useState();

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7046/api/ExtraLeave/ApplyExtraLeave";

    const data = {
      CreatorID: id,
      CreatorName: username,
      FromDate: fromDate,
      ToDate: toDate,
      NoofDays: days,
      Reason: reason,
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

  return (
    <>
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
              <Select.Option value={1}>1 day</Select.Option>
              <Select.Option value={2}>2 days</Select.Option>
              <Select.Option value={3}>3 days</Select.Option>
              <Select.Option value={4}>4 days</Select.Option>
              <Select.Option value={5}>5 days</Select.Option>
              <Select.Option value={6}>6 days</Select.Option>
              <Select.Option value={7}>7 days</Select.Option>
              <Select.Option value={8}>8 days</Select.Option>
              <Select.Option value={9}>9 days</Select.Option>
              <Select.Option value={10}>10 days</Select.Option>
              <Select.Option value={11}>11 days</Select.Option>
              <Select.Option value={12}>12 days</Select.Option>
              <Select.Option value={13}>13 days</Select.Option>
              <Select.Option value={14}>14 days</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
          name="reason"
            label="Reason"
            rules={[
              {
                required: true,
                message: "Please input a Reason for requesting extra leaves!",
              },
            ]}>
            <Input.TextArea onChange={(e) => setReason(e.target.value)}/>
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
