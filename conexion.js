const db = require('./dbData');
const sql = require('mssql');

//---------------- CONEXION -----------------

//en vez de este array se pone al array donde se almacena la info del usuario
const users ={ Nombre: 'Edgar', Apellido: 'Pérez', Edad: 14 }

//aquí es la info del registro
const newUser = { Nombre: 'José', Apellido: 'Navarro', Edad: 10 }


const config = {
    user: db.user,
    password: db.password,
    server: db.server, 
    database: db.database,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

//obtener usuarios
async function getUsers(){
    try{
        const pool = await sql.connect(config)
        const result = await pool.request().query('SELECT * FROM Alumnos')
        const res = result.recordset
        console.log(res); 

    } catch(error) {
        console.error(error)
    }
}

//autenticar usuario
async function authenticate(user){
    try {
        const pool = await sql.connect(config)
        const result = await pool.request().query('SELECT * FROM Alumnos')
        const res = result.recordset
        
        let tf =[]
        for(i=0; i<res.length; i++){
            if(res[i].Nombre == user.Nombre && res[i].Apellido == user.Apellido && res[i].Edad == user.Edad){
                tf[i]=true
            } else {
                tf[i]=false
            }
        
        }
    
        const encontrado = tf.indexOf(true)
        if(encontrado !== -1) {
            console.log('encontrado') //esto se modifica
        }else {
            console.log('no encontrado'); //esto también
        }
    } catch(err){
        console.error(err);
    }
}

//crear usuario
async function createUsers(){
    try{
        let pool = await sql.connect(config)
        await pool.request().input('Nombre', sql.VarChar, `${newUser.Nombre}`) //cada input es un campo a llenar
        .input('Apellido', sql.VarChar, `${newUser.Apellido}`)
        .input('Edad', sql.Int, newUser.Edad)
        .query(`INSERT INTO Alumnos (Nombre, Apellido, Edad) VALUES (@Nombre, @Apellido, @Edad)`)

        console.log('User inserted')
        
    } catch(error) {
        console.error(error)
    }
}

// module.exports.getUsers = getUsers
// module.exports.authenticate = authenticate
// module.exports.createUsers = createUsers