<template>
    <div>
        Hej 3
        <v-btn @click="next">Next step</v-btn>
    </div>
</template>

<script>
export default {
    name: 'add-new-step-three',
    methods: {
        next() {
            this.$emit('next');
        }
    },
}
</script>

