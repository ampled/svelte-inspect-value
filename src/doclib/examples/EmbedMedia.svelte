<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  import squirteSprite from './media/squirtle.png'
  import squirtleCry from './media/squirtle_cry.ogg'

  const squirtle = {
    name: 'squirtle',
    type: 'water',
    sprite: squirteSprite,
    cry: squirtleCry,
  }
</script>

<div class="flex col">
  <h2>embed media</h2>
  <p>
    if a string is a url and ends with a known file extension for image or audio,<br /> embed the
    media as an <code>img</code> or <code>audio</code>-tag. this is disabled by default.
  </p>

  <div class="flex">
    <Inspect expandAll embedMedia value={squirtle} name="squirtle" />
  </div>

  <p>sprite and audio courtesy of pokeapi.co</p>
</div>
