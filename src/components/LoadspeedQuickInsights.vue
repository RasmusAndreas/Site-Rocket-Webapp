<template>
    <div class="loadspeed-insight-container">
        <div class="loadspeed-insight-header">{{ header }}</div>
        <div>
            <div class="loadspeed-insight-item">
                <img class="loadspeed-icon" src="../assets/icon-fast.png">
                <div class="loadspeed-insight-text text-fast">{{ urls.fast }}s</div>
                <div class="subtext-loadspeed-insight">Fastest loadspeed</div>
            </div>
            <div class="loadspeed-insight-item">
                <img class="loadspeed-icon" src="../assets/icon-avg.png">
                <div class="loadspeed-insight-text text-avg">{{ urls.avg }}s</div>
                <div class="subtext-loadspeed-insight">Average loadspeed</div>
            </div>
            <div class="loadspeed-insight-item">
                <img class="loadspeed-icon" src="../assets/icon-slow.png">
                <div class="loadspeed-insight-text text-slow">{{ urls.slow }}s</div>
                <div class="subtext-loadspeed-insight">Slowest loadspeed</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadspeed-quick-insights',
    props: {
        urls: {
            required: true,
        },
        header: {
            type: String,
            required: true,
        }
    },
}
</script>

