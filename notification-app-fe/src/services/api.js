import axios from "axios";

const TOKEN = "YOUR_TOKEN";

export const getNotifications = async () => {

  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  return response.data.notifications;
};