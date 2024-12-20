import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import './App.css';
import CategoryTable from './components/Category/CategoryTable';
import CreateCategoryForm from './components/Category/CreateCategory';
import DeleteCategoryForm from './components/Category/DeleteCategory';
import UpdateCategoryForm from './components/Category/UpdateCategory';
import MyPhoto from './components/Photos/MyPhoto';
import PendingPhotos from './components/Photos/PendingPhotos';
import PhotoTable from './components/Photos/PhotoTable';
import UploadPhoto from './components/Photos/UploadPhoto';
import LoginForm from './components/Users/LoginForm';
import RegisterForm from './components/Users/RegisterForm';
import ApprovePhotoForm from './components/Photos/ApprovePhoto';
import RejectPhotoForm from './components/Photos/RejectPhoto';
import PhotoViewForm from './components/Photos/ViewPhoto';
import PhotoInfoForm from './components/Photos/ViewInfo';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('token');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  const allRoutes = [
    { path: '/photos', label: 'photos' },
    { path: '/view-photo', label: 'View Photo' },
    { path: '/view-info', label: 'View  PhotoInfo' },
    { path: '/approve-photo', label: 'Approve Photo' },
    { path: '/reject-photo', label: 'Reject Photo' },
    { path: '/categories', label: 'All Category' },
    { path: '/category', label: 'Create Category' },
    { path: '/update-category', label: 'Update Category' },
    { path: '/delete-category', label: 'Delete Category' },
    { path: '/pending-photos', label: 'All Pending Photo' },
    { path: '/upload', label: 'Upload Photo' },
    { path: '/myphotos', label: 'My Photos' },
  ];

  return (
    
    <Router>
      <div>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/">Home</Link></li>
            <li className="navbar-item"><Link to="/photos">Photos</Link></li>
            <li className="navbar-item"><Link to="/login">Login</Link></li>
            <li className="navbar-item"><Link to="/register">Register</Link></li> {/* لینک ثبت‌نام */}
            <li className="navbar-item"><Link to="/about">About</Link></li>
            <li className="navbar-item"><Link to="/routes">Routes</Link></li>
            {isLoggedIn && (
              <li><button onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </nav>

        <div className="app-content">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Gallery</h1>} />
            <Route path="/login" element={isLoggedIn ? <h1>You are already logged in</h1> : <LoginForm onLoginSuccess={handleLoginSuccess} />} />
            <Route 
              path="/register" 
              element={
                isLoggedIn 
                  ? <h1>You are already logged in. Please logout to register a new account.</h1> 
                  : <RegisterForm onRegisterSuccess={() => console.log('Registered successfully!')} />
              } 
            />
            <Route
              path="/photos"
              element={
                isLoggedIn ? (
                  <>
                    <h1>Photo Gallery</h1>
                    <PhotoTable apiRoute="/photos/secure/allPhoto" />
                  </>
                ) : (
                  <>
                    <h1>Photo Gallery</h1>
                    <PhotoTable apiRoute="/photos/allPhoto" />
                  </>
                )
              }
            />
            <Route
              path="/view-photo"
              element={
                isLoggedIn ? (
                  <>
                    <h1>view Photo</h1>
                    <PhotoViewForm apiRoute="/photos/secure/view/:id" />
                  </>
                ) : (
                  <>
                    <h1>view Photo</h1>
                    <PhotoViewForm apiRoute="/photos/view/:id" />
                  </>
                )
              }
            />
            <Route
              path="/view-info"
              element={
                isLoggedIn ? (
                  <>
                    <h1>Photo info</h1>
                    <PhotoInfoForm apiRoute="/photos/secure/info/:id" />
                  </>
                ) : (
                  <>
                    <h1>Photo info</h1>
                    <PhotoInfoForm apiRoute="/photos/info/:id" />
                  </>
                )
              }
            />
            <Route path='/approve-photo' element={ 
              isLoggedIn ? (
              <>
                <h1> Approve Photos</h1>
                <ApprovePhotoForm onApproveSuccess={() => console.log('Approve successfully!')} />
              </>
            ) : ( <h1>Access Denied: Please login as admin</h1> )} />

            <Route path='/reject-photo' element={ 
              isLoggedIn ? (
              <>
                <h1> Reject Photos</h1>
                <RejectPhotoForm onRejectSuccess={() => console.log('Reject successfully!')} />
              </>
            ) : ( <h1>Access Denied: Please login as admin</h1> )} />

            <Route path='/categories' element={ <><h1> All Categories</h1><CategoryTable /></>} />
            <Route path='/category' element={ 
              isLoggedIn ? (
              <>
                <h1> Create Categories</h1>
                <CreateCategoryForm onCategorySuccess={() => console.log('Created successfully!')} />
              </>
            ) : ( <h1>Access Denied: Please login as admin</h1> )} />

            <Route path='/update-category' element={ 
              isLoggedIn ? (
              <>
                <h1> Update Categories</h1>
                <UpdateCategoryForm onUpdateSuccess={() => console.log('Update successfully!')} />
              </>
            ) : ( <h1>Access Denied: Please login as admin</h1> )} />

            <Route path='/delete-category' element={ 
              isLoggedIn ? (
              <>
                <h1> Delete Categories</h1>
                <DeleteCategoryForm onDeleteSuccess={() => console.log('Delete successfully!')} />
              </>
            ) : ( <h1>Access Denied: Please login as admin</h1> )} />

            <Route
              path="/pending-photos"
              element={
                isLoggedIn ? (
                  <PendingPhotos />
                ) : (
                  <h1>Access Denied: Please login as admin</h1>
                )
              }
            />

            <Route
              path="/upload"
              element={
                isLoggedIn ? (
                  <UploadPhoto />
                ) : (
                  <h1>Access Denied: Please login</h1>
                )
              }
            />

            <Route path='/myphotos' element={ 
              isLoggedIn ? (
              <>
                <h1> My Photos</h1>
                <MyPhoto  />
              </>
            ) : ( <h1>Access Denied: Please Login</h1> )} />
            <Route path="/about" element={<><h1>About Page</h1><p>This is a simple gallery app built with React and NestJS.</p></>} />
            <Route 
              path="/routes" 
              element={
                <div className="routes-container">
                  <h1 className="routes-header">All Routes</h1>
                  <ul className="routes-list">
                    {allRoutes.map((route, index) => (
                      <li key={index} className="routes-item">
                        <Link to={route.path} className="routes-link">{route.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              } 
            />
            <Route path="*" element={<h1>Page Not Found</h1>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
