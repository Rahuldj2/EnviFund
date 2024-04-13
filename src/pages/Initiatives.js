import React,{ createContext,useState } from "react";
import { initiatives } from "../db-template/initiativesDummyData"; // Import the initiatives data
import InitiativesModal from "../modals/InitiativesModal";
import { img } from '../../public/logo.png';

//created context
export const initiativesContext = createContext();

const Initiatives = () => {
  const [initi,setInitiatives] = useState(initiatives);
  const [selectedInitiative,setSelectedInitiative] = useState(null);

  // Function to handle click on "Know More" button
  const handleKnowMore = (initiative) => {
    setSelectedInitiative(initiative);
  };
  const handleInvest = (initiative) => {
    if (initiative.cryptocurrency) {
      alert("This initiative accepts cryptocurrency. Please contact the owner for more details.");
      // lauch metamask or any other wallet
    } else {
      //launch the payment gateway
      alert("This initiative does not accept cryptocurrency. Please use the payment gateway to invest.");
      makePayment(initiative);
    }

    setSelectedInitiative(initiative);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedInitiative(null);
  };



  const makePayment = async (initiative) => {


    //  const isLoggedIn= localStorage.getItem('isLoggedIn');



    console.log("here...");



    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // Make API call to the serverless API
    const data = await fetch("/api/payment/razorpay",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taxAmt: parseInt(initiative.amount)
        })
      }
    )
      .then((t) =>
        t.json()
      );
    //console.log(data);
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "EnviFund",
      currency: data.currency,
      amount: initiative.amount,
      order_id: data.id,
      description: initiative.description,
      image: 'https://iili.io/JkMsNhF.md.png',
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.

        if (response.razorpay_payment_id) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          // const db = getFirestore(app);
          const paycurrentDate = new Date();



          //const userRef = doc(db, 'users', authid);
          //await setDoc(userRef, { plan, credits, paycurrentDate }, { merge: true });
          // router.push({
          //   pathname: '/Working',
          // });
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          // You can perform additional actions here, such as updating the UI, sending a confirmation email, etc.
        } else {
          alert("Payment Failed!");
          // Handle payment failure scenario, you might want to redirect the user to a different page or display an error message.
        }
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
      },
      prefill: {
        name: "Shivam",
        email: "admin@instantpaydoc.online",
        contact: '9853785519'

      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.captured",(_) => {
      toast.success("Order Placed Successfully");
      cart[1]([]);
      //router.push("../pages/Working");
    });



  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };


  return (
    // Context provider to pass the data and functions to the modal
    <initiativesContext.Provider value={{ initi,selectedInitiative,setInitiatives,setSelectedInitiative }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Initiatives</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {initi.map((initiative) => (
            <div key={initiative.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{initiative.title}</h2>
              <img src={initiative.image} alt={initiative.title} className="w-full h-48 object-cover mb-2" />
              <p className="text-gray-600 mb-2">{initiative.description}</p>
              <p className="text-gray-700">Status: {initiative.status}</p>
              <p className="text-gray-700">Owner: {initiative.owner}</p>
              <p className="text-gray-700">Start Date: {initiative.startDate}</p>
              <button
                onClick={() => handleKnowMore(initiative)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Know More
              </button>
              <button
                onClick={() => handleInvest(initiative)}
                className="ml-16 mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Invest
              </button>



            </div>
          ))}
        </div>
        {/* Modal */}
        {selectedInitiative && (
          <InitiativesModal />
        )}
      </div>
    </initiativesContext.Provider>
  );
};

export default Initiatives;
