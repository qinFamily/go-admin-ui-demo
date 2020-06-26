import request from '@/utils/request'

// 查询参数列表
export function listTicketsTicket(query) {
  return request({
    url: '/api/v1/tickets/ticketList',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getTicketsTicket(id) {
  return request({
    url: '/api/v1/tickets/ticket/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addTicketsTicket(data) {
  return request({
    url: '/api/v1/tickets/ticket',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateTicketsTicket(data) {
  return request({
    url: '/api/v1/tickets/ticket',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delTicketsTicket(id) {
  return request({
    url: '/api/v1/tickets/ticket/' + id,
    method: 'delete'
  })
}
