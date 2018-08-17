<template>
        <div>
            <el-form ref="form" :model="form" label-width="150px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="吸毒人员：" required>
                            <el-input-number v-model="form.drugAddicts" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="社区矫正人员：" required>
                            <el-input-number v-model="form.communityCorrection" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="刑满释放人员：" required>
                            <el-input-number v-model="form.fullRelease" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="精神障碍人员：" required>
                            <el-input-number v-model="form.mentalDisorder" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="邪教人员：" required>
                            <el-input-number v-model="form.cult" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>个</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="危险品从业人员：" required>
                            <el-input-number v-model="form.dangerousGoods" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="信访人员：" required>
                            <el-input-number v-model="form.petition" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="涉法涉诉信访人员：" required>
                            <el-input-number v-model="form.litigation" :min="0" :max="99999999" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
    
            </el-form>
        </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    form: {
                        communityCode: "",
                        drugAddicts:"",
                        communityCorrection:"",
                        fullRelease:"",
                        mentalDisorder:"",
                        cult:"",
                        petition:"",
                        litigation:"",
                        dangerousGoods:"",
                    },
                }
            },
            created() {
    
            },
            methods: {
    
            }
        }
    </script>