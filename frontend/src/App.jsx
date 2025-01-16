import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EventDetails from './components/EventDetails';
import './index.css'


import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeStore } from "./store/themeStore";
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://your-backend-vercel-url.vercel.app";

const socket = io(SOCKET_URL);

socket.on('attendeeUpdate', (data) => {
  console.log('Attendee update:', data);
});

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const theme = themeStore();
  

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) 
    return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  );

  return (
    <div data-theme={theme}>
      
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to="/"/>} />
        <Route path="/events/:eventId" element={authUser ? <EventDetails /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
