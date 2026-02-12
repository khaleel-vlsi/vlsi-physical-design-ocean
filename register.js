<script>
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const plan = document.querySelector('input[name="plan"]:checked');

  if (!name || !email || !password || !confirm || !plan) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  // Save user (frontend only)
  const user = {
    name: name,
    email: email,
    password: password,
    plan: plan.value,
    paid: false
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful! Please login.");
  window.location.href = "login.html";
});
</script>
