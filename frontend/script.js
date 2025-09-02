// Handle form submission
document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // ✅ stop page refresh

  // Collect form data
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
  };

  // Send data to backend
  await fetch("http://localhost:5000/api/dashboard/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  loadUsers(); // refresh the table
});

// Fetch and display users
async function loadUsers() {
  const res = await fetch("http://localhost:5000/api/dashboard/users");
  const users = await res.json();

  const tbody = document.getElementById("userData");
  tbody.innerHTML = "";

  users.forEach((u) => {
    const row = `<tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.phone}</td>
      <td>${u.address}</td>
      <td><button onclick="deleteUser('${u._id}')">Delete</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Delete user
async function deleteUser(id) {
  await fetch(`http://localhost:5000/api/dashboard/users/${id}`, {
    method: "DELETE",
  });
  loadUsers();
}

// Load users on page load
window.onload = loadUsers;

