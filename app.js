const eventForm = document.getElementById('event-form');
const reviewForm = document.getElementById('review-form');
const eventList = document.getElementById('event-list');
const eventSelect = document.getElementById('event-select');
const reviewList = document.getElementById('review-list');

// Backend URL (assuming it's running on localhost)
const API_URL = 'http://localhost:5000/api';

// Fetch and display all events
const fetchEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    const events = await response.json();
    eventList.innerHTML = '';
    eventSelect.innerHTML = '<option value="">Select Event</option>';
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${event.title}</strong> - ${event.description} (${event.location} on ${new Date(event.date).toLocaleDateString()})`;
        eventList.appendChild(li);

        const option = document.createElement('option');
        option.value = event._id;
        option.textContent = event.title;
        eventSelect.appendChild(option);
    });
};

// Submit new event
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const event = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        location: document.getElementById('event-location').value,
        date: document.getElementById('event-date').value
    };

    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    });

    if (response.ok) {
        fetchEvents();  // Refresh the event list
        eventForm.reset();  // Reset the form
    }
});

// Submit review for an event
reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rating', document.getElementById('review-rating').value);
    formData.append('text', document.getElementById('review-text').value);
    const eventId = document.getElementById('event-select').value;
    const photos = document.getElementById('review-photos').files;
    for (let i = 0; i < photos.length; i++) {
        formData.append('photos', photos[i]);
    }

    const response = await fetch(`${API_URL}/events/${eventId}/review`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        fetchReviews(eventId);  // Refresh the reviews
        reviewForm.reset();  // Reset the form
    }
});

// Fetch and display reviews for an event
const fetchReviews = async (eventId) => {
    const response = await fetch(`${API_URL}/events/${eventId}/reviews`);
    const reviews = await response.json();
    reviewList.innerHTML = '';
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Rating: ${review.rating}/5</strong> - ${review.text}`;
        reviewList.appendChild(li);
    });
};

// Load events when the page loads
fetchEvents();
