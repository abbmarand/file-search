<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    onMount(async () => {
        id = window.location.href.split("/")[4];
        response = await axios.get(`/api/files`);
        console.log(response);
    });
</script>

fileid
{id}
{JSON.stringify(response)}
