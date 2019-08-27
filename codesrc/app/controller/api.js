const request = require('../util/request');
const config = require('../../config');
const { logger, accessLogger } = require('../log');

class Main {
    static async getMenus(ctx, next) {
        try {
            let menus = await request.get(`${config.domain.uri}/api/mobile/index.php?version=4&module=forumdisplay&fid=${config.domain.fid}&page=1`);
            menus = JSON.parse(menus);
            ctx.body = 'Hello';
        } catch (e) {
            logger.error(e.message);
        }
    }
}

module.exports = Main;