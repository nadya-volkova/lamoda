import Chance from "chance";
import { v4 as uuidv4 } from "uuid";
import IMAGE_URLS from "./ImageUrls.jsx";
import { categories, colors } from "../components/constants.jsx";

const chance = new Chance();

const generateProducts = (count) => {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: chance.word(),
    description: chance.sentence(),
    color: chance.pickone(colors),
    category: chance.pickone(categories),
    price: chance.integer({ min: 10, max: 9999 }),
    rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
    imageUrl: chance.pickone(IMAGE_URLS),
  }));
};

export default generateProducts;
