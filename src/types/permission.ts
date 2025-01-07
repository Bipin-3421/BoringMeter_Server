// Permission Resource and permission action
// { [key in MemberRole]: Permission[] } means:
// Key: Each key in this object must match a value from the MemberRole enum.
// Value: The value for each key must be an array of Permission objects.

import { Role } from 'common/enum/role.enum';

export enum PermissionResource {
  'ALL' = 'All',
  'MOVIE' = 'Movie',
  'USER' = 'User',
  'WISHLIST' = 'Wishlist',
}

export enum PermissionAction {
  'VIEW' = 'View',
  'Edit' = 'Edit',
}

export type Permission = {
  resource: PermissionResource;
  action: PermissionAction[];
};

export const RoleToPermissionArray: { [key in Role]: Permission[] } = {
  [Role.SUPERADMIN]: [
    {
      resource: PermissionResource.ALL,
      action: [PermissionAction.Edit, PermissionAction.VIEW],
    },
  ],
  [Role.ADMIN]: [
    {
      resource: PermissionResource.ALL,
      action: [PermissionAction.Edit, PermissionAction.VIEW],
    },
  ],
  [Role.USER]: [
    {
      resource: PermissionResource.MOVIE,
      action: [PermissionAction.VIEW],
    },
    {
      resource: PermissionResource.WISHLIST,
      action: [PermissionAction.Edit, PermissionAction.VIEW],
    },
    {
      resource: PermissionResource.USER,
      action: [PermissionAction.VIEW],
    },
  ],
};
