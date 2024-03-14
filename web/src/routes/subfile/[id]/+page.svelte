<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    let datastring: string;
    let subdatastring: string;
    onMount(async () => {
        id = window.location.href.split("/")[4];
        response = await axios.post(`/api/subfile`, {
            id,
        });
        datastring = response.data.filedata.data;
        subdatastring = response.data.subfiledata.secdata;
        console.log(datastring.indexOf(subdatastring));
    });
</script>

fileid
{id}
<pre class="">{datastring}</pre>
