# app.py
from flask import Flask, jsonify, request
import database  # Import functions from database.py

app = Flask(__name__)

# Route to get all active events
@app.route('/events', methods=['GET'])
def get_events():
    events = database.get_events()
    events_list = [dict(event) for event in events]  # Convert each event to a dict
    return jsonify(events_list)

# Route to increment event view count
@app.route('/event/<int:event_id>/view', methods=['POST'])
def increment_event_view(event_id):
    database.increment_view_count(event_id)
    return jsonify({'message': 'View count incremented'})

# Additional routes to add reviews, fetch categories, etc., can be defined similarly

if __name__ == '__main__':
    app.run(debug=False)
