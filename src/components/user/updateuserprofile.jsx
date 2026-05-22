import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./updateuserprofile.css";

export default function UpdateUserProfile({ onClose }) {

  const navigate = useNavigate();
  function goToProfile() {
    navigate('/userprofile')
  }

  const [step, setStep] = useState(1);

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

  const nextStep = () => {
    setStep(prev => prev + 1);
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

            <div className="row">
              <select required>
                <option>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>

              <select required>
                <option>Month</option>
                {[
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ].map(month => (
                  <option key={month}>{month}</option>
                ))}
              </select>

              <select required>
                <option>Year</option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year}>{year}</option>;
                })}
              </select>
            </div>

            <input type="text" placeholder="Phone Number" />

            <select>
              <option>Select State</option>

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
                <option key={state}>{state}</option>
              ))}

            </select>

            <select>
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <button className="next-btn" onClick={nextStep}>
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

            <select>
              <option>Specialization</option>
              <option>Referee</option>
              <option>Assistant Referee</option>
            </select>

            <select>
              <option>Last League Officiated</option>
              <option>NPFL</option>
              <option>NNL</option>
              <option>NWFL</option>
              <option>NLO</option>
            </select>

            <select>
              <option>Grade</option>
              <option>One</option>
              <option>FIFA</option>
              <option>RTD</option>
              <option>FIFA RTD</option>
            </select>

            <select>
              <option>Year of Last Grade</option>

              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year}>{year}</option>;
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
              <input type="file" accept="image/*" />
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
                onClose();
                goToProfile();
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