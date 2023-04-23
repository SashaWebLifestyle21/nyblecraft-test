import { Model, Table, DataType, Column, Sequelize } from "sequelize-typescript";
import { DataTypes } from "sequelize";

interface IUserCreationAttrs {
  email: string
  password: string
  firstName: string
  lastName: string
  image: string
}

@Table({tableName: 'user'})
export class User extends Model<User, IUserCreationAttrs> {
  @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @Column({type: DataTypes.STRING, unique: true, allowNull: false})
  email: string

  @Column({type: DataTypes.STRING, allowNull: false})
  password: string

  @Column({type: DataTypes.STRING, allowNull: false})
  firstName: string

  @Column({type: DataTypes.STRING, allowNull: false})
  lastName: string

  @Column({type: DataTypes.STRING, allowNull: false, defaultValue: ''})
  image: string

  @Column({type: DataTypes.BLOB, allowNull: true, defaultValue: null})
  pdf: DataTypes.BlobDataType
}