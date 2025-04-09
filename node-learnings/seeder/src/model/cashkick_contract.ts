import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Cashkick from "./cashkick";
import Contract from "./contract";

@Table({
  tableName: "cashkick_contract",
  timestamps: true,
})
class CashkickContract extends Model {
  @ForeignKey(() => Cashkick)
  @Column(DataType.INTEGER)
  cashkick_id!: number;

  @ForeignKey(() => Contract)
  @Column(DataType.INTEGER)
  contract_id!: number;
}

export default CashkickContract;
