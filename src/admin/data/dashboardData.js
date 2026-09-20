export const stats = [
  {
    id: 'registered',
    title: 'Total Registered Teachers',
    value: '154,280',
    change: '+4.8%',
    trend: 'up',
    icon: '👩‍🏫',
  },
  {
    id: 'licensed',
    title: 'Licensed Teachers',
    value: '132,640',
    change: '+3.2%',
    trend: 'up',
    icon: '✅',
  },
  {
    id: 'applications',
    title: 'Pending Applications',
    value: '1,842',
    change: '-1.4%',
    trend: 'down',
    icon: '📝',
  },
  {
    id: 'payments',
    title: 'Pending Payments',
    value: 'TSh 48.6M',
    change: '+2.1%',
    trend: 'up',
    icon: '💰',
  },
  {
    id: 'cpd',
    title: 'CPD Activities',
    value: '289',
    change: '+6.5%',
    trend: 'up',
    icon: '🎓',
  },
  {
    id: 'good-standing',
    title: 'Good Standing Requests',
    value: '96',
    change: '+0.9%',
    trend: 'up',
    icon: '🏛️',
  },
]

export const registrationData = [
  { month: 'Jan', value: 540 },
  { month: 'Feb', value: 620 },
  { month: 'Mar', value: 710 },
  { month: 'Apr', value: 680 },
  { month: 'May', value: 760 },
  { month: 'Jun', value: 820 },
  { month: 'Jul', value: 900 },
  { month: 'Aug', value: 880 },
  { month: 'Sep', value: 960 },
  { month: 'Oct', value: 1020 },
  { month: 'Nov', value: 1090 },
  { month: 'Dec', value: 1180 },
]

export const applicationStatus = [
  { label: 'Approved', value: 58, color: '#0f766e' },
  { label: 'Pending', value: 24, color: '#f59e0b' },
  { label: 'Rejected', value: 10, color: '#dc2626' },
  { label: 'Under Review', value: 8, color: '#2563eb' },
]

export const paymentSummary = [
  { label: 'Registration Fees', value: 42, color: '#0e5ea8' },
  { label: 'Licensing', value: 30, color: '#14b8a6' },
  { label: 'CPD', value: 18, color: '#f59e0b' },
  { label: 'Other', value: 10, color: '#64748b' },
]

export const recentApplications = [
  {
    number: 'APP-24081',
    teacher: 'Asha Mshana',
    type: 'Teacher Licensing',
    date: '12 Aug 2026',
    status: 'Pending',
    statusClass: 'status pending',
  },
  {
    number: 'APP-24072',
    teacher: 'Joseph Mwangosi',
    type: 'Teacher Registration',
    date: '10 Aug 2026',
    status: 'Approved',
    statusClass: 'status approved',
  },
  {
    number: 'APP-24063',
    teacher: 'Grace Ibrahim',
    type: 'Good Standing',
    date: '08 Aug 2026',
    status: 'Under Review',
    statusClass: 'status review',
  },
  {
    number: 'APP-24058',
    teacher: 'Salim Juma',
    type: 'CPD Verification',
    date: '04 Aug 2026',
    status: 'Rejected',
    statusClass: 'status rejected',
  },
]

export const recentPayments = [
  {
    ref: 'INV-8891',
    teacher: 'Mary Kivuyo',
    amount: 'TSh 250,000',
    date: '12 Aug 2026',
    status: 'Paid',
  },
  {
    ref: 'INV-8876',
    teacher: 'Abdul Msuya',
    amount: 'TSh 180,000',
    date: '11 Aug 2026',
    status: 'Pending',
  },
  {
    ref: 'INV-8834',
    teacher: 'Faith Ndagala',
    amount: 'TSh 320,000',
    date: '09 Aug 2026',
    status: 'Paid',
  },
]

export const notifications = [
  'New teacher registration submissions need review.',
  'Three CPD renewal applications are due this week.',
  'Payment reconciliation report was updated yesterday.',
  'User access review is scheduled for Friday.',
]

export const sidebarItems = [
  { label: 'Dashboard', path: '/admin', icon: '▣' },
  { label: 'User Management', path: '/admin/user-management', icon: '◔' },
  { label: 'Teaching Supervision', path: '/admin/teaching-supervision', icon: '▤' },
  {
    label: 'Internship Management',
    path: '/admin/internship-management',
    icon: '◍',
    defaultExpanded: false,
    children: [
      { label: 'Internship Window', path: '/admin/internship-management/window', icon: '◷' },
      { label: 'My School Choices', path: '/admin/internship-management/my-school-choices', icon: '⌂' },
      { label: 'School Choices', path: '/admin/internship-management/school-choices', icon: '⌂' },
      { label: 'Selection Results', path: '/admin/internship-management/selection-results', icon: '✓' },
      { label: 'Sorting Criteria', path: '/admin/internship-management/sorting-criteria', icon: '⇅' },
      { label: 'Placement Dashboard', path: '/admin/internship-management/placement-dashboard', icon: '▣' },
      { label: 'General Competences', path: '/admin/internship-management/general-competences', icon: '◈' },
      { label: 'Specific Competences', path: '/admin/internship-management/specific-competences', icon: '◆' },
      { label: 'Assessment Rating Scale', path: '/admin/internship-management/assessment-rating-scale', icon: '★' },
      { label: 'Internships', path: '/admin/internship-management/internships', icon: '▤' },
      { label: 'Assigned Candidates', path: '/admin/internship-management/assigned-candidates', icon: '◔' },
      { label: 'Receive Intern', path: '/admin/internship-management/receive-intern', icon: '↓' },
      { label: 'My Internship', path: '/admin/internship-management/my-internship', icon: '▥' },
    ],
  },
  { label: 'File Management', path: '/admin/file-management', icon: '▥' },
  { label: 'Payment Management', path: '/admin/payment-management', icon: '₦' },
  { label: 'Staff Management', path: '/admin/staff-management', icon: '✓' },
  {
    label: 'Teacher Registration',
    path: '/admin/teacher-registration',
    icon: '⎈',
    children: [
      { label: 'Teacher Registration', path: '/admin/teacher-registration/list', icon: '✓' },
      { label: 'Application', path: '/admin/teacher-registration/application', icon: '📝' },
    ],
  },
  {
    label: 'License Management',
    path: '/admin/license-management',
    icon: '✓',
    defaultExpanded: false,
    children: [
      { label: 'My Application', path: '/admin/license-management/my-application', icon: '📝' },
      { label: 'My License', path: '/admin/license-management/my-license', icon: '✓' },
      { label: 'Incoming License Requests', path: '/admin/license-management/incoming-requests', icon: '↓' },
      { label: 'Assigned License Requests', path: '/admin/license-management/assigned-requests', icon: '→' },
      { label: 'License Printing', path: '/admin/license-management/printing', icon: '▣' },
    ],
  },
  { label: 'Payment Management', path: '/admin/payments', icon: '₦' },
  {
    label: 'CPD Management',
    path: '/admin/cpd',
    icon: '◍',
    defaultExpanded: false,
    children: [
      { label: 'Request Accreditation', path: '/admin/cpd/request-accreditation', icon: '→' },
      { label: 'Trainings', path: '/admin/cpd/trainings', icon: '🎓' },
      { label: 'Accreditation Applications', path: '/admin/cpd/accreditation-applications', icon: '📝' },
      { label: 'Career Development', path: '/admin/cpd/career-development', icon: '↗' },
    ],
  },
  { label: 'Reports', path: '/admin/reports', icon: '▥' },
  { label: 'Setup', path: '/admin/setup', icon: '⚙' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙' },
]
