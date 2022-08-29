const { default: axios } = require('axios');
const e = require('express');
const express = require('express')
require('dotenv/config')


const app = express();


//route: http:domain.com/?userid=1&campId=
const urlGetLinkCamp = `http://accestradeapi3.somee.com/api/Oder/LinkCamp`

let ip;
let resultLinkCamp;
app.get('/',(req,res)=>{
    res.send('redirect link is running,,,,')
})

  axios.get('https://api.ipify.org').then((res)=>{
        ip = res.data
        console.log("get",ip)
    })

const getLinkCamp = async(param)=>{
    const kq = await axios.post(urlGetLinkCamp,param).then(res=>res.data)
    const linkCamp = await kq;
    return linkCamp
}

//
app.get('/click', async(req,res)=>{

    //param
    
    const userId = req.query.userId;
    const campId = req.query.campId
    const inf = 
        {
            userId,
            campId,
            ipAdds: ip
        };
    const result = await getLinkCamp(inf);

        //
        if(result.status == 0){
            res.redirect(result.message)
        }else{
            res.send(result)
        }
        //

    console.log('LOG: --- link:',result)
  
        //res.send(inf)
    
})
const PORT =  process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
});
