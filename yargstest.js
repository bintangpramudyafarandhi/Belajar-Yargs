const call = require ('../Contact 28-11-2022/app')//import
const yargs = require("yargs")

yargs.command({
    command:'add',
    describe:'add new contact',
    builder:{
        name: {
            describe:'Contact Name',
            demandOption:true,
            type:'string',
        },
        email: {
            describe:'contact email',
            demandOption:false,//false : boleh kosong
            type:'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type:'string',
        },
    },
    handler(argv){
        const contact = {
            name:argv.name,
            email:argv.email,
            mobile:argv.mobile,
        };
        console.log(contact);
        call.savedata(argv.name,argv.email,argv.mobile);//memanggil function
    },
});

yargs.parse();