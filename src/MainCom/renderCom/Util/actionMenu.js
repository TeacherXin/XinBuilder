/**
 * 
 * @param {string} type 组件类型
 * @returns 组件可配置的选项
 */
const getItems = (type) => {
  const items = [
    {
      label: '设置属性',
      key: 'setAttribute'
    },
    {
      label: '设置样式',
      key: 'setStyle'
    }
  ]
  switch (type) {
    case 'XinButton': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          }
        ]
      })
      break;
    }
    case 'XinCheckBox': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinDatePicker': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinInput': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinMenu': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinNumber': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinRadio': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          },
          {
            label: 'onChange事件',
            key: 'setChange'
          }

        ]
      })
      break;
    }
    case 'XinRadioGroup': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinLable': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          }
        ]
      })
      break;
    }
    case 'XinIcon': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          }
        ]
      })
      break;
    }
    case 'XinDiv': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          }
        ]
      })
      break;
    }
    case 'XinAvatar': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onClick事件',
            key: 'setClick'
          }
        ]
      })
      break;
    }
    case 'XinTable': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onLoad事件',
            key: 'setLoad'
          }
        ]
      })
      break;
    }
    case 'XinCarousel': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinTabs': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onChange事件',
            key: 'setChange'
          }
        ]
      })
      break;
    }
    case 'XinList': {
      items.push({
        label: '设置动作',
        key: 'setAction',
        children: [
          {
            label: 'onLoad事件',
            key: 'setLoad'
          }
        ]
      })
      break;
    }
  }
  return items
}

export {
  getItems
}