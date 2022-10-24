import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../common/db';
import { Member as Type } from "../types";

class Member extends Model<Type, Omit<Type, "id">> implements Type {
    declare id: number;
    declare tid: number;
    declare name: string;
    declare gender: string;
    declare avatar: string;
    declare birthday: Date;
    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Member.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "姓名",
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "头像",
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "male",
        comment: "性别",
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

export { Member };
