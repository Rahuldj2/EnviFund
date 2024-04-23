import supabase from '../dbConnection/dbConnect';

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {project_id,investor_id,amount} = req.body;



  try {
    // Validate the request body here if needed

    const { data,error } = await supabase
      .from('investments')
      .insert([
        {
        project_id: project_id,
        investor_id: investor_id,
        amount: amount,
        investment_date: new Date().toISOString()
        ,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

   



    const { data: funding, er } = await supabase
    .from('projects')
    .select('funding_amount').eq('project_id', project_id);

    if (er) {
        throw er;
        }
    console.log("funding"+funding[0].funding_amount)

const newFunding = funding.funding_amount+amount;
console.log("newFunding"+newFunding)

    const { updateddata, err } = await supabase
    .from('projects')
    .update({ funding_amount: newFunding }).eq('project_id', project_id)
    .select();

if (err) {
    throw err;
    }
    
 
    return res.status(201).json({success : true, message: 'Investment Added Successfully'});
  } catch (error) {
    console.error('Error Updating  Investment :',error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
