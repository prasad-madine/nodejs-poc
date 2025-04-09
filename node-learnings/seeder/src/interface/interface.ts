export interface IUser {
  name: string;
  email: string;
  password: string;
  available_credit: number;
}

export interface IContract {
  name: string;
  type: string;
  interest: number;
  per_payment: number;
  payment_amount: number;
  term_length: number;
}

export interface IPayment {
  status: string;
  due_date: string;
  expected_amount: number;
  outstanding_amount: number;
  user_id: number;
}

export interface ICashkick {
  name: string;
  maturity: string;
  status: string;
  total_received: number;
  total_financed: number;
  user_id: number;
}
