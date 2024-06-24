import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("ssr:error", (err, vm, info) => {
    // Check if the error is related to token refresh failure

    console.log("Caught error ", err);
    if (err.message.includes("Failed to ssr:error refresh token")) {
      // Redirect to /hardlogout
      nuxtApp.$router.push("/hardlogout");
      console.log("redirecting");
    } else {
      // Handle other errors or log them
      console.error("Error:", err);
    }
  });
});
