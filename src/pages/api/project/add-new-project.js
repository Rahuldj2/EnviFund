import supabase from '../dbConnection/dbConnect';

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { project_title,description,location,completed,funding_type,funding_goal,funding_amount,funding_goal_reached,project_lead_id,images} = req.body;

  try {
    // Validate the request body here if needed

    const { data,error } = await supabase
      .from('projects')
      .insert([
        {
      project_title: project_title,
        description: description,
        location: location,
        completed: completed,
        funding_type: funding_type,
        funding_goal: funding_goal,
        funding_amount: funding_amount,
        funding_goal_reached: funding_goal_reached,
        project_lead_id: project_lead_id,
        images: images,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    const newProject = data[0];
    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Error Adding Project :',error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
