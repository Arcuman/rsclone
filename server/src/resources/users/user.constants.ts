const statusCodes = {
  '200': {
    all: 'Successful operation',
    create: 'The user has been created',
    update: 'The user has been updated',
    refresh: 'Token was refresh',
  },
  '204': 'The user has been deleted',
  '404': 'User not found',
};
export default statusCodes;