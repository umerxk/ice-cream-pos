import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import axios from "axios";

const SelectDate = ({ sendToParent }: any) => {
  const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
    const { data } = await axios.get(
      `http://localhost:5001/date/${dateString}`
    );

    const totalSale = await axios.get(
      `http://localhost:5001/total-sale-by-date/${dateString}`
    );

    const totalItemsSold = await axios.get(
      `http://localhost:5001/total-items-sold/${dateString}`
    );

    console.log(date);

    sendToParent({
      data,
      totalSale: totalSale.data,
      searchedDate: dateString,
      totalItemsSold: totalItemsSold.data,
    });
  };

  return (
    <Space direction="vertical">
      <p>Search By Date</p>
      <DatePicker size="large" onChange={onChange} />
    </Space>
  );
};
export default SelectDate;
