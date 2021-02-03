const statusCodes = {
  '200': {
    all: 'Successful operation',
    create: 'The user has been created',
    update: 'The user has been updated',
    refresh: 'Token was refresh',
  },
  '204': 'The user has been deleted',
  '400': {
    initialDeck: "Cann't create initial user Deck",
    initialProfile: "Cann't create initial user profile",
    initialCards: 'Error during set initial cards to user',
    addCard: 'Error during add new Card',
    profile: 'Error during get profile data',
  },
  '404': {
    all: 'User not found',
    initialCards: ' Initial Cards not found',
  },
};
export default statusCodes;
