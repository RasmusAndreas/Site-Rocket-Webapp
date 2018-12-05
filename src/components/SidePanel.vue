<template>
    <div>
        <div class="sidepanel">
            <div class="sidepanel__inner">
                <slot></slot>
            </div>
        </div>
        <div class="overlay" v-if="overlay" @click="close"></div>
    </div>
</template>

<script>
export default {
    props: {
        overlay: {
            type: Boolean,
            default: true,
        },
    },
    name: 'side-panel',
    methods: {
        close() {
            this.$emit('closePanel')
        }
    }
}
</script>




