import Sequelize from "sequelize";
import databaseConfig from '../config/database'
import User from "../app/models/User";
import File from "../app/models/File";
import Appointment from "../app/models/Appointment";
import mongoose from 'mongoose';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    //inicia configuracao do banco de dados (postgres)
    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))

    }

    //inicia configuracao do banco de dados (mongo)
    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/node',
            { useNewUrlParser: true}
        )
    }
}

export default new Database();
