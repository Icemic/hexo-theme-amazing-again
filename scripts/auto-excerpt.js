const logger = require('hexo-log')();
/**
 * 
 * @param {Hexo} hexo 
 */
module.exports = function(hexo) {
    hexo.extend.filter.register('template_locals', function(locals){
        if (locals.page && locals.page._content && !locals.page.excerpt) {
            locals.page.excerpt = generateExcerpt(locals.page._content);
        }
    });
}

function generateExcerpt(content) {
    const paragraphs = content.split('\n');
    let excerpt = '';
    for (const para of paragraphs) {
        const index = para.indexOf('<');
        if (index > -1) {
            excerpt += `<p>${para.substr(0, index)}……</p>`;
            break;
        }
        if ((excerpt + para).length > 200) {
            excerpt += `<p>${para.substr(0, 200 - excerpt.length)}……</p>`;
            break;
        }
        excerpt += `<p>${para}</p>`;
    }
    return excerpt;
}