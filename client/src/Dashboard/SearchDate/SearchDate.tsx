import type { DatePickerProps } from "antd";
import { DatePicker, Space, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const url = "http://localhost:5001";

const SearchDate = ({ sendToParent, page = 1 }: any) => {

  const [currentDate, setCurrentDate] = useState("");


  useEffect(() => {
    if(currentDate){
      callDB(currentDate);
    }else{
      getTotalItems("not-all");
    }
  }, [page]);

  const totalItemsSold = async (data: any) => {
    return await axios.get(`${url}/total-items-sold/${data}`);
  };

  const totalSale = async (data: any) => {
    return await axios.get(`${url}/total-sale-by-date/${data}`);
  };

  const mostSellingUnit = async (data: any) => {
    return await axios.get(`${url}/most-selling-unit/${data}`);
  };

  const getTotalItems = async (action: string) => {
    let dx;
    if (action === "all") {
      dx = action;
    } else {
      dx = dayjs().format("YYYY-MM-DD");
    }
    const getItemsSold: any = await totalItemsSold(dx);
    const getTotalSale: any = await totalSale(dx);
    const getMostSellingUnit: any = await mostSellingUnit(dx);
    const { data } = await axios.get(
      `http://localhost:5001/date/${dx}/${page}`
    );

    sendToParent({
      data,
      totalSale: getTotalSale.data,
      searchedDate: dx,
      totalItemsSold: getItemsSold.data,
      mostSellingUnit: getMostSellingUnit.data,
    });
  };

  const onChange: DatePickerProps["onChange"] = async (_date, dateString) => {
    setCurrentDate(dateString);
    callDB(dateString);
  };

  const callDB = async (dateString: string) => {
    console.log({currentDate});
    const { data } = await axios.get(
      `http://localhost:5001/date/${dateString}/${page}`
    );

    const getItemsSold: any = await totalItemsSold(dateString);
    const getTotalSale: any = await totalSale(dateString);
    const getMostSellingUnit: any = await mostSellingUnit(dateString);

    sendToParent({
      data,
      totalSale: getTotalSale.data,
      searchedDate: dateString,
      totalItemsSold: getItemsSold.data,
      mostSellingUnit: getMostSellingUnit.data,
    });
  }

  return (
    <Space direction="horizontal">
      <Button onClick={() => getTotalItems("all")} type="primary">
        GET TOTAL SALE
      </Button>
      <h3>OR</h3>
      <p>Search By Date</p>
      <DatePicker size="large" onChange={onChange} />
    </Space>
  );
};
export default SearchDate;
