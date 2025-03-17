export const handleError = async ({ error }) => {
  console.log('#############################')
  console.log('#     SERVER SIDE ERROR     #')
  console.log('#############################')

  console.log({ error })

  return {
    message: 'Whoops!',
  }
}
