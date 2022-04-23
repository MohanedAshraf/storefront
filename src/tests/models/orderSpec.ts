import { Order, OrderModel } from '../../models/order';
import { User, UserModel } from '../../models/user';

const userModel = new UserModel();
const baseUser: User = {
  username: 'Mohanedzz',
  firstname: 'Mohaned',
  lastname: 'Ashraf',
  password: 'pass123',
  role: 'admin',
};
let user: User;
describe('Create user to test order Model', () => {
  it('Creating user', async () => {
    user = await userModel.create(baseUser);
    const { username, firstname, lastname, role } = user;
    expect({ username, firstname, lastname, role }).toEqual({
      username: baseUser.username,
      firstname: baseUser.firstname,
      lastname: baseUser.lastname,
      role: baseUser.role,
    });
  });

  const orderModel = new OrderModel();
  const baseOrder: Order = {
    user_id: 1,
    status: 'complete',
  };
  let order: Order;
  describe('Testing Model: Order', () => {
    it('Must have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });
    it('Testing the create method', async () => {
      order = await orderModel.create(user.id, 'complete');

      expect(Number(order.user_id)).toEqual(baseOrder.user_id);
      expect(order.status).toEqual(baseOrder.status);
    });
    it('Must have a currentUserOrder method', () => {
      expect(orderModel.currentUserOrder).toBeDefined();
    });
    it('Testing the create method with a product', async () => {
      const orders = await orderModel.currentUserOrder('1');

      expect(Number(orders[0].user_id)).toEqual(baseOrder.user_id);
      expect(orders[0].status).toEqual(baseOrder.status);
    });

    it('Must have an index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('Testing the index model to include the order', async () => {
      const orders = await orderModel.index();
      expect(orders[0].user_id).toContain(baseOrder.user_id);
      expect(orders[0].status).toContain(baseOrder.status);
    });

    it('Must have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });

    it('Testing the show model to return the order', async () => {
      const foundOrder = await orderModel.show('1');
      expect(foundOrder[0].user_id).toContain(baseOrder.user_id);
      expect(foundOrder[0].status).toContain(baseOrder.status);
    });
  });
});
