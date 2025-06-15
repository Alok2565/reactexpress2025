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
// import AddRole from './admin/pages/admins/AddRole';
// import Roles from './admin/pages/admins/Roles';
// import Users from './admin/pages/admins/Users';
// import AddUser from './admin/pages/admins/AddUser';
// import EditUser from './admin/pages/admins/EditUser';
import ImpExpHolderLists from './components/auth/ImpExpHolderLists';
// import Login from './admin/components/admins/Login';
import Roles from './admin/components/admins/Roles';
import AddRole from './admin/components/admins/AddRole';
import LoginForm from './components/LoginForm';
// import RoleForm from './components/RoleForm';
// import UserForm from './components/UserForm';
import EditRole from './admin/components/admins/EditRole';
import AddUser from './admin/components/admins/AddUser';
import Users from './admin/components/admins/Users';
import EditUser from './admin/components/admins/EditUser';
import AllUsersPasswordGenerate from './components/auth/AllUsersPasswordGenerate';
import ImpExpPdwComponent from './components/auth/ImpExpPdwComponent';
import AdminLogin from './components/auth/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AddNatureofBiomaterial from './admin/components/admins/AddNatureofBiomaterial';
import ListNatureofBiomaterials from './admin/components/admins/ListNatureofBiomaterials';
import EditNaturalofBiomaterial from './admin/components/admins/EditNaturalofBiomaterial';
import ListHsCodeItems from './admin/components/admins/ListHsCodeItems';
import AddHsCodeItem from './admin/components/admins/AddHsCodeItem';
import EditHsCodeItem from './admin/components/admins/EditHsCodeItem';
import EditSampleCollected from './admin/components/admins/EditSampleCollected';
import AddSampleCollected from './admin/components/admins/AddSampleCollected';
import ListSamplesCollected from './admin/components/admins/ListSamplesCollected';
import ListQuantityofSamples from './admin/components/admins/ListQuantityofSamples';
import AddQuantityofSample from './admin/components/admins/AddQuantityofSample';
import EditQuantityofSample from './admin/components/admins/EditQuantityofSample';
import EditPurposeofEndUse from './admin/components/admins/EditPurposeofEndUse';
import AddPurposeofEndUse from './admin/components/admins/AddPurposeofEndUse';
import ListPurposeofEndUses from './admin/components/admins/ListPurposeofEndUses';
import EditWeatherResearchAnalysis from './admin/components/admins/EditWeatherResearchAnalysis';
import AddWeatherResearchAnalysis from './admin/components/admins/AddWeatherResearchAnalysis';
import ListWeatherResearchAnalysises from './admin/components/admins/ListWeatherResearchAnalysises';
import EditPurposeofSampleStorage from './admin/components/admins/EditPurposeofSampleStorage';
import AddPurposeofSampleStorage from './admin/components/admins/AddPurposeofSampleStorage';
import ListPurposeofSampleStorage from './admin/components/admins/ListPurposeofSampleStorage';
import EditHomeBanner from './admin/components/admins/EditHomeBanner';
import AddHomeBanner from './admin/components/admins/AddHomeBanner';
import ListHomeBanners from './admin/components/admins/ListHomeBanners';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route exact path="about-us" element={<About />} />
          <Route exact path="contact-us" element={<Contact />} />
          <Route exact path="user-manual" element={<UserManual />} />
          <Route exact path="admin/login" element={<AdminLogin />} />
          <Route exact path="/imp-exp/register" element={<Register />} />
          <Route exact path="/imp-exp/login" element={<LoginImpExp />} />
          <Route exact path="/icmr/login" element={<LoginIcmr />} />
          <Route exact path="/committee/login" element={<LoginCommittee />} />
          <Route exact path="/:role_slug/pasword-generate" element={<AllUsersPasswordGenerate />} />
          <Route exact path="/:role_slug/pasword-generate" element={<AllUsersPasswordGenerate />} />
          <Route exact path="/:role_slug/pasword-generate" element={<AllUsersPasswordGenerate />} />
          <Route exact path="/:role_slug/impexp-pasword-generate" element={<ImpExpPdwComponent />} />
        </Route>

        <Route path="/" element={<Layouts />}>

          {/* Admin Route */}
          <Route exact path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route exact path="/admin/profile/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/admin/roles/" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
          <Route exact path="/admin/role/add" element={<ProtectedRoute><AddRole /></ProtectedRoute>} />
          <Route path="/admin/role/edit/:id" element={<ProtectedRoute><EditRole /></ProtectedRoute>} />
          <Route exact path="/admin/users/" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route exact path="/admin/user/add/" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/admin/user/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />

          {/* Home Banners */}
          <Route exact path="/admin/home-banners/" element={<ProtectedRoute><ListHomeBanners /></ProtectedRoute>} />
          <Route exact path="/admin/home-banner/add_new/" element={<ProtectedRoute><AddHomeBanner /></ProtectedRoute>} />
          <Route path="/admin/home-banner/edit/:id" element={<ProtectedRoute><EditHomeBanner /></ProtectedRoute>} />

          <Route exact path="/admin/hscode-items" element={<ProtectedRoute><ListHsCodeItems /></ProtectedRoute>} />
          <Route exact path="/admin/hscode-item/add_new" element={<ProtectedRoute><AddHsCodeItem /></ProtectedRoute>} />
          <Route path="/admin/hscode-item/edit/:id" element={<ProtectedRoute><EditHsCodeItem /></ProtectedRoute>} />

          <Route exact path="/admin/naturalof-biomaterials" element={<ProtectedRoute><ListNatureofBiomaterials /></ProtectedRoute>} />
          <Route exact path="/admin/naturalof-biomaterial/add_new" element={<ProtectedRoute><AddNatureofBiomaterial /></ProtectedRoute>} />
          <Route path="/admin/naturalof-biomaterial/edit/:id" element={<ProtectedRoute><EditNaturalofBiomaterial /></ProtectedRoute>} />

          <Route exact path="/admin/samples-collected" element={<ProtectedRoute><ListSamplesCollected /></ProtectedRoute>} />
          <Route exact path="/admin/sample-collected/add_new" element={<ProtectedRoute><AddSampleCollected /></ProtectedRoute>} />
          <Route path="/admin/sample-collected/edit/:id" element={<ProtectedRoute><EditSampleCollected /></ProtectedRoute>} />

          <Route exact path="/admin/quantityof-samples" element={<ProtectedRoute><ListQuantityofSamples /></ProtectedRoute>} />
          <Route exact path="/admin/quantityof-sample/add_new" element={<ProtectedRoute><AddQuantityofSample /></ProtectedRoute>} />
          <Route path="/admin/quantityof-sample/edit/:id" element={<ProtectedRoute><EditQuantityofSample /></ProtectedRoute>} />

          <Route exact path="/admin/purposeof-enduses" element={<ProtectedRoute><ListPurposeofEndUses /></ProtectedRoute>} />
          <Route exact path="/admin/purposeof-enduse/add_new" element={<ProtectedRoute><AddPurposeofEndUse /></ProtectedRoute>} />
          <Route path="/admin/purposeof-enduse/edit/:id" element={<ProtectedRoute><EditPurposeofEndUse /></ProtectedRoute>} />

          <Route exact path="/admin/weather-research-analysises" element={<ProtectedRoute><ListWeatherResearchAnalysises /></ProtectedRoute>} />
          <Route exact path="/admin/weather-research-analysis/add_new" element={<ProtectedRoute><AddWeatherResearchAnalysis /></ProtectedRoute>} />
          <Route path="/admin/weather-research-analysis/edit/:id" element={<ProtectedRoute><EditWeatherResearchAnalysis /></ProtectedRoute>} />

          <Route exact path="/admin/purposeof-samples-storage" element={<ProtectedRoute><ListPurposeofSampleStorage /></ProtectedRoute>} />
          <Route exact path="/admin/purposeof-sample-storage/add_new" element={<ProtectedRoute><AddPurposeofSampleStorage /></ProtectedRoute>} />
          <Route path="/admin/purposeof-sample-storage/edit/:id" element={<ProtectedRoute><EditPurposeofSampleStorage /></ProtectedRoute>} />

          <Route exact path="/admin/impexp-holders" element={<ProtectedRoute><ImpExpHolderLists /></ProtectedRoute>} />
          {/* <Route exact path="/admin/add-impexp-holder/" element={<Register/>} /> */}



          {/* IMP EXP Route */}
          <Route exact path="imp-exp/dashboard" element={<ProtectedRoute><ImpExpDashboard /></ProtectedRoute>} />
          <Route exact path="/imp-exp/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="/imp-exp/add-new" element={<ProtectedRoute><ApplyNocRequest /></ProtectedRoute>} />
          <Route exact path="imp-exp/exporters" element={<ProtectedRoute><ExporterAppList /></ProtectedRoute>} />
          <Route exact path="imp-exp/rejct-applications" element={<ProtectedRoute><RejectExpAppList /></ProtectedRoute>} />

          {/* ICMR Route */}

          <Route exact path="icmr/dashboard" element={<ProtectedRoute><IcmrDashboard /></ProtectedRoute>} />
          <Route exact path="/icmr/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="icmr/exporters" element={<ProtectedRoute><ExporterAppList /></ProtectedRoute>} />
          <Route exact path="icmr/rejct-applications" element={<ProtectedRoute><RejectExpAppList /></ProtectedRoute>} />

          {/* Committee Route */}
          <Route exact path="committee/dashboard" element={<ProtectedRoute><CommDashboard /></ProtectedRoute>} />
          <Route exact path="/committee/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route exact path="committee/exporters" element={<ProtectedRoute><ExporterAppList /></ProtectedRoute>} />
          < Route exact path="committee/rejct-applications" element={< ProtectedRoute > <RejectExpAppList /></ProtectedRoute >} />
        </Route >

        {/* Catch-all route for undefined routes */}
        < Route path="*" element={< PageNotFound />} />
        {/* <Route exact path="/user/role" element={<RoleForm/>} />
        <Route exact path="/user/register" element={<UserForm/>} />*/}
        <Route exact path="/user/login" element={<LoginForm />} />

      </Routes >
    </BrowserRouter >
  );
}

export default App;
