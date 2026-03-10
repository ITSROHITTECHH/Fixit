console.log("booking js loaded")


document.addEventListener("DOMContentLoaded", () => {
  

  const form = document.getElementById("booking-form");
  const msg = document.getElementById("booking-msg");

  if (!form || !msg) {
    console.error("❌ booking-form or booking-msg not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://fixit-r6j0.onrender.com/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        msg.innerText = "✅ Booking submitted successfully!";
        msg.style.color = "green";
        form.reset();
      } else {
        msg.innerText = "❌ " + (result.error || "Something went wrong");
        msg.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      msg.innerText = "❌ Server error";
      msg.style.color = "red";
    }
  });
});



const params = new URLSearchParams(window.location.search);
const service = params.get("service");

if (service) {
  document.getElementById("service").value = service;
  document.getElementById("selected-service").innerText =
    "Service: " + service.replace("-", " ").toUpperCase();
}







