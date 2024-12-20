const colors = ["Красный", "Синий", "Зеленый", "Желтый", "Черный"];

const categories = [
  "Одежда",
  "Обувь",
  "Аксессуары",
  "Сумки",
  "Головные уборы",
  "Спорт",
  "Красота",
  "Детские товары",
  "Дом",
  "Духи",
];

const colorMap = {
  Красный: "red",
  Синий: "blue",
  Зеленый: "green",
  Желтый: "yellow",
  Черный: "black",
};

const colorCircleStyle = (color) => ({
  display: "inline-block",
  width: "1vw",
  height: "1vw",
  borderRadius: "40%",
  backgroundColor: colorMap[color],
  marginRight: "0.4vw",
});

export { colors, categories, colorCircleStyle };
