import { useState } from "react";
import SearchServer from "./SearchServer";
import SearchDate from "./SearchDate";
import OrdersTable from "./OrdersTable";
import { Button } from "antd";

const Dashboard = () => {
  
  const [text, setText] = useState("");
  const [dateData, setDateData] = useState<any>("");
  const [page, setPage] = useState(1);

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  const sendToParent = (e: any) => {
    setDateData(e);
  };

  const handlePage = (action: string) => {
    if (action === "next") {
      setPage(page + 1);
    } else {
      if(page > 1){
        setPage(page - 1);
      }
    }
  };

  return (
    <div style={{ marginTop: 100, paddingLeft: 200, paddingRight: 200 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchServer onChange={onChange} />
        <SearchDate page={page} sendToParent={sendToParent} />
      </div>

      <OrdersTable dateData={dateData} text={text} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <Button disabled={page === 1} type="primary" onClick={() => handlePage("prev")}>
          Prev
        </Button>
        <Button disabled={!dateData?.data?.order.length} type="primary" onClick={() => handlePage("next")}>
          Next
        </Button>
      </div>
    </div>
  );
};
export default Dashboard;
