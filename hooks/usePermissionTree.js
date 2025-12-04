import { useState } from "react";

// Универсальный рекурсивный поиск
const findNode = (tree, key) => {
  for (const node of tree) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

// Получение всех вложенных children рекурсивно
const getAllChildrenKeys = node => {
  if (!node.children) return [];
  return node.children.flatMap(child => [
    child.key,
    ...getAllChildrenKeys(child),
  ]);
};

export default function usePermissionTree(tree, initial = []) {
  const [perms, setPerms] = useState(initial);

  const togglePermission = (key, isSelected) => {
    const node = findNode(tree, key);
    if (!node) return;

    const children = getAllChildrenKeys(node);

    if (isSelected) {
      // Добавляем родителя
      setPerms(prev => [...new Set([...prev, key])]);
    } else {
      // Убираем родителя и всех его children
      setPerms(prev => prev.filter(p => p !== key && !children.includes(p)));
    }
  };

  const toggleChildren = (parentKey, values) => {
    const parent = findNode(tree, parentKey);
    const children = getAllChildrenKeys(parent);

    const withoutChildren = perms.filter(p => !children.includes(p));

    const updated = [...withoutChildren, ...values];

    setPerms(prev => {
      if (!prev.includes(parentKey)) updated.push(parentKey);
      return [...new Set(updated)];
    });
  };

  return {
    perms,
    setPerms,
    togglePermission,
    toggleChildren,
    findNode,
  };
}
