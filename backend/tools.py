from langchain.tools import tool
from typing import Optional
import logging
import uuid
import datetime

logger = logging.getLogger(__name__)

# --- Mock Database Functions ---
def _db_save_lead(name: str, email: str, details: str):
    lead_id = str(uuid.uuid4())
    logger.info(f"DB SAVE: {name} | {email} | {details}")
    return {"id": lead_id, "status": "saved"}

def _db_log_booking(name: str, email: str, time: str, intent: str):
    booking_id = str(uuid.uuid4())
    logger.info(f"DB BOOK: {name} | {time} | {intent}")
    return {"id": booking_id, "status": "confirmed"}

# --- Exported Tools ---

@tool
def save_lead_tool(name: str, email: str, details: str = "General Inquiry") -> str:
    """
    Saves a user's contact information (lead) to the database.
    Use this when the user provides their name and email address.
    """
    try:
        result = _db_save_lead(name, email, details)
        return f"Successfully saved lead for {name}. ID: {result['id']}"
    except Exception as e:
        return f"Error saving lead: {str(e)}"

@tool
def get_available_slots_tool() -> str:
    """
    Retrieves available discovery call time slots.
    Use this when the user asks about availability or wants to book.
    """
    # Dynamic dates so it's always "in the future"
    today = datetime.datetime.now()
    slots = []
    for i in range(1, 4):
        date = (today + datetime.timedelta(days=i)).strftime("%Y-%m-%d")
        slots.append(f"{date} at 10:00 AM")
        slots.append(f"{date} at 2:00 PM")
    
    return "Available slots:\n" + "\n".join(slots)

@tool
def book_call_tool(name: str, email: str, selected_time: str, intent: str = "Discovery Call") -> str:
    """
    Books a meeting. Use this ONLY after the user selects a specific time.
    Requires name, email, and the chosen time string.
    """
    try:
        result = _db_log_booking(name, email, selected_time, intent)
        return f"Booking confirmed for {name} at {selected_time}. Reference: {result['id']}"
    except Exception as e:
        return f"Error booking call: {str(e)}"

# Export list
tools = [save_lead_tool, get_available_slots_tool, book_call_tool]