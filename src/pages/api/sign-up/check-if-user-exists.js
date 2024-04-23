// api/check-if-user-is-there
import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email_id } = req.query;

  try {
    // Fetch all products from the products table
    const { data, error } = await supabase
      .from('users')
      .select('*').eq('email_id',email_id);

    if (error) {
      throw error;
    }

    if(data.length>0){
        return res.status(200).json({exists:true});   
    }
else{
    return res.status(200).json({exists:false});  
}


// Return an empty array if no data is found
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
