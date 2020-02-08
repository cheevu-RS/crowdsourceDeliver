const publicVapidKey =
  "BFbDmtNIoI7jokDZkeG6oPVPNUxWsRUpAKHgGGkdXf6RjLo5WrcP4DK3yMaxd7KEvJPIJnU4lM5LpZASj2Kd234";
const privateVapidKey = "hoj5Bep92tT-oyuAS79IkHgWmscY8n5wLcjOnu5sVcs";

const webPush = require("web-push");
webPush.setVapidDetails(
  "mailto:deeraj@delta.nitt.edu",
  publicVapidKey,
  privateVapidKey
);

const sendNotif = async (title:any, message:any, url:any, subscription:any) => {

  const payload = JSON.stringify({
    title: title,
    body: message,
    data: url,
  });

  webPush
    .sendNotification(subscription, payload)
    .catch((error:any) => console.error(error));
};

module.exports = {
  sendNotif : sendNotif,
}
