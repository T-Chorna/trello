export const getCurrentDate = () =>{
    const date = new Date();
    return date.toISOString().slice(0, 16); 
}