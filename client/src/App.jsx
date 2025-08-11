
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Home from './home';
import Contact from './pages/contact.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import CreateEvent from './pages/createevent.jsx';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import MyEvents from './pages/Myevent.jsx';
import EditEvent from './pages/editevent.jsx';
import ViewEvents from'./pages/viewevent.jsx';
import About from './pages/about.jsx';
import CreateEventLanding from './pages/eventlanding.jsx';
import TechnicalEventForm  from './pages/technicalevent.jsx';
import AdminProfile from'./pages/adminprofile.jsx';
import AdminEventTable from'./pages/adminevent.jsx';
import AnnouncementDashboard from'./pages/announcement.jsx';
import EventApprovalDashboard from './pages/eventapprove.jsx';
import UserManagement from './pages/usermanage.jsx';
import StudentDashboard from './pages/studentdashboard.jsx';
import PastAnnouncements from './pages/pastannouncement.jsx';
import FeedbackForm from './pages/sfeedback.jsx';
import ApplyEvent from './pages/applyevent.jsx';
import AdminFeedback from './pages/adminfeedback.jsx';
import  CertificateVerifier from './pages/certificate.jsx';
import Certificate from './pages/certifyform.jsx';
import FacultyViewAnnouncement from './pages/facultyview.jsx';
import StudentAnnouncements from './pages/studentannounce.jsx';
import CertificateApprovalPage from './pages/certifyapproval.jsx';
import EventList from './pages/eventlist.jsx';
import MakeCertificate from './pages/makecertificate.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <Header />
        
        <main className="flex-grow px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about"element={<About/>}/>
            <Route path="/contact"element={<Contact/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />     
            <Route path="/Faculty/dashboard" element={<FacultyDashboard/>}/>
            <Route path="/faculty/create" element={<CreateEventLanding />} />
            <Route path="/createevent/technical" element={<TechnicalEventForm  />} /> //no use of this line
            <Route path="/fetchevent/approve-events" element={<EventApprovalDashboard/>}/>
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/make-certificate/:id" element={<MakeCertificate />} />
            <Route path="/admin/events"element={<AdminEventTable/>}/>
            <Route path="/admin/announcements"element={<AnnouncementDashboard/>}/>
            <Route path="/student/dashboard"element={<StudentDashboard/>}/>
            <Route path="/past-announcements" element={<PastAnnouncements />}/>
            <Route path="/events"element={<EventList/>}/>
            <Route path="/feedback"element={<FeedbackForm/>}/>
            <Route path="/admin/feedback" element={<AdminFeedback/>}/>
            <Route path="/apply-event/:eventId" element={<ApplyEvent/>}/>
            <Route path="/admin/dashboard" element={<AdminProfile/>}/>
            <Route path="/faculty/generate-certificate"element={< CertificateVerifier/>}/>
            <Route path="/faculty/announcements"element={<FacultyViewAnnouncement/>}/>
            <Route path="/student/announcements"element={<StudentAnnouncements/>}/>
            <Route path="/student/certificate"element={<Certificate/>}/>
            <Route path="//faculty/certificate-approval"element={<CertificateApprovalPage/>}/>
            <Route path="/faculty/events" element={<ViewEvents />} />
            <Route path="/admin/users"element={<UserManagement/>}/>
            <Route path="/Myevent" element={<MyEvents/>}/>
          </Routes>
        </main>
        
        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
