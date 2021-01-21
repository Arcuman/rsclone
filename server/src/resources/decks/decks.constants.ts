const statusCodes = {
  '200': {
    all: 'Successful operation',
    create: 'The deck has been created',
    update: 'The deck has been updated',
  },
  '204': 'The deck has been deleted',
  '400': {
    initialDelete: 'Error! Forbidden to delete initial deck!',
    initialUpdate: 'Error! Forbidden to update initial deck!',
  },
  '404': 'Deck not found',
};
export default statusCodes;
