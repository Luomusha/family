import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../common/db';
import { Tree as Type } from "../types";

class Tree extends Model<Type, Omit<Type, "id">> implements Type {
    declare id: number;
    declare name: string;
    declare cover: string;
    declare note: string;
    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Tree.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "名称",
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "封面",
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "备注",
    }
}, {
    sequelize: sequelize,
    charset: 'utf8mb4',
    comment: '系列表',
});

export { Tree };
