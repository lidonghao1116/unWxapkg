
const { Base } = require('./base')
const { Wxapkg } = require('./wxapkg')

class Auto extends Base {
  constructor(filename) {
    super()
    this.filename = filename
  }
  static init(argv) {
    const filename = argv.a
    return new Auto(filename)
  }
  start() {
    this.dir = this.getFileDir(this.filename)
    let files = this.scanDir(this.dir)
    let no = this.getApkgNo(this.filename)
    files = files.map(file => this.getFileName(file))
      .filter(name => this.getApkgNo(name) === no && name !== this.filename)
    console.log('files: %o', files)
    let app = Wxapkg.init({ d: this.filename })
    app.start()
    const s = this.getFileName(this.filename, '.wxapkg')
    files.forEach(filename => {
      let app = Wxapkg.init({ d: filename, s })
      app.start()
    })
  }
  getApkgNo(filename) {
    let tpl = filename.match(/_[-\d]\d+_(\d+)/)
    return tpl ? tpl[1] : ''
  }

}

module.exports = { Auto }