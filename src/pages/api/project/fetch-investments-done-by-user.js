import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { investor_id } = req.query;
  try {
    // Fetch all investments for the project
 
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('investor_id', investor_id);

    if (error) {
      throw error;
    }



    // Calculate the sum of investments for each investor
    const investorSumMap = new Map();

    data.forEach(investment => {
      const { project_id, amount } = investment;
      const currentSum = investorSumMap.get(project_id) || 0;
      investorSumMap.set(project_id, currentSum + amount);
    });

    // Convert Map to an array of objects

 // Fetch project details for each project ID
 const projectsData = await Promise.all(
    Array.from(investorSumMap.keys()).map(async project_id => {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('project_id', project_id)
        .single();
      if (projectError) {
        throw projectError;
      }
      return {
        project_id,
        project_details: projectData,
        sum: investorSumMap.get(project_id)
      };
    })
  );


  return res.status(200).json(projectsData);
  } catch (error) {
    console.error('Error fetching investors:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
