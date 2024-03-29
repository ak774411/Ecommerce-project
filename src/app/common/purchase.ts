import { Order } from './order';
import { Customer } from './customer';
import { Address } from './address';
import { OrderItem } from './order-item';

export class Purchase {
    customer?: Customer;
    shippingAddress?: Address;
    billingAddress?: Address;
    order?: Order;
    orderItems?: OrderItem[];
}
