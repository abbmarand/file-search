<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    let displaytext: string = "loading";
    onMount(async () => {
        id = window.location.href.split("/")[4];
        response = await axios.post(`/api/file`, {
            id,
        });
        displaytext = JSON.parse(JSON.stringify(response.data)).data;
    });
</script>

fileid
{id}
<pre>{displaytext}</pre>
