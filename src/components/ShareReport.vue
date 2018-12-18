<template>
    <div>
        <h1 class="header-caps">SHARE REPORT</h1>
        <p>Use the form below to send a link to the report to
            a e-mail of your choice. The link will always be up
            to date with the latest data.</p>
        <v-form v-model="valid">
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="email"
                required
                ></v-text-field>
            <div v-if="error">{{ error }}</div>
            <v-btn @click.prevent="sendMail">Send mail</v-btn>
            <v-btn 
            outline 
            v-clipboard:copy="link"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >Copy link</v-btn>
        </v-form>
    </div>
</template>

<script>
export default {
    name: 'share-report',
    data() {
        return {
            email: '',
            error: '',
            valid: false,
            link: this.getLink(),
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            reg: /.+@.+/,
            
        }
    },
    props: {
        reportLink: {
            type: String,
            default: '',
        },
    },
    methods: {
        sendMail() {
            const getUrl = window.location;
            const baseUrl = getUrl.protocol + "//" + getUrl.host + "/report/" + this.reportLink;
            if (this.isEmailValid() == true) {
                this.$store.dispatch('sendMail', {
                    id: this.$route.params.id,
                    email: this.email,
                    reportLink: baseUrl,
                }).then(() => {
                    this.$emit('mailSent');
                }).catch(error => {
                    this.error = 'E-mail or password is incorrect';
                    // eslint-disable-next-line
                    console.log(error.response.data.message);
                });
            } else {
                this.error = 'Are you sure this email is valid?';
            }
        },
        getLink() {
            const getUrl = window.location;
            const baseUrl = getUrl.protocol + "//" + getUrl.host + "/report/" + this.reportLink;
            return baseUrl;
        },
        onCopy() {
            this.$emit('copyToast');
        },
        onError() {
            alert('Failed to copy link');
        },
        isEmailValid() {
            return (this.email == "")? "" : (this.reg.test(this.email)) ? true : false;
        },
    },
}
</script>
