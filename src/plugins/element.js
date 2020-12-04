import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Row,
    Col,
    Message,
    Icon,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Container,
    Header,
    Aside,
    Main,
    Card,
    DatePicker,
    Table,
    TableColumn,
    Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Card)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
//把Message挂载到原型对象上
Vue.prototype.$message = Message;
