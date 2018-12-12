<template>
    <div class="total-uptime">
        <div class="total-uptime__header">Total uptime</div>
        <div class="total-uptime__graph">
            <v-progress-circular :value="upTime" :size="120" :width="14" color="#CE7631">
                <div class="total-uptime__graph-label">{{ prettyUptime }}% Uptime</div>
            </v-progress-circular>
        </div>
        <div class="total-uptime__data">
            <div class="total-uptime__uptime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Uptime</div>
                </div>
                <div class="total-uptime__value">{{ prettyUptime }}%</div>
            </div>
            <div class="total-uptime__downtime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Downtime</div>
                </div>
                <div class="total-uptime__value">{{ prettyDowntime }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'total-uptime',
    props: {
        uptimes: {
            required: true,
        },
        startDate: {
            default: null,
        }
    },
    computed: {
        totalPings() {
            const startDate = new Date(this.startDate);
            const dateNow = new Date();
            const diff = dateNow - startDate;
            return diff / 300000;
        },
        downPings() {
            if(this.uptimes) {
                return this.uptimes.length;
            } else {
                return 0;
            }
        },
        upTime() {
            if(this.downPings > 0) {
                const number = 100 - (this.downPings / this.totalPings * 100);
                return number
            } else {
                return 100
            }
        },
        prettyUptime() {
            return parseFloat(this.upTime).toFixed(2);
        },
        prettyDowntime() {
            const downtime = 100 - this.prettyUptime;
            return parseFloat(downtime).toFixed(2);
        }
    },
}
</script>
