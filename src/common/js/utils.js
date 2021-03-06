export function encodeQueryParam (data) {
  let queryParam = {}
  let index = 0
  let temp = ''
  for (let f in data) {
    if (data[f] === '') continue
    if (f.indexOf('$LIKE') !== -1 && data[f].indexOf('%') === -1) temp = '%' + data[f] + '%'
    if (f.indexOf('$START') !== -1) temp = '%' + data[f]
    if (f.indexOf('$END') !== -1) temp = data[f] + '%'
    queryParam['terms[' + (index) + '].column'] = f
    queryParam['terms[' + (index) + '].value'] = temp
    temp = ''
    index++
  }
  return queryParam
}

export function queryParam (data) {
  let queryParam = {}
  let terms = {
    0: {column: 'name', type: 'and', termType: 'like', value: ''},
    1: {column: 'permissionId', type: 'or', termType: 'like', value: ''},
    2: {column: 'url', type: 'or', termType: 'like', value: ''}
  }
  for (let index in terms) {
    terms[index].value = '%' + data + '%'
    queryParam['terms[' + (index) + '].column'] = terms[index].column
    queryParam['terms[' + (index) + '].type'] = terms[index].type
    queryParam['terms[' + (index) + '].termType'] = terms[index].termType
    queryParam['terms[' + (index) + '].value'] = terms[index].value
  }
  return queryParam
}

export function quParam (data) {
  let queryParam = {}
  let terms = {
    0: {column: 'orgId', type: 'and', value: ''}
  }
  terms[0].value = data
  queryParam['terms[' + 0 + '].column'] = terms[0].column
  queryParam['terms[' + 0 + '].type'] = terms[0].type
  queryParam['terms[' + 0 + '].value'] = terms[0].value
  return queryParam
}

export function arrayToTreeArray (data, root) {
  let r = []
  let o = []
  data.forEach(a => {
    a.children = o[a.id] && o[a.id].children
    o[a.id] = a
    if (a.parentId === root || typeof (a.parentId) === 'undefined') {
      r.push(a)
//            a.children = []
    } else {
      o[a.parentId] = o[a.parentId] || []
      o[a.parentId].children = o[a.parentId].children || []
      o[a.parentId].children.push(a)
    }
  })
  return r
}
