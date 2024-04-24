// components/SignupForm.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

const SignupForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    date_of_birth: "",
    mobile_number: "",
    email_id:  session?.user.email,
    type: "",
  });

  const [loading,setLoading] = useState(false);
  const [progress,setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setProgress(30); // Example: setting initial progress

    console.log(formData)
    formData.email_id= session?.user.email
    try {
      const response = await fetch("/api/sign-up/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Signup successful");
        router.push("/"); // Redirect to home page after successful signup
      } else {
        throw new Error("Failed to add user details");
      }
    } catch (error) {
      console.error("Error adding user details:",error);
      toast.error("Failed to sign up");
    } finally {
      setLoading(false);
      setProgress(100); // Example: setting progress to 100% after completion
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block font-semibold mb-1">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="date_of_birth" className="block font-semibold mb-1">Date of Birth</label>
          <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile_number" className="block font-semibold mb-1">Mobile Number</label>
          <input type="tel" id="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block font-semibold mb-1">Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
            <option value="">Select Type</option>
            <option value="individual">Individual</option>
            <option value="investor">Investor</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</button>
      </div>
      <div className="h-14"></div>

      {/* Loader */}
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
    
  );
};

export default SignupForm;
