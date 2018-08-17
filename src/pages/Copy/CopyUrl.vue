<template>
  <div>
    <el-row :gutter="10" class="notice-operation-page info-edit">
      <el-col :span="6" class="notice-operation-content">
        <div class="notice-operation-left">
          <div class="mainbar-title">
            <span>
              <i class="md-icon material-icons">&#xE01D;</i>
            </span>
            <span>按钮名称</span>
            <span style="float:right">
            </span>
          </div>
          <div class="notice-operation-list">
            <el-tree class="notice-operation-tree" @node-click="handleNoticeNodeClick" :data="InfoDataTree" default-expand-all highlight-current
              ref="noticeTree" :expand-on-click-node="false" :props="{children: 'children', label: 'name'}">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="notice-operation-content">
        <div class="notice-operation-right">
          <div class="mainbar-title">
            <span>
              <i class="md-icon material-icons">&#xE52D;</i>
            </span>
            <span>页面路径</span>
          </div>
          <div class="notice-info">
            <el-row>
              <el-col :span="16">
                <el-input v-model="Copyurl.url" placeholder=""></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" class="tag-read" :data-clipboard-text="Copyurl.url" @click="copy">复制</el-button>
              </el-col>
            </el-row>
            <el-row style="padding-top: 20px;">
              <el-col :span="16" style="text-align: center;">
                <img v-if="Copyurl.id == 'report'" :src="img.report" alt="">
                <img v-else-if="Copyurl.id == 'videolist'" :src="img.video" alt="">
                <img v-else-if="Copyurl.id == 'legalmenu'" :src="img.legal" alt="">
                <img v-else-if="Copyurl.id == 'partyList'" :src="img.party" alt="">
                <img v-else-if="Copyurl.id == 'shopsList'" :src="img.shops" alt="">
                <img v-else-if="Copyurl.id == 'guideList'" :src="img.guide" alt="">
                <img v-else-if="Copyurl.id == 'NewCommList'" :src="img.NewComm" alt="">
                <img v-else-if="Copyurl.id == 'newInfoList'" :src="img.newInfo" alt="">
                <img v-else-if="Copyurl.id == 'weatherView'" :src="img.weatherView" alt="">
                <!-- <img v-else-if="Copyurl.id == 'CommService'" :src="img.CommService" alt=""> -->
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Clipboard from 'clipboard';
  import report from '../Report/report';
  export default {
    components: {
      report
    },
    data() {
      return {
        Copyurl: {
          url: constants.chatUrl + "report?code=" + lscache.get("sysCode"),
          id: "report",
        },
        img: {
          report: require("@/assets/images/copy/report.png"),
          video: require("@/assets/images/copy/video.png"),
          legal: require("@/assets/images/copy/legal.png"),
          party: require("@/assets/images/copy/party.png"),
          shops: require("@/assets/images/copy/shops.png"),
          guide: require("@/assets/images/copy/guide.png"),
          NewComm: require("@/assets/images/copy/NewComm.png"),
          newInfo: require("@/assets/images/copy/newInfo.png"),
          weatherView: require("@/assets/images/copy/weatherView.png"),
          CommService: require("@/assets/images/copy/CommService.png"),
        },
        InfoDataTree: [{
            name: '问题上报',
            url: "report",
            id: "report",
          }, {
            name: '视频查看',
            url: "videolist",
            id: "videolist",
          }, {
            name: '法制教育',
            url: "legalmenu",
            id: "legalmenu",
          }, {
            name: '党建信息',
            url: "partymenu",
            id: "partymenu",
          }, {
            name: '社区新闻',
            url: "NewCommList",
            id: "NewCommList",
          }, {
            name: '周边商铺',
            url: "shopsList",
            id: "shopsList",
          }, {
            name: '办事指南',
            url: "guideList",
            id: "guideList",
          }, {
            name: '信息服务',
            url: "newInfoList",
            id: "newInfoList",
          }, {
            name: '环境监测',
            url: "weatherView",
            id: "weatherView",
          }
          // , {
          //     name: '物业服务',
          //     url: "CommService",
          //     id: "CommService",
          // }
        ],
      }
    },
    created() {},
    methods: {
      handleNoticeNodeClick(data, node, e) {
        this.Copyurl.url = constants.chatUrl + data.url + "?code=" + lscache.get("sysCode");
        this.Copyurl.id = data.id;
      },
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          popupOper.showNotification({
            title: "复制成功",
            type: "success"
          });
          // 释放内存  
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          popupOper.showNotification({
            title: "该浏览器不支持自动复制",
            type: "waring"
          });
          // 释放内存  
          clipboard.destroy()
        })
      }
    }
  }

</script>

<style>
  .notice-operation-page,
  .notice-operation-content {
    height: 100%;
  }

  .notice-operation-left,
  .notice-operation-right {
    height: 100%;
    background-color: white;
  }

  .notice-operation-list,
  .notice-info {
    height: calc(100% - 55px);
    padding: 5px;
  }

  .notice-form {
    height: 35%;
    padding: 5px 0;
    border: 1px solid #d1dbe5;
  }

  .notice-info-form {
    height: calc(100% - 30px);
    padding: 0 8px;
  }

  .upload-notice {
    display: inline-block;
    position: absolute;
    top: 0;
    margin-left: calc(100% - 72px);
  }

  .notice-info-btn {
    float: right;
    padding-right: 8px;
  }

  .notice-bottom {
    height: calc(65% - 17px);
    padding-top: 5px;
  }

  .notice-operation-tree {
    height: 100%;
    overflow: auto;
  }

  .notice-list-title {
    line-height: 36px;
    font-size: 18px;
    font-weight: 600;
  }

  .notice-table-title button {
    float: right;
    margin-top: 4px;
  }

  .notice-table {
    height: calc(100% - 41px);
    margin-top: 5px;
  }

  .notice-table .el-table {
    height: calc(100% - 40px);
  }

  .notice-table .el-tag {
    height: 12px;
    border-radius: 30px;
    margin: 0px 5px;
  }

  .notice-table .el-tag--success {
    background-color: #3bcba8;
    padding: 5px;
  }

  .notice-table .el-tag--danger {
    background-color: #f15d48;
    padding: 5px;
  }

  .delete-icon-color {
    color: #f54e45;
  }

  .info-edit .el-input-number {
    width: 70%;
  }

</style>
