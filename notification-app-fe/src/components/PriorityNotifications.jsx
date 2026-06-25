import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function PriorityNotifications({ notifications }) {

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const top10 = notifications
    .filter((item) => !item.viewed)
    .map((item) => ({
      ...item,
      score:
        weights[item.Type] * 1000000 +
        new Date(item.Timestamp).getTime()
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div>
      <h2>Priority Notifications</h2>

      {top10.map((item) => (
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

          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PriorityNotifications;