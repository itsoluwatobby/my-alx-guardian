import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import { useGuardianContext } from './hooks/useGuardianContext';
import Sidebar from './components/SidebarModal';
import { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Post from './pages/Post';
import GuardianWrapper from './layouts/GuardianWrapper';
import { NewPost } from './pages/NewPost';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import AccountVerification from './pages/AccountVerification';
import SuccessVerification from './pages/SuccessVerification';

function App() {
  const { setTheme, theme } = useGuardianContext() as GuardianContextType;
  const [openSidebarModal, setOpenSidebarModal] = useState<boolean>(false);

  return (
    <main className={`playfair-display-guardian w-full h-[100dvh h-screen flex flex-col xxlscreen:mx-auto max-w-[1440px] p-2 transition-colors ${theme === 'light' ? 'bg-gradient-to-b from-[#f4f1f3] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#3e3e3e] from-[40%] to-[#606060] text-[#ffffff]'} overflow-y-scroll`}>
      <Routes>
        <Route path='/' element={<GuardianWrapper 
          setOpenSidebarModal={setOpenSidebarModal}
        />}>
          
          <Route index element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='forgotPassword' element={<ForgotPassword />} />
          <Route path='newPassword' element={<NewPassword />} />
          <Route path='account_verification' element={<AccountVerification />} />
          <Route path='success_verification' element={<SuccessVerification />} />

          <Route path='/' element={<DashboardLayout />}>
              
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='post/:postId' element={<Post />} />
              <Route path='profile/:userId' element={<Profile />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='new-post' element={<NewPost />} />
              <Route path='edit-profile' element={<EditProfile />} />
            </Route>
          
          </Route>
          
          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>

      <Sidebar
        theme={theme} setTheme={setTheme}
        openSidebarModal={openSidebarModal} setOpenSidebarModal={setOpenSidebarModal}
      />

      <ToastContainer />
    </main>
  )
}

export default App
