/**
 * This function get the body data from a HTTP request
 * 
 * @param {IncomingMessage} req
 * @returns {Promise<Object<string, unknown>>}
 */
const getRequestData = (req) => {
  return new Promise((resolve, reject) => {
    const body = []

    req.on('error', (err) => {
      reject(err)
    }).on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      resolve(JSON.parse(Buffer.concat(body).toString()))
    })
  })
}

export default getRequestData
