// pages/api//project/fetch-projects-of-a-user.js
import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email_id } = req.query;

  try {
    
  

    // fetch all projects with project_lead_id
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('project_lead_id', email_id);

if(projectsError){
    throw projectsError;
}
return res.status(200).json(projects || []); // Return an empty array if no data is found

    
  } catch (error) {
    console.error('Error fetching projects of the user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
