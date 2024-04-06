import supabase from '../dbConnection/dbConnect';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name,country, city, date_of_birth, mobile_number, email_id,type, } = req.body;

  try {
    // Validate the request body here if needed

    const { data, error } = await supabase
      .from('Profile')
      .insert([
        
        {
          name: name,
         country: country,
         city: city,
        mobile_number: mobile_number,
          email_id: email_id,
          date_of_birth: date_of_birth,
          type: type,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    const newUser = data[0];
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
