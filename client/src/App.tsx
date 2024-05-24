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

function App() {
  const { setTheme, theme } = useGuardianContext() as GuardianContextType;
  const [openSidebarModal, setOpenSidebarModal] = useState<boolean>(false)

  return (
    <main className={`playfair-display-guardian w-full h-[100dvh] flex flex-col xxlscreen:mx-auto max-w-[1440px] transition-colors ${theme === 'light' ? 'bg-gradient-to-b from-[#faeff5] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] text-[#ffffff]'} overflow-y-scroll`}>
      <Routes>
        <Route path='/' element={<GuardianWrapper 
          setOpenSidebarModal={setOpenSidebarModal}
        />}>
          
          <Route index element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />

          <Route path='/' element={<DashboardLayout />}>
            <Route element={<ProtectedRoutes />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='post/:postId' element={<Post />} />
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
