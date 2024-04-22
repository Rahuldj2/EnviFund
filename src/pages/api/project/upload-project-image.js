import supabase from '../dbConnection/dbConnect';

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { image,project_id} = req.body;

  try {
    // Validate the request body here if needed

    const { data,error } = await supabase.storage
      .from('projectimages')
        .upload(`project_images/${project_id}/${image.name}`, image);
     
        if(data){
            console.log(data);
        }

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
