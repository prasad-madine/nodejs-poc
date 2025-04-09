import {
  Model,
  Column,
  AllowNull,
  AutoIncrement,
  DataType,
  Table,
  PrimaryKey,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Contract from "./contract";
import CashkickContract from "./cashkick_contract";
import User from "./user";

@Table({
  tableName: "cashkick",
  timestamps: true,
})
class Cashkick extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  maturity!: Date;

  @AllowNull(false)
  @Column(DataType.ENUM("PENDING", "APPROVED"))
  status!: string;

  @Column(DataType.FLOAT)
  total_received!: number;

  @Column(DataType.FLOAT)
  total_financed!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Contract, () => CashkickContract)
  contracts!: Contract[];
}

export default Cashkick;
