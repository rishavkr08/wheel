export const limitString = (value, maxLength) => {
  const len = maxLength || 30;
  return value.length < len ? value : value.slice(0, len) + "...";
};

export const formatDate = date => {
  const formattedDate = new Date(date)
    .toString()
    .split(" ")
    .slice(1, 4)
    .join(" ");
  return formattedDate;
};

export const capitalize = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
