export const playerDoesntHaveCard = (playerId: number, id: number): string =>
  `Player with id ${playerId} does not have a card with id ${id}`;
