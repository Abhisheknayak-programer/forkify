import { TIMEOUT_SEC } from "./config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const Getjson = async function(url){
    try {
        const Recipe__Main = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);   
        const recipe__data = await Recipe__Main.json();

        if(!Recipe__Main.ok) throw new Error(`${Recipe__Main.message} ${Recipe__Main.status}`);
        return recipe__data;
    } catch (error) {
        throw error;
    }
}


export const Sendjson = async function(url,uploadData){
  try {
      const fetchPost = fetch(url,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(uploadData) 
      })

      const Recipe__Main = await Promise.race([fetchPost,timeout(TIMEOUT_SEC)]);   
      const recipe__data = await Recipe__Main.json();
      
      if(!Recipe__Main.ok) throw new Error(`${Recipe__Main.message} ${Recipe__Main.status}`);
      return recipe__data;
  } catch (error) {
      throw error;
  }
}