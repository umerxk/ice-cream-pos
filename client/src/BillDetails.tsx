import "./bill.css";
const ReceiptPrinter = ({
  grandTotal,
  tableNo,
  server,
  orderNumber,
  myOrder,
}: any) => {
  return (
    <div className="receipt app" id="bill_" style={{ display: "none" }}>
      {/* <img src={"boys.png"} style={{ height: 100, width: 100, marginTop: -40 }} /> */}
      <h1 style={{ textAlign: "center" }}>The Boys</h1>
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
        {myOrder?.map((item: any, index: any) => (
          <div key={index} className="receipt-item">
            <span className="item-name">{item?.label}</span>
            <span className="item-size">
              {item.price?.small ? item.price?.large : item?.price}
            </span>
            <span className="item-quantity" style={{ marginRight: 10 }}>
              x{item?.count}
            </span>
            <span className="item-price">{item?.count * item?.price}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14 }}>
        -----------------------------------------------------
      </div>

      <div className="receipt-total">Total: {grandTotal}</div>
      <div className="receipt-footer">Thank you for dining with us!</div>
    </div>
  );
};

const BillDetails = ({
  grandTotal,
  server,
  tableNo,
  orderNumber,
  myOrder,
}: any) => {
  return (
    <ReceiptPrinter
      orderNumber={orderNumber}
      grandTotal={grandTotal}
      server={server}
      tableNo={tableNo}
      myOrder={myOrder}
    />
  );
};

export default BillDetails;
