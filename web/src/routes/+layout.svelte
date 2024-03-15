<script>
    import { ModeWatcher } from "mode-watcher";
    import Mode from "$lib/mode.svelte";
    import "../app.pcss";
</script>

<main class="h-screen w-screen overflow-x-hidden">
    <Mode></Mode>
    <ModeWatcher />
    <slot />
</main>
