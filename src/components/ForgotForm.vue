<template>
    <v-form v-model="valid">
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
            <v-btn 
            @click.prevent="forgot"
            >Send reset link</v-btn>
            <v-btn @click="navigateTo('/login')" outline>BACK TO LOGIN</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'forgot-form',
    data() {
        return {
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }
    },
    methods: {
        forgot() {
            if (this.valid) {
                const getUrl = window.location;
                const baseUrl = getUrl .protocol + "//" + getUrl.host;

                axios.post('/api/forgot', {
                email: this.email,
                frontendUrl: baseUrl
                }).then(() => {
                    this.$router.push({name: 'login'});
                }).catch(error => {
                    // eslint-disable-next-line
                    console.log(error);
                })

            } else {
                // eslint-disable-next-line
                console.log('En eller anden besked');
            }
        },
        navigateTo(path) {
            this.$router.push(path);
        }
    }
}
</script>
