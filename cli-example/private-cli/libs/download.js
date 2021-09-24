const download = require('simple-git')
module.exports.clone = async (repo) => {
    const ora = require('ora')
    const process = ora(`下载.....${repo}`)
    process.start()
    await
        download()
            .silent(true)
            .clone(repo)
            .then(status => { return })
            .catch(err => { console.log("err::", err) });
    process.succeed()
}