# database.py
import sqlite3
from datetime import datetime

DB_NAME = 'intown.db'

# Function to connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # Enables dict-like access to rows
    return conn

# Example function to fetch events
def get_events():
    conn = get_db_connection()
    events = conn.execute('SELECT * FROM events WHERE end_time > ?', (datetime.now(),)).fetchall()
    conn.close()
    return events

# Function to insert an event view count
def increment_view_count(event_id):
    conn = get_db_connection()
    conn.execute('UPDATE events SET views = views + 1 WHERE id = ?', (event_id,))
    conn.commit()
    conn.close()
