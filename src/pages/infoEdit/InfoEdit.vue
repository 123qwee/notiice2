<template>
    <div>
        <el-row :gutter="10" class="notice-operation-page info-edit">
            <el-col :span="6" class="notice-operation-content">
                <div class="notice-operation-left">
                    <div class="mainbar-title">
                        <span>
                            <i class="md-icon material-icons">&#xE01D;</i>
                        </span>
                        <span>信息编辑</span>
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
                        <span>编辑内容</span>
                    </div>
                    <div class="notice-info">
                        <Info v-if="cNode.id == 1" ref="Info"></Info>
                        <CountyInfo v-else-if="cNode.id == 2" ref="CountyInfo"></CountyInfo>
                        <Introduce v-else-if="cNode.id == 3" ref="Introduce"></Introduce>
                        <age v-else-if="cNode.id == 4" ref="age"></age>
                        <key-crowd v-else-if="cNode.id == 5" ref="keyCrowd"></key-crowd>
                        <PartyNumber v-else-if="cNode.id == 6" ref="PartyNumber"></PartyNumber>
                        <party v-else ref="party"></party>
                        <el-row type="flex" justify="space-around" style="padding-top:40px;">
                            <el-col :span="8" style="text-align:center;">
                                <el-button style="width:160px;" type="primary" @click="handleUpdata">更新</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Info from "./Info.vue";
import CountyInfo from "./CountyInfo.vue";
import Introduce from "./Introduce.vue";
import age from "./Age.vue";
import keyCrowd from "./KeyCrowd.vue";
import party from "./Party.vue";
import PartyNumber from "./PartyNumber.vue";
export default {
  components: {
    Info,
    CountyInfo,
    Introduce,
    age,
    keyCrowd,
    party,
    PartyNumber
  },
  data() {
    return {
      InfoDataTree: [
        {
          name: "社区信息编辑",
          ref: "Info",
          type: 2,
          purl: "/communtiy/basic/data/info/saveOrUpdate",
          gurl: "/communtiy/basic/data/info/findByCode",
          id: 1
        },
        {
          name: "县区信息编辑",
          ref: "CountyInfo",
          type: 1,
          purl: "/community/basic/county/info/save",
          gurl: "/community/basic/county/info/findByCode",
          id: 2
        },
        {
          name: "县/社 区介绍",
          ref: "Introduce",
          type: 0,
          purl: "/community/basic/introduce/save",
          gurl: "/community/basic/introduce/findByCode",
          id: 3
        },
        {
          name: "居民年龄信息编辑",
          ref: "age",
          type: 0,
          purl: "/communtiy/basic/data/age/saveOrUpdate",
          gurl: "/communtiy/basic/data/age/findByCode",
          id: 4
        },
        {
          name: "重点人群编辑",
          ref: "keyCrowd",
          type: 0,
          purl: "/communtiy/basic/data/keycrowd/saveOrUpdate",
          gurl: "/communtiy/basic/data/keycrowd/findByCode",
          id: 5
        },
        {
          name: "党员数量编辑",
          ref: "PartyNumber",
          type: 2,
          purl: "/community/basic/party/number/save",
          gurl: "/community/basic/party/number/findByCode",
          id: 6
        },
        {
          name: "党员信息编辑",
          ref: "party",
          type: 2,
          purl: "/communtiy/basic/data/party/saveOrUpdate",
          gurl: "/communtiy/basic/data/party/findByCode",
          id: 7
        }
      ],
      cNode: {
        id: 1,
        type: 2,
        name: "社区信息编辑",
        ref: "Info",
        purl: "/communtiy/basic/data/info/saveOrUpdate",
        gurl: "/communtiy/basic/data/info/findByCode"
      }
    };
  },
  created() {
    let role = lscache.get("role");
    let data = _.cloneDeep(this.InfoDataTree);
    this.InfoDataTree = [];
    _.map(data, (item, index) => {
      // 县区
      if (role == 1) {
        if (item.type == 1 || item.type == 0) {
          this.InfoDataTree.push(item);
        }
      } else {
        // 社区
        if (item.type == 2 || item.type == 0) {
          this.InfoDataTree.push(item);
        }
      }
    });
    if (role == 1) {
      this.cNode = {
        id: 2,
        name: "县区信息编辑",
        ref: "CountyInfo",
        purl: "/community/basic/county/info/save",
        gurl: "/community/basic/county/info/findByCode"
      };
    }
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let data = {};
      if (
        this.cNode.ref == "CountyInfo" ||
        this.cNode.ref == "Introduce" ||
        this.cNode.ref == "PartyNumber"
      ) {
        data = {
          code: lscache.get("sysCode")
        };
      } else {
        data = {
          communityCode: lscache.get("sysCode")
        };
      }
      this.$ajax.ajaxHttp({
        type: "get",
        data: data,
        url: that.cNode.gurl,
        successFunc: data => {
          if (
            that.cNode.ref == "CountyInfo" ||
            that.cNode.ref == "Introduce" ||
            that.cNode.ref == "PartyNumber"
          ) {
            if (data.code == 200 && data.data) {
              if (that.cNode.ref == "Introduce") {
                let arr = [];
                _.map(data.data.imgList.split(","), item => {
                  arr.push({ id: item });
                });
                that.$refs[this.cNode.ref].fileList = arr;
              }
              that.$refs[this.cNode.ref].form = data.data;

            that.$refs[this.cNode.ref].form.content1 = (data.data.content1 ? data.data.content1 : "") + "\n" + (data.data.content2 ? data.data.content2 : "") + "\n" + (data.data.content3 ? data.data.content3 : "");
            }
          } else {
            if (data.code == 200 && data.data && data.data.length > 0) {
              this.$refs[this.cNode.ref].form = data.data[0];
            }
          }
        }
      });
    },
    handleNoticeNodeClick(data, node, e) {
      this.cNode = data;
      this.getData();
    },
    handleUpdata() {
      let that = this;
      this.$refs[this.cNode.ref].$refs["form"].validate(valid => {
        if (valid) {
          let form = that.$refs[that.cNode.ref].form;
          form.communityCode = lscache.get("sysCode");
          if (that.cNode.ref == "Introduce") {
            form.imgList = _.map(
              that.$refs[that.cNode.ref].fileList,
              "id"
            ).toString();
            let contentList = form.content1.split("\n");
            form.content1 = contentList[0];
            form.content2 = contentList[1];
            form.content3 = contentList[2];

          };
          this.$ajax.ajaxHttp({
            type: "post",
            data: form,
            url: that.cNode.purl,
            successFunc: data => {
              if (data.code == 200) {
                that.getData();
                popupOper.showNotification({
                  title: "更新成功！",
                  type: "success"
                });
              } else {
                popupOper.showNotification({
                  title: "更新失败！",
                  type: "waring"
                });
              }
            },
            errorFunc: data => {
              popupOper.showNotification({
                title: "更新失败！",
                type: "waring"
              });
            }
          });
        }
      });
    }
  }
};
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