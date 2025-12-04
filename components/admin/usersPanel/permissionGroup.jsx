import { Checkbox, CheckboxGroup, Divider } from '@heroui/react';

export default function PermissionGroup({
  tree,
  perms,
  togglePermission,
  toggleChildren,
  level = 0,
}) {
  return (
    <div className="flex flex-col gap-3">
      {tree.map(node => {
        const isParentChecked = perms.includes(node.key);

        return (
          <div key={node.key} style={{ marginLeft: level * 16 }}>
            {/* Родитель */}
            <Checkbox
              isSelected={isParentChecked}
              onValueChange={val => togglePermission(node.key, val)}
            >
              {node.title}
            </Checkbox>

            {/* Дети */}
            {node.children && isParentChecked && (
              <div style={{ marginLeft: 24 }}>
                <Divider className="my-2" />
                <CheckboxGroup
                  value={node.children
                    .map(c => c.key)
                    .filter(k => perms.includes(k))}
                  onValueChange={vals => toggleChildren(node.key, vals)}
                >
                  {node.children.map(child => (
                    <Checkbox key={child.key} value={child.key}>
                      {child.title}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <Divider className="my-2" />
                {/* Рекурсивные children */}
                {node.children.map(child =>
                  child.children ? (
                    <PermissionGroup
                      key={child.key + '_inner'}
                      tree={[child]}
                      perms={perms}
                      togglePermission={togglePermission}
                      toggleChildren={toggleChildren}
                      level={level + 2}
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
