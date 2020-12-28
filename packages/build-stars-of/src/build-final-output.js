export async function buildFinalOutput(apiData){
 console.log({type: typeof apiData})
 console.log({array: Array.isArray(apiData) ? apiData.length : 'not array'})
 console.log( {keys: apiData ? Object.keys(apiData) : 'not object'})
 console.log(apiData)
 
  
}