const router = require('express').Router();
const { aterapi, hash, getToken } = require('../../config');

const api = 'getAll';

router.get('/hash/:parametro1/parametro2',async (req,res)=>{
    try{
        const { data } = await aterapi.get(`/${api}/${hash(req.params)}`);
        res.json(data);
    }catch(e){
        console.log(e);
        res.json([]);
    }
})

router.get('/token',async (req,res)=>{
    try{
        const token  = await getToken();
        res.json(token);
    }catch(e){
        console.log(e);
        res.json([]);
    }
})

module.exports = router;