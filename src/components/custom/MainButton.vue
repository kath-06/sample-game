<template>
    <el-button
        :class="btnType(type, rounded)"
        @click="onClick"
    >
        <slot />
    </el-button>
</template>
<script lang="ts" setup>
import { buttonTypes } from '~/composables'

defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    rounded: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['buttonClick'])

const onClick = () => {
    emit('buttonClick')
}

const btnType = (type: string, rounded: boolean) => {
    let btnClass = '';

    buttonTypes.map(btnType => {
        if(btnType.name === type) {
            btnClass = rounded ? btnType.roundClass : btnType.class
        }
    })

    return btnClass;
}

</script>