module.exports = function(config){
  config.externals = {
    'react':'React',
    'react-dom':'ReactDOM',
    'antd': 'antd'
  }
  return config
}