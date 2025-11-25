const {add,sub,mul,div} = require('./math');

console.log(add(20,30));
console.log(sub(10,75));
console.log(mul(20,24));
console.log(div(40,25));

// Distributing
const Student = {
    name : "Darshil",
    age : 19,
    course : "Full-Stack Development"
}

let {name,age,course} = Student

console.log(name);
console.log(age);
console.log(course);
