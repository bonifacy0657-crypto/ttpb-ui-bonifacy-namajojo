import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const registrationTypes = [
  {
    title: 'Full Registration',
    description: 'Teachers with complete credentials',
    tone: 'full',
    icon: '✓',
    count: 0,
  },
  {
    title: 'Provisional Registration',
    description: 'Pending full certification',
    tone: 'provisional',
    icon: '⏳',
    count: 0,
  },
  {
    title: 'Temporary Registration',
    description: 'Short term teaching permit',
    tone: 'temporary',
    icon: '⏱',
    count: 0,
  },
]

const initialFormData = {
  firstName: 'Grace',
  middleName: 'Amina',
  lastName: 'Mwakalebela',
  gender: 'Female',
  dateOfBirth: '1992-06-13',
  nationality: 'Tanzanian',
  nationalId: '19920613234567890123',
  passportNumber: '',
  maritalStatus: 'Single',
  profilePhoto: 'profile-grace.jpg',
  phoneNumber: '+255 712 345 678',
  alternativePhoneNumber: '+255 787 654 321',
  emailAddress: 'grace.mwakalebela@ttpb.go.tz',
  region: 'Dar es Salaam',
  district: 'Kinondoni',
  ward: 'Mikocheni',
  streetAddress: 'Plot 204, Mikocheni Road',
  teacherRegistrationNumber: 'TTPB-2024-001',
  currentRegistrationStatus: 'Active',
  registrationType: 'Full Registration',
  dateOfFirstRegistration: '2024-01-15',
  teachingLevel: 'Primary School',
  teachingSubjects: 'Mathematics, Science',
  highestProfessionalQualification: 'Bachelor of Education',
  professionalQualificationInstitution: 'University of Dar es Salaam',
  yearOfGraduation: '2018',
  cpdStatus: 'Current',
  recentTrainingCourse: 'Inclusive Education and Assessment',
  trainingProvider: 'Tanzania Teachers Professional Board',
  trainingDate: '2025-04-10',
  cpdCertificateNumber: 'CPD-2025-104',
  contactPersonName: 'Juma Mwakalebela',
  relationship: 'Brother',
  emergencyPhoneNumber: '+255 765 432 109',
  emergencyAddress: 'Mikocheni, Dar es Salaam',
}

const emptyEmploymentRecord = {
  id: null,
  institutionName: '',
  employerType: 'Government',
  employeeNumber: '',
  jobTitle: '',
  teachingLevel: 'Primary School',
  subjectsTaught: '',
  region: '',
  district: '',
  schoolInstitution: '',
  dateOfEmployment: '',
  employmentStartDate: '',
  employmentEndDate: '',
  employmentStatus: 'Active',
  employmentType: 'Permanent',
  appointmentLetter: 'appointment-letter.pdf',
  remarks: '',
}

const emptyQualification = {
  id: null,
  qualificationLevel: 'Degree',
  qualificationName: '',
  institution: '',
  courseProgramme: '',
  startYear: '',
  completionYear: '',
  certificateNumber: '',
  certificateUpload: 'certificate.pdf',
}

const emptyCpdRecord = {
  id: null,
  status: 'Current',
  recentTrainingCourse: '',
  trainingProvider: '',
  trainingDate: '',
  certificateNumber: '',
  certificateUpload: 'cpd-certificate.pdf',
}

