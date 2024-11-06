// Fetch and display events from the API
async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:5000/events');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to display events on the page
function displayEvents(events) {
    const container = document.getElementById('events-container');
    container.innerHTML = '';  // Clear previous content

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        
        eventCard.innerHTML = `
            <h2>${event.event_name}</h2>
            <p>${event.event_description}</p>
            <p>Location: ${event.event_location}</p>
            <p>Start: ${event.start_time}</p>
            <p>End: ${event.end_time}</p>
            <button onclick="incrementView(${event.id})">View Event</button>
        `;
        
        container.appendChild(eventCard);
    });
}

// Function to increment view count for an event
async function incrementView(eventId) {
    try {
        await fetch(`http://localhost:5000/event/${eventId}/view`, { method: 'POST' });
        console.log('View count incremented for event:', eventId);
    } catch (error) {
        console.error('Error incrementing view count:', error);
    }
}

// Load events on page load
document.addEventListener('DOMContentLoaded', fetchEvents);
