<script lang="ts">
  import { CustomLine, type CustomComponentProps } from '$lib/index.js'

  let { value, ...rest }: CustomComponentProps<number> = $props()
</script>

<CustomLine {value} {...rest}>
  <span class="value number">{value}</span>
</CustomLine>

<style>
  span {
    rotate: 180deg;
    /* font-family: sans-serif;
    font-weight: 900;
    font-size: 1em;
    background: linear-gradient(
      to right,
      #ef5350,
      #f48fb1,
      #7e57c2,
      #2196f3,
      #26c6da,
      #43a047,
      #eeff41,
      #f9a825,
      #ff5722
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent; */
  }
</style>
