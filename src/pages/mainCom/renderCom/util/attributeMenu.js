const COMADAPTER = {
  XinButton: ['attributeValue','visible','buttonType','size','disabled','danger','ghost'],
  XinInput: ['attributeValue','visible','inputType','addonBefore','addonAfter','placeholder','size','prefix','suffix','allowClear','label','required','requiredMessage'],
  XinLable: ['attributeValue','visible'],
  XinCheckBox: ['attributeValue','visible','disabled','checked','label','required','requiredMessage'],
  XinRadio: ['attributeValue','visible','disabled','checked'],
  XinForm: ['visible','disabled','size','layout','colon','labelAlign'],
  XinRadioGroup: ['visible','disabled','buttonStyle','optionType','size','selectedID'],
  XinIcon: ['visible','iconType','twoToneColor','rotate','setIcon'],
  XinMenu: ['visible','mode','selectedKey'],
  XinDatePicker: ['attributeValue','visible','picker','showTime','dateFormat','disabled','size','allowClear','label','required','requiredMessage'],
  XinNumber: ['attributeValueNumber','visible','placeholder','size','prefix','allowClear','max','min','label','required','requiredMessage','step'],
  XinRate: ['allowHalf','count','disabled'],
  XinCard: ['bordered','size','title','visible'],
  XinTable: ['setColumns','setTableData','bordered','showHeader','size'],
  XinFlex: ['visible','attributeValue'],
  XinLink: ['visible','attributeValue','pageUrl'],
  XinDiv: ['visible','src'],
  XinCarousel: ['visible','autoplay'],
  XinAvatar: ['visible','size','iconType','shape','src','setIcon'],
  XinTabs: ['activeKey','animated','centered','size','tabPosition','tabBarGutter','tabsType'],
  XinListItem: ['title','description'],
  XinList: ['size','bordered','attributeValue'],
  XinUpload: ['attributeValue']
}

const COMADAPTERSTYLE = {
  XinButton: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop']
}

export {
  COMADAPTER,
  COMADAPTERSTYLE
}