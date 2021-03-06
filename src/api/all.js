import Request from '@/api/common'

// auth
import * as auths from '@/api/auths'
export const auth = auths

// systems
export const user = new Request('/api/v1/sys/user/')
export const group = new Request('/api/v1/dept/')
export const role = new Request('/api/v1/role/')
export const menu = new Request('/api/v1/menu/')
export const perm = new Request('/api/v1/sys/perm/')

// tools
export const audit = new Request('/tool/audit/')
export const simple = new Request('/tool/simple/')

// workflows
export const workflowtype = new Request('/api/v1/workflow/workflowtype/')
export const workflow = new Request('/api/v1/workflow/workflow/')
export const state = new Request('/api/v1/workflow/state/')
export const transition = new Request('/api/v1/workflow/transition/')
export const customfield = new Request('/api/v1/workflow/customfield/')

// tickets 工单
export const ticket = new Request('/api/v1/ticket/ticket/')
export const ticketflowlog = new Request('/api/v1/ticket/ticketflowlog/')
export const ticketcustomfield = new Request('/api/v1/ticket/ticketcustomfield/')
export const ticketuser = new Request('/api/v1/ticket/ticketuser/')

// notices
export const mail = new Request('/notice/mail/')
export const telegram = new Request('/notice/telegram/')
