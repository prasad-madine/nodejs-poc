import {
  Table,
  Column,
  PrimaryKey,
  AllowNull,
  Model,
  DataType,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { Exclude, Expose } from "class-transformer";
import Cashkick from "./cashkick";
import Payment from "./payment";

@Table({
  tableName: "user",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Expose()
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Expose()
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Expose()
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @Exclude()
  password!: string;

  @Column(DataType.FLOAT)
  @Expose()
  available_credit!: number;

  @HasMany(() => Cashkick)
  cashkicks!: Cashkick[];

  @HasMany(() => Payment)
  payments!: Payment[];
}

export default User;
