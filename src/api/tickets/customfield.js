import request from '@/utils/request'

// 查询参数列表
export function listTicketsTicketcustomfield(query) {
  return request({
    url: '/api/v1/tickets/ticketcustomfieldList',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getTicketsTicketcustomfield(id) {
  return request({
    url: '/api/v1/tickets/ticketcustomfield/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addTicketsTicketcustomfield(data) {
  return request({
    url: '/api/v1/tickets/ticketcustomfield',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateTicketsTicketcustomfield(data) {
  return request({
    url: '/api/v1/tickets/ticketcustomfield',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delTicketsTicketcustomfield(id) {
  return request({
    url: '/api/v1/tickets/ticketcustomfield/' + id,
    method: 'delete'
  })
}
