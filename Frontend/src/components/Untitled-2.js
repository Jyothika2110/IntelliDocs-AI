// Krowdit Dashboard — Frontend Screening Question
 // Complete the 3 TODOs below. Run the file — your console output
 // should match the "Expected Output" given separately.
  
 const customers = [
   { customerId: "D-101", name: "Aarav Mehta", status: "ACTIVE",
 	orders: [{ price: 499.00, quantity: 2 }, { price: -50.00, quantity: 1 }] },
   { customerId: "D-102", name: "Priya Sharma", status: "ACTIVE",
 	orders: [{ price: 1200.00, quantity: 1 }] },
   { customerId: "D-103", name: "Rohan Iyer", status: "INACTIVE",
 	orders: [{ price: 300.00, quantity: 3 }] },
   { customerId: "D-104", name: "Sneha Kulkarni", status: "ACTIVE",
 	orders: null },
   { customerId: "D-105", name: "Karan Verma", status: "ACTIVE",
 	orders: [{ price: 250.00, quantity: 0 }] },
 ];
  
 const vipIds = ["D-101", "D-104", "D-999"]; // imagine this has 5,000+ entries
  
 // TODO 1: Return total revenue (price * quantity) for ACTIVE customers only.
 // A customer's orders are corrupted (skip them entirely) if:
 //   - orders is null, OR
 //   - any order has price < 0, OR
 //   - any order has quantity <= 0
 function calculateRevenue(customers) {
  let totalRevenue=0;
  for(let customer of customers)
  {
    if(customer.status!="ACTIVE")
      continue;
    if(customer.orders===null)
      continue;
    let valid=true;
    for(let order of customer.orders)
    {
      if(order.price<0 || order.quantity<=0)
      {
        valid=false;
        break;
      }
    }
    if(!valid)
      continue;
    for(let order of customer.orders)
    {
      totalRevenue+=order.price*order.quantity;
    }
  }
  return totalRevenue;
   // your code here
 }
  
 // TODO 2: Return only the customers whose customerId is in vipIds.
 // vipIds may contain 5,000+ entries in production — an O(n * m)
 // solution (e.g. Array.includes inside a loop) is NOT acceptable.
 function getVipCustomers(customers, vipIds) {
   // your code here
 }
  
 // TODO 3: Implement debounce from scratch (no libraries).
 // debounce(fn, delay) returns a function that only calls fn
 // after `delay` ms have passed with no new calls.
 function debounce(fn, delay) {
   // your code here
 }
  
 // --- test calls ---
 console.log("Total Revenue:", calculateRevenue(customers));
 console.log("VIP Customers:", getVipCustomers(customers, vipIds).map(c => c.customerId));
  
 const log = debounce((msg) => console.log("Debounced:", msg), 300);
 log("a"); log("b"); log("c"); // only "Debounced: c" should print, once, after 300ms