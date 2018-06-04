// ** DESTRUCTURING **

//OBJECT DESTRUCTURING

console.log("Object destr. Example 1:");

const person = {
    name: "Pablo",
    age: 25,
    location: {
        city: "philadephia",
        temp: 20
    }
};

const {name: firstName = "Anonymous", age} = person;
const {temp: temperature, city} = person.location;

console.log(`${firstName} is ${age}`);

if (city && temperature) {
    console.log(`It is ${temperature} in ${city}`);
}


console.log("\nObject destr. Example 2:");

const book = {
    title: "Ego is the enemy", 
    author: "Ryan Holiday",
    publisher: {
        name: "Penguin"
    }
};

const {name: publisherName = "Self published"} = book.publisher;

console.log(publisherName);

console.log("----------------------");
//ARRAY DESTRUCTURING

console.log("\nArray destr. Example 1:");

const address = ["1299 south juniper street", "Philadephia", "Pennsylvania", "123456"];
const [, cityName, state = "new york"] = address;

console.log(`You are in ${cityName}, ${state}`);


console.log("\nArray destr. Example 2:")

const item = ["Americano coffee", "2€", "2,50€", "2.75€"];
const [coffee = "Latte", , priceMedium ="NOTHING!!"] = item;

console.log(`A medium ${coffee} costs ${priceMedium}`);