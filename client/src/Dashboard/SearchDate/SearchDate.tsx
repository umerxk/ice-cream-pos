import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { useEffect } from "react";

const SearchDate = ({ sendToParent }: any) => {
  useEffect(() => {
    getTotalItems();
  }, []);

  const totalItemsSold = async (data: any) => {
    return await axios.get(`http://localhost:5001/total-items-sold/${data}`);
  };

  const totalSale = async (data: any) => {
    return await axios.get(`http://localhost:5001/total-sale-by-date/${data}`);
  };

  const mostSellingUnit = async (data: any) => {
    return await axios.get(`http://localhost:5001/most-selling-unit/${data}`);
  };

  const getTotalItems = async () => {
    const getItemsSold: any = await totalItemsSold("all");
    const getTotalSale: any = await totalSale("all");
    const getMostSellingUnit: any = await mostSellingUnit("all");

    sendToParent({
      totalSale: getTotalSale.data,
      searchedDate: "Till Today",
      totalItemsSold: getItemsSold.data,
      mostSellingUnit: getMostSellingUnit.data,
    });
  };

  const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
    const { data } = await axios.get(
      `http://localhost:5001/date/${dateString}`
    );

    const getItemsSold: any = await totalItemsSold(dateString);
    const getTotalSale: any = await totalSale(dateString);
    const getMostSellingUnit: any = await mostSellingUnit(dateString);

    console.log(date);

    sendToParent({
      data,
      totalSale: getTotalSale.data,
      searchedDate: dateString,
      totalItemsSold: getItemsSold.data,
      mostSellingUnit: getMostSellingUnit.data,
    });
  };

  return (
    <Space direction="vertical">
      <p>Search By Date</p>
      <DatePicker size="large" onChange={onChange} />
    </Space>
  );
};
export default SearchDate;