function TeacherRegistrationPage() {
  const navigate = useNavigate()

  return (
    <div className="teacher-registration-page">
      <div className="teacher-registration-header">
        <div>
          <span className="section-tag admin-tag">Teacher Registration</span>
          <h1>Teacher Registration</h1>
        </div>
      </div>

      <p className="teacher-registration-subtitle">Manage professional teacher registration</p>

      <div className="teacher-registration-actions">
        <button type="button" className="btn btn-secondary teacher-registration-btn" onClick={() => navigate('/admin/teacher-registration/update-personal-information')}>
          <span className="teacher-registration-btn-icon" aria-hidden="true">✏️</span>
          <span>Update Personal Information</span>
        </button>
        <button type="button" className="btn btn-primary teacher-registration-btn" onClick={() => navigate('/admin/teacher-registration/add-new-registration')}>
          <span className="teacher-registration-btn-icon" aria-hidden="true">＋</span>
          <span>Add New Registration</span>
        </button>
      </div>

      <div className="teacher-registration-grid">
        {registrationTypes.map((card) => (
          <article key={card.title} className={`teacher-registration-card ${card.tone}`}>
            <div className="teacher-registration-card-header">
              <span className="teacher-registration-icon" aria-hidden="true">{card.icon}</span>
              <span className="teacher-registration-pill">Active</span>
            </div>
            <div className="teacher-registration-metric" aria-label={`${card.title} count`}>
              <strong>{card.count}</strong>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>

      <div className="teacher-registration-search-panel">
        <label className="teacher-registration-search-field" htmlFor="teacher-registration-search">
          <span>Search records</span>
          <input id="teacher-registration-search" type="search" placeholder="Search teacher registration..." />
        </label>
      </div>

      <div className="teacher-registration-empty-card" role="status" aria-live="polite">
        <span className="teacher-registration-empty-icon" aria-hidden="true">ℹ️</span>
        <p>No teacher registration found</p>
      </div>
    </div>
  )
}

function TeacherRegistrationFormPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isNewRegistration = location.pathname.includes('add-new-registration')

  const [formData, setFormData] = useState(() => ({
    ...initialFormData,
    ...(isNewRegistration ? {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      nationalId: '',
      maritalStatus: '',
      profilePhoto: '',
      phoneNumber: '',
      alternativePhoneNumber: '',
      emailAddress: '',
      region: '',
      district: '',
      ward: '',
      streetAddress: '',
      teacherRegistrationNumber: '',
      currentRegistrationStatus: '',
      registrationType: '',
      dateOfFirstRegistration: '',
      teachingLevel: '',
      teachingSubjects: '',
      highestProfessionalQualification: '',
      professionalQualificationInstitution: '',
      yearOfGraduation: '',
      cpdStatus: '',
      recentTrainingCourse: '',
      trainingProvider: '',
      trainingDate: '',
      cpdCertificateNumber: '',
      contactPersonName: '',
      relationship: '',
      emergencyPhoneNumber: '',
      emergencyAddress: '',
    } : {}),
  }))

  const [employmentRecords, setEmploymentRecords] = useState([
    {
      id: 1,
      institutionName: 'Mikocheni Primary School',
      employerType: 'Government',
      employeeNumber: 'EMP-1024',
      jobTitle: 'Senior Teacher',
      teachingLevel: 'Primary School',
      subjectsTaught: 'Mathematics',
      region: 'Dar es Salaam',
      district: 'Kinondoni',
      schoolInstitution: 'Mikocheni Primary School',
      dateOfEmployment: '2019-01-08',
      employmentStartDate: '2019-01-08',
      employmentEndDate: '',
      employmentStatus: 'Active',
      employmentType: 'Permanent',
      appointmentLetter: 'appointment-letter-1.pdf',
      remarks: 'Leading numeracy intervention program.',
    },
  ])
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      qualificationLevel: 'Degree',
      qualificationName: 'Bachelor of Education',
      institution: 'University of Dar es Salaam',
      courseProgramme: 'Education Management',
      startYear: '2011',
      completionYear: '2015',
      certificateNumber: 'BEd-2015-008',
      certificateUpload: 'bed-certificate.pdf',
    },
  ])
  const [cpdRecords, setCpdRecords] = useState([
    {
      id: 1,
      status: 'Current',
      recentTrainingCourse: 'Inclusive Education and Assessment',
      trainingProvider: 'Tanzania Teachers Professional Board',
      trainingDate: '2025-04-10',
      certificateNumber: 'CPD-2025-104',
      certificateUpload: 'cpd-cert-2025.pdf',
    },
  ])

  const [employmentDraft, setEmploymentDraft] = useState({ ...emptyEmploymentRecord, id: Date.now() })
  const [qualificationDraft, setQualificationDraft] = useState({ ...emptyQualification, id: Date.now() })
  const [cpdDraft, setCpdDraft] = useState({ ...emptyCpdRecord, id: Date.now() })
  const [editingEmploymentId, setEditingEmploymentId] = useState(null)
  const [editingQualificationId, setEditingQualificationId] = useState(null)
  const [editingCpdId, setEditingCpdId] = useState(null)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleFileChange = (event) => {
    const { name, files } = event.target
    if (files && files[0]) {
      setFormData((current) => ({ ...current, [name]: files[0].name }))
    }
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateRequired = (fieldValue) => fieldValue !== undefined && fieldValue !== null && String(fieldValue).trim() !== ''

  const handleSave = (event) => {
    event.preventDefault()

    const nextErrors = {}

    const requiredFields = [
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'nationality',
      'nationalId',
      'maritalStatus',
      'phoneNumber',
      'emailAddress',
      'region',
      'district',
      'ward',
      'streetAddress',
      'teacherRegistrationNumber',
      'currentRegistrationStatus',
      'registrationType',
      'dateOfFirstRegistration',
      'teachingLevel',
      'teachingSubjects',
      'highestProfessionalQualification',
      'professionalQualificationInstitution',
      'yearOfGraduation',
      'contactPersonName',
      'relationship',
      'emergencyPhoneNumber',
      'emergencyAddress',
    ]

    requiredFields.forEach((field) => {
      if (!validateRequired(formData[field])) {
        nextErrors[field] = 'This field is required.'
      }
    })

    if (formData.emailAddress && !validateEmail(formData.emailAddress)) {
      nextErrors.emailAddress = 'Please enter a valid email address.'
    }

    if (formData.phoneNumber && formData.phoneNumber.replace(/\D/g, '').length < 9) {
      nextErrors.phoneNumber = 'Please enter a valid phone number.'
    }

    if (formData.alternativePhoneNumber && formData.alternativePhoneNumber.replace(/\D/g, '').length < 9) {
      nextErrors.alternativePhoneNumber = 'Please enter a valid phone number.'
    }

    if (formData.emergencyPhoneNumber && formData.emergencyPhoneNumber.replace(/\D/g, '').length < 9) {
      nextErrors.emergencyPhoneNumber = 'Please enter a valid phone number.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    setSuccessMessage('Personal information updated successfully.')
  }

  const handleReset = () => {
    setFormData({ ...initialFormData })
    setEmploymentRecords([
      {
        id: 1,
        institutionName: 'Mikocheni Primary School',
        employerType: 'Government',
        employeeNumber: 'EMP-1024',
        jobTitle: 'Senior Teacher',
        teachingLevel: 'Primary School',
        subjectsTaught: 'Mathematics',
        region: 'Dar es Salaam',
        district: 'Kinondoni',
        schoolInstitution: 'Mikocheni Primary School',
        dateOfEmployment: '2019-01-08',
        employmentStartDate: '2019-01-08',
        employmentEndDate: '',
        employmentStatus: 'Active',
        employmentType: 'Permanent',
        appointmentLetter: 'appointment-letter-1.pdf',
        remarks: 'Leading numeracy intervention program.',
      },
    ])
    setQualifications([
      {
        id: 1,
        qualificationLevel: 'Degree',
        qualificationName: 'Bachelor of Education',
        institution: 'University of Dar es Salaam',
        courseProgramme: 'Education Management',
        startYear: '2011',
        completionYear: '2015',
        certificateNumber: 'BEd-2015-008',
        certificateUpload: 'bed-certificate.pdf',
      },
    ])
    setCpdRecords([
      {
        id: 1,
        status: 'Current',
        recentTrainingCourse: 'Inclusive Education and Assessment',
        trainingProvider: 'Tanzania Teachers Professional Board',
        trainingDate: '2025-04-10',
        certificateNumber: 'CPD-2025-104',
        certificateUpload: 'cpd-cert-2025.pdf',
      },
    ])
    setErrors({})
    setSuccessMessage('')
  }

  const addEmploymentRecord = () => {
    if (!employmentDraft.institutionName || !employmentDraft.jobTitle || !employmentDraft.region || !employmentDraft.district) {
      return
    }

    if (editingEmploymentId !== null) {
      setEmploymentRecords((current) => current.map((item) => item.id === editingEmploymentId ? { ...employmentDraft, id: editingEmploymentId } : item))
      setEditingEmploymentId(null)
    } else {
      setEmploymentRecords((current) => [...current, { ...employmentDraft, id: Date.now() }])
    }

    setEmploymentDraft({ ...emptyEmploymentRecord, id: Date.now() })
  }

  const removeEmploymentRecord = (id) => {
    setEmploymentRecords((current) => current.filter((item) => item.id !== id))
    if (editingEmploymentId === id) {
      setEditingEmploymentId(null)
      setEmploymentDraft({ ...emptyEmploymentRecord, id: Date.now() })
    }
  }

  const editEmploymentRecord = (record) => {
    setEmploymentDraft(record)
    setEditingEmploymentId(record.id)
  }

  const addQualification = () => {
    if (!qualificationDraft.qualificationName || !qualificationDraft.institution || !qualificationDraft.completionYear) {
      return
    }

    if (editingQualificationId !== null) {
      setQualifications((current) => current.map((item) => item.id === editingQualificationId ? { ...qualificationDraft, id: editingQualificationId } : item))
      setEditingQualificationId(null)
    } else {
      setQualifications((current) => [...current, { ...qualificationDraft, id: Date.now() }])
    }

    setQualificationDraft({ ...emptyQualification, id: Date.now() })
  }

  const removeQualification = (id) => {
    setQualifications((current) => current.filter((item) => item.id !== id))
    if (editingQualificationId === id) {
      setEditingQualificationId(null)
      setQualificationDraft({ ...emptyQualification, id: Date.now() })
    }
  }

  const editQualification = (record) => {
    setQualificationDraft(record)
    setEditingQualificationId(record.id)
  }

  const addCpdRecord = () => {
    if (!cpdDraft.recentTrainingCourse || !cpdDraft.trainingProvider || !cpdDraft.trainingDate) {
      return
    }

    if (editingCpdId !== null) {
      setCpdRecords((current) => current.map((item) => item.id === editingCpdId ? { ...cpdDraft, id: editingCpdId } : item))
      setEditingCpdId(null)
    } else {
      setCpdRecords((current) => [...current, { ...cpdDraft, id: Date.now() }])
    }

    setCpdDraft({ ...emptyCpdRecord, id: Date.now() })
  }

  const removeCpdRecord = (id) => {
    setCpdRecords((current) => current.filter((item) => item.id !== id))
    if (editingCpdId === id) {
      setEditingCpdId(null)
      setCpdDraft({ ...emptyCpdRecord, id: Date.now() })
    }
  }

  const editCpdRecord = (record) => {
    setCpdDraft(record)
    setEditingCpdId(record.id)
  }

  const renderField = (label, name, type = 'text', options = null, value = null, required = false, placeholder = '') => (
    <label className="teacher-form-field" key={name}>
      <span>{label}{required ? ' *' : ''}</span>
      {type === 'select' ? (
        <select name={name} value={value ?? formData[name]} onChange={handleFieldChange} required={required}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea name={name} value={value ?? formData[name]} onChange={handleFieldChange} placeholder={placeholder} required={required} rows="4" />
      ) : type === 'file' ? (
        <input name={name} type="file" onChange={handleFileChange} />
      ) : (
        <input name={name} type={type} value={value ?? formData[name]} onChange={handleFieldChange} placeholder={placeholder} required={required} />
      )}
      {errors[name] && <small className="field-error">{errors[name]}</small>}
    </label>
  )

  return (
    <div className="teacher-update-page">
      <div className="teacher-update-header">
        <div>
          <span className="section-tag admin-tag">Teacher Registration</span>
          <h1>{isNewRegistration ? 'Add New Registration' : 'Update Personal Information'}</h1>
        </div>
        <button type="button" className="btn btn-secondary teacher-update-back" onClick={() => navigate('/admin/teacher-registration')}>
          Back to Registration
        </button>
      </div>

      {successMessage && (
        <div className="teacher-form-success" role="status" aria-live="polite">
          {successMessage}
        </div>
      )}

      <form className="teacher-update-form" onSubmit={handleSave}>
        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Personal Information</h2>
          </div>
          <div className="teacher-form-grid">
            {renderField('First Name', 'firstName', 'text', null, formData.firstName, true, 'Enter first name')}
            {renderField('Middle Name', 'middleName', 'text', null, formData.middleName, false, 'Enter middle name')}
            {renderField('Last Name', 'lastName', 'text', null, formData.lastName, true, 'Enter last name')}
            {renderField('Gender', 'gender', 'select', ['Male', 'Female', 'Other'], formData.gender, true)}
            {renderField('Date of Birth', 'dateOfBirth', 'date', null, formData.dateOfBirth, true)}
            {renderField('Nationality', 'nationality', 'text', null, formData.nationality, true, 'Enter nationality')}
            {renderField('National ID / NIDA Number', 'nationalId', 'text', null, formData.nationalId, true, 'Enter ID number')}
            {renderField('Passport Number', 'passportNumber', 'text', null, formData.passportNumber, false, 'Optional')}
            {renderField('Marital Status', 'maritalStatus', 'select', ['Single', 'Married', 'Divorced', 'Widowed'], formData.maritalStatus, true)}
            {renderField('Profile Photo', 'profilePhoto', 'file', null, formData.profilePhoto, false)}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Contact Information</h2>
          </div>
          <div className="teacher-form-grid">
            {renderField('Phone Number', 'phoneNumber', 'tel', null, formData.phoneNumber, true, '+255 ...')}
            {renderField('Alternative Phone Number', 'alternativePhoneNumber', 'tel', null, formData.alternativePhoneNumber, false, '+255 ...')}
            {renderField('Email Address', 'emailAddress', 'email', null, formData.emailAddress, true, 'name@example.com')}
            {renderField('Region', 'region', 'text', null, formData.region, true, 'e.g. Dar es Salaam')}
            {renderField('District', 'district', 'text', null, formData.district, true, 'Enter district')}
            {renderField('Ward', 'ward', 'text', null, formData.ward, true, 'Enter ward')}
            {renderField('Street / Address', 'streetAddress', 'textarea', null, formData.streetAddress, true, 'Enter street or residential address')}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Professional Information</h2>
          </div>
          <div className="teacher-form-grid">
            {renderField('Teacher Registration Number', 'teacherRegistrationNumber', 'text', null, formData.teacherRegistrationNumber, true, 'Enter registration number')}
            {renderField('Current Registration Status', 'currentRegistrationStatus', 'select', ['Active', 'Pending', 'Suspended', 'Expired'], formData.currentRegistrationStatus, true)}
            {renderField('Registration Type', 'registrationType', 'select', ['Full Registration', 'Provisional Registration', 'Temporary Registration'], formData.registrationType, true)}
            {renderField('Date of First Registration', 'dateOfFirstRegistration', 'date', null, formData.dateOfFirstRegistration, true)}
            {renderField('Teaching Level', 'teachingLevel', 'select', ['Primary School', 'Secondary School', 'College', 'University'], formData.teachingLevel, true)}
            {renderField('Teaching Subjects / Specialization', 'teachingSubjects', 'text', null, formData.teachingSubjects, true, 'e.g. Mathematics, Physics')}
            {renderField('Highest Professional Qualification', 'highestProfessionalQualification', 'text', null, formData.highestProfessionalQualification, true, 'e.g. Bachelor of Education')}
            {renderField('Professional Qualification Institution', 'professionalQualificationInstitution', 'text', null, formData.professionalQualificationInstitution, true, 'Institution name')}
            {renderField('Year of Graduation', 'yearOfGraduation', 'text', null, formData.yearOfGraduation, true, 'YYYY')}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Employment Records</h2>
            <button type="button" className="btn btn-primary teacher-mini-btn" onClick={addEmploymentRecord}>
              Add Employment Record
            </button>
          </div>
          <div className="teacher-record-form">
            <div className="teacher-form-grid">
              {renderField('Employer / Institution Name', 'institutionName', 'text', null, employmentDraft.institutionName, false, 'Institution name', false)}
              {renderField('Employer Type', 'employerType', 'select', ['Government', 'Private', 'NGO', 'Other'], employmentDraft.employerType, false, '', false)}
              {renderField('Employee Number', 'employeeNumber', 'text', null, employmentDraft.employeeNumber, false, 'Employee number')}
              {renderField('Job Title / Position', 'jobTitle', 'text', null, employmentDraft.jobTitle, false, 'Position title')}
              {renderField('Teaching Level', 'teachingLevel', 'select', ['Primary School', 'Secondary School', 'College', 'University'], employmentDraft.teachingLevel, false, '', false)}
              {renderField('Subjects Taught', 'subjectsTaught', 'text', null, employmentDraft.subjectsTaught, false, 'Subjects')}
              {renderField('Region', 'region', 'text', null, employmentDraft.region, false, 'Region')}
              {renderField('District', 'district', 'text', null, employmentDraft.district, false, 'District')}
              {renderField('School / Institution', 'schoolInstitution', 'text', null, employmentDraft.schoolInstitution, false, 'School name')}
              {renderField('Date of Employment', 'dateOfEmployment', 'date', null, employmentDraft.dateOfEmployment, false)}
              {renderField('Employment Start Date', 'employmentStartDate', 'date', null, employmentDraft.employmentStartDate, false)}
              {renderField('Employment End Date', 'employmentEndDate', 'date', null, employmentDraft.employmentEndDate, false)}
              {renderField('Employment Status', 'employmentStatus', 'select', ['Active', 'Previous'], employmentDraft.employmentStatus, false, '', false)}
              {renderField('Employment Type', 'employmentType', 'select', ['Permanent', 'Contract', 'Temporary', 'Other'], employmentDraft.employmentType, false, '', false)}
              {renderField('Appointment Letter / Employment Evidence', 'appointmentLetter', 'file', null, employmentDraft.appointmentLetter, false)}
              {renderField('Remarks', 'remarks', 'textarea', null, employmentDraft.remarks, false, 'Notes or remarks')}
            </div>
            <div className="teacher-record-actions">
              <button type="button" className="btn btn-primary" onClick={addEmploymentRecord}>
                {editingEmploymentId !== null ? 'Update Record' : 'Save Record'}
              </button>
              {editingEmploymentId !== null && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingEmploymentId(null); setEmploymentDraft({ ...emptyEmploymentRecord, id: Date.now() }) }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="teacher-record-list">
            {employmentRecords.map((record) => (
              <div key={record.id} className="teacher-record-card">
                <div className="teacher-record-card-top">
                  <strong>{record.institutionName || 'Employment Record'}</strong>
                  <span>{record.employmentStatus}</span>
                </div>
                <p>{record.jobTitle} • {record.subjectsTaught || 'No subjects listed'}</p>
                <div className="teacher-record-card-actions">
                  <button type="button" className="btn btn-secondary teacher-inline-btn" onClick={() => editEmploymentRecord(record)}>Edit</button>
                  <button type="button" className="btn btn-danger teacher-inline-btn" onClick={() => removeEmploymentRecord(record.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Education & Qualifications</h2>
            <button type="button" className="btn btn-primary teacher-mini-btn" onClick={addQualification}>
              Add Qualification
            </button>
          </div>
          <div className="teacher-record-form">
            <div className="teacher-form-grid">
              {renderField('Qualification Level', 'qualificationLevel', 'select', ['Certificate', 'Diploma', 'Degree', 'Masters', 'Doctorate'], qualificationDraft.qualificationLevel, false, '', false)}
              {renderField('Qualification Name', 'qualificationName', 'text', null, qualificationDraft.qualificationName, false, 'Qualification title')}
              {renderField('Institution', 'institution', 'text', null, qualificationDraft.institution, false, 'Institution name')}
              {renderField('Course / Programme', 'courseProgramme', 'text', null, qualificationDraft.courseProgramme, false, 'Course name')}
              {renderField('Start Year', 'startYear', 'text', null, qualificationDraft.startYear, false, 'YYYY')}
              {renderField('Completion Year', 'completionYear', 'text', null, qualificationDraft.completionYear, false, 'YYYY')}
              {renderField('Certificate Number', 'certificateNumber', 'text', null, qualificationDraft.certificateNumber, false, 'Certificate number')}
              {renderField('Certificate Upload', 'certificateUpload', 'file', null, qualificationDraft.certificateUpload, false)}
            </div>
            <div className="teacher-record-actions">
              <button type="button" className="btn btn-primary" onClick={addQualification}>
                {editingQualificationId !== null ? 'Update Qualification' : 'Save Qualification'}
              </button>
              {editingQualificationId !== null && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingQualificationId(null); setQualificationDraft({ ...emptyQualification, id: Date.now() }) }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="teacher-record-list">
            {qualifications.map((record) => (
              <div key={record.id} className="teacher-record-card">
                <div className="teacher-record-card-top">
                  <strong>{record.qualificationName || 'Qualification'}</strong>
                  <span>{record.qualificationLevel}</span>
                </div>
                <p>{record.institution} • {record.completionYear || 'Year not provided'}</p>
                <div className="teacher-record-card-actions">
                  <button type="button" className="btn btn-secondary teacher-inline-btn" onClick={() => editQualification(record)}>Edit</button>
                  <button type="button" className="btn btn-danger teacher-inline-btn" onClick={() => removeQualification(record.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Professional Development / CPD</h2>
            <button type="button" className="btn btn-primary teacher-mini-btn" onClick={addCpdRecord}>
              Add CPD
            </button>
          </div>
          <div className="teacher-record-form">
            <div className="teacher-form-grid">
              {renderField('CPD / Professional Development Status', 'status', 'select', ['Current', 'Valid', 'Expired', 'Pending'], cpdDraft.status, false, '', false)}
              {renderField('Recent Training / Course', 'recentTrainingCourse', 'text', null, cpdDraft.recentTrainingCourse, false, 'Training name')}
              {renderField('Training Provider', 'trainingProvider', 'text', null, cpdDraft.trainingProvider, false, 'Provider')}
              {renderField('Training Date', 'trainingDate', 'date', null, cpdDraft.trainingDate, false)}
              {renderField('Certificate Number', 'certificateNumber', 'text', null, cpdDraft.certificateNumber, false, 'CPD certificate number')}
              {renderField('Certificate Upload', 'certificateUpload', 'file', null, cpdDraft.certificateUpload, false)}
            </div>
            <div className="teacher-record-actions">
              <button type="button" className="btn btn-primary" onClick={addCpdRecord}>
                {editingCpdId !== null ? 'Update CPD' : 'Save CPD'}
              </button>
              {editingCpdId !== null && (
                <button type="button" className="btn btn-secondary" onClick={() => { setEditingCpdId(null); setCpdDraft({ ...emptyCpdRecord, id: Date.now() }) }}>
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <div className="teacher-record-list">
            {cpdRecords.map((record) => (
              <div key={record.id} className="teacher-record-card">
                <div className="teacher-record-card-top">
                  <strong>{record.recentTrainingCourse || 'Professional Development'}</strong>
                  <span>{record.status}</span>
                </div>
                <p>{record.trainingProvider} • {record.trainingDate || 'Date not provided'}</p>
                <div className="teacher-record-card-actions">
                  <button type="button" className="btn btn-secondary teacher-inline-btn" onClick={() => editCpdRecord(record)}>Edit</button>
                  <button type="button" className="btn btn-danger teacher-inline-btn" onClick={() => removeCpdRecord(record.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Address / Emergency Contact</h2>
          </div>
          <div className="teacher-form-grid">
            {renderField('Contact Person Name', 'contactPersonName', 'text', null, formData.contactPersonName, true, 'Enter contact person name')}
            {renderField('Relationship', 'relationship', 'text', null, formData.relationship, true, 'e.g. Spouse, Parent')}
            {renderField('Phone Number', 'emergencyPhoneNumber', 'tel', null, formData.emergencyPhoneNumber, true, '+255 ...')}
            {renderField('Address', 'emergencyAddress', 'textarea', null, formData.emergencyAddress, true, 'Emergency address')}
          </div>
        </section>

        <section className="teacher-form-card">
          <div className="teacher-form-card-header">
            <h2>Documents</h2>
          </div>
          <div className="teacher-form-grid">
            {renderField('National ID / NIDA document', 'nationalIdDocument', 'file', null, formData.nationalIdDocument, false)}
            {renderField('Academic Certificate', 'academicCertificate', 'file', null, formData.academicCertificate, false)}
            {renderField('Professional Certificate', 'professionalCertificate', 'file', null, formData.professionalCertificate, false)}
            {renderField('Employment Evidence', 'employmentEvidence', 'file', null, formData.employmentEvidence, false)}
            {renderField('Other Supporting Documents', 'otherSupportingDocuments', 'file', null, formData.otherSupportingDocuments, false)}
          </div>
        </section>

        <div className="teacher-form-actions">
          <button type="submit" className="btn btn-primary teacher-form-action-btn">Save Changes</button>
          <button type="button" className="btn btn-secondary teacher-form-action-btn" onClick={() => navigate('/admin/teacher-registration')}>Cancel</button>
          <button type="button" className="btn btn-secondary teacher-form-action-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export { TeacherRegistrationFormPage }
export default TeacherRegistrationPage
