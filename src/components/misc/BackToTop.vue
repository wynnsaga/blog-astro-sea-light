<script setup>
// 节流函数
function throttle(func, limit) {
    let timeout = null;
    let lastExec = 0;

    return function (...args) {
        const context = this;
        const now = Date.now();

        if (lastExec === 0) {
            func.apply(context, args);
            lastExec = now;
        } else {
            const remaining = limit - (now - lastExec);

            if (remaining <= 0) {
                func.apply(context, args);
                lastExec = now;
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                    lastExec = Date.now();
                }, remaining);
            }
        }
    };
}

const handleScroll = function () {
    const backToTopButton = document.querySelector(".back-to-top");
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
};

const throttledScroll = throttle(handleScroll, 200);
window.addEventListener("scroll", throttledScroll);

const handleBtnClick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
</script>

<template>
    <button
        class="back-to-top"
        @click="handleBtnClick">
        <i class="fa-solid fa-arrow-up"></i>
    </button>
</template>

<style lang="scss" scoped>
.back-to-top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid;
    border-radius: 50%;
    border-top-color: #7ca4a1;
    border-left-color: #7ca4a1;
    border-bottom-color: #ff6884;
    border-right-color: #ff6884;

    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

.back-to-top.show {
    visibility: visible;
    opacity: 1;
}
</style>
