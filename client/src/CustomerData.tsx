import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function CustomerData({ dateData, totalClients }: any) {
  return (
    <List
      sx={{
        borderRadius: "5%",
        width: "100%",
        maxWidth: 360,
        bgcolor: "#333333",
        color: "white",
        marginBottom: 10,
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "#FFFFFF" }}>
              Total Sales
            </Typography>
          }
          secondary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              PKR {dateData?.totalSale?.totalPrice}
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "#FFFFFF" }}>
              Total Customers
            </Typography>
          }
          secondary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              {totalClients}
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" style={{ color: "#FFFFFF" }}>
              Total Items sold
            </Typography>
          }
          secondary={
            <Typography variant="body1" style={{ color: "#FFFFFF" }}>
              {dateData?.totalItemsSold?.totalCount}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
