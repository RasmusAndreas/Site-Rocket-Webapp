<template>
    <div class="total-uptime">
        <div class="total-uptime__header">Total uptime</div>
        <div class="total-uptime__graph">
            <v-progress-circular :value="uptimePercent" :size="120" :width="14" color="#CE7631">
                <div class="total-uptime__graph-label">{{ uptimePercent }}% Uptime</div>
            </v-progress-circular>
        </div>
        <div class="total-uptime__data">
            <div class="total-uptime__uptime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Uptime</div>
                </div>
                <div class="total-uptime__value">{{ uptimePercent }}%</div>
            </div>
            <div class="total-uptime__downtime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Downtime</div>
                </div>
                <div class="total-uptime__value">{{ downtimePercent }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'total-uptime',
    data() {
        return {
            uptimePercent: parseFloat(this.upTime()).toFixed(2),
            downtimePercent: parseFloat(100 - this.upTime()).toFixed(2),
        }
    },
    props: {
        uptimes: {
            required: true,
        },
        startDate: {
            default: null,
        }
    },
    methods: {
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
            if(this.downPings() > 0) {
                const number = 100 - (this.downPings() / this.totalPings() * 100);
                return number
            } else {
                return 100
            }
        },
    },
    created() {
        this.upTime();
    }
}
</script>
