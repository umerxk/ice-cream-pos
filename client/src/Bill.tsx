import { Result } from "antd";
import { Statistic, Row } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DataCards from "./DataCards";

const Bill = ({ grandTotal, getPrice, userData }: any) => (
  <div id="bill_" style={{ width: 700, display: "none" }}>
    <Row style={{ textAlign: "center", justifyContent: "center", gap: "50px" }}>
      <Statistic title="Order No" value={128} />
    </Row>
    ,
    <Result
      style={{ marginTop: -50 }}
      status="success"
      title="Order Successfully Placed"
      subTitle="Order placed by Omer"
    />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.order.map((row: any) => (
            <TableRow
              key={row.itemData.label}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.itemData.label}
              </TableCell>
              <TableCell>{row.itemQuantity}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{getPrice(row.itemData.value, row?.size) *
                      parseInt(row.itemQuantity) || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <DataCards grandTotal={grandTotal}/>
  </div>
);

export default Bill;
