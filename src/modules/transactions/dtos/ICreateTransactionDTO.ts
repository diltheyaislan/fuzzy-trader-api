export default interface ICreateTransactionDTO {
  quantity: number;
  amount: number;
  price: number;
  type: string;
  user_id: string;
  company_id?: string;
  cryptocurrency_id?: string;
}
