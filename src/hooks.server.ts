export const handleError = async ({ error, event, status, message }) => {
  console.log('#############################')
  console.log('#     SERVER SIDE ERROR     #')
  console.log('#############################')

  console.log({ error, event, status, message })

  return {
    message: 'Whoops!',
  }
}
