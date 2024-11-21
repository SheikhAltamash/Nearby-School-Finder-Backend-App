document.getElementById("addSchoolBtn").addEventListener("click", () => {
  document.getElementById("formContainer").innerHTML = `
                <h2>Add New School</h2>
                <form id="addSchoolForm">
                    <input type="text" name="name" placeholder="School Name" required><br>
                    <input type="text" name="address" placeholder="Address" required><br>
                    <input type="number" name="latitude" placeholder="Latitude" step="any" required><br>
                    <input type="number" name="longitude" placeholder="Longitude" step="any" required><br>
                    <button type="submit">Add School</button>
                </form>
            `;

  // Adding submit event listener
  document
    .getElementById("addSchoolForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/addSchool", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();

        // Alert the result message from the server (success or error)
        alert(result.message || "Error adding school");

        // Clear form fields and hide the form after submission
        e.target.reset(); // Reset the form fields
        document.getElementById("formContainer").innerHTML = ""; // Hide the form container
      } catch (err) {
        console.error("Error:", err);
        alert("There was an issue submitting the form.");
      }
    });
});

document.getElementById("findSchoolsBtn").addEventListener("click", () => {
  document.getElementById("formContainer").innerHTML = `
                <h2>Find Nearby Schools</h2>
                <form id="findSchoolsForm">
                    <input type="number" name="latitude" placeholder="Your Latitude" step="any" required><br>
                    <input type="number" name="longitude" placeholder="Your Longitude" step="any" required><br>
                    <button type="submit">Find Schools</button>
                </form>
            `;

  // Adding submit event listener
  document
    .getElementById("findSchoolsForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const params = new URLSearchParams(
        Object.fromEntries(formData.entries())
      );

      try {
        const response = await fetch(`/api/listSchools?${params}`);
        const schools = await response.json();

        // Display the list of nearby schools
        document.getElementById("resultContainer").innerHTML = `
          <h2>Nearby Schools</h2>
          <table border="black">
          <tr><th>Sr no.</th><th>School Name</th><th>Distance</th><th>Address</th></tr>
              ${schools
                .map((school,idx) =>
                    `<tr><td>${idx+1}</td><td>${school.name}</td><td>${school.distance.toFixed(2)} km away</td> <td> ${school.address} </td></tr>`
                )
                .join("")}
          </table>
        `;

        // Hide the form after submission
        document.getElementById("formContainer").innerHTML = "";
      } catch (err) {
        console.error("Error:", err);
        alert("There was an issue fetching the nearby schools.");
      }
    });
});
