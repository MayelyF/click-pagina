const dbData = {
    //Aquí van los datos de acceso a la BD
    server: '189.193.252.98',  
    database: 'ClickLab',
    user: 'idiaz',
    password: 'Ardabytec2022',
    options: {
        encript: false,
        trustedConnection: false,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

module.exports = dbData;