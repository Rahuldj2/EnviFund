import React, { useContext, useEffect, useState} from "react";
import { normalprojectcontext } from "./ProjectCard";
import { useSession, signIn } from "next-auth/react";
const NormalProjectModal = () => {
    const { data: session } = useSession();
    // const project = useContext(projectInfoContext);
    const project=useContext(normalprojectcontext);
    const [fundingAmount, setFundingAmount] = useState("");
    const[AmountinWei,setAmountinWei]=useState(0);
    const [isFundingInputOpen, setIsFundingInputOpen] = useState(false);
    const[investors,setInvestors]=useState([]);

    

    const handleFundProject = () => {
        setIsFundingInputOpen(true);
    };

    const handleFundingAmountChange = (e) => {
        
        setFundingAmount(e.target.value);
    };




    useEffect(() => {
        console.log(project);
        getinvestors(project.project_id);
    }, []);
    const handleFundingSubmit = async() => {
        // Implement the functionality to fund the project using fundingAmount
        makePayment(project);
        // Here you can add logic to fund the project
    };
    

const getinvestors= async(project_id)=>{

    try {
        const response = await fetch(`/api/project/fetch-investors-in-a-project?project_id=${project_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log(data)
        setInvestors(data);
      } catch (error) {
        console.error('Error fetching Investors', error);
      }
}


    // payment gateway logic
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
              taxAmt: parseInt(fundingAmount)
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
    
    
    
           // need to be updated in database
           const url = '/api/project/updates-in-funding';


           const projectData ={
           project_id:project.project_id,
           investor_id : session?.user.email,
           amount:fundingAmount
          }

           postData(url, projectData)
           .then(data => {
             console.log('Success:', data);
             // Handle success response here
           })
           .catch(error => {
             console.error('Error:', error);
             // Handle error response here
           });

setFundingAmount("");
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
    


// calling api to update it in database
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }


    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Project Title:</h3>
                    <p>{project.project_title}</p>
                    {/* <p>{project.project_id}</p> */}
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Location:</h3>
                    <p>{project.location}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Funding Goal:</h3>
                    <p>{project.funding_goal} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Current Balance:</h3>
                    <p>{project.funding_amount} {project.isCryptoProject ? "MATIC" : "INR"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p>{project.description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Owner Email:</h3>
                    <p>{project.project_lead_id}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Image URL:</h3>
                    <p>{project.image}</p>
                </div>


                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Investors:</h3>
                    {investors.map((investor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-color-black">{investor.investor_id}</h3>
                            <h3 className="text-xl font-semibold mb-2 text-color-black">{investor.sum}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleFundProject}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                    >
                        Fund Project
                    </button>
                </div>
                {isFundingInputOpen && (
                    <div className="mt-4">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Amount(in MATIC or INR as per project requirement)"
                            value={fundingAmount}
                            onChange={handleFundingAmountChange}
                        />
                        <button
                            onClick={handleFundingSubmit}
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md text-sm focus:outline-none hover:bg-blue-600"
                        >
                            Fund
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NormalProjectModal;
