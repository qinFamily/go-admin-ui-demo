import request from '@/utils/request'

// 查询参数列表
export function listTicketsTicketflowlog(query) {
  return request({
    url: '/api/v1/tickets/ticketflowlogList',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getTicketsTicketflowlog(id) {
  return request({
    url: '/api/v1/tickets/ticketflowlog/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addTicketsTicketflowlog(data) {
  return request({
    url: '/api/v1/tickets/ticketflowlog',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateTicketsTicketflowlog(data) {
  return request({
    url: '/api/v1/tickets/ticketflowlog',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delTicketsTicketflowlog(id) {
  return request({
    url: '/api/v1/tickets/ticketflowlog/' + id,
    method: 'delete'
  })
}
