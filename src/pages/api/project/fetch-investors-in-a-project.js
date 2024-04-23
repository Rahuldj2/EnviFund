import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { project_id } = req.query;
  try {
    // Fetch all investments for the project
    console.log("Project ID:", project_id);
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('project_id', project_id);

    if (error) {
      throw error;
    }

    console.log("Investments Data:", data);

    // Calculate the sum of investments for each investor
    const investorSumMap = new Map();

    data.forEach(investment => {
      const { investor_id, amount } = investment;
      const currentSum = investorSumMap.get(investor_id) || 0;
      investorSumMap.set(investor_id, currentSum + amount);
    });

    // Convert Map to an array of objects
    const investorSumArray = Array.from(investorSumMap.entries()).map(([investor_id, sum]) => ({
      investor_id,
      sum
    }));

    return res.status(200).json(investorSumArray);
  } catch (error) {
    console.error('Error fetching investors:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
