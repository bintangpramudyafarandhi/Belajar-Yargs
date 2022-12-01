const call = require ('./app')//import
const yargs = require("yargs");
const { describe, demandOption } = require('yargs');

yargs.command({ //command untuk menambah data
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
        call.savedata(argv.name,argv.email,argv.mobile);//memanggil function
    },
});

yargs.command({ //command untuk menampilkan isi contacts.json
    command:'show',
    describe:'menampilkan isi contacts.json',
    handler(){
        call.showdata();
    },
});

yargs.command({ //command untuk mencari data berdasarkan nama
    command:'find',
    describe:'cari data dari nama',
    handler(argv){
        call.findName(argv.name)
    }
})

yargs.command({ //command untuk menhapus data
    command:'delete',
    describe:'menghapus data',
    handler(argv){
        call.filter(argv.name);
    }
})

yargs.command({
    command:'update',
    describe:'mengupdate konten data',
    builder: {
        name: {
            describe: 'nama contact',
            demandOption: false,
            type: 'string',
        },
        email: {
            describe: 'email contact',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'no.hp contact',
            demandOption: false,
            type: 'string'
        },
        where: {
            describe: 'condition value',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        call.update(argv.name, argv.email, argv.mobile, argv.where)
    }
})

yargs.parse();