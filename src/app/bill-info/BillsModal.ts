import { BillProduct } from '../generate-bill/BillProduct';

export type BillsModal = {
  id: Number;
  customerId: Number;
  dateCreated: Date;
  customerName: String;
  products: BillProduct[];
  total: Number;
};
