<template>
        <div>
            <el-form ref="form" :model="form" label-width="150px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item :label="newDate-6 + '年'" required>
                            <el-input-number v-model="form.one" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="newDate-5 + '年'" required>
                            <el-input-number v-model="form.two" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item :label="newDate-4 + '年'" required>
                            <el-input-number v-model="form.three" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="newDate-3 + '年'" required>
                            <el-input-number v-model="form.four" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item :label="newDate-2 + '年'" required>
                            <el-input-number v-model="form.five" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="newDate-1 + '年'" required>
                            <el-input-number v-model="form.six" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item :label="newDate + '年'" required>
                            <el-input-number v-model="form.seven" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
    
            </el-form>
        </div>
    </template>
    <script>
var newDate = new Date().getFullYear();
export default {
  data() {
    return {
      newDate: newDate,
      form: {
        code: lscache.get("sysCode"),
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>