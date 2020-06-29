# NREL-API
National Renewable Energy Laboratory API Wrapper (Un-Official)

The National Renewable Energy Laboratory currently supports multiple API endpoints for various data pertinent to renewable energy and sustainable infrastructure. 

Visit https://developer.nrel.gov/ to get an API key and see the full official documentation.

**Supported Methods**

*get(api,format,object,debugToggle)*
```javascript
// Use Async/Await or promise/then for async promise handling, otherwise invokations will run synchronously
/ˈsiNGkrənəs/
Learn to pronounce
 
const nrel = require('nrel-api');
let data =nrel.get(api,format,parameters,debugToggle);
```
*Arguments*
* api - supported api enpoints
  * Alternative Fuel Stations
    * Nearest Stations
      * ```let api = "nearest":```
* format 
  * ``` let format = "json" ``` for json;
* parameters 
  * Json object of request paramaters. Visit https://developer.nrel.gov/docs/ to see all parameters
* debugToggle (optional)
  * set to true for debugging console log output. 


**Get Started**

```javascript
const nrel = require("nrel-api");

let lat = 34.0522;
let lng  = -118.2437;
let radius = 10;

let api = "nearest";
let format ="json";
let parameters = { 
    'api_key' : 'YOUR_API_KEY_HERE',
    'status' : 'E',
    'fule_type' : 'Elec',
    'latitude': lat, 
    'longitude' : lng,
    'radius' : 5,
    'access' : 'public',
    'limit' : 40 
};

let execute = async function () {
    try {
        let data =   await nrel.get(api,format,parameters);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
execute();
```
