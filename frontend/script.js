

// Handle form submission
document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  //broser do not refresh my page on submitting
// object to take dat from form yoyo
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
  };

  // we just got data here now 
  // Send data to backend
  console.log(JSON.stringify(user));
  await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //here in body we passed the user object that we created if we just wanted to pass individuals strings then we would have made diff requests ie in body only sending name , tehn roll np oetc etc
    body: JSON.stringify(user),
  });

  loadUsers(); // refresh the table
});



// Fetch and display users
//making fn async to use await inside it 
async function loadUsers() {
  const res = await fetch("http://localhost:5000/api/users");
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
  await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
  loadUsers();
}

// Load users on page load
window.onload = loadUsers;
