/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношеним на родителя
 * @param key {String} Свойство с первичным ключём
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id', parentId = false) {
  let trees = {};
  let roots = {};
  for (const item of list) {

    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }
    if (item.parent?._id && parentId === false) {
      if (!trees[item.parent._id]) trees[item.parent._id] = { children: [] };
      trees[item.parent._id].children.push(trees[item[key]]);
      if (roots[item[key]]) delete roots[item[key]];
    }
    if (parentId) {
      if (item.parent?._id !== parentId) {
        if (!trees[item.parent._id]) trees[item.parent._id] = { children: [] };
        trees[item.parent._id].children.push(trees[item[key]]);
        if (roots[item[key]]) delete roots[item[key]];
      }
    }
  }
  return Object.values(roots);
}
