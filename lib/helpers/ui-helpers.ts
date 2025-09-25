import { badgeColors } from "../constants";

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * badgeColors.length);
  return badgeColors[index];
};
