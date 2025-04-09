import {
  Table,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Column,
  BelongsToMany,
} from "sequelize-typescript";
import Cashkick from "./cashkick";
import CashkickContract from "./cashkick_contract";

@Table({
  tableName: "contract",
  timestamps: true,
})
class Contract extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.ENUM("MONTHLY", "QUARTERLY", "YEARLY"))
  type!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  interest!: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  per_payment!: number;

  @Column(DataType.FLOAT)
  payment_amount!: number;

  @Column(DataType.INTEGER)
  term_length!: number;

  @BelongsToMany(() => Cashkick, () => CashkickContract)
  cashkicks!: Cashkick[];
}

export default Contract;
