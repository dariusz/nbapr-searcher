export class Request {
  public getHtml(url: string): Promise<string> {
    const r = require('request')
    return new Promise((resolve, reject) => {
      r(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          resolve(html)
        } else {
          reject(error)
        }
      })
    })
  }
}
