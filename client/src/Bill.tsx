import BillDetails from "./BillDetails";

const Bill = ({ grandTotal, getPrice, userData, orderNumber }: any) => {
  return (
      <BillDetails
        orderNumber={orderNumber}
        server={userData?.serverName}
        tableNo={userData?.tableNo}
        details={userData.order}
        getPrice={getPrice}
        grandTotal={grandTotal}
      />
  );
};

export default Bill;
