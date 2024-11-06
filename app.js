


//Checks if inputs are blank, Needs Password validators!!
function validateForm() {
    var x = document.forms["userLogin"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }

function submitForm () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  fetch('/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, email: email})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error)
  })

}

// New code for handling review form submission with star rating
document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("review-list");

  reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      // Capture the selected rating from the star rating input
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const reviewText = document.getElementById("review-text").value;

      if (!rating) {
          alert("Please select a rating.");
          return;
      }

      // Create a new review element and add it to the review list
      const listItem = document.createElement("li");
      listItem.classList.add("review-item");

      listItem.innerHTML = `
          <h3>Event</h3> <!-- Replace with actual event data if available -->
          <p><strong>Rating:</strong> ${"★".repeat(rating)}${"☆".repeat(5 - rating)}</p>
          <p>${reviewText}</p>
          <p><em>- User</em></p>
      `;

      reviewList.appendChild(listItem);

      // Optionally, clear the form after submission
      reviewForm.reset();
  });
});
  
  