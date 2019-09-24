const translateLib =require('@k3rn31p4nic/google-translate-api') 

async function translate({text, from, to}){
  const { text: result } = await translateLib(text, {
      from,
      to,
    })
  
    return result
}

exports.translate = translate