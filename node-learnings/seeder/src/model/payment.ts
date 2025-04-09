import {
  Table,
  Model,
  PrimaryKey,
  AllowNull,
  Column,
  DataType,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "payment",
  timestamps: true,
})
class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  due_date!: Date;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  expected_amount!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  outstanding_amount!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Payment;
