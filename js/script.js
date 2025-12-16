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






  const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(signupForm);

    fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert("Signup successful 🎉");
          window.location.href = "login.html";
        } else {
          alert(data.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong");
      });
  });
}
