exports.createTopUrl = function(uri, fid) {
    return `${uri}/api/mobile/index.php?version=4&module=forumdisplay&fid=${fid}&page=1`
}