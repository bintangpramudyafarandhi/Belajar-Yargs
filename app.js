const { Console } = require('console');
//const readline = require('readline'); //require readline
const fs = require('fs'); //require file system
// const async = require('async');

//membuat folder data apabila tidak ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}

/*const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/

const validator = require('validator'); //require validator


const question = (questions, feedback) => {
    return new Promise((resolve, reject) => {
        rl.question(questions, (answer) => {
            resolve(answer)
        })
    })
}

const savedata = (name,email,number) => {
    //validator email
    if (validator.isEmail(email) == false) {
        console.log("Your email is incorrect")
        // rl.close();
        return(false)
    }
    //validator email

    //validator no.hp
    if (validator.isMobilePhone(number,'id-ID') == false) {
        console.log("Your phone number is incorrect")
        // rl.close();
        return(false)
    }
    //validator no.hp
    
    //memasukan data ke contacts.json
    const contact = {name,email,number};
    //const file = fs.readFileSync('data/contacts.json','utf-8');
    //const contacts = JSON.parse(file);
    const contacts = loadContact();

    // cek nama duplikat
    const duplicate = contacts.find((contact) => contact.name===name);
    if(duplicate){
        console.log('\nName already exists. Use another name!')
        return false;
    }
    //cek nama duplikat

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    //memasukan data ke contacts.json

    //OUTPUT
    console.log(`\nName : ${name}`)
    console.log(`Email : ${email}`)
    console.log(`Phone number : ${number}`)
    console.log ('\nTerima kasih sudah memasukkan data!');

    // rl.close();
}

//function untuk membaca contacts.json
const loadContact = () =>{
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

//function untuk menampilkan isi contacts.json
const showdata = () => {
    const contacts = loadContact();
    console.log('Contact list :');
    contacts.forEach((contact,i) => {
        console.log(`${i+1}.`,contact.name,'-',contact.email,'-',contact.number);
    });
};


//function untuk menampilkan data menggunakan nama
function findName(name){
    const contacts = loadContact();
    const found = contacts.find((contact) => contact.name === name);
    if(found) {
        console.log(found.name,'-',found.email,'-',found.number);
    }
    else {
        console.log('Name not found!');
    }
}

//function untuk menghapus data
function filter(name){
    const contacts = loadContact();
    const fil = contacts.filter((contact) => contact.name !== name)
    console.log(fil);
    fs.writeFileSync('data/contacts.json',JSON.stringify(fil));
    console.log('\nData is already deleted!');
}

module.exports = {question,savedata,showdata,findName,filter}//export module