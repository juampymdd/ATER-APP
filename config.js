const https = require('https');
const fs = require('fs');
const path = require('path');
const aterapi = require('axios');


    const config = {
        client_id: '',
        cert_name: '',
        passphrase: ''
    }

    const key = fs.readFileSync(path.join(__dirname, 'certs',`${config.cert_name}.key`));
    const cert = fs.readFileSync(path.join(__dirname, 'certs', `${config.cert_name}.crt`));
    const pfx = fs.readFileSync(path.join(__dirname, 'certs',`${config.cert_name}.pfx`));

    const agent = new https.Agent({
        pfx: pfx,
        passphrase: config.passphrase,
        rejectUnauthorized: false
    })

    const getToken = async () => {
        try{
            const  { data }  = await aterapi.get('https://api.ater.gob.ar/autenticar',{
                httpsAgent: agent
            }) 
            console.log(data.token)
                return data.token;
        }catch(e){
            console.log(e);
        }
    }

    aterapi.create({
        baseURL: 'https://api.ater.gob.ar/',
        httpsAgent: agent,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${getToken()}`
        }
    });

    const hash = (params) =>{
        return crypto.createHash('sha512').update(config.client_id + Object.values(params).join('')).digest('base64').slice(0,10);
    }

module.exports = {
    hash,
    getToken,
    agent,
    aterapi,
    key,
    cert,
    pfx, 
    config
}

