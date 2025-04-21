<script lang="ts">
  import Inspect from '$lib/index.js'
  const posts = [
    {
      id: crypto.randomUUID(),
      title: 'Ex quis laborum cupidatat enim occaecat consectetur laboris.',
      date: new Date('01-02-1993'),
      content: `Voluptate qui aliquip anim dolore ut amet laboris exercitation.
Officia elit proident consectetur id eiusmod ullamco sit adipisicing adipisicing occaecat qui
nostrud qui labore.
Excepteur occaecat velit quis veniam amet consectetur. Magna labore dolor excepteur occaecat 
consectetur irure et irure veniam occaecat esse.
Lorem sit enim dolore nisi adipisicing minim id laboris laborum est eu aute laborum.`,
    },
    {
      id: crypto.randomUUID(),
      title: 'Elit pariatur culpa qui commodo quis ullamco enim mollit.',
      date: new Date('03-04-2003'),
      content: `Voluptate qui aliquip anim dolore ut amet laboris exercitation.
Officia elit proident consectetur id eiusmod ullamco sit adipisicing adipisicing occaecat qui
nostrud qui labore.
Excepteur occaecat velit quis veniam amet consectetur. Magna labore dolor excepteur occaecat 
consectetur irure et irure veniam occaecat esse.
Lorem sit enim dolore nisi adipisicing minim id laboris laborum est eu aute laborum.`,
    },
    {
      id: crypto.randomUUID(),
      title: 'Enim dolore excepteur ut velit.',
      date: new Date(),
      content: `Voluptate qui aliquip anim dolore ut amet laboris exercitation.
Officia elit proident consectetur id eiusmod ullamco sit adipisicing adipisicing occaecat qui
nostrud qui labore.
Excepteur occaecat velit quis veniam amet consectetur. Magna labore dolor excepteur occaecat 
consectetur irure et irure veniam occaecat esse.
Lorem sit enim dolore nisi adipisicing minim id laboris laborum est eu aute laborum.`,
    },
  ]
</script>

<h3>Demo</h3>

<div id="panel-example">
  <b>MY IPSUM BLOG</b>

  <div class="links">
    <a href="#panel-example">home</a> <a href="#panel-example">about</a>
    <a href="#panel-example">links</a>
  </div>

  {#each posts as post}
    <div class="post">
      <b>{post.title}</b>
      <small>{post.date.toLocaleString()}</small>

      <p>
        {post.content}
      </p>
    </div>
  {/each}

  <Inspect.Panel
    values={{ posts }}
    name="posts"
    expandLevel={2}
    position={['full-y']}
    style="position:absolute"
    appearance="solid"
    hideGlobalValues
    open
    zIndex={999}
    heading="blog data"
  ></Inspect.Panel>
</div>

<style>
  #panel-example {
    padding: 2ch;
    position: relative;
    width: 100%;
    height: 800px;
    background-color: gray;
    overflow: hidden;
    font-family: monospace;
    color: black;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    gap: 1ch;

    .post {
      display: flex;
      flex-direction: column;
      gap: 1ch;
      max-width: 70ch;

      p {
        white-space: pre;
      }
    }
  }
</style>
