import React,{ useEffect,useState } from 'react';
import CountUp from 'react-countup';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
// import fetchDashboardDetails from '../api/project/fetch-dashboard-details'; // Import API function
import fetchDashboardDetails from '../pages/api/project/fetch-dashboard-details'; // Import API function

const Dashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // State variables to store project and investment counts
    const [projectsCount,setProjectsCount] = useState(0);
    const [investmentsCount,setInvestmentsCount] = useState(0);
    const [totalMoneyRaised,setTotalMoneyRaised] = useState(0);
    const [totalMoneyInvested,setTotalMoneyInvested] = useState(0);

    // Fetch data from API when component mounts
    useEffect(() => {
        // Redirect to home if session doesn't exist
        if (!session) {
            router.push('/');
            return;
        }

        const fetchData = async () => {
            try{
                console.log(session?.user.email)
              const response = await fetch(`/api/project/fetch-dashboard-details?investor_id=${session?.user.email}`);
              console.log("dash"+response)
              if (!response.ok) {
                throw new Error('Failed to fetch projects');
              }
              const data = await response.json();
              
             
                setProjectsCount(data.totalProjects);
                setInvestmentsCount(data.totalInvestments);
                setTotalMoneyRaised(data.totalAmountRaised);
                setTotalMoneyInvested(data.totalInvestedAmount);
            } catch (error) {
              console.error('Error fetching projects:', error);
            }
            // try {
            //     // Call the API function to fetch dashboard details
     
            //     setProjectsCount(response.totalProjects);
            //     setInvestmentsCount(response.totalInvestments);
            //     setTotalMoneyRaised(response.totalAmountRaised);
            //     setTotalMoneyInvested(response.totalInvestedAmount);
            // } catch (error) {
            //     console.error('Error fetching dashboard data:',error);
            // }
        };

        fetchData();
    },[session,router]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4 text-themeWhite">Dashboard</h1>
            {session && (
                <div className="mb-8 text-themeWhite">
                    Welcome, {session.user.name}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-themeDarkBlue p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-themeWhite">Projects</h2>
                    <div className="flex items-center justify-center">
                        <CountUp end={projectsCount} duration={2} separator="," className="text-4xl font-bold text-themeBlueLight" />
                    </div>
                </div>
                <div className="bg-themeDarkBlue p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-themeWhite">Investments</h2>
                    <div className="flex items-center justify-center">
                        <CountUp end={investmentsCount} duration={2} separator="," className="text-4xl font-bold text-themeBlueLight" />
                    </div>
                </div>
                <div className="bg-themeDarkBlue p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-themeWhite">Total Money Raised</h2>
                    <div className="flex items-center justify-center">
                        <CountUp end={totalMoneyRaised} duration={2} separator="," className="text-4xl font-bold text-themeBlueLight" />
                    </div>
                </div>
                <div className="bg-themeDarkBlue p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-themeWhite">Total Money Invested</h2>
                    <div className="flex items-center justify-center">
                        <CountUp end={totalMoneyInvested} duration={2} separator="," className="text-4xl font-bold text-themeBlueLight" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
