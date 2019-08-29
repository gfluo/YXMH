const request = require('../util/request');
const util = require('../util/util');
const config = require('../../config');
const { logger, accessLogger } = require('../log');

class Main {
    static async getMenus(ctx, next) {
        try {
            const { fid } = ctx.params;
            if (fid != '0') {
                let body = await request.get(util.createTopUrl(config.domain.uri, config.domain.fid));
                body = JSON.parse(body);
                if (body.Variables.sublist.length) {    ///如果有子菜单.当前fid是获取公司名目
                    let sublist = body.Variables.sublist;
                    sublist = [{ fid: config.domain.fid, name: '全部' }].concat(sublist);

                    let articles = [];
                    if (fid == config.domain.fid) { //如果是all
                        for (let i = 0; i < sublist.length; i++) {
                            let subBody = await request.get(util.createTopUrl(config.domain.uri, sublist[i].fid));
                            subBody = JSON.parse(subBody);
                            articles = articles.concat(subBody.Variables.forum_threadlist);
                        }
                    } else {
                        let subBody = await request.get(util.createTopUrl(config.domain.uri, fid));
                        subBody = JSON.parse(subBody);
                        articles = articles.concat(subBody.Variables.forum_threadlist);
                    }

                    let renderData = {
                        title: body.Variables.forum.name,
                        menus: sublist,
                        allArticles: articles,
                        fid: fid
                    }

                    if (fid == config.domain.fid) {
                        renderData.allShow = 'allShow';
                        if (body.Variables.forum_threadlist.length) {
                            sublist.push({
                                fid: '0',
                                name: body.Variables.forum_threadlist[0].subject
                            })
                        }
                    }

                    await ctx.render('home', renderData);
                }
            } else {

            }
            ///ctx.body = 'Hello';
        } catch (e) {
            logger.error(e.message);
        }
    }

    static async loadArticle(ctx, next) {
        try {
            let body = await request.get('https://yuxi.shaobaogu.com.cn/api/mobile/index.php?version=4&module=viewthread&tid=3');
        } catch (e) {

        }
    }
}

module.exports = Main;