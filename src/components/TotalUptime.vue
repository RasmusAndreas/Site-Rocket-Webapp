<template>
    <div class="total-uptime">
        <div class="total-uptime__header">Total uptime</div>
        <div class="total-uptime__graph">
            <v-progress-circular :value="uptime" :size="120" :width="14" color="#CE7631">
                <div class="total-uptime__graph-label">{{ uptime }}% Uptime</div>
            </v-progress-circular>
        </div>
        <div class="total-uptime__data">
            <div class="total-uptime__uptime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Uptime</div>
                </div>
                <div class="total-uptime__value">{{ uptime }}%</div>
            </div>
            <div class="total-uptime__downtime">
                <div class="total-uptime__indicators">
                    <div class="total-uptime__circle"></div>
                    <div class="total-uptime__label">Downtime</div>
                </div>
                <div class="total-uptime__value">{{ downtime }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'total-uptime',
    props: {
        uptime: {
            required: true,
        },
        downtime: {
            default: null,
        }
    },
}
</script>
