import { useState, useEffect } from "react";
import { wholeMenu } from "./Menu";
import { Button } from "@mui/material";
import { servers, tableNo } from "./servers";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Input, Card } from "antd";
import Bill from "./Bill";
import ItemDetails from "./BillDetails/ItemDetails/ItemDetails";
import OrderBy from "./crud/OrderBy";
import axios from "axios";

const { Meta } = Card;
const { Search } = Input;

function Crud() {
  const userFields = {
    serverName: servers[0],
    tableNo: tableNo[0].value,
  };

  const [userData, setUserData] = useState<any>(userFields);
  const [submit, setSubmit] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [text, setText] = useState("");
  const [myOrder, setMyOrder] = useState<any>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const filteredData = getFilteredData(userData);
    await axios.post("http://localhost:5001/add-order", filteredData);
    setSubmit(true);
    setUserData(userFields);
    await handlePrint();
    lorder();
  };

  useEffect(() => {
    lorder();
  }, []);

  const lorder = async () => {
    let { data } = await axios.get("http://localhost:5001/latest-order");
    setOrderNumber(data[0].orderNumber);
    setMyOrder([]);
    setUserData(userFields)
  };

  const getFilteredData = (_data: any) => {
    const order = myOrder.map((obj: any) => {
      const itemQuantity = obj.count;
      const size = "large";
      const itemData = {
        category: obj.category,
        label: obj.label,
        price: obj.price,
        value: obj.value,
      };
      return {
        itemData,
        itemQuantity,
        size,
      };
    });
    return {
      serverName: _data.serverName,
      tableNo: _data.tableNo,
      order,
    };
  };

  const handleForm = (value: string, name: string) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePrint = async () => {
    const iframe: any = document.createElement("iframe");
    let printContents: any = document?.getElementById("bill_");
    printContents = printContents.innerHTML;

    iframe.style.display = "none";
    document.body.appendChild(iframe);

    iframe.contentDocument.write(printContents);
    iframe.contentDocument.close();
    iframe.contentWindow.print();
  };

  const getPrice = (val: any, itemSize = "large") => {
    const x: any = wholeMenu.find((elx: any) => elx?.value === val)?.price;
    if (itemSize === "small") {
      return x?.small;
    }
    if (x?.large) return x?.large;
    return x;
  };

  const getGrandTotal = () => {
    let grandTotal = 0;
    for (const item of myOrder) {
      const itemTotal = item.price * item.count;
      grandTotal += itemTotal;
    }
    return grandTotal;
  };

  const onSearch = (value: string) => {
    setText(value);
  };

  const handleMenu = (action: string, data: any) => {
    if (action === "add") {
      const alreadyExist = myOrder.findIndex(
        (el: any) => el.label === data.label
      );
      if (alreadyExist > -1) {
        let newOrder = [...myOrder];
        newOrder[alreadyExist].count += 1;
        setMyOrder(newOrder);
        return;
      }
      setMyOrder([
        {
          count: 1,
          label: data.label,
          value: data.value,
          category: data.category,
          price: data.price?.small ? data.price?.large : data.price,
        },
        ...myOrder
      ]);
    } else {
      const alreadyExist = myOrder.findIndex(
        (el: any) => el.label === data.label
      );
      if (alreadyExist > -1) {
        let newOrder = [...myOrder];
        newOrder[alreadyExist].count -= 1;
        setMyOrder(newOrder);
        return;
      }
    }
  };

  const filtered: any = () => {
    if (!text) return wholeMenu;
    return wholeMenu.filter((el: any) =>
      el.label.toLowerCase().includes(text.toLocaleLowerCase())
    );
  };

  const getImg = (value: string) => {
    if (value === "blizzerd") {
      return "ice.svg";
    }
    if (value === "shakes") {
      return "shakes.svg";
    }
    if (value === "cups") {
      return "cup.svg";
    }
    if (value === "sundaes") {
      return "sundaes.svg";
    }
    if (value === "cones") {
      return "cones.svg";
    }
    if (value === "delights") {
      return "cake.svg";
    }
  };

  const handleDel = (value: string, action: string) => {
    const alreadyExist = myOrder.findIndex((el: any) => el.value === value);
    if (action === "minus") {
      let newOrder = [...myOrder];
      if (newOrder[alreadyExist].count === 1) {
        const filter = myOrder.filter((el: any) => el.value !== value);
        setMyOrder(filter);
        return;
      }
      newOrder[alreadyExist].count -= 1;
      setMyOrder(newOrder);
      return;
    } else {
      if (alreadyExist > -1) {
        let newOrder = [...myOrder];
        newOrder[alreadyExist].count += 1;
        setMyOrder(newOrder);
        return;
      }
    }

  }

  return (
    <div style={{ marginTop: 100 }}>
      <Search
        placeholder="Search Item"
        onSearch={onSearch}
        style={{ width: 300, marginLeft: 30 }}
      />

      <form onSubmit={handleSubmit} className="form">
        <div
          style={{
            width: "65%",
            overflow: "scroll",
            display: "flex",
            flexWrap: "wrap",
            gap: 30,
          }}
        >
          {filtered().map((el: any, index: number) => (
            <Card
              key={index}
              style={{ width: 260 }}
              cover={
                <img
                  alt="example"
                  src={getImg(el.category)}
                  height={100}
                  width={100}
                />
              }
              actions={[
                <MinusCircleOutlined onClick={() => handleMenu("minus", el)} />,
                <PlusCircleOutlined onClick={() => handleMenu("add", el)} />,
              ]}
            >
              <Meta
                title={el.label}
                description={`Price: ${el.price?.small ? el.price?.large : el.price
                  } PKR`}
              />
            </Card>
          ))}
        </div>
        <div style={{ width: 500, marginTop: -70 }}>
          <OrderBy
            submit={submit}
            handleForm={handleForm}
            userData={userData}
          />
          <ItemDetails
            myOrder={myOrder}
            getPrice={getPrice}
            userData={userData}
            handleDel={handleDel}
          />
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
        </div>
        <Bill
          grandTotal={getGrandTotal()}
          getPrice={getPrice}
          userData={userData}
          orderNumber={orderNumber}
          myOrder={myOrder}
        />
      </form>
    </div>
  );
}

export default Crud;
