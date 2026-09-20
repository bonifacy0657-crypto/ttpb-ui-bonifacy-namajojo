import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import PagePlaceholder from './pages/PagePlaceholder'
import ApplicationManagementPage from './pages/ApplicationManagementPage'
import TeachingSupervisionPage from './pages/TeachingSupervisionPage'
import TeacherRegistrationPage, { TeacherRegistrationFormPage } from './pages/TeacherRegistrationPage'
import UserManagementPage from './pages/UserManagementPage'
import StaffManagementPage from './pages/StaffManagementPage'
import FileManagementPage from './pages/FileManagementPage'
import PaymentManagementPage from './pages/PaymentManagementPage'
import MyLicenseApplicationsPage from './pages/MyLicenseApplicationsPage'
import MyLicensePage from './pages/MyLicensePage'
import IncomingLicenseRequestsPage from './pages/IncomingLicenseRequestsPage'
import AssignedLicenseRequestsPage from './pages/AssignedLicenseRequestsPage'
import LicensePrintingPage from './pages/LicensePrintingPage'
import RequestAccreditationPage from './pages/RequestAccreditationPage'
import CPDTrainingsPage from './pages/CPDTrainingsPage'
import AccreditationApplicationsPage from './pages/AccreditationApplicationsPage'
import CareerDevelopmentPage from './pages/CareerDevelopmentPage'
import InternshipWindowPage from './pages/InternshipWindowPage'
import MySchoolChoicesPage from './pages/MySchoolChoicesPage'
import SchoolChoicesPage from './pages/SchoolChoicesPage'
import SelectionResultsPage from './pages/SelectionResultsPage'
import SortingCriteriaPage from './pages/SortingCriteriaPage'
import SetupPage from './pages/SetupPage'
import SetupOrganizationUnitPage from './pages/SetupOrganizationUnitPage'
import SetupInstitutionsPage from './pages/SetupInstitutionsPage'
import SetupRegionsPage from './pages/SetupRegionsPage'
import SetupAdminAreasPage from './pages/SetupAdminAreasPage'
import SetupCategoriesPage from './pages/SetupCategoriesPage'
import SetupSubsectorsPage from './pages/SetupSubsectorsPage'
import SetupSubjectsPage from './pages/SetupSubjectsPage'
import SetupDesignationPage from './pages/SetupDesignationPage'
import SetupPermissionsPage from './pages/SetupPermissionsPage'
import SetupRolesPage from './pages/SetupRolesPage'
import SetupLicenseStatusPage from './pages/SetupLicenseStatusPage'
import SetupLicenseClassesPage from './pages/SetupLicenseClassesPage'
import SetupLicenseCategoriesPage from './pages/SetupLicenseCategoriesPage'

