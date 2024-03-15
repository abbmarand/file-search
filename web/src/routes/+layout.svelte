<script>
    import { ModeWatcher } from "mode-watcher";
    import "../app.pcss";
</script>

<main class="h-screen w-screen overflow-x-hidden">
    <ModeWatcher />
    <slot />
</main>
