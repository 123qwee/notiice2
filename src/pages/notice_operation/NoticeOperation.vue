<template>
  <div>
    <el-row :gutter="10" class="notice-operation-page">
      <el-col :span="6" class="notice-operation-content">
        <div class="notice-operation-left">
          <div class="mainbar-title">
            <span>
              <i class="md-icon material-icons">&#xE01D;</i>
            </span>
            <span>菜单目录</span>
            <el-button v-if="!noticeDataTree.length > 0" type="primary" size="mini" @click="handleInit">菜单目录初始化</el-button>
            <span style="float:right">
              <i class="md-icon material-icons" title="新增" @click="handleAddSuperFineNotice">&#xE145;</i>
              <i class="md-icon material-icons" title="删除" @click="handleDeleteNotice">&#xE92B;</i>
            </span>
          </div>
          <div class="notice-operation-list">
            <el-tree class="notice-operation-tree" @node-click="handleNoticeNodeClick" :data="noticeDataTree" default-expand-all highlight-current
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
            <span>菜单详情</span>
          </div>
          <div class="notice-info">
            <div class="notice-form">
              <el-form class="notice-info-form" :model="noticeInfo" :rules="noticeRules" ref="noticeInfo" label-width="100px">
                <el-row type="flex" justify="space-around">
                  <el-col :span="8">
                    <el-form-item label="目录名称" prop="name">
                      <el-input v-model="noticeInfo.name" placeholder="请输入目录名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="目录序号">
                      <el-input v-model="noticeInfo.id" disabled placeholder="请输入功能序号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="平台名称">
                      <el-input v-model="systemName" disabled placeholder="请输入平台名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                  <el-col :span="8">
                    <el-form-item label="状态">
                      <el-radio-group v-model="noticeInfo.status">
                        <el-radio label="0">启用</el-radio>
                        <el-radio label="1">锁定</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="上级目录">
                      <el-input v-model="noticeInfo.parentName" disabled placeholder="请输入上级目录"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="上级序号">
                      <el-input v-model="noticeInfo.parentCatalogId" disabled placeholder="请输入上级序号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="noticeInfo.remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-form>
              <div class="notice-info-btn">
                <el-button class="btn-common btn-cancel" @click="resetForm">重置</el-button>
                <el-button class="btn-common btn-ok" @click="submitForm('noticeInfo')">保存</el-button>
              </div>
            </div>
            <div class="notice-bottom">
              <div class="notice-table-title">
                <span class="notice-list-title">子目录列表</span>
                <el-button type="primary" @click="handleAddChildNotice" size="mini">添加</el-button>
              </div>
              <div class="notice-table">
                <el-table class="notice-child-table" :data="childNoticeTableData" height="calc(100% - 40px)">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="parentName" label="上级公告" width="120" align="center"></el-table-column>
                  <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="status" label="状态" width="100" align="center">
                    <template slot-scope="scope">
                      <div class="status-tag">
                        <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" close-transition></el-tag>
                        <span>{{scope.row.status=== 1 ? '启用' : '锁定'}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" align="left" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.remark}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                      <i class="md-icon delete-icon-color el-icon-delete" @click="handleDeleteNotice(scope.$index, scope.row)" title="删除"></i>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pages">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="allTotal">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <vNoticeDialog></vNoticeDialog>
  </div>
</template>

<script>
  import service from "./notice_operation_service";

  /** 公告弹出框 */
  import vNoticeDialog from "./NoticeDialog.vue";

  export default {
    components: {
      vNoticeDialog
    },
    data() {
      return {
        /** 平台名称 */
        systemName: "通知公告管理平台",
        /** 所有通知公告数据树 */
        noticeDataTree: [],
        /** 通知详情 */
        noticeInfo: {},
        /** 公告详情表单验证 */
        noticeRules: {
          name: [
            {
              required: true,
              message: "请输入机构名称",
              trigger: "blur"
            },
            {
              min: 1,
              max: 10,
              message: "长度在 1 到 10 个字符",
              trigger: "blur"
            }
          ],
          remark: [
            {
              max: 500,
              message: "长度不能超过 500 个字符",
              trigger: "blur"
            }
          ]
        },
        /** 子公告列表 */
        childNoticeTableData: [],
        /** 每页数据个数 */
        pageSize: 5,
        /** 表格数据总数 */
        allTotal: 0,
        /** 当前是第几页页面 */
        page: 1
      };
    },

    mounted() {
      /** 公告目录树滚动轴样式 */
      $(".notice-operation-tree").lzscroll("y", 60, "hover", "mytheme");
      /** 子公告目录表格滚动轴样式 */
      $(".notice-child-table .el-table__body-wrapper").lzscroll("xy", 60, "hover", "mytheme");
      /** 公告详情表单 */
      $(".notice-info-form").lzscroll("y", 60, "hover", "mytheme");
    },

    created() {

      /** 获取菜单目录列表 */
      service.noticeListQuery(data => {
        this.noticeDataTree = this.noticeTreeData(
          data.data,
          "id",
          "parentCatalogId",
          "children"
        );
        if (this.noticeDataTree && this.noticeDataTree[0]) {
          this.handleNoticeNodeClick(this.noticeDataTree[0]);
        }
      });
      /** 新增目录列表自动刷新目录树 */
      this.$bus.$on("addNoticeRefreshTree", param => {
        if (param.parentCatalogId == "0") {
          this.handleRefresh();
        } else {
          this.handleRefresh(this.noticeInfo);
        }
      });
    },
    methods: {
      /** 通知菜单数据组装成tree所需格式 */
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

      /** 刷新数据 */
      handleRefresh(param) {
        /** 初始化左侧树数据 */
        service.noticeListQuery(data => {
          this.noticeDataTree = this.noticeTreeData(
            data.data,
            "id",
            "parentCatalogId",
            "children"
          );
          if (param) {
            this.handleNoticeNodeClick(this.noticeInfo);
          } else {
            this.handleNoticeNodeClick(this.noticeDataTree[0]);
          }
        });
      },

      /** 新增一级菜单目录 */
      handleAddSuperFineNotice() {
        let dialogComponent = _.find(this.$children, function (item) {
          if (item.$data.description == "childNoticeDialog") {
            return true;
          }
        });
        dialogComponent.dialogVisible = true;
        dialogComponent.dialogTitle = "新增一级菜单目录信息";
        /** 当前所选中的上级权限信息id和名称 */
        dialogComponent.childNoticeForm.parentCatalogId = "0";
        dialogComponent.childNoticeForm.parentName = "根目录";
      },

      /** 删除通知菜单目录 */
      handleDeleteNotice(index, row) {
        let priId = "";
        if (row == undefined) {
          priId = this.noticeInfo.id;
        } else {
          priId = row.id;
        }
        this.$confirm("将永久删除此菜单目录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          confirmButtonClass: "btn-ok",
          cancelButtonText: "取消",
          cancelButtonClass: "btn-back-out",
          type: "warning"
        })
          .then(() => {
            service.deleteNoticeQuery(priId, data => {
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                if (row) {
                  this.handleRefresh(this.noticeInfo);
                } else {
                  this.handleRefresh();
                }
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败,请先删除此目录下公告!"
                });
              }
            });
          })
          .catch(() => {
            console.log("已取消删除公告目录!");
          });
      },

      /** 新增下属目录 */
      handleAddChildNotice() {
        let dialogComponent = _.find(this.$children, function (item) {
          if (item.$data.description == "childNoticeDialog") {
            return true;
          }
        });
        dialogComponent.dialogVisible = true;
        dialogComponent.dialogTitle = "新增菜单目录信息";
        /** 当前所选中的上级权限id和名称 */
        dialogComponent.childNoticeForm.parentCatalogId = this.noticeInfo.id;
        dialogComponent.childNoticeForm.parentName = this.noticeInfo.name;
      },

      /** 公告树点击事件 */
      handleNoticeNodeClick(value) {
        this.noticeInfo = _.cloneDeep(value);
        if (this.noticeInfo.parentCatalogId == 0) {
          this.noticeInfo.parentName = "根目录";
        } else {
          service.menuNoticeInfoQuery(this.noticeInfo.parentCatalogId, data => {
            this.noticeInfo.parentName = data.data.name;
          });
        }
        this.noticeInfo.status = String(value.status);
        setTimeout(function () {
          $(".el-tree-node__label").each(function (key, html) {
            if (html.textContent == value.name) {
              html.parentElement.parentElement.classList.add("is-current");
            } else {
              html.parentElement.parentElement.classList.remove("is-current");
            }
          });
        }, 200);
        let param = {
          catalogId: value.id,
          page: this.page,
          pageSize: this.pageSize,
          orderBy:"orderBy",
          order:'asc',
        };
        this.childNoticeQuery(param);
      },

      /** 重置表单 */
      resetForm() {
        /** 获取机构信息 */
        service.menuNoticeInfoQuery(this.noticeInfo.id, data => {
          this.noticeInfo = data.data;
          if (this.noticeInfo.parentCatalogId == 0) {
            this.noticeInfo.parentName = "根部门";
          } else {
            service.menuNoticeInfoQuery(this.noticeInfo.parentCatalogId, data => {
              this.noticeInfo.parentName = data.data.name;
            });
          }
          this.noticeInfo.status = String(this.noticeInfo.status);
        });
      },

      /** 保存提交 */
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let param = _.cloneDeep(this.noticeInfo);
            delete param.children;
            delete param.parentName;
            service.updateNoticeInfoQuery(param, data => {
              this.$message({
                type: "success",
                message: "菜单目录修改成功！"
              });
              this.handleRefresh(this.noticeInfo);
            });
          } else {
            this.$message({
              type: "info",
              message: "菜单目录修改失败！"
            });
            return false;
          }
        });
      },

      /** 分页修改每页数量后执行的函数 */
      handleSizeChange(val) {
        this.childNoticeTableData = [];
        this.pageSize = val;
        let param = {
          catalogId: this.noticeInfo.id,
          page: this.page,
          pageSize: this.pageSize,
          orderBy:"orderBy",
          order:'asc',
        };
        this.childNoticeQuery(param);
      },

      /** 页码改变后执行的函数 */
      handleCurrentChange(val) {
        this.childNoticeTableData = [];
        this.page = val;
        let param = {
          catalogId: this.noticeInfo.id,
          page: this.page,
          pageSize: this.pageSize,
          orderBy:"orderBy",
          order:'asc',
        };
        this.childNoticeQuery(param);
      },

      /** 获取下级菜单列表 */
      childNoticeQuery(param) {
        service.childNoticeQuery(param, data => {
          this.allTotal = data.data.totalCount;
          let that = this;
          _.map(data.data.list, function (item) {
            item.parentName = that.noticeInfo.name;
          });
          this.childNoticeTableData = data.data.list;
        });
      },
      /** 新增菜单 */
      handleInit() {
        popupOper.showLoading('正在初始化目录...');
        let menu = [{
          name: "法制教育",
          children: [
            { name: "地方法规" },
            { name: "法律法规" },
            { name: "行政法规" },
            { name: "部门规章" },
          ]
        }, {
          name: "办事指南",
          children: [
            { name: "医疗保险" },
            { name: "住房保障" },
            { name: "生活服务" },
          ]
        }, {
          name: "周边商铺",
        }, {
          name: "社区新闻",
        }, {
          name: "信息服务",
        }, {
          name: "党建信息",
        }];

        let form = {
          name: "",
          parentCatalogId: 0,
          status: 0,
          cloudSign: lscache.get("sysCode")
        },
          that = this;
        _.map(menu, (item, index) => {
          let params = _.cloneDeep(form);
          params.name = item.name;
          that.handleAddCatalog(params, _.cloneDeep(form), item.children);
        });

      },
      handleAddCatalog(params, form, children) {
        let that = this;
        this.$ajax.ajaxHttp({
          type: "post",
          data: params,
          url: "/communtiy/buss/notice/catalog/save",
          successFunc: data => {
            if (data.code == 200 && children) {
              _.map(children, (item, index) => {
                let params = _.cloneDeep(form);
                params.name = item.name;
                params.parentCatalogId = data.data.id;
                that.handleAddCatalog(params);
              });
              popupOper.closeLoading();
              that.handleRefresh();
            }
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
</style>