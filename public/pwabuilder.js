// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
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

      if ("serviceWorker" in navigator) {
        const register = await navigator.serviceWorker.register("/sw.js", {
          scope: "/"
        });

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        await fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        console.error("Service workers are not supported in this browser");
      }
    }
  }
};

register();
