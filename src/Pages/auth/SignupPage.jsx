import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  HeartPulse, 
  AlertCircle,
  Camera,
  Check
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1: Account & Contact
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    // Step 2: Location[cite: 10]
    country: "",
    city: "",
    // Step 3: Identification[cite: 11]
    idNumber: "",
    picture: null,
    // Step 4: Medical[cite: 12]
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    currentMedications: "",
    // Step 5: Emergency[cite: 13]
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    emergencyAddPhone: "",
    termsAccepted: false,
  });

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Complete!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12">
        
        {/* Header & Breadcrumb[cite: 10] */}
        <div className="mb-10 text-center relative">
          <button 
            onClick={handleBack}
            className="absolute left-0 top-0 text-sm font-semibold text-zinc-500 hover:text-black transition-colors"
          >
            <span className="text-zinc-400 font-normal">Back &gt;</span> Register
          </button>
          
          <div className="mt-8">
            <h1 className="text-3xl font-black mb-2">Registration</h1>
            <p className="text-zinc-500 text-sm">
              Please fill in your details to create an account
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-10">
          {[...Array(totalSteps)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-violet-600" : "bg-zinc-100"
              }`}
            />
          ))}
        </div>

        <form onSubmit={step === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
          
          {/* Step 1: Account & Contact[cite: 14] */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <User size={20} />
                  <h3>Account Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">User ID</label>
                    <input type="text" name="userId" placeholder="Enter unique user ID" value={formData.userId} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Full Name</label>
                    <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <Mail size={20} />
                  <h3>Contact Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                    <input type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Step 2: Location[cite: 10] */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <MapPin size={20} />
                  <h3>Location</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Country</label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select your country</option>
                      <option value="UAE">UAE</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">City</label>
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select your city</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Identification[cite: 11] */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <FileText size={20} />
                  <h3>Identification</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">ID Number</label>
                    <input type="text" name="idNumber" placeholder="Enter your ID number" value={formData.idNumber} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Upload Picture</label>
                    <div className="w-full border-2 border-dashed border-zinc-200 rounded-lg h-12 flex items-center justify-center text-zinc-500 hover:border-violet-600 hover:text-violet-600 transition-colors cursor-pointer bg-zinc-50">
                      <Camera size={18} className="mr-2" />
                      <span className="text-sm font-medium">Choose File</span>
                      <input type="file" className="hidden" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical Informations[cite: 12] */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <HeartPulse size={20} />
                  <h3>Medical Informations</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Height (cm)</label>
                    <input type="number" name="height" placeholder="Enter your height" value={formData.height} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Weight (kg)</label>
                    <input type="number" name="weight" placeholder="Enter your weight" value={formData.weight} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Blood Type</label>
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="O+">O+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Allergies</label>
                    <select name="allergies" value={formData.allergies} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="Peanuts">Peanuts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Medical Conditions</label>
                    <select name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="Asthma">Asthma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Current Medications</label>
                    <select name="currentMedications" value={formData.currentMedications} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600 bg-white text-zinc-500 appearance-none">
                      <option value="">Select</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Emergency Contact[cite: 13] */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4 text-violet-600 font-bold">
                  <AlertCircle size={20} />
                  <h3>Emergency Contact</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Name</label>
                    <input type="text" name="emergencyName" placeholder="Enter full name" value={formData.emergencyName} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Relationship</label>
                    <input type="text" name="emergencyRelation" placeholder="Enter the relationship" value={formData.emergencyRelation} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
                    <input type="tel" name="emergencyPhone" placeholder="+1 (555) 000-0000" value={formData.emergencyPhone} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Additional Number (Optional)</label>
                    <input type="tel" name="emergencyAddPhone" placeholder="+1 (555) 000-0000" value={formData.emergencyAddPhone} onChange={handleChange} className="w-full border border-zinc-200 rounded-lg h-12 px-4 focus:outline-none focus:border-violet-600" />
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-3">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      name="termsAccepted"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="w-5 h-5 accent-violet-600 border-zinc-300 rounded cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-zinc-600 cursor-pointer">
                    By registering, you agree to our <span className="font-bold text-black">Terms of Service</span> and <span className="font-bold text-black">Privacy Policy</span>.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons[cite: 10, 13] */}
          <div className="mt-10">
            {step < totalSteps ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="w-full h-14 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors tracking-wide text-lg"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={!formData.termsAccepted}
                className="w-full h-14 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors tracking-wide text-lg"
              >
                Register
              </button>
            )}
            
            <p className="text-center text-sm font-medium mt-6 text-zinc-500">
              Have an account? <Link to="/signin" className="text-violet-600 font-bold hover:underline">Login Now!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}