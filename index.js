const categories = require("./categories.js");

// const getCategoryTree = (array, id) => {
//   const result = [];

//   for (item of array) {
//     if (item.categoryId === id) {
//       delete item.children;
//       result.push(item);
//       return result;
//     }

//     for (items of item.children) {
//       if (items.categoryId === id) {
//         delete item.children;
//         result.push(item);
//         delete items.children;
//         result.push(items);
//         return result;
//       }

//       for (last of items.children) {
//         if (last.categoryId === id) {
//           delete item.children;
//           result.push(item);
//           delete items.children;
//           result.push(items);
//           delete last.children;
//           result.push(last);
//           return result;
//         }
//       }
//     }
//   }
// };

const getCategoryTree2 = (array, id) => {
  const result = [];

  const addItem = (item) =>
    result.push({ categoryId: item.categoryId, title: item.title });

  const findCategory = (items) => {
    for (const item of items) {
      if (item.categoryId === id) {
        return addItem(item);
      }

      if (item.children) {
        if (findCategory(item.children)) {
          return addItem(item);
        }
      }
    }

    return;
  };

  findCategory(array);

  return result.reverse();
};

const getCategoryTree = (array, id) => {
  let categoryTree = [];

  function findRecursively(children, parentTree = []) {
    for (const category of children) {
      const tree = [...parentTree];
      const hasChildren = category.children && category.children.length > 0;
      const founded = category.categoryId === id;

      tree.push(category);

      if (founded) {
        categoryTree = tree;
        break;
      }

      if (hasChildren) {
        findRecursively(category.children, tree);
      }
    }
  }

  findRecursively(array);

  return categoryTree;
};

const start = performance.now();
const results = getCategoryTree2(categories, 17039085);
const end = performance.now() - start;
console.log("Время выполнения = ", end);
console.log(results);

// [
//     {
//       categoryId: 17027492,
//       title: "Канцелярские товары",
//     },
//     {
//       categoryId: 17154182,
//       title: "Конверты и коробки почтовые",
//     },
//     {
//       categoryId: 80715067,
//       title: "Коробка для почтовых отправлений",
//     }
// ];
