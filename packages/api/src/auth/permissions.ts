import {
  defaultStatements,
  adminAc,
  ownerAc,
  memberAc,
} from "better-auth/plugins/organization/access"
import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  ...defaultStatements,
} as const

const ac = createAccessControl(statement)

const admin = ac.newRole({
  ...adminAc.statements,
})

const owner = ac.newRole({
  ...ownerAc.statements,
})

const member = ac.newRole({
  ...memberAc.statements,
})

export { ac, admin, owner, member }
