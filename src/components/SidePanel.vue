<template>
    <div>
        <transition name="sidepanel">
            <div class="sidepanel" v-if="show">
                <div class="sidepanel__inner">
                    <slot></slot>
                </div>
            </div>
        </transition>
        <div class="overlay" v-if="overlay" @click="close"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    props: {
        overlay: {
            type: Boolean,
            default: true,
        },
    },
    name: 'side-panel',
    methods: {
        close() {
            this.show = false;
            setTimeout(() => {
                this.$emit('closePanel');
            }, 300);
        }
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 100);
        let vm = this;
        window.addEventListener('keyup', function(event) {
            if (event.keyCode == 27) { 
                vm.close();
            }
        });
    }
}
</script>




