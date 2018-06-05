const promise = () => (new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 2000)
 }));
 
 const promise2 = () => (new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 1000)
 }));
 
 const promise3 = () => (new Promise((resolve, reject) => {
    setTimeout(() => reject("error"), 1500)
 }));
 
 promise().then((data) => {
   console.log(data)
   return promise2();
 }).then((data) => {
   console.log(data);
   return promise3(3)
 }).then((data) => {
   console.log(data)
 }).catch((e) => {
     console.log(e)
 })