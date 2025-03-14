import { ac, admin, member, owner } from "./permissions"

export const accessControllerConfig = {
  ac: ac,
  roles: {
    owner,
    admin,
    member,
  },
}

export const orgConfig = {
  organizationDeletion: {
    disabled: true,
  },
  teams: {
    enabled: true,
    defaultTeam: {
      enabled: true,
    },
  },
  ...accessControllerConfig,
}
