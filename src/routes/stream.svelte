<svelte:options tag="stream-component" />

<script lang="ts">
  import { onMount } from "svelte";

  interface ResponseSSE {
    notes: string;
    temperature: string;
    updatedAt: string;
  }

  const title = "<h4>Stream Data</h4>";
  const SSE_URL = "https://ds.shub.dev/e/temperatures";
  const SSE_LOCAL_URL = "http://localhost:8000/temperatures";
  let dataStream: ResponseSSE;
  $: streamData$ = dataStream;

  onMount(() => {
    const source = new EventSource(SSE_LOCAL_URL);
    source.onopen = () => {
      console.log("event opened");
    };
    source.onmessage = ({ data }) => {
      const parseData = JSON.parse(data);
      console.log("onmessage ", parseData);
      streamData$ = parseData;
    };
    source.onerror = (error) => console.log("source error ", error);
  });
</script>

<h1>{@html title}</h1>
<div class="title">{streamData$?.notes}</div>
<div>temperature: {streamData$?.temperature}</div>
<div>updatedAt: {streamData$?.updatedAt}</div>

<style>
  .title {
    font-size: 1.5em;
  }
</style>
