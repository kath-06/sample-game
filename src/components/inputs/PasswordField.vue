<template>
    <el-input
        v-model="pass"
        type="password"
        :show-password="show" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const props = defineProps({
        password: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        }
    })
    const pass = ref(props.password)
</script>
