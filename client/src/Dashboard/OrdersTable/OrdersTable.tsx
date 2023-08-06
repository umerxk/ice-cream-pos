import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import { useMemo } from "react";
import DateData from "./DateData";
import SaleBlock from "./SaleBlock";

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

  console.log(fltData);

  return (
    <div>
      {dateData?.searchedDate && <DateData dateData={dateData} />}
      <SaleBlock totalClients={fltData.length} dateData={dateData} />
      
      {!!fltData.length &&
        fltData.map((el: any, index: number) => (
          <div key={index}>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<FaceIcon />}
                label={`Server: ${el.serverName}`}
                variant="outlined"
              />
              <Chip label={`Table: ${el.tableNo}`} variant="outlined" />
            </Stack>
            <br />
            <TableContainer key={index} component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {el.orderDetails.map((row: any) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.itemName}
                      </TableCell>
                      <TableCell align="right">{row.itemCategory}</TableCell>
                      <TableCell align="right">{row.itemQuantity}</TableCell>
                      <TableCell align="right">{row.itemPrice}</TableCell>
                      <TableCell align="right">{row.itemSize}</TableCell>
                      <TableCell align="right">
                        {getDateFormate(el.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <br />
          </div>
        ))}
    </div>
  );
}

export default OrdersTable;
