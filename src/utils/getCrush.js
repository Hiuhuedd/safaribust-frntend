export const getCrush = async() => {
    const resp = await fetch( "https://sb-algorithm-tvll.onrender.com").catch(err=>console.log(err));
    const res = await resp.json();
    return res
}