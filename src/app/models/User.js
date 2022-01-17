import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL, //existe apenas do lado da classe, e nao do banco de dados
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        }, {
            modelName: 'User',
            underscored: true,
            tableName: 'users',
            sequelize
        });

        //trecho de codigo que vai ser executado antes de qualquer save
        this.addHook('beforeSave', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }
}

export default User;