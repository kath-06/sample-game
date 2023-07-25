<template>
    <el-card shadow="hover" :class="cardStyle">
        <el-row :gutter="12">
            <el-col class="pb-4 pt-4" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <img class="card-img pt-5 pb-5" :class="contentStyle" :src="houseImg" />
            </el-col>
            <el-col class="pb-4 pt-4 card-content" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="card-title">
                    {{ houseTitle }}
                </div>
                <div class="card-value pt-2">
                    {{ houseText }}
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
    const props = defineProps({
        houseText: {
            type: String,
            default: ''
        },
        houseTitle: {
            type: String,
            default: ''
        },
        houseImg: {
            type: String,
            default: ''
        },
        cardStyle: {
            type: String,
            default: ''
        },
        contentStyle: {
            type: String,
            default: ''
        }
    })
</script>

<style lang="scss" scoped>
.house-card {
    display: flex;
    flex-direction: row;
}
.card-img {
    width: 100%;
}
.card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}
.card-value {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
}
</style>
