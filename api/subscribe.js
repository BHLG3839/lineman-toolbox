module.exports = async function(req,res) {
 res.setHeader('Cache-Control','no-store');
 const key=process.env.RESEND_API_KEY;
 if(req.method==='GET') return res.status(200).json({available:!!key});
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'});}
 if(!key)return res.status(503).json({error:'Email signups are opening soon. Please check back.'});
 const b=req.body||{};
 if(b.website)return res.status(400).json({error:'Unable to sign up.'});
 const email=typeof b.email==='string'?b.email.trim():'';
 if(email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||b.consent!==true)return res.status(400).json({error:'Enter a valid email and agree to receive emails.'});
 try {
 const response=await fetch('https://api.resend.com/contacts',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({email,unsubscribed:false}),signal:AbortSignal.timeout(10000)});
 if(!response.ok)return res.status(502).json({error:'We could not save your signup. Please try again later.'});
 return res.status(200).json({ok:true});
 }catch{return res.status(502).json({error:'Email signup is temporarily unavailable. Please try again later.'});}
};