import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://event-app-mern-back-flame.vercel.app";

const EventDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    searchTerm: "",
  });
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    category: "Technology",
  });

  const categories = ["Technology", "Corporate", "Social", "Training"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`, {
          credentials: "include",
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to create event.");
      }

      const data = await response.json();
      setEvents([...events, data]);
      setShowCreateForm(false);
      setNewEvent({
        name: "",
        description: "",
        date: "",
        time: "",
        category: "Technology",
      });
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      filters.category === "all" || event.category === filters.category;
    const matchesStatus =
      filters.status === "all" || event.status === filters.status;
    const matchesSearch =
      event.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.description
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold">Event Dashboard</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create Event
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          className="border rounded px-4 py-2 w-1/3"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border rounded px-4 py-2 w-1/3"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border rounded px-4 py-2 w-1/3"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 border rounded shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/events/${event._id}`)}
          >
            <h5 className="text-xl font-semibold">{event.name}</h5>
            <p>{event.description}</p>
            <div className="flex justify-between mt-4 text-sm">
              <span>📅 {event.date}</span>
              <span>🕒 {event.time}</span>
              <span
                className={`px-2 py-1 rounded text-white ${
                  event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Event Name</label>
                <input
                  type="text"
                  placeholder="Enter event name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                  required
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                  className="border rounded px-4 py-2 w-full"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;