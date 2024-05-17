import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <main>
      <Routes>
        <Route path='/'>
          
          {/* <Route index element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/contact_directory' element={<Contact />} />
          </Route> */}

        </Route>
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
