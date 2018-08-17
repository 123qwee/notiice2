<template>
	<el-dialog class="dialog" :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="resetForm('childNoticeForm')">
		<el-form :model="childNoticeForm" :rules="rules" ref="childNoticeForm" label-width="120px">
			<el-row>
				<el-col :span="12">
                    <el-form-item label="上级目录序号">
						<el-input v-model="childNoticeForm.parentCatalogId" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="公告目录名称" prop="name">
						<el-input v-model="childNoticeForm.name" auto-complete="off"></el-input>
					</el-form-item>
          	<el-form-item label="序号">
          <el-input-number v-model="childNoticeForm.orderBy" :controls="false" :precision="0" :step="1" :min="0" :max="99999999" label="请输入序号" style="width:100%;"></el-input-number>
            </el-form-item>
					<el-form-item label="状态">
                        <el-radio-group v-model="childNoticeForm.status">
                            <el-radio label="0">启用</el-radio>
                            <el-radio label="1">关闭</el-radio>
                        </el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="上级目录名称">
                        <el-input v-model="childNoticeForm.parentName" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="平台名称">
                        <el-input v-model="systemName" auto-complete="off" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
      <!-- <el-row>
				<el-col :span="12">
				</el-col>
      </el-row> -->
			<el-form-item label="备注" prop="remark">
				<el-input type="textarea" :rows="5" v-model="childNoticeForm.remark" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="btn-common btn-back-out" @click="resetForm('childNoticeForm')">取消</el-button>
      <el-button class="btn-common btn-ok" @click="submitForm('childNoticeForm')">保存</el-button>
    </div>
	</el-dialog>
</template>

<script>
import service from "./notice_operation_service";

export default {
  data() {
    return {
      description: "childNoticeDialog",
      /** 设置对话框显隐 */
      dialogVisible: false,
      dialogTitle: "",
      systemName: "公告管理平台",
      childNoticeForm: {
        name: "",
        parentName: "",
        status: "0", // 0启用 1关闭
        remark: "",
        parentCatalogId: "",
        orderBy:"",
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单目录名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        remark: [
          { max: 500, message: "备注长度不能大于 500 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    childOrgForm() {
      this.childOrgForm.status = String(this.childOrgForm.status);
    }
  },
  methods: {
    /** 提交保存 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = _.cloneDeep(this.childNoticeForm);
          delete param.parentName;
          param.cloudSign = lscache.get("sysCode");
          service.addNoticeQuery(param, data => {
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "新增菜单目录成功！"
              });
              this.$refs[formName].resetFields();
              this.resetInitValue();
              this.$data.dialogVisible = false;
              this.$bus.$emit("addNoticeRefreshTree", param);
            }
          });
        } else {
          return false;
        }
      });
    },
    /** 重置取消保存 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.resetInitValue();
      this.$data.dialogVisible = false;
    },
    /** 还原初始值 */
    resetInitValue() {
      this.dialogTitle = "";
      this.childNoticeForm.parentCatalogId = "";
      this.childNoticeForm.parentName = "";
      this.childNoticeForm.name = "";
      this.childNoticeForm.status = "0";
      this.childNoticeForm.remark = "";
    }
  }
};
</script>

<style>
.el-select,
.el-cascader {
  width: 100%;
}
</style>
