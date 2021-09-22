// 创建vue 实例
import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";

import "./assets/css/reset.css";
import "./assets/css/style.css";

// 全局样式
import "./assets/css/theme.less";

import {
  Area,
  List,
  Cell,
  Icon,
  Button,
  CellGroup,
  Empty,
  Field,
  Col,
  Row,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Toast,
  Tab,
  Tabs,
  Divider,
  Tabbar,
  TabbarItem,
  ActionSheet,
  Search,
  IndexBar,
  IndexAnchor,
  Popup,
  Picker,
  Switch,
  TreeSelect,
  Dialog,
  Progress,
  PullRefresh,
  Loading,
  Tag,
  Stepper,
  SwipeCell,
  Step,
  Steps,
  Swipe,
  SwipeItem,
  Uploader,
  DatetimePicker,
  Image as VanImage,
  CountDown,
  NavBar,
  Calendar,
  NoticeBar,
} from "vant";

Vue.use(Area);
Vue.use(List);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Button);
Vue.use(CellGroup);
Vue.use(Empty);
Vue.use(Field);
Vue.use(Col);
Vue.use(Row);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Divider);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(ActionSheet);
Vue.use(Search);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Switch);
Vue.use(TreeSelect);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Progress);
Vue.use(PullRefresh);
Vue.use(Tag);
Vue.use(Stepper);
Vue.use(SwipeCell);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(VanImage);
Vue.use(CountDown);
Vue.use(NavBar);
Vue.use(Calendar);
Vue.use(NoticeBar);

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  return { app, router };
}
