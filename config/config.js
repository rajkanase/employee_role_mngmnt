var config = {
    //Database Credentials
    mongo: {
        hostname: 'localhost',
        port: '27017',
        username: '',
        password: '',
        db: 'employee_role_mngmnt'
    },
    token: {
        secret: "!RqCcR<Tynf]KqhKn21]G+Ho=<hbF)"
    },
    image: {
        baseUrl: ''
    }
};

config.mongo.url = 'mongodb://' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.db;

module.exports = config;