<template>
    <v-form v-model="valid">
        <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[passRules.required]"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
          <v-text-field
            v-model="passwordRepeat"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[passRules.required]"
            :type="show ? 'text' : 'password'"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
          <div v-if="error">{{ error }}</div>
            <v-btn 
            @click.prevent="reset"
            >Change password</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'reset-form',
    data() {
        return {
            valid: false,
            password: '',
            passwordRepeat: '',
            email: this.$route.params.email,
            resetToken: this.$route.params.resetToken,
            show: false,
            passRules: {
                required: value => !!value || 'Required.',
            },
            error: '',
        }
    },
    methods: {
        reset() {
            if (this.password == this.passwordRepeat){
                if (this.valid) {
                    axios.patch('/api/reset', {
                    email: this.email,
                    resetToken: this.resetToken,
                    password: this.password,
                    passwordRepeat: this.passwordRepeat
                    }).then(() => {
                        this.$router.push({name: 'login'});
                    }).catch(() => {
                        this.error = 'Something went wrong';
                    })
                } 
            } else {
                this.error = 'The passwords need to be the same.';
            }
        }
    }
}
</script>
