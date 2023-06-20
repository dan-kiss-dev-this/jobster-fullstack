import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoute } from "./pages"
import {
  AddJob, AllJobs, Profile, SharedLayout, Stats
} from "./pages/dashboard/index";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* //note the path is relative to parent for / and accessed via Outlet */}
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          {/* <Route index element={<Stats />} /> */}
          <Route index element={<AllJobs />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter >
  );
}

export default App;

{/* <nav>
<Link to="/">Dashboard</Link>
<Link to="/register">Register</Link>
<Link to="/landing">Landing</Link>
</nav> */}
