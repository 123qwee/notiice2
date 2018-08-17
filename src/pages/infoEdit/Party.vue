<template>
        <div>
            <el-form ref="form" :model="form" label-width="150px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="党支部：" required>
                            <el-input-number v-model="form.partyBranch" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>个</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="党员人数：" required>
                            <el-input-number v-model="form.partyMembersNumber" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="居民党员：" required>
                            <el-input-number v-model="form.residentPartyMembers" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="在职党员：" required>
                            <el-input-number v-model="form.incumbentPartyMembers" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="流动党员：" required>
                            <el-input-number v-model="form.mobilePartyMembers" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下岗失业党员：" required>
                            <el-input-number v-model="form.unemployedPartyMembers" :min="0" :max="900000" :controls="false"></el-input-number>
                            <span>人</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="离退休党员：" required>
                            <el-input-number v-model="form.retiredPartyMembers" :min="0" :max="900000" :controls="false"></el-input-number>
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
                        partyBranch:"",
                        partyMembersNumber:"",
                        residentPartyMembers:"",
                        incumbentPartyMembers:"",
                        mobilePartyMembers:"",
                        unemployedPartyMembers:"",
                        retiredPartyMembers:"",
                    },
                }
            },
            created() {
    
            },
            methods: {
    
            }
        }
    </script>