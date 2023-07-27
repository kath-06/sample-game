<template>
    <el-button
        v-if="type === 'primary'"
        class="rounded-full bg-sky-900 hover:bg-sky-950 text-sky-100 hover:text-sky-50 font-bold cursor-pointer"
        @click="onClick"
    >
        <slot />
    </el-button>
    <el-button
        v-if="type === 'danger'"
        class="rounded-full bg-red-900 hover:bg-red-950 text-red-100 hover:text-red-50 font-bold cursor-pointer"
        @click="onClick"
    >
        <slot />
    </el-button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineProps({
    type: {
        type: String,
        default: 'primary'
    }
})
const emit = defineEmits(['buttonClick'])

const onClick = () => {
    emit('buttonClick')
}
</script>