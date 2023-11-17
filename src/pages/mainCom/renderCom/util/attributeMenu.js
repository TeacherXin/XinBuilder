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
  XinButton: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinInput: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinIcon: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinLable: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinDatePicker: ['fontSize','width','height','backgroundColor','marginLeft','marginTop'],
  XinLink: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinNumber: ['fontSize','width','height','backgroundColor','marginLeft','marginTop'],
  XinRadio: ['fontSize','width','height','color','backgroundColor','marginLeft','marginTop','lineHeight'],
  XinCard: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinCarousel: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinFlex: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinList: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinMenu: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinRadioGroup: ['width','height','backgroundColor','marginLeft','marginTop'],
  XinTabs:['width','height','backgroundColor','marginLeft','marginTop'],
  XinForm:['width','height','backgroundColor','marginLeft','marginTop'],
  XinDiv:['width','height','backgroundColor','marginLeft','marginTop'],
  XinTable:['width','height','backgroundColor','marginLeft','marginTop'],
  XinListItem:['width','height','backgroundColor','marginLeft','marginTop'],
  XinAvatar: ['fontSize','width','height','backgroundColor','marginLeft','marginTop'],
}

export {
  COMADAPTER,
  COMADAPTERSTYLE
}