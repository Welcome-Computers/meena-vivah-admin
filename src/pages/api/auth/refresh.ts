
export default async function handler(req:any, res:any) {
  try {
    const refreshToken = req.cookies.refreshToken;

   

    
    return res.status(200).json({
      success: true,
    });

  } catch {
    return res.status(401).json({
      success: false,
    });
  }
  
}