import { useState, useEffect } from "react";
import OrderItems from "./crud/OrderItems";
import OrderBy from "./crud/OrderBy";
import axios from "axios";
import { wholeMenu } from "./Menu";
import { Button } from "@mui/material";
import Bill from "./Bill";
import ItemDetails from "./BillDetails/ItemDetails/ItemDetails";
import OrderDetails from "./BillDetails/OrderDetails/OrderDetails";

function Crud() {
  const orderFields = { uid: 0, itemData: {}, itemQuantity: 1, size: "large" };

  const userFields = {
    serverName: "",
    tableNo: "",
    order: [orderFields],
  };

  const [userData, setUserData] = useState<any>(userFields);
  const [submit, setSubmit] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const filteredData = getFilteredData(userData);
    await axios.post("http://localhost:5001/add-order", filteredData);
    setSubmit(true);
    setUserData(userFields);
    handlePrint();
  };

  useEffect(() => {
    const lorder = async () => {
      let {data} = await axios.get("http://localhost:5001/latest-order");
      setOrderNumber(data[0].orderNumber)
    }
    lorder();

  }, []);

  const getFilteredData = (_data: any) => {
    const order = _data.order.map((obj: any) => {
      const { itemData, size } = obj;
      const { price } = itemData;
      const updatedPrice = typeof price === "number" ? price : price[size];
      return {
        ...obj,
        itemData: {
          ...itemData,
          price: updatedPrice,
        },
      };
    });

    return {
      serverName: _data.serverName,
      tableNo: _data.tableNo,
      order,
    };
  };

  const handleForm = (e: any) => {
    console.log(e)
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    let newField = { ...orderFields };
    newField.uid = userData.order.length;
    setUserData({
      ...userData,
      order: [...userData.order, newField],
    });
  };

  const handleOrderForm = (name: any, value: any, index: number) => {
    const order = [...userData.order];
    order[index][name] = value;
    setUserData({
      ...userData,
      order,
    });
  };

  const handleOrderFormMui = (x: any, e: any, index: number) => {
    console.log(x, e);
    const order = [...userData.order];
    order[index]["itemData"] = e;
    setUserData({
      ...userData,
      order,
    });
  };

  const handlePrint = () => {
    const iframe: any = document.createElement('iframe');
    let printContents: any = document?.getElementById("bill_");
    printContents = printContents.innerHTML;

    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    

    iframe.contentDocument.write(printContents);
    iframe.contentDocument.close();
    iframe.contentWindow.print();
    window.location.reload();
  };

  // const handlePrints = () => {
    
    // let printContents: any = document?.getElementById("bill_");
    // console.log(printContents);
    // if (printContents) {
    //   printContents = printContents.innerHTML;
    //   // const originalContents = document.body.innerHTML;
    //   document.body.innerHTML = printContents;
    //   window.print();
    //   // document.body.innerHTML = originalContents;
    // }
  // };

  const getPrice = (val: any, itemSize = "large") => {
    const x: any = wholeMenu.find((elx: any) => elx?.value === val)?.price;
    if (itemSize === "small") {
      return x?.small;
    }
    if (x?.large) return x?.large;
    return x;
  };

  const getGrandTotal = () => {
    let sum = 0;
    const allOrders = userData?.order;
    for (let i = 0; i < allOrders.length; i++) {
      let isSmall = allOrders[i]?.size === "small";
      let px = 0;

      if (allOrders[i]?.itemData?.price?.small) {
        const orderSize = isSmall
          ? allOrders[i].itemData.price?.small
          : allOrders[i].itemData.price?.large;
        const orderQuantity = parseInt(allOrders[i].itemQuantity);
        px = orderSize * orderQuantity;
      } else {
        px = allOrders[i].itemData.price * parseInt(allOrders[i].itemQuantity);
      }

      sum += px;
    }
    return sum;
  };

  const getDonex = (product: any, quantity: any, itemSize: any) => {
    return getPrice(product, itemSize) * parseInt(quantity) || 0;
  };

  const handleSize = (val: any, index: number) => {
    console.log(val);
    const order = [...userData.order];
    order[index]["size"] = val;
    setUserData({
      ...userData,
      order,
    });
  };

  const deleteItem = (e: any) => {
    if (userData.order.length > 1) {
      const filteredData = userData.order.filter((el: any) => el.uid !== e.uid);
      setUserData({
        ...userData,
        order: filteredData,
      });
    }
  };

  const showOrder =
    userData?.order[0]?.itemData &&
    Object.values(userData?.order[0]?.itemData)?.length;

  return (
    <div style={{ marginTop: 100, padding: "0px 250px 0px 250px" }}>
      <form onSubmit={handleSubmit} className="form">
        <OrderBy submit={submit} handleForm={handleForm} userData={userData} />

        <OrderItems
          getDonex={getDonex}
          userData={userData}
          handleAdd={handleAdd}
          handleOrderFormMui={handleOrderFormMui}
          handleSize={handleSize}
          handleOrderForm={handleOrderForm}
          deleteItem={deleteItem}
        />
        {!!showOrder && (
          <div style={{ marginTop: 100 }}>
            <ItemDetails
              getPrice={getPrice}
              userData={userData}
            />
            <OrderDetails
              grandTotal={getGrandTotal()}
              userData={userData}
            />
          </div>
        )}
        <div
          className="form-group"
          style={{
            marginTop: 20,
            marginBottom: 100,
            justifyContent: "end",
            display: "flex",
          }}
        >
          <Button
            style={{ height: 50, width: 150 }}
            type="submit"
            className="submit-button"
            variant="contained"
          >
            Order Now
          </Button>
        </div>
        <Bill
          grandTotal={getGrandTotal()}
          getPrice={getPrice}
          userData={userData}
          orderNumber={orderNumber}
        />
      </form>
    </div>
  );
}

export default Crud;
