<template>
    <v-form v-model="valid">
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
            <div v-if="error">{{ error }}</div>
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
            error: '',
            reg: /.+@.+/,
        }
    },
    methods: {
        forgot() {
            if (this.valid) {
                if (this.isEmailValid() == true) {
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
                    this.error = 'The password needs to be the same';
                }
            } else {
                // eslint-disable-next-line
                console.log('Not valid');
            }
        },
        navigateTo(path) {
            this.$router.push(path);
        },
        isEmailValid() {
            return (this.email == "")? "" : (this.reg.test(this.email)) ? true : false;
        },
    }
}
</script>
