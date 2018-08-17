<template>
    <div class="info">
        <el-form ref="form" :model="form" label-width="150px">
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="面积：" required>
                        <el-input-number v-model="form.area" :precision="6" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>平方公里</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8">
                    <el-form-item label="行政村数量：" required>
                        <el-input-number v-model="form.village" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>个</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="镇数量：" required>
                        <el-input-number v-model="form.town" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>个</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8">
                    <el-form-item label="乡数量：" required>
                        <el-input-number v-model="form.county" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>个</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="总人口：" required>
                        <el-input-number v-model="form.totalPopulation" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>万人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="回族：" required>
                        <el-input-number v-model="form.huiNationality" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>万人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="占总人口：" required>
                        <el-input-number v-model="form.totalPopulationPercentage" :precision="6" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>%</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="居民户数：" required>
                        <el-input-number v-model="form.households" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>户</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="常住人口：" required>
                        <el-input-number v-model="form.residentPopulation" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>万人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="人口自然增长率" required>
                        <el-input-number v-model="form.naturalPopulation" :precision="6" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>‰</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="物业管理住宅：" required>
                        <el-input-number v-model="form.management" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>栋</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位自管住宅：" required>
                        <el-input-number v-model="form.unitSelfTube" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>栋</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="楼宇总数：" required>
                        <el-input-number v-model="form.building" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>栋</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="民房：" required>
                        <el-input-number v-model="form.civilHouse" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>栋</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8">
                    <el-form-item label="商住两用：" required>
                        <el-input-number v-model="form.commercial" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>栋</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
/** 引入上传组件 */
import vUpload from "../../components/upload/Upload";
export default {
  components: {
    vUpload
  },
  data() {
    return {
      form: {
        code: lscache.get("sysCode"),
        area: "",
        town: "",
        county: "",
        village: "",
        residentPopulation: "",
        huiNationality: "",
        totalPopulationPercentage: "",
        households: "",
        totalPopulation: "",
        naturalPopulation: "",
        civilHouse:"",
        building:"",
        management:"",
        unitSelfTube:"",
        commercial:"",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
  }
};
</script>
<style>
/** 文件列表隐藏 */

.info .el-upload-list.el-upload-list--text {
  display: none;
}

/** 卡片样式 */

.info .el-card {
  /* width: 45%; */
  max-width: 200px;
  margin-left: 10px;
  display: inline-block;
}

.info .el-card__body {
  padding: 5px;
  line-height: 115px;
}

.info .img-block {
  position: relative;
  height: 115px;
  background: #000;
  text-align: center;
}

.info .mask {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.4;
  display: none;
  cursor: pointer;
}

.info .del {
  position: absolute;
  right: 5px;
  top: -45px;
  cursor: pointer;
  display: none;
}

.info .el-card:hover .mask,
.info .el-card:hover .del {
  display: block;
}

.info .img-name {
  margin: 0;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info .image {
  max-height: 115px;
}
</style>