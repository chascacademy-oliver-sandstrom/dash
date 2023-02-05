export const errorMessage = (e) => {
    e.response
      ? console.log(
          `The request was made but the server responded with failed status code! (${e.response.status})`
        )
      : console.log('Your request was made but no response was received!');
  };
  export const asyncCall = async function (e, s) {
    try {
      let t = axios.get(e, s),
        r = await t;
      return r;
    } catch (n) {
      throw n;
    }
  };
  export const kToC = (e) => {
    let s = e - 273.15;
    return `${s.toFixed(0)}\xb0C`;
  };
  export const showErrorAcitivtyMsg = function (e) {
    let s = `
      <div class="spinner">
          <span class="activity">Failed to get the activity at the moment...</span>    
            <p class="errorText">refreshing...</p>
            <i class="fa-solid fa-refresh"></i>
         </div>
      `;
    e.innerHTML = s;
  };
  export const showErrorTimeMsg = function (e) {
    let s = `
        <div class="spinner">     
        <p class="errorText">Cannot get time data at the moment.</p>
        <p class="errorText">refreshing...</p>
          <i class="fa-solid fa-refresh"></i>
        </div>
      `;
    e.innerHTML = s;
  };
  export const showErrorImgMsg = function (e) {
    let s = `
      <div class="spinner">  
        <p class="alt_description">Failed to get the image at the moment...</p>  
        <p class="errorText">refreshing...</p>    
        <i class="fa-solid fa-refresh"></i>
        </div> 
                    `;
    e.innerHTML = s;
  };
  export const renderSpinner = function (e) {
    let s = `
      <div class="spinner">    
        <i class="fa-solid fa-refresh"></i>
        </div> 
                    `;
    e.innerHTML = s;
  };
  export const showErrorMsgJokes = function (e) {
    console.log(e);
    let s = `
      <div class="spinner">  
      <p class="errorText">Cannot get joke data at the moment.</p>
      <p class="errorText">refreshing...</p>
        <i class="fa-solid fa-refresh"></i>
        </div> 
                    `;
    e.innerHTML = s;
  };