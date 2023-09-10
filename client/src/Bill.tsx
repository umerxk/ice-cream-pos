import BillDetails from "./BillDetails";

const Bill = ({ grandTotal, getPrice, userData, orderNumber, myOrder }: any) => {
  return (
      <BillDetails
        orderNumber={orderNumber}
        server={userData?.serverName}
        tableNo={userData?.tableNo}
        getPrice={getPrice}
        grandTotal={grandTotal}
        myOrder={myOrder}
      />
  );
};

export default Bill;
