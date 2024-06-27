export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
};

export default formatCurrency; 

// example of fixing the .toFixed() method issue in round the number 
// console.log((Math.round(6005) / 100).toFixed(2));