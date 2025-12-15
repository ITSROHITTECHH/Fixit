console.log("Fixit frontend loaded");

fetch("http://127.0.0.1:8000/api/test/")
  .then(response => response.json())
  .then(data => {
    console.log("Backend response:", data);
    console.log("Backend message:", data.message);

    const statusEl = document.getElementById("backend-status");
    if (statusEl) {
      statusEl.innerText = data.message;
    } else {
      console.error("backend-status element not found");
    }
  })
  .catch(error => {
    console.error("Error connecting backend:", error);
  });
