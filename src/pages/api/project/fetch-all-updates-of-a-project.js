// api/fetch-all-updates-of-a-project.js
import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }


  const { project_id } = req.query;
  try {
    // Fetch all updates of project
    const { data, error } = await supabase
      .from('investments')
      .select('*').eq('project_id', project_id);


    if (error) {
      throw error;
    }

    return res.status(200).json(data || []); // Return an empty array if no data is found
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
