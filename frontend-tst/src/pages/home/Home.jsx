import React, { useState, useEffect } from 'react'
import { Calendar } from 'antd';
import axios from 'axios';



const Home = () => {  
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = "https://localhost:7046/api/Leave/LeaveList";
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
 
  const formatData = (data) => {
    return data.map(item => {
      return {
        title: (item.creatorName),
        start: new Date(Date.parse(item.fromDate)),
        end: new Date(Date.parse(item.toDate)),
      };
    });
  };
  // const dateCellRender = (value) => {
  //   const today = new Date();
  //   const start = new Date();
  //   start.setDate(today.getDate() - 3);
  //   if (value >= start && value <= today) {
  //     return <div style={{ backgroundColor: '#0073E5' }}>{value.date()}</div>;
  //   }
  //   return <div>{value.date()}</div>;
  // };

    const onPanelChange = (value, mode) => {
      console.log(value.format('YYYY-MM-DD'), mode);
    };
    return (
      <Calendar 
        // dateCellRender={dateCellRender} 
        onPanelChange={onPanelChange} 
        events={formatData(data)} 
      />
    );
  };
  export default Home;
