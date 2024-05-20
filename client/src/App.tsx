import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './layouts/ProtectedRoutes';
import { useGuardianContext } from './hooks/useGuardianContext';
import Sidebar from './components/Sidebar';
import { useState } from 'react';

function App() {
  const { setTheme, theme } = useGuardianContext() as GuardianContextType;
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  return (
    <main className={`playfair-display-guardian w-full h-[100dvh] flex flex-col xxlscreen:mx-auto max-w-[1440px] transition-colors ${theme === 'light' ? 'bg-gradient-to-b from-[#fae2ef] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] text-[#ffffff]'} overflow-y-scroll`}>
      <Navbar 
        theme={theme}
        setTheme={setTheme}
        setOpenSidebar={setOpenSidebar}
      />

      <Routes>
        <Route path='/'>
          
          <Route index element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          
          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>

      <Sidebar
        theme={theme} setTheme={setTheme}
        openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}
      />

      <ToastContainer />
    </main>
  )
}

export default App
