<script>
    import axios from "axios";
    let name;
    function createAcc() {
        console.log(name);
    }
</script>

<input bind:value={name} type="text" name="name" id="" />
<button on:click={createAcc}>submit</button>
