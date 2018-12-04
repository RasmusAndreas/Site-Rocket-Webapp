<template>
    <v-form v-model="valid">
        <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            hint="Account E-mail"
            @click:append="show = !show"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
          <v-btn color="red">Login</v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'login-form',
    data() {
        return {
            email: '',
            password: '',
            show: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match'),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            }
        }
    }
}
</script>
