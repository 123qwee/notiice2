<template>
    <div>
        <el-form ref="form" :model="form" label-width="150px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（0-9）：" required>
                        <el-input-number v-model="form.mAge0" :precision="6" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（0-9）：" required>
                        <el-input-number v-model="form.wAge0" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（10-19）：" required>
                        <el-input-number v-model="form.mAge10" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（10-19）：" required>
                        <el-input-number v-model="form.wAge10" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（20-29）：" required>
                        <el-input-number v-model="form.mAge20" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（20-29）：" required>
                        <el-input-number v-model="form.wAge20" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（30-39）：" required>
                        <el-input-number v-model="form.mAge30" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（30-39）：" required>
                        <el-input-number v-model="form.wAge30" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（40-49）：" required>
                        <el-input-number v-model="form.mAge40" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（40-49）：" required>
                        <el-input-number v-model="form.wAge40" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（50-59）：" required>
                        <el-input-number v-model="form.mAge50" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（50-59）：" required>
                        <el-input-number v-model="form.wAge50" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（60-69）：" required>
                        <el-input-number v-model="form.mAge60" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（60-69）：" required>
                        <el-input-number v-model="form.wAge60" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（70-79）：" required>
                        <el-input-number v-model="form.mAge70" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（70-79）：" required>
                        <el-input-number v-model="form.wAge70" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（80-89）：" required>
                        <el-input-number v-model="form.mAge80" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（80-89）：" required>
                        <el-input-number v-model="form.wAge80" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（90-99）：" required>
                        <el-input-number v-model="form.mAge90" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（90-99）：" required>
                        <el-input-number v-model="form.wAge90" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="男（100以上）：" required>
                        <el-input-number v-model="form.mAge100" :min="0" :max="99999999" :controls="false"></el-input-number>
                        <span>人</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="女（100以上）：" required>
                        <el-input-number v-model="form.wAge100" :min="0" :max="99999999" :controls="false"></el-input-number>
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
                    mAge0: "",
                    mAge10: "",
                    mAge20: "",
                    mAge30: "",
                    mAge40: "",
                    mAge50: "",
                    mAge60: "",
                    mAge70: "",
                    mAge80: "",
                    mAge90: "",
                    mAge100: "",
                    wAge0: "",
                    wAge10: "",
                    wAge20: "",
                    wAge30: "",
                    wAge40: "",
                    wAge50: "",
                    wAge60: "",
                    wAge70: "",
                    wAge80: "",
                    wAge90: "",
                    wAge100: "",
                },
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>