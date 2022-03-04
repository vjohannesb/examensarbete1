<template>
    <nav id="mainNav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </nav>
    <main>
        <router-view />
    </main>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#mainNav {
    padding: 2rem;
    display: flex;
    justify-content: center;

    a {
        margin: 0 1rem;
    }
}

.d-flex {
    display: flex;
}

.flex-row {
    flex-direction: row;
}

.flex-col {
    flex-direction: column;
}

.justify-center {
    justify-content: center;
}

.btn {
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    border: none;
    background: none;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    font-weight: bold;
    transition: 300ms;

    &:hover {
        background: salmon;
        color: white;
    }

    &:active {
        transform: scale(0.9);
    }

    &.salmon {
        border: 2px solid salmon;
        color: salmon;

        &:hover {
            color: white;
        }
    }
}
</style>
