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
    Pagination,
    Dialog,
    Image,
    Select,
    Option,
    Tooltip,
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
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tooltip)

//把Message挂载到原型对象上
Vue.prototype.$message = Message;
