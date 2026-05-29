import { useState } from 'react'
import './App.css'
import { isAuthenticated, logoutUser } from "./components/auth/authHelper";
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
          <Route path="/admin/users/all" element={ <AdminUsersPage />} />
          <Route path="/admin/users/male" element={ <AdminUsersPage />} />
          <Route path="/admin/users/female" element={ <AdminUsersPage />} />
          <Route path="/admin/manage-posts" element={<ManagePostsPage />}/>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>





  )
}



export default App
