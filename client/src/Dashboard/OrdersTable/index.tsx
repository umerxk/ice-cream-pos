import { useMemo } from "react";
import DateData from "./DateData";
import SaleBlock from "./SaleBlock";
import Vtable from "../../Shared/Vtabel/Vtable";
import { UserOutlined } from "@ant-design/icons";

const OrdersTable = ({ details, text, dateData }: any) => {
  const fltData: any = useMemo(() => {
    if (dateData?.data) {
      if (text) {
        return dateData?.data.filter((el: any) =>
          el?.serverName?.includes(text)
        );
      }
      return dateData?.data;
    }
    if (!text) return details;
    return details.filter((el: any) => el?.serverName?.includes(text));
  }, [text, details, dateData]);

  const getDateFormate = (myDate: any) => {
    const dateObj = new Date(myDate);
    const options: any = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const getOrderCols = (customArray: any, customDate: any) => {
    console.log(customArray);
    return {
      data: () => {
        let data = [];
        for (let i = 0; i < customArray.length; i++) {
          const elx = customArray[i];
          const {
            itemName,
            itemCategory,
            itemPrice,
            itemQuantity,
            itemSize,
          }: any = elx;
          data.push({
            itemName,
            itemCategory,
            itemPrice,
            itemQuantity,
            itemSize,
            createdAt: getDateFormate(customDate),
          });
        }
        return data;
      },
      cols: () => {
        return [
          {
            title: "item Name",
            dataIndex: "itemName",
            width: 250,
          },
          {
            title: "Item Category",
            dataIndex: "itemCategory",
          },
          {
            title: "Item Price",
            dataIndex: "itemPrice",
          },
          {
            title: "Item Quantity",
            dataIndex: "itemQuantity",
          },
          {
            title: "Item Size",
            dataIndex: "itemSize",
          },
          {
            title: "Item Size",
            dataIndex: "itemSize",
          },
          {
            title: "Date",
            dataIndex: "createdAt",
          },
        ];
      },
    };
  };

  return (
    <div>
      {dateData?.searchedDate && <DateData dateData={dateData} />}
      <SaleBlock
        isDate={dateData?.searchedDate}
        totalClients={fltData.length}
        dateData={dateData}
      />

      {!!fltData.length &&
        fltData.map((el: any, index: number) => (
          <div key={index} style={{ marginTop: 120 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div className="serverChip">
                <UserOutlined style={{ fontSize: 20 }} />
                <span>Server: {el.serverName}</span>
              </div>

              <div className="serverChip">
                <UserOutlined style={{ fontSize: 20 }} />
                <span>Table: {el.tableNo}</span>
              </div>
            </div>

            <br />
            <Vtable getCols={getOrderCols(el.orderDetails, el.createdAt)} />
          </div>
        ))}
    </div>
  );
};

export default OrdersTable;
