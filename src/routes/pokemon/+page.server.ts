export const load = async ({ fetch }) => {
  const pokemon = await (await fetch('https://pokeapi.co/api/v2/pokemon/squirtle')).json()
  return {
    pokemon,
  }
}
