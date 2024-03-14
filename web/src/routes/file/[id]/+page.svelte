<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    onMount(async () => {
        id = window.location.href.split("/")[4];
        response = await axios.post(`/api/file`, {
            id,
        });
        console.log(response);
    });
</script>

fileid
{id}
{JSON.stringify(response)}
