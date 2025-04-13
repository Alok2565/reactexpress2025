import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage';
import About from './pages/About';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import UserManual from './pages/UserManual';
import Register from './components/auth/Register';
import LoginImpExp from './components/auth/LoginImpExp';
import LoginIcmr from './components/auth/LoginIcmr';
import LoginCommittee from './components/auth/LoginCommittee';
import Layouts from './admin/components/Layouts';
import Dashboard from './admin/pages/Dashboard';
import Profile from './admin/pages/Profile';
import IcmrDashboard from './admin/pages/icmr/IcmrDashboard';
import CommDashboard from './admin/pages/committee/CommDashboard';
import ImpExpDashboard from './admin/pages/imp-exp/ImpExpDashboard';
import ApplyNocRequest from './admin/pages/imp-exp/ApplyNocRequest';
import PageNotFound from './pages/PageNotFound';
import ExporterAppList from './admin/applications/ExporterAppList';
import RejectExpAppList from './admin/applications/RejectExpAppList'
import AddRole from './admin/pages/admins/AddRole';
import Roles from './admin/pages/admins/Roles';
import Users from './admin/pages/admins/Users';
import AddUser from './admin/pages/admins/AddUser';
import EditUser from './admin/pages/admins/EditUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route exact path="about-us" element={<About />} />
          <Route exact path="contact-us" element={<Contact />} />
          <Route exact path="user-manual" element={<UserManual />} />
          <Route exact path="/imp-exp/register" element={<Register />} />
          <Route exact path="/imp-exp/login" element={<LoginImpExp />} />
          <Route exact path="/icmr/login" element={<LoginIcmr />} />
          <Route exact path="/committee/login" element={<LoginCommittee />} />
        </Route>

        <Route path="/" element={<Layouts />}>
          <Route index element={<Dashboard />} />

          {/* Admin Route */}
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/profile" element={<Profile />} />
          <Route exact path="/admin/roles" element={<Roles />} />
          <Route exact path="/admin/add-role" element={<AddRole />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />

          {/* IMP EXP Route */}
          <Route exact path="imp-exp/dashboard" element={<ImpExpDashboard />} />
          <Route exact path="/imp-exp/profile" element={<Profile />} />
          <Route exact path="/imp-exp/add-new" element={<ApplyNocRequest />} />
          <Route exact path="imp-exp/exporters" element={<ExporterAppList/>} />
          <Route exact path="imp-exp/rejct-applications" element={<RejectExpAppList/>} />

          {/* ICMR Route */}
          <Route exact path="icmr/dashboard" element={<IcmrDashboard />} />
          <Route exact path="/icmr/profile" element={<Profile />} />
          <Route exact path="icmr/exporters" element={<ExporterAppList/>} />
          <Route exact path="icmr/rejct-applications" element={<RejectExpAppList/>} />

          {/* Committee Route */}
          <Route exact path="committee/dashboard" element={<CommDashboard />} />
          <Route exact path="/committee/profile" element={<Profile />} />
        </Route>

        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
