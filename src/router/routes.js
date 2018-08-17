import _ from 'lodash'

/** 导入通用组件 */
import Login from '@/components/commom/Login.vue'
import Main from '@/components/commom/Main.vue'
import NoticeOperation from '@/pages/notice_operation/NoticeOperation.vue'
import NoticeManage from '@/pages/notice_manage/NoticeManage.vue'
import InfoEdit from '@/pages/infoEdit/InfoEdit.vue'; // 数据编辑
import CopyUrl from '@/pages/Copy/CopyUrl.vue'; // 复制页面路径

import report from '@/pages/Report/report.vue'; // 问题上报

import videolist from '@/pages/VideoList/list.vue'; // 视频查看

import legalmenu from '@/pages/LegalList/legalmenu.vue'; // 法律法规-
import legalList from '@/pages/LegalList/legalList.vue';
import legalView from '@/pages/LegalList/legalView.vue';

import partyList from '@/pages/Party/partylist.vue'; // 党建-

import shopsList from '@/pages/Shops/shopsList.vue'; // 商铺-
import guideList from '@/pages/Guide/guideList.vue'; // 办事指南-
import NewCommList from '@/pages/Community/NewCommList.vue'; // 社区新闻-
import newInfoList from '@/pages/Info/newInfoList.vue'; // 信息服务-
import weatherView from '@/pages/Weather/weatherView.vue'; // 天气
import CommService from '@/pages/CommService/CommServiceList.vue'; // 社区服务


const commomRoutes = [{
  path: '/NoticeOperation',
  component: NoticeOperation
}, {
  path: '/NoticeManage',
  component: NoticeManage
}, {
  path: "/InfoEdit",
  component: InfoEdit
}, {
  path: "/CopyUrl",
  component: CopyUrl
}];

const chat = [{
  path: '/report',
  name: 'report',
  component: report
}, {
  path: '/videolist',
  name: 'videolist',
  component: videolist
}, {
  path: '/legalmenu',
  name: 'legalmenu',
  component: legalmenu
}, {
  path: '/legalList',
  name: 'legalList',
  component: legalList
}, {
  path: '/legalView',
  name: 'legalView',
  component: legalView
}, {
  path: '/partyList',
  name: 'partyList',
  component: partyList
}, {
  path: '/shopsList',
  name: 'shopsList',
  component: shopsList
}, {
  path: '/newInfoList',
  name: 'newInfoList',
  component: newInfoList
}, {
  path: '/guideList',
  name: 'guideList',
  component: guideList
}, {
  path: '/NewCommList',
  name: 'NewCommList',
  component: NewCommList
}, {
  path: '/weatherView',
  name: 'weatherView',
  component: weatherView
}, {
  path: '/CommService',
  name: 'CommService',
  component: CommService
}];


let routes = _.union(commomRoutes, []);

// routes = _.union(routes, chat);

export default [{
  path: '/',
  redirect: '/Main'
}, {
  path: '/Main',
  component: Main,
  children: routes
}, {
  path: '/Login',
  component: Login
}]
