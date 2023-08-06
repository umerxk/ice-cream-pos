import { useEffect, useState } from "react";
import axios from "axios";
import SearchServer from "./SearchServer";
import SearchDate from "./SearchDate";
import OrdersTable from "./OrdersTable";

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [text, setText] = useState("");
  const [dateData, setDateData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5001/get-data");
    setOrderData(data);
  };

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  const sendToParent = (e: any) => {
    console.log(e);
    setDateData(e);
  };

  return (
    <div style={{ marginTop: 100, paddingLeft: 200, paddingRight: 200 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchServer onChange={onChange} />
        <SearchDate sendToParent={sendToParent} />
      </div>

      <OrdersTable dateData={dateData} details={orderData} text={text} />
    </div>
  );
};
export default Dashboard;
