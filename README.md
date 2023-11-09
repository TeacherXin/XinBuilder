<h1 align='center'>WelCome XinBuilder</h1>
<p align='center'>轻量级的低代码平台</p>
<h3>线上地址：http://www.xbuilder.top/#/</h3>

客户端项目
```
git clone https://github.com/TeacherXin/XinBuilder.git
```
```
npm install
```
```
npm run start
```
服务端项目
```
git clone https://github.com/TeacherXin/XinBuilderServer.git
```
```
npm install
```
```
npm run start
```
**服务端项目使用的是 Nest.js + MongoDB，确保电脑上安装MongoDB**
安装地址：https://www.mongodb.com/zh-cn
<br>
<hr>

<h3>内置组件</h3>

在XinBuilder中，内置了大部分AntD的组件，同时也提供了许多额外的内置组件，例如Flex布局，div

AntD组件的Api属性，在XinBuilder中是通过可视化的方式进行配置。
例如通过下拉框来选择input的类型，是文本类型还是密码框等等

在XinBuilder中，也支持组件的嵌套。可以在容器组件中，拖入数据录入类型组件。例如在Form表单组件中，可以拖入input，upload等
<br>
<hr>
<h3>数据库</h3>

作为一款低代码的平台，数据存储采用便于开发者理解的方式来设计。

在XinBuilder中，你可以可视化的去创建数据库，数据库表，以及数据库表的字段。
在配置的页面中，可以在全局访问
```xinComEvent.sendAjax()```

来模拟Ajax请求，其本质也是发送ajax请求，从服务端获取数据。只不过不需要太多的操作，类似于：

```
xinComEvent.sendAjax('Student','find',{name: 'lisi'}, (res) => {
 console.log(res.data.data)
})
```

通过这种方式，你就可以在表格的onLoad事件中，从数据库里拿到数据，初始化表格。
<br>
<hr>

<h3>自定义组件</h3>

可能平台内置的组件，并不能满足需求。所以需要自己写一个组件，在平台上使用。

组件相关的代码，并不在该项目里面，所以需要单独克隆。

```
git clone https://github.com/TeacherXin/xinbuildercom.git
```
```
npm install
```
```
npm run start
```

目前平台支持用户上传的自定义组件，只支持原生JS编写的，以及使用React编写的组件，React组件支持通过Class和Function两种类型。

不过不需要通过import引入react，reactdom等，只需要去写组件即可。useEfeect等Hook可以从window上提取。

下面实现了一个简单的组件实例：

```
function Test(props){
  const [value, setValue] = useState('')
  const {buttonText,spanText} = props;

  const click = () => {
    alert(value)
  }

  return (
    <div style={{display:'flex', flexWrap:'wrap', width:'140px'}}>
      <p>{spanText}</p>
      <input style={{width:'120px', height:'30px'}} value={value} onChange={(e) => {setValue(e.target.value)}} />
      <button style={{width:'50px', height:'30px'}} onClick={click}>{buttonText || '按钮'}</button>
    </div>
  )
}
```

通过平台配置的属性，可以在组件的props中拿到。
