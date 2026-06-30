import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "./updateuserprofile.css";
import api from "../../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UpdateUserProfile({ onClose }) {

  const navigate = useNavigate();
  function goToProfile() {
    navigate('/userprofile')
  }

  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("onboardingStep");

    return savedStep ? Number(savedStep) : 1;
  });

  useEffect(() => {
    localStorage.setItem(
      "onboardingStep",
      step
    );
  }, [step]);

  const [formData, setFormData] = useState({
    phone: "",
    state: "",
    gender: "",
    specialization: "",
    lastLeagueOfficiated: "",
    grade: "",
    lastGradeYear: "",
    profilePhoto: null,
    dateOfBirth: null,
  });



  const submitProfile = async () => {

    try {


      const data = new FormData();

      // const formattedDOB = formData.dateOfBirth.toISOString().split("T")[0];
      const dob = formData.dateOfBirth;

      const formattedDOB = `${dob.getFullYear()}-${String(
        dob.getMonth() + 1
      ).padStart(2, "0")}-${String(
        dob.getDate()
      ).padStart(2, "0")}`;


      data.append("dateOfBirth", formattedDOB);

      data.append("phone", formData.phone);

      data.append("state", formData.state);

      data.append("gender", formData.gender);

      data.append(
        "specialization",
        formData.specialization
      );

      data.append(
        "lastLeagueOfficiated",
        formData.lastLeagueOfficiated
      );

      data.append("grade", formData.grade);

      data.append(
        "lastGradeYear",
        formData.lastGradeYear
      );

      if (formData.profilePhoto) {

        data.append(
          "profilePhoto",
          formData.profilePhoto
        );

      }

      const response = await api.put(
        `/auth/onboarding`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Profile completed successfully"
      );

      navigate("/userprofile");

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {

      setPreviewImage(URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));
    }
  };

  const slideVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },

    animate: {
      opacity: 1,
      x: 0,
    },

    exit: {
      opacity: 0,
      x: -50,
    },
  };

  const validateStep1 = () => {

    if (
      !formData.dateOfBirth
    ) {
      toast.error("Please select date of birth");
      return false;
    }



    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (
      !formData.state ||
      formData.state === "Select State"
    ) {
      toast.error("Please select state");
      return false;
    }

    if (
      !formData.gender ||
      formData.gender === "Gender"
    ) {
      toast.error("Please select gender");
      return false;
    }

    return true;

  };


  const validateStep2 = () => {

    if (
      !formData.specialization ||
      formData.specialization ===
      "Specialization"
    ) {
      toast.error(
        "Please select specialization"
      );

      return false;
    }

    if (
      !formData.lastLeagueOfficiated ||
      formData.lastLeagueOfficiated ===
      "Last League Officiated"
    ) {
      toast.error(
        "Please select last league officiated"
      );

      return false;
    }

    if (
      !formData.grade ||
      formData.grade === "Grade"
    ) {
      toast.error("Please select grade");

      return false;
    }

    if (
      !formData.lastGradeYear ||
      formData.lastGradeYear ===
      "Year of Last Grade"
    ) {
      toast.error(
        "Please select last grade year"
      );

      return false;
    }

    return true;

  };

  const nextStep = () => {

    if (step === 1) {

      const isValid = validateStep1();

      if (!isValid) return;

    }

    if (step === 2) {

      const isValid = validateStep2();

      if (!isValid) return;

    }

    setStep((prev) => prev + 1);

  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        {/* CLOSE BUTTON */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* HEADER */}
        <h2>Complete Your Profile</h2>

        <div className="progress-container">

          <div className="progress-header">

            <span>
              Step {step} of 4
            </span>

            <span>
              {Math.round((step / 4) * 100)}%
            </span>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${(step / 4) * 100}%`
              }}
            ></div>

          </div>

        </div>
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="step-content"
            >

              <h3>Personal Information</h3>

              {/* <div className="row">
                <select required name="day" value={formData.day} onChange={handleChange}>
                  <option value="" disabled>Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <select required name="month" value={formData.month} onChange={handleChange}>
                  <option value="" disabled>Month</option>
                  {[
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                  ].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>

                <select required name="year" value={formData.year} onChange={handleChange}>
                  <option value="" disabled>Year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div> */}

              <div className="date-picker-container">

                <DatePicker

                  selected={formData.dateOfBirth}

                  onChange={(date) =>

                    setFormData((prev) => ({

                      ...prev,

                      dateOfBirth: date

                    }))

                  }

                  dateFormat="dd MMM, yyyy"

                  placeholderText="Select Date of Birth"

                  maxDate={new Date()}

                  showYearDropdown

                  scrollableYearDropdown

                  yearDropdownItemNumber={100}

                  className="date-picker-input"

                />

              </div>

              <input required={true} type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />

              <select name="state" value={formData.state} onChange={handleChange}>
                <option value="" disabled>Select State</option>

                {[
                  "Abia", "Adamawa", "Akwa Ibom", "Anambra",
                  "Bauchi", "Bayelsa", "Benue", "Borno",
                  "Cross River", "Delta", "Ebonyi", "Edo",
                  "Ekiti", "Enugu", "FCT Abuja", "Gombe",
                  "Imo", "Jigawa", "Kaduna", "Kano",
                  "Katsina", "Kebbi", "Kogi", "Kwara",
                  "Lagos", "Nasarawa", "Niger", "Ogun",
                  "Ondo", "Osun", "Oyo", "Plateau",
                  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
                ].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}

              </select>

              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button className="next-btn" onClick={nextStep} disabled={!formData.dateOfBirth || !formData.state || !formData.gender}>
                Continue
              </button>

            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="step-content"
            >

              <h3>Referee Information</h3>

              <select name="specialization" value={formData.specialization} onChange={handleChange}>
                <option value="" disabled>Specialization</option>
                <option value="Referee">Referee</option>
                <option value="Assistant Referee">Assistant Referee</option>
              </select>

              <select name="lastLeagueOfficiated" value={formData.lastLeagueOfficiated} onChange={handleChange}>
                <option value="" disabled>Last League Officiated</option>
                <option value="NPFL">NPFL</option>
                <option value="NNL">NNL</option>
                <option value="NWFL">NWFL</option>
                <option value="NLO">NLO</option>
              </select>

              <select name="grade" value={formData.grade} onChange={handleChange}>
                <option value="">Grade</option>
                <option value="One">One</option>
                <option value="FIFA">FIFA</option>
                <option value="RTD">RTD</option>
                <option value="FIFA RTD">FIFA RTD</option>
              </select>

              <select name="lastGradeYear" value={formData.lastGradeYear} onChange={handleChange}>
                <option value="" disabled>Year of Last Grade</option>

                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>

              <div className="button-row">
                <button className="secondary-btn" onClick={prevStep}>
                  Back
                </button>

                <button className="next-btn" onClick={nextStep}>
                  Continue
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="step-content"
            >

              <h3>Upload Profile Photo</h3>

              <div className="upload-box">

                {
                  previewImage ? (
                    <img
                      src={previewImage}
                      alt="preview"
                      className="preview-image"
                    />
                  ) : (
                    <p>No image selected</p>
                  )
                }

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </div>

              <p className="optional-text">
                This step is optional
              </p>

              <div className="button-row">
                <button className="secondary-btn" onClick={prevStep}>
                  Back
                </button>

                <button className="next-btn" onClick={nextStep}>
                  Continue
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="step-content"
            >

              <h3>Profile Completed 🎉</h3>

              <p className="review-text">
                Your profile information has been successfully completed.
              </p>

              <div className="button-row">

                <button className="secondary-btn" onClick={prevStep}>
                  Back
                </button>

                <button className="submit-btn" onClick={() => {
                  submitProfile()

                }}>
                  Finish
                </button>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}