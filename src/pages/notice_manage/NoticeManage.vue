<template>
  <div>
    <el-row :gutter="10" class="notice-manage-page">
      <el-col :span="6" class="notice-manage-content">
        <div class="notice-manage-left">
          <div class="mainbar-title">
            <span><i class="md-icon material-icons">&#xE01D;</i></span>
            <span>菜单内容目录</span>
          </div>
          <div class="notice-manage-list">
            <el-tree class="notice-manage-tree" @node-click="handleNoticeNodeClick" :data="noticeDataTree" default-expand-all highlight-current ref="noticeTree" :expand-on-click-node="false" :props="{children: 'children', label: 'name'}">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="notice-manage-content">
        <div class="notice-manage-right">
          <div class="mainbar-title">
            <span>
              <i class="md-icon material-icons">&#xE52D;</i>
            </span>
            <span>菜单内容列表</span>
            <span style="float:right" v-if="isAddNotice">
              <i class="md-icon material-icons" title="新增" @click="handleNoticeAdd">&#xE145;</i>
            </span>
          </div>
          <div class="notice-manage-table">
            <el-table class="notice-list-table" :data="noticeConentListTable" height="calc(100% - 40px)">
              <el-table-column type="index" align="center"></el-table-column>
              <el-table-column prop="title" label="内容标题" width="300" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="creatTime" label="创建时间" width="180" align="center"></el-table-column>
              <el-table-column prop="creatUserName" label="创建人" align="center"></el-table-column>
              <!-- <el-table-column prop="status" label="状态" align="center" width="120">
                <template slot-scope="scope">
                  <div class="status-tag">
                      <el-tag v-if="scope.row.status === 0" type="danger" close-transition></el-tag>
                      <el-tag v-else-if="scope.row.status === 1" type="primary" close-transition></el-tag>
                      <el-tag v-else-if="scope.row.status === 2" type="success" close-transition></el-tag>
                      <span v-if="scope.row.status === 0">锁定</span>
                      <span v-else-if="scope.row.status === 1">未发布</span>
                      <span v-else-if="scope.row.status === 2">已发布</span>
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column prop="author" label="作者" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.author}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.remark}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.status === 0">
                    <el-button type="primary" size="mini" @click="handleNoticeEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleNoticeDelete(scope.$index, scope.row)">删除</el-button>
                  </div>
                  <div v-else-if="scope.row.status === 1">
                    <!-- <el-button class="but-observe" size="mini" @click="handleNoticePublish(scope.$index, scope.row)">发布</el-button> -->
                    <el-button type="primary" size="mini" @click="handleNoticeEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleNoticeDelete(scope.$index, scope.row)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pages">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 20, 25, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allTotal">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <vNoticeEditDialog ref="vNoticeEditDialog"></vNoticeEditDialog>
    <vNoticePublishDialog ref="vNoticePublishDialog"></vNoticePublishDialog>
  </div>
</template>

<script>
import service from "./notice_manage_service";

/** 编辑公告弹框 */
import vNoticeEditDialog from "./NoticeEditDialog.vue";
/** 公告发布对象弹出框 */
import vNoticePublishDialog from "./NoticePublishDialog.vue";

