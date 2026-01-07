console.log("Fixit frontend loaded");
console.log("Contact JS loaded");
console.log("signup js loaded");
console.log("login js loaded");



fetch("https://fixit-r6j0.onrender.com/api/test/")
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

    fetch("https://fixit-r6j0.onrender.com/api/signup/", {
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







document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.querySelector('input[placeholder="Email"]').value;
  const password = document.querySelector('input[placeholder="Password"]').value;

  fetch("https://fixit-r6j0.onrender.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.access) {
        alert(data.error || "Invalid login");
        return;
      }

      // 🔑 SAVE TOKEN
      localStorage.setItem("token", data.access);

      // 👤 SAVE USER (optional)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // 🚀 GO TO DASHBOARD
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      alert("Backend not connected");
      console.error(err);
    });
});









const contactForm = document.getElementById("contactForm");

if (contactForm) {
  console.log("Contact form found");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      subject: contactForm.subject.value,
      message: contactForm.message.value,
    };

    console.log("Sending data:", data);

    let msgBox = document.querySelector(".form-message");
    if (!msgBox) {
      msgBox = document.createElement("div");
      msgBox.className = "form-message";
      contactForm.appendChild(msgBox);
    }

    try {
      const res = await fetch("https://fixit-r6j0.onrender.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Backend response:", result);

      msgBox.innerText = result.message || "Message sent successfully ✅";
      msgBox.style.color = "lightgreen";

      contactForm.reset();
    } catch (err) {
      console.error(err);
      msgBox.innerText = "Server error. Try again later ❌";
      msgBox.style.color = "red";
    }
  });
}









