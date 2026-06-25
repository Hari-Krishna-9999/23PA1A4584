import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function AllNotifications({ notifications }) {
  return (
    <div>
      <h2>All Notifications</h2>

      {notifications.map((item) => (
        <Card key={item.ID}>
          <CardContent>

            <Typography>
              Message: {item.Message}
            </Typography>

            <Typography>
              Type: {item.Type}
            </Typography>

            <Typography>
              Time: {item.Timestamp}
            </Typography>

            <Typography>
              Status: {item.viewed ? "Viewed" : "New"}
            </Typography>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AllNotifications;