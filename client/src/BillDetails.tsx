import "./bill.css";
const ReceiptPrinter = ({
  orderData,
  getPrice,
  grandTotal,
  tableNo,
  server,
  orderNumber,
}: any) => {
  console.log(orderData);
  return (
    <div className="receipt app" id="bill_" style={{ display: "none" }}>
      {/* <img src={"boys.png"} style={{ height: 100, width: 100, marginTop: -40 }} /> */}
      <h1>The Boys</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          marginTop: -17,
        }}
      >
        <div className="hds">Order Number {orderNumber + 1}</div>
        <div className="hds">Table Number {tableNo}</div>
        <div className="hds">Server Name {server}</div>
      </div>

      <div style={{ marginTop: 0, textAlign: "start" }} className="hds">
        <div>-------------------------------------------------------------</div>
        Date {new Date().toLocaleDateString()}
        <div>-------------------------------------------------------------</div>
      </div>

      <div className="receipt-items">
        {orderData.map((item: any, index: any) => (
          <div key={index} className="receipt-item">
            <span className="item-name">{item.itemData?.label}</span>
            <span className="item-size">{item.itemData.price?.small ? item.itemData.price?.large : item.itemData?.price  }</span>
            <span className="item-quantity" style={{ marginRight: 10 }}>x{item.itemQuantity}</span>
            {/* <span className="item-size">{item.size}</span> */}
            <span className="item-price">
              {getPrice(item.itemData.value, item?.size) *
                parseInt(item.itemQuantity) || 0}
            </span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14 }}>-----------------------------------------------------</div>

      <div className="receipt-total">
        Total: {grandTotal}
      </div>
      <div className="receipt-footer">
        Thank you for dining with us!
      </div>
    </div>
  );
};

const BillDetails = ({
  details,
  getPrice,
  grandTotal,
  server,
  tableNo,
  orderNumber,
}: any) => {
  return (
      <ReceiptPrinter
        orderNumber={orderNumber}
        grandTotal={grandTotal}
        orderData={details}
        server={server}
        tableNo={tableNo}
        getPrice={getPrice}
      />
  );
};

export default BillDetails;
