export const getproducts=()=>async(dispatch)=>{
    try{
        const data = await fetch("https://clone-backend-zo32.onrender.com/getproducts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
    });
    const res = await data.json();
    dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res});
    }
    catch(error){
       // dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response});
    }
}