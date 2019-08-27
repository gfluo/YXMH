const request = require('../util/request');
const util = require('../util/util');
const config = require('../../config');
const { logger, accessLogger } = require('../log');

class Main {
    static async getMenus(ctx, next) {
        try {
            let body = await request.get(util.createTopUrl(config.domain.uri, config.domain.fid));
            body = JSON.parse(body);
            if (body.Variables.sublist.length) {    ///如果有子菜单.当前fid是获取公司名目
                const sublist = body.Variables.sublist;
            }

            ctx.body = 'Hello';
        } catch (e) {
            logger.error(e.message);
        }
    }
}

module.exports = Main;