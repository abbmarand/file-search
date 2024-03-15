<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    let displaytext: string = "loading";
    onMount(async () => {
        try {
            id = window.location.href.split("/")[4];
            response = await axios.post(`/api/file`, {
                id,
            });
            displaytext = JSON.parse(JSON.stringify(response.data)).data;
            if (displaytext == undefined) {
                displaytext = "file not found";
            }
        } catch (error) {
            displaytext = "file not found";
        }
    });
</script>

fileid
{id}
<pre>{displaytext}</pre>
