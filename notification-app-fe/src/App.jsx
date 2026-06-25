import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import AllNotifications from "./components/AllNotifications";
import PriorityNotifications from "./components/PriorityNotifications";

import { getNotifications } from "./services/api";

function App() {

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState("all");

  useEffect(() => {

    const fetchData = async () => {
      const data = await getNotifications();

      const updated = data.map((item) => ({
        ...item,
        viewed: false
      }));

      setNotifications(updated);
    };

    fetchData();

  }, []);

  return (
    <div>

      <h1>Notification App</h1>

      <Button
        onClick={() => setPage("all")}
      >
        All Notifications
      </Button>

      <Button
        onClick={() => setPage("priority")}
      >
        Priority Notifications
      </Button>

      {page === "all" &&
        <AllNotifications notifications={notifications} />
      }

      {page === "priority" &&
        <PriorityNotifications notifications={notifications} />
      }

    </div>
  );
}

export default App;