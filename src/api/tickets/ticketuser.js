import request from '@/utils/request'

// 查询参数列表
export function listTicketsTicketuser(query) {
  return request({
    url: '/api/v1/tickets/ticketuserList',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getTicketsTicketuser(id) {
  return request({
    url: '/api/v1/tickets/ticketuser/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addTicketsTicketuser(data) {
  return request({
    url: '/api/v1/tickets/ticketuser',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateTicketsTicketuser(data) {
  return request({
    url: '/api/v1/tickets/ticketuser',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delTicketsTicketuser(id) {
  return request({
    url: '/api/v1/tickets/ticketuser/' + id,
    method: 'delete'
  })
}
