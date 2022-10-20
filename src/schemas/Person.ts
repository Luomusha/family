import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../common/db';
import {Person as Type} from "../types";

class Person extends Model<Type, Omit<Type, "id">> implements Type {
    declare id: number;
    declare name: string;
    declare birthday: Date;
    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Person.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "姓名",
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "出生日期"
    }

}, {
    sequelize: sequelize,
    charset: 'utf8mb4',
    comment: '系列表',
});

export {Person};
