import { Card, Col, Row, Statistic } from "antd";

const getCurrentDate = () => {
  // Create a new Date object
  var date = new Date();

  // Define the days of the week and months
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current day of the week, month, day of the month, hours, and minutes
  var dayOfWeek = daysOfWeek[date.getDay()];
  var dayOfMonth = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  var period = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Create the desired format
  var formattedDate =
    dayOfWeek +
    " " +
    dayOfMonth +
    ", " +
    date.getFullYear() +
    " - " +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    " " +
    period;

  return formattedDate;
};

const DataCards = ({ grandTotal }: any) => (
  <Row
    gutter={16}
    style={{ justifyContent: "end", marginTop: 20, marginBottom: 200 }}
  >
    <Col span={12}>
      <Card
        bordered={false}
        style={{ backgroundColor: "#f3f3f3", color: "wheat" }}
      >
         <Statistic
          title="Order Recevied At (time)"
          value={getCurrentDate()}
          precision={0}
          valueStyle={{ color: "#333333", fontSize: 20 }}
        />
        <br />
        <Statistic
          title="Table Number"
          value={4}
          precision={0}
          valueStyle={{ color: "#333333" }}
        />
        <br />
       

        <Statistic
          title="Total Bill"
          value={grandTotal || 0}
          precision={0}
          valueStyle={{ color: "#333333" }}
          suffix="- PKR"
        />
        
      </Card>
    </Col>
  </Row>
);

export default DataCards;
