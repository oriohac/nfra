import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import ErrorPage from './components/common/error/errorpage';
import Home from './components/home/home'
import UserProfile from './components/user/userprofile'
import AdminDashboard from './components/admin/admindashboard';
import ComingSoon from './components/common/comingSoon/comingsoon';
import About from './components/about/about';
import ContactUs from './components/contact/contactus';
import MainLayout from './layouts/mainlayout';
import ProtectedRoute from './wrapper/protectedroute';
import AllPosts from './components/posts/allposts';
import SinglePost from './components/posts/singlepost';
import AdminUsersPage from './components/admin/adminuserspage';
import ManagePostsPage from './components/admin/manageposts';
import EditPostPage from './components/admin/editpost';
import FitnessTestInterest from './components/fitness/fitnesstestinterest';
import FitnessTestAttendees from './components/admin/fitnesstestattendees';

function App() {



  return (



    <Router>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />}></Route>

          <Route path="/userprofile" element={
            <ProtectedRoute roleRequired="user">
              <UserProfile />
            </ProtectedRoute>
          }></Route>
          <Route path="/admin-dashboard" element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }></Route>
          <Route path="/coming-soon" element={<ComingSoon />} > </Route>
          <Route path="/about" element={<About />} ></Route>
          <Route path="/contact-us" element={<ContactUs />} ></Route>
          <Route path="/posts" element={<AllPosts />}></Route>
          <Route path="/posts/:id" element={<SinglePost />}></Route>
          <Route path="/admin/users/:zone" element={
            <ProtectedRoute roleRequired="admin">
              <AdminUsersPage />
            </ProtectedRoute>
          }></Route>
          <Route path="/admin/users/all" element={
            <ProtectedRoute roleRequired="admin">
              <AdminUsersPage />
            </ProtectedRoute>
          } ></Route>
          <Route path="/admin/users/male" element={
            <ProtectedRoute roleRequired="admin">
              <AdminUsersPage />
            </ProtectedRoute>
          } ></Route>
          <Route path="/admin/users/female" element={
            <ProtectedRoute roleRequired="admin">
              <AdminUsersPage />
            </ProtectedRoute>
          } ></Route>
          <Route path="/admin/manage-posts" element={
            <ProtectedRoute roleRequired="admin">
              <ManagePostsPage />
            </ProtectedRoute>
          }></Route>
          <Route path="/admin/edit-post/:id" element={
            <ProtectedRoute roleRequired="admin">
              <EditPostPage />
            </ProtectedRoute>
          }></Route>
          <Route path="/fitness-test-interest" element={
            <ProtectedRoute roleRequired="user">
              <FitnessTestInterest />
            </ProtectedRoute>
          }></Route>
          <Route path="/admin/fitness-test-attendees" element={
            <ProtectedRoute roleRequired="admin">
              <FitnessTestAttendees />
            </ProtectedRoute>
          }></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>





  )
}



export default App
