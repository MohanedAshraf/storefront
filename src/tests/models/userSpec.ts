import { User, UserModel } from '../../models/user';

const userModel = new UserModel();
const baseUser: User = {
  username: 'Moha',
  firstname: 'Mohaned',
  lastname: 'Ashraf',
  password: 'pass123',
  role: 'admin',
};
let user: User;
describe('Testing Model: User', () => {
  it('Must have a create method', () => {
    expect(userModel.create).toBeDefined();
  });
  it('Testing the create function with a user', async () => {
    user = await userModel.create(baseUser);
    const { username, firstname, lastname, role } = user;
    expect({ username, firstname, lastname, role }).toEqual({
      username: baseUser.username,
      firstname: baseUser.firstname,
      lastname: baseUser.lastname,
      role: baseUser.role,
    });
  });
  it('Must have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('Testing the index model to include the user', async () => {
    const users = await userModel.index();
    expect(users[0].username).toContain(user.username);
    expect(users[0].firstname).toContain(user.firstname);
    expect(users[0].lastname).toContain(user.lastname);
    expect(users[0].role).toContain(user.role);
  });

  it('Must have a show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('Testing the show model to return the user', async () => {
    const foundUser = await userModel.show(user.id as number);
    expect(foundUser).toEqual(user);
  });

  it('Must have an update method', () => {
    expect(userModel.authenticate).toBeDefined();
  });

  it('Testing the authrnticate model to return logged in user ', async () => {
    const authUser = await userModel.authenticate(
      baseUser.username,
      baseUser.password
    );
    expect(authUser).toEqual(user);
  });
});
