<script>
    import { ModeWatcher } from "mode-watcher";
    import Mode from "$lib/mode.svelte";
    import "../app.pcss";
    import Menubar from "./menubar.svelte";
</script>

<main class="h-screen w-screen overflow-x-hidden">
    <div class="flex justify-between">
        <Mode></Mode>
        <Menubar></Menubar>
        <Mode></Mode>
    </div>
    <ModeWatcher />
    <slot />
</main>
