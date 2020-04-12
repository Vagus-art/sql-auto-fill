const fs = require("fs");
const axios = require("axios");

const generatePhone = () => { 
    const minm = 1000000000; 
    const maxm = 9999999999; 
    return Math.floor(Math 
    .random() * (maxm - minm + 1)) + minm; 
} 

const formatData = (personArray) => {
    return personArray.map(person=>({
        name: person.name,
        phone: generatePhone()
    }));
}

const generateQueries = async (jsonData) => {
    let queryStrings = "";
    await jsonData.forEach(person=>{queryStrings = queryStrings+`\n INSERT INTO contacts (name,phone) VALUES ('${person.name}',${person.phone});`});
    console.log(queryStrings);
    return queryStrings;
}

const getData = async () => {
    const response = await axios.get('http://localhost:3000/api/contacts/special/all');
    const formattedResponse = await formatData(response.data);
    console.log(formattedResponse);
    return generateQueries(formattedResponse);
}

const writeFile = async () => {
    const data = await getData();
    console.log(data);
    fs.writeFile("data.sql", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
}

writeFile();