export default {
  components: {
    vNoticeEditDialog,
    vNoticePublishDialog
  },

  data() {
    return {
      /** 所有通知公告数据树 */
      noticeDataTree: [],
      /** 通知目录详情 */
      noticeInfo: {},
      /** 子公告列表 */
      noticeConentListTable: [],
      /** 每页数据个数 */
      pageSize: 15,
      /** 表格数据总数 */
      allTotal: 0,
      /** 当前是第几页页面 */
      page: 1,
      // 是否显示添加按钮
      isAddNotice:false,
    };
  },
  created() {
    /** 获取公告目录列表 */
    service.noticeListTreeQuery(data => {
      this.noticeDataTree = this.noticeTreeData(
        data.data,
        "id",
        "parentCatalogId",
        "children"
      );
      this.handleNoticeNodeClick(this.noticeDataTree[0]);
    });
    /** 保存成功自动刷新表格 */
    this.$bus.$on("refreshNoticeTable", value => {
      /** 刷新表格数据 */
      let param = {
        catalogId: this.noticeInfo.id,
        page: this.page,
        pageSize: this.pageSize
      };
      this.noticeConentListQuery(param);
    });
  },
  mounted() {
    /** 公告目录树滚动轴样式 */
    $(".notice-manage-tree").lzscroll("xy", 60, "hover", "mytheme");
    /** 子公告目录表格滚动轴样式 */
    $(".notice-list-table .el-table__body-wrapper").lzscroll(
      "xy",
      60,
      "hover",
      "mytheme"
    );
  },
  methods: {
    /** 通知公告数据组装成tree所需格式 */
    noticeTreeData(data, idStr, pidStr, chindrenStr) {
      let dataTree = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = chindrenStr,
        len = data.length;
      for (let i = 0; i < len; i++) {
        hash[data[i][id]] = data[i];
      }
      for (let j = 0; j < len; j++) {
        let aVal = data[j],
          hashVP = hash[aVal[pid]];
        if (hashVP) {
          !hashVP[children] && (hashVP[children] = []);
          hashVP[children].push(aVal);
        } else {
          dataTree.push(aVal);
        }
      }
      return dataTree;
    },

    /** 公告树点击事件 */
    handleNoticeNodeClick(value) {
      this.noticeInfo = _.cloneDeep(value);
      // debugger;
      if (this.noticeInfo.children) {
        this.isAddNotice = false;
      } else {
        this.isAddNotice = true;
      }
      setTimeout(function() {
        $(".el-tree-node__label").each(function(key, html) {
          if (html.textContent == value.name) {
            html.parentElement.parentElement.classList.add("is-current");
          } else {
            html.parentElement.parentElement.classList.remove("is-current");
          }
        });
      }, 200);
      let param = {
        catalogId: value.id,
        orderBy:"orderBy",
        order:"asc",
        page: this.page,
        pageSize: this.pageSize
      };
      this.noticeConentListQuery(param);
    },

    /** 增加通知公告 */

    handleNoticeAdd() {
      let dialogComponent = this.$refs["vNoticeEditDialog"];
      dialogComponent.dialogVisible = true;
      // debugger
      if (this.noticeInfo.parentCatalogId) {
        if (
          _.find(this.noticeDataTree, {
            id: this.noticeInfo.parentCatalogId
          }) &&
          _.find(this.noticeDataTree, { id: this.noticeInfo.parentCatalogId })
            .name &&
          _.find(this.noticeDataTree, { id: this.noticeInfo.parentCatalogId })
            .name == "办事指南"
        ) {
          dialogComponent.isUpCover = false;
        } else {
          dialogComponent.isUpCover = true;
        }
      }
      dialogComponent.noticeCatalogInfo = this.noticeInfo;
      dialogComponent.dialogTitle = "新增菜单内容";
    },

    /** 发布公告 */
    handleNoticePublish(index, row) {
      let dialogComponent = this.$refs["vNoticePublishDialog"];
      dialogComponent.dialogVisible = true;
      dialogComponent.dialogTitle = "公告发布对象";
      dialogComponent.rowNoticeInfo = _.cloneDeep(row);
    },

    /** 编辑公告 */
    handleNoticeEdit(index, row) {
      let dialogComponent = this.$refs["vNoticeEditDialog"];
      dialogComponent.dialogVisible = true;
      dialogComponent.noticeCatalogInfo = this.noticeInfo;
      dialogComponent.noticeId = _.cloneDeep(row.id);
      dialogComponent.dialogTitle = "编辑菜单内容";
    },

    /** 删除公告 */
    handleNoticeDelete(index, row) {
      this.$confirm("将永久删除此内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        confirmButtonClass: "btn-ok",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-back-out",
        type: "warning"
      })
        .then(() => {
          service.deleteNoticeQuery(row.id, data => {
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "内容删除成功!"
              });
              /** 刷新表格数据 */
              let param = {
                catalogId: this.noticeInfo.id,
                page: this.page,
                pageSize: this.pageSize
              };
              this.noticeConentListQuery(param);
            } else {
              this.$message({
                type: "success",
                message: "内容删除失败!"
              });
            }
          });
        })
        .catch(() => {
          console.log("已取消删除内容!");
        });
    },

    /** 分页修改每页数量后执行的函数 */
    handleSizeChange(val) {
      this.noticeConentListTable = [];
      this.pageSize = val;
      let param = {
        catalogId: this.noticeInfo.id,
        page: this.page,
        pageSize: this.pageSize
      };
      this.noticeConentListQuery(param);
    },

    /** 页码改变后执行的函数 */
    handleCurrentChange(val) {
      this.noticeConentListTable = [];
      this.page = val;
      let param = {
        catalogId: this.noticeInfo.id,
        page: this.page,
        pageSize: this.pageSize
      };
      this.noticeConentListQuery(param);
    },

    /** 获取公告列表 */
    noticeConentListQuery(param) {
      service.noticeListConentQuery(param, data => {
        this.allTotal = data.data.totalCount;
        this.noticeConentListTable = data.data.list;
      });
    }
  }
};
</script>

<style>
.notice-manage-page,
.notice-manage-content {
  height: 100%;
}

.notice-manage-left,
.notice-manage-right {
  height: 100%;
  background-color: white;
}

.notice-manage-list,
.notice-manage-table {
  height: calc(100% - 55px);
  padding: 5px;
}

.notice-manage-tree {
  height: 100%;
  overflow: auto;
}

.notice-manage-table .el-table {
  height: calc(100% - 40px);
}

.notice-manage-table .el-tag {
  height: 12px;
  border-radius: 30px;
  margin: 0px 5px;
}
.notice-manage-table .el-tag--success {
  background-color: #3bcba8;
  padding: 5px;
}
.notice-manage-table .el-tag--danger {
  background-color: #f15d48;
  padding: 5px;
}
.notice-manage-table .el-tag--primary {
  background-color: #20a0ff;
  padding: 5px;
}
</style>
