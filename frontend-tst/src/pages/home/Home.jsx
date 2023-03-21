// import React, { useState, useEffect } from 'react'
// import { Calendar } from 'antd';
// import axios from 'axios';
// import moment from 'moment';


// const Home = () => {  
//   const [data, setData] = useState([]);
//   const [formattedData, setFormattedData] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     const url = "https://localhost:7046/api/Leave/LeaveList";
//     axios
//       .get(url, data)
//       .then((result) => {
//         const data = result.data;
//         if (data.statusCode === 200) {
//           const formattedData = formatData(data.listLeave); // format the data
//           console.log("Formatted data", formattedData);
//           setData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  
//   const formatData = (data) => {
//     return data.map((item) => {
//       return {
//         title: item.creatorName,
//         start: moment(item.fromDate),
//         end: moment(item.toDate),
//       };
//     });
//   };
  
//   const dateCellRender = () => {
//     return (
//       <div>
//         {formattedData.map((item) => {
//           const start = moment(item.start).toDate();
//           const end = moment(item.end).toDate();
//           const durationInDays = moment.duration(moment(end).diff(moment(start))).asDays();
//           const formattedStart = moment(start).format("MMM D");
//           const formattedEnd = moment(end).format("MMM D");

//           return (
//             <div
//               key={item.id}
//               style={{
//                 backgroundColor: '#0073E5',
//                 height: '20px',
//                 marginTop: '5px',
//                 marginBottom: '5px',
//                 marginLeft: `${durationInDays * 100}px`,
//                 marginRight: '10px',
//               }}
//             >
//               <div
//                 style={{
//                   color: 'white',
//                   paddingLeft: '5px',
//                   paddingTop: '1px',
//                 }}
//               >
//                 {item.title} ({formattedStart} - {formattedEnd})
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const onPanelChange = (value, mode) => {
//     console.log(value.format('YYYY-MM-DD'), mode);
//   };

//   console.log("Rendering");

//   return (
//     <Calendar 
//       dateCellRender={dateCellRender}
//       onPanelChange={onPanelChange}
//     />
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar } from 'antd';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://localhost:7046/api/Leave/LeaveList');
      const result = await response.json();
      const formattedData = result.listLeave.map((item) => ({
        title: item.title,
        start: moment(item.start, 'M/D/YYYY h:mm:ss A'),
        end: moment(item.end, 'M/D/YYYY h:mm:ss A'),
        id: item.id,
      }));
      setData(formattedData);
      console.log(formattedData);
      setLoading(false);
    };
    getData();
  }, []);

  const dateCellRender = (value) => {
    console.log('data:', data);
    const filteredData = data.filter(
      (item) =>
        moment(item.start).isSameOrBefore(value, 'day') &&
        moment(item.end).isSameOrAfter(value, 'day')
    );


    return (
      <div>
        {filteredData.map((item) => {
  console.log('item:', item);
  const start = moment(item.start).toDate();
  console.log('start:', start);
  const end = moment(item.end).toDate();
  console.log('end:', end);
          const durationInDays = moment.duration(moment(end).diff(moment(start))).asDays();
          const formattedStart = moment(start).format('MMM D');
          const formattedEnd = moment(end).format('MMM D');

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#0073E5',
                height: '20px',
                marginTop: '5px',
                marginBottom: '5px',
                marginLeft: `${durationInDays * 100}px`,
                marginRight: '10px',
              }}
            >
              <div
                style={{
                  color: 'white',
                  paddingLeft: '5px',
                  paddingTop: '1px',
                }}
              >
                {item.title} ({formattedStart} - {formattedEnd})
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default Home;
