<template>
    <div class="menu-line-card justify-center items-center cursor-pointer hover-translate-y" @click="cardClick">
        <div :class="'w-20 flex justify-center ' + icon.class">
            <el-icon :size="icon.size">
                <component :is="icon.name" />
            </el-icon>
        </div>
        <div class="w-full">
            <div class="title-primary mt-2">
                {{ title }}
            </div>
            <div class="subtitle-primary mt-2">
                {{ subtitle }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    subtitle: {
        type: String,
        default: 'This is subtitle'
    },
    icon: {
        type: Object,
        default: {
            class: 'icon-default',
            size: 40,
            name: 'Tools'
        }
    }
})

const emit = defineEmits(['cardClick'])

const cardClick = () => {
    emit('cardClick')
}
</script>