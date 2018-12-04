<template>
    <div>
        <div class="sidepanel">
            <div class="sidepanel__inner">
                <slot></slot>
            </div>
        </div>
        <div class="overlay" v-if="overlay"></div>
    </div>
</template>

<script>
export default {
    props: {
        overlay: {
            type: Boolean,
            default: true,
        }
    },
    name: 'side-panel',
}
</script>

<style lang="scss">
    .sidepanel {
        width: 50%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 80px;
        text-align: left;
        background-color: #fff;
        z-index: 2;
    }
    .overlay {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.6);
    }
</style>