function AdminApp({ onLogout }) {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout onLogout={onLogout} />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="user-management" element={<UserManagementPage />} />
      <Route path="staff-management" element={<StaffManagementPage />} />
      <Route path="teaching-supervision" element={<TeachingSupervisionPage />} />
      <Route path="file-management" element={<FileManagementPage />} />
      <Route path="payment-management" element={<PaymentManagementPage />} />
      <Route path="setup" element={<SetupPage />} />
      <Route path="setup/master-data/organization-unit" element={<SetupOrganizationUnitPage />} />
      <Route path="setup/master-data/institutions" element={<SetupInstitutionsPage />} />
      <Route path="setup/master-data/regions" element={<SetupRegionsPage />} />
      <Route path="setup/master-data/admin-areas" element={<SetupAdminAreasPage />} />
      <Route path="setup/master-data/categories" element={<SetupCategoriesPage />} />
      <Route path="setup/master-data/subsectors" element={<SetupSubsectorsPage />} />
      <Route path="setup/master-data/subjects" element={<SetupSubjectsPage />} />
      <Route path="setup/master-data/designation" element={<SetupDesignationPage />} />
      <Route path="setup/access-control/permissions" element={<SetupPermissionsPage />} />
      <Route path="setup/access-control/roles" element={<SetupRolesPage />} />
      <Route path="setup/licensing/license-status" element={<SetupLicenseStatusPage />} />
      <Route path="setup/licensing/license-classes" element={<SetupLicenseClassesPage />} />
      <Route path="setup/licensing/license-categories" element={<SetupLicenseCategoriesPage />} />
      <Route path="teacher-registration" element={<TeacherRegistrationPage />} />
      <Route path="teacher-registration/list" element={<TeacherRegistrationPage />} />
      <Route path="teacher-registration/application" element={<ApplicationManagementPage />} />
      <Route path="teacher-registration/update-personal-information" element={<TeacherRegistrationFormPage />} />
      <Route path="teacher-registration/add-new-registration" element={<TeacherRegistrationFormPage />} />
      <Route path="teacher-licensing" element={<PagePlaceholder title="Licenses Management" description="Track licenses, renewals, and educator eligibility checks." />} />
      <Route path="license-management" element={<PagePlaceholder title="License Management" description="Manage license applications, requests, and printing." />} />
      <Route path="license-management/my-application" element={<MyLicenseApplicationsPage />} />
      <Route path="license-management/my-license" element={<MyLicensePage />} />
      <Route path="license-management/incoming-requests" element={<IncomingLicenseRequestsPage />} />
      <Route path="license-management/assigned-requests" element={<AssignedLicenseRequestsPage />} />
      <Route path="license-management/printing" element={<LicensePrintingPage />} />
      <Route path="internship-management" element={<PagePlaceholder title="Internship Management" description="Manage internship windows, choices, placements, and assessments." />} />
      <Route path="internship-management/window" element={<InternshipWindowPage />} />
      <Route path="internship-management/my-school-choices" element={<MySchoolChoicesPage />} />
      <Route path="internship-management/school-choices" element={<SchoolChoicesPage />} />
      <Route path="internship-management/selection-results" element={<SelectionResultsPage />} />
      <Route path="internship-management/sorting-criteria" element={<SortingCriteriaPage />} />
      <Route path="internship-management/placement-dashboard" element={<PagePlaceholder title="Placement Dashboard" description="Monitor internship placement progress and outcomes." />} />
      <Route path="internship-management/general-competences" element={<PagePlaceholder title="General Competences" description="Manage general internship competence requirements." />} />
      <Route path="internship-management/specific-competences" element={<PagePlaceholder title="Specific Competences" description="Manage specific internship competence requirements." />} />
      <Route path="internship-management/assessment-rating-scale" element={<PagePlaceholder title="Assessment Rating Scale" description="Configure internship assessment rating scales." />} />
      <Route path="internship-management/internships" element={<PagePlaceholder title="Internships" description="Manage active and completed internships." />} />
      <Route path="internship-management/assigned-candidates" element={<PagePlaceholder title="Assigned Candidates" description="Review candidates assigned to internship placements." />} />
      <Route path="internship-management/receive-intern" element={<PagePlaceholder title="Receive Intern" description="Manage intern reception and onboarding details." />} />
      <Route path="internship-management/my-internship" element={<PagePlaceholder title="My Internship" description="View your internship placement and progress." />} />
      <Route path="payments" element={<PagePlaceholder title="Payments" description="Monitor fee collections, payment records, and reconciliation updates." />} />
      <Route path="cpd" element={<PagePlaceholder title="CPD" description="Review professional development activities and training compliance." />} />
      <Route path="cpd/request-accreditation" element={<RequestAccreditationPage />} />
      <Route path="cpd/trainings" element={<CPDTrainingsPage />} />
      <Route path="cpd/accreditation-applications" element={<AccreditationApplicationsPage />} />
      <Route path="cpd/career-development" element={<CareerDevelopmentPage />} />
      <Route path="reports" element={<PagePlaceholder title="Reports" description="Generate and review operational performance and compliance reports." />} />
      <Route path="users" element={<PagePlaceholder title="Users" description="Manage system accounts, permissions, and profile access." />} />
      <Route path="settings" element={<PagePlaceholder title="Settings" description="Update admin preferences, notifications, and setup controls." />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}

export default AdminApp
