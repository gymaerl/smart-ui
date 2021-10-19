import Mock from 'mockjs'
import YAML from 'yamljs'

const loadYaml = file => {
    return YAML.load(file)
}

Mock.mock('/test/adminUser/login', 'post', loadYaml('data/login.yml'))
Mock.mock('/test/logout', 'delete', loadYaml('data/empty.yml'))
Mock.mock('/test/adminUser/profile', 'get', loadYaml('data/adminProfile.yml'))
Mock.mock('/test/adminUser/name', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/adminUser/password', 'put', loadYaml('data/empty.yml'))

Mock.mock('/test/categories?pageNumber=1&pageSize=1000&categoryLevel=1&parentId=0', 'get', loadYaml('data/examples/categories.yml'))
Mock.mock('/test/categories?pageNumber=1&pageSize=10&categoryLevel=1&parentId=0', 'get', loadYaml('data/examples/categories.yml'))
Mock.mock('/test/categories?pageSize=10&categoryLevel=2&parentId=2', 'get', loadYaml('data/examples/categories.yml'))
Mock.mock('/test/categories?pageSize=10&categoryLevel=1&parentId=0', 'get', loadYaml('data/examples/categories.yml'))

Mock.mock('/test/goods', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/goods/list?pageNumber=1&pageSize=10', 'get', loadYaml('data/examples/goods.yml'))
Mock.mock('/test/goods/1', 'get', loadYaml('data/examples/goods.yml'))
Mock.mock('/test/goods/status/1', 'put', loadYaml('data/empty.yml'))

Mock.mock('/test/carousels?pageNumber=1&pageSize=10', 'get', loadYaml('data/examples/carousels.yml'))
Mock.mock('/test/carousels/1', 'get', loadYaml('data/examples/carousels.yml'))
Mock.mock('/test/carousels', 'delete', loadYaml('data/empty.yml'))

Mock.mock('/test/indexConfigs?pageNumber=1&pageSize=10&configType=3', 'get', loadYaml('data/examples/indexConfigs.yml'))
Mock.mock('/test/indexConfigs/1', 'get', loadYaml('data/examples/indexConfigs.yml'))
Mock.mock('/test/indexConfigs/delete', 'post', loadYaml('data/empty.yml'))
Mock.mock('/test/indexConfigs', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/indexConfigs', 'post', loadYaml('data/empty.yml'))

Mock.mock('/test/indexConfigs?pageNumber=1&pageSize=10&configType=4', 'get', loadYaml('data/examples/indexConfigs.yml'))
Mock.mock('/test/indexConfigs?pageNumber=1&pageSize=10&configType=5', 'get', loadYaml('data/examples/indexConfigs.yml'))

Mock.mock('/test/categories', 'post', loadYaml('data/empty.yml'))
Mock.mock('/test/categories', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/categories', 'delete', loadYaml('data/empty.yml'))

Mock.mock('/test/users?pageNumber=1&pageSize=10', 'get', loadYaml('data/examples/users.yml'))
Mock.mock('/test/users/1', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/users/0', 'put', loadYaml('data/empty.yml'))

Mock.mock('/test/orders?pageNumber=1&pageSize=10&orderNo=&orderStatus=', 'get', loadYaml('data/examples/orders.yml'))
Mock.mock('/test/orders?pageNumber=1&pageSize=10&orderNo=1&orderStatus=', 'get', loadYaml('data/examples/orders.yml'))
Mock.mock('/test/orders?pageNumber=1&pageSize=10&orderNo=1&orderStatus=1', 'get', loadYaml('data/examples/orders.yml'))
Mock.mock('/test/orders/checkOut', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/orders/close', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/orders/checkDone', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/orders/undefined', 'get', loadYaml('data/examples/orders.yml'))

Mock.mock('http://localhost:3000/test/upload/file', 'post', loadYaml('data/empty.yml'))
Mock.mock('http://localhost:3000/test/upload/files', 'post', loadYaml('data/empty.yml'))

Mock.mock('/test/template_list/list?pageNumber=1&pageSize=10', 'get', loadYaml('data/template/list.yml'))
Mock.mock('/test/template_list?pks=key1:k11%3Bkey2:k12', 'get', loadYaml('data/template/detail.yml'))
Mock.mock('/test/template_list', 'delete', loadYaml('data/empty.yml'))
Mock.mock('/test/template_list', 'put', loadYaml('data/empty.yml'))
Mock.mock('/test/template_list', 'post', loadYaml('data/empty.yml'))

export default Mock
