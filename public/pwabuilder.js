function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey =
  "BFbDmtNIoI7jokDZkeG6oPVPNUxWsRUpAKHgGGkdXf6RjLo5WrcP4DK3yMaxd7KEvJPIJnU4lM5LpZASj2Kd234";

const register = async () => {
  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log(
        "[PWA Builder] active service worker found, no need to register"
      );
    } else {
      // Register the service worker
      navigator.serviceWorker
        .register("sw.js", {
          scope: "./"
        })
        .then(function(reg) {
          console.log(
            "[PWA Builder] Service worker has been registered for scope: " +
              reg.scope
          );
        });
      }
    }
};

register();

function subscribePush() {
  navigator.serviceWorker.ready.then(function(registration) {
    if (!registration.pushManager) {
      alert('Your browser doesn\'t support push notification.');
      return false;
    }

    //To subscribe `push notification` from push manager
    registration.pushManager.subscribe({
      userVisibleOnly: true, //Always show notification when received
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    .then(function (subscription) {
      console.info('Push notification subscribed.');
      fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(subscription);
    })
    .catch(function (error) {
      console.error('Push notification subscription error: ', error);
    });
  })
}
