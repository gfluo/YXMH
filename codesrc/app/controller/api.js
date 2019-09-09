const request = require('../util/request');
const util = require('../util/util');
const config = require('../../config');
const { logger, accessLogger } = require('../log');

class Main {
    static async getArticle(ctx, next) {
        try {
            const { tid } = ctx.params;
            let renderData = {
                menus: [],
                fid: '',
                subMenus: [],
                tid: tid,
                subTitle: '',
                article: '',
                allShow: '',
            };
            let body = await request.get(util.createTopUrl(config.domain.uri, config.domain.fid));
            body = JSON.parse(body);
            let reqResult = body.Variables;
            renderData.title = reqResult.forum.name;
            renderData.title = reqResult.forum.name;
            renderData.subMenus = reqResult.forum_threadlist;
            renderData.menus = reqResult.sublist;

            let article = await request.get(`https://yuxi.shaobaogu.com.cn/api/mobile/index.php?version=4&module=viewthread&tid=${tid}`);
            article = JSON.parse(article);
            if (article.Variables.postlist.length) {
                renderData.subTitle = article.Variables.thread.subject;
                renderData.article = article.Variables.postlist[0].message
            }

            await ctx.render('article', renderData);
        } catch (e) {
            logger.error(e);
        }
    }

    static async topMenus(ctx, next) {
        try {
            if (!ctx.params.fid) {  ///首页
                ctx.params = {
                    fid: config.domain.fid
                }
            }

            const { fid } = ctx.params;
            let renderData = {
                menus: [],
                articles: [],
                fid: fid,
                subMenus: [],
                tid: '',
                uidPic: `${config.domain.uri}${config.domain.uidPic}`
            };

            let body = await request.get(util.createTopUrl(config.domain.uri, config.domain.fid));
            body = JSON.parse(body);
            let reqResult = body.Variables;
            renderData.title = reqResult.forum.name;
            renderData.subMenus = reqResult.forum_threadlist;
            renderData.menus = reqResult.sublist;

            if (fid == config.domain.fid) {
                renderData.allShow = 'allShow';
                for (let i = 0; i < reqResult.sublist.length; i++) {
                    let subBody = await request.get(util.createTopUrl(config.domain.uri, reqResult.sublist[i].fid));
                    subBody = JSON.parse(subBody);
                    renderData.articles = renderData.articles.concat(subBody.Variables.forum_threadlist);
                }
            } else {
                renderData.allShow = 'signalShow';
                let subBody = await request.get(util.createTopUrl(config.domain.uri, fid));
                subBody = JSON.parse(subBody);
                renderData.articles = renderData.articles.concat(subBody.Variables.forum_threadlist);
            }

            await ctx.render('home', renderData);
        } catch (e) {
            logger.error(e);
            ctx.body = {
                code: -1,
                error: '服务器发生未知错误，请联系管理员'
            }
        }
    }

    static async getMenus(ctx, next) {
        try {
            if (!ctx.params.fid) {
                ctx.params = {
                    fid: config.domain.fid
                }
            }
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
                    }

                    if (body.Variables.forum_threadlist.length) {
                        sublist.push({
                            fid: '0',
                            name: body.Variables.forum_threadlist[0].subject
                        })
                    }

                    await ctx.render('home', renderData);
                }
            } else {
                let body = await request.get(util.createTopUrl(config.domain.uri, config.domain.fid));
                body = JSON.parse(body);
                if (body.Variables.sublist.length) {    ///如果有子菜单.当前fid是获取公司名目
                    let sublist = body.Variables.sublist;
                    sublist = [{ fid: config.domain.fid, name: '全部' }].concat(sublist);
                    let renderData = {
                        title: body.Variables.forum.name,
                        menus: sublist,
                        fid: fid
                    }
                    let tid = body.Variables.forum_threadlist[0].tid;
                    let article = await request.get(`https://yuxi.shaobaogu.com.cn/api/mobile/index.php?version=4&module=viewthread&tid=${tid}`);
                    article = JSON.parse(article);
                    if (article.Variables.postlist.length) {
                        renderData.subTitle = article.Variables.thread.subject;
                        renderData.cover = article.Variables.postlist[0].message;
                    }

                    sublist.push({
                        fid: fid,
                        name: body.Variables.forum_threadlist[0].subject
                    })

                    await ctx.render('cover', renderData);
                }
            }
            ///ctx.body = 'Hello';
        } catch (e) {
            logger.error(e.message);
        }
    }
}

module.exports = Main;