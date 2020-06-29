//NREL Api Connection module
const baseUrl = "https://developer.nrel.gov";

//Simple Console Log
const debug = (x,debug) => (debug ? console.log(x):null);

//Https request using to endpoint. 
//Returns a promise upon invokation 
//On 'end' event resolves promise 
const httpGet =  (apiRequest,log) => {
    
    return  new Promise ( function(resolve,reject) {

        const wGet = require("https");
        wGet.get(apiRequest,(res)=>{
            
            var resData='';
            debug(('\n'+'STATUS: ' + res.statusCode),log);
                
                res.on('data', (chunk)=>  {
                    resData  += chunk 
                })

                res.on('end',()=>{     
                    var data = new Object;
                    data.status = res.statusCode
                    data.response = resData ? JSON.parse(resData) : null; 
                    debug(('DATA: '+ JSON.stringify(data.response)),log);
                    resolve(data)
                }); 
        });   
    });
}

//Api Request builder 
//Calls http connection 
//Resolves upon a 200 status from http connections
//Rejects for any other status code, or an unsupported API endpoint, or unknown error in catch block. 
const apiRequest =  (api,format,object,log) =>{
    return  new Promise (async function(resolve,reject) {
            
        let d = (typeof  log === 'undefined') ?  false : log;
        let params = "."+format+"?"  
        let amp  = null;
        let endPoint;
        
        Object.keys(object).map((key,i) =>{
            amp = (i!==0) ? "&" : ""; 
            params += amp + key + "=" + object[key];
        })

        switch (api) {
            case "nearest":
                endPoint = "/api/alt-fuel-stations/v1/nearest";
                break ;
            //@Todo = Additional Endpoints and api to be added/tested later
            default :
                let error = '"'+ api +'"'+ " is an unsupported method" ;
                reject(error)
                return;   
        }
        
        let apiRequest = baseUrl + endPoint + params;
        debug('URL: '+apiRequest,d);
        
        try {
            let data = await httpGet(apiRequest,log);
            (data.status == 200) ? resolve(data) : reject('STATUS: '+data.status + '\n' +JSON.stringify(data.response));
        } catch (error) {
            debug(error,d);
            reject(error);
        } 
    });
}
exports.get = apiRequest;
