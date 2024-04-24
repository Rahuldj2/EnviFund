import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { investor_id } = req.query;
  try {
    // Fetch all investments for the investor
    const { data: investments, error: investmentError } = await supabase
      .from('investments')
      .select('*')
      .eq('investor_id', investor_id);

    if (investmentError) {
      throw investmentError;
    }

    // Calculate the total invested amount
    let totalInvestedAmount = 0;
    investments.forEach(investment => {
      totalInvestedAmount += investment.amount;
    });

    // Calculate the total number of investments
    const totalInvestments = investments.length;

    // Fetch all projects invested by the investor
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('funding_amount')
      .eq('project_lead_id', investor_id);

    if (projectError) {
      throw projectError;
    }

    // Calculate the total number of projects invested by the investor
    const totalProjects = projects.length;

    // Calculate the total amount raised across all projects
    let totalAmountRaised = 0;
    projects.forEach(project => {
      totalAmountRaised += project.funding_amount;
    });

    // Return the response
    return res.status(200).json({
      totalInvestments: totalInvestments,
      totalInvestedAmount: totalInvestedAmount,
      totalProjects: totalProjects,
      totalAmountRaised: totalAmountRaised
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
