/**
 * Created by 你的特仑苏 on 2015/5/24.
 *  P387
 *  这个模块注册一个可以在页面加载完成后自动运行的匿名函数。函数执行时会去文档中查找id为“TOC”的元素。
 */
onLoad(function () {
    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    //  查找所有的标题元素
    var headings;
    if (document.querySelectorAll)   //  如果支持querySelectAll方法
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

    else
        headings = findHeadings(document.body, []);

    //  递归的遍历Document的body，查找标题元素
    function findHeadings(root, sects) {
        for (var c = root.firstChild; c != null; c = c.nextSibling) {
            if (c.nodeType !== 1) continue;

            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }

    //  初始化一个数组来保持跟踪章节号
    var sectionNumbers = [0, 0, 0, 0, 0, 0];

    for (var h = 0; i < headings.length; h++) {
        var heading = headings[h];

        //  跳过在TOC容器中的标题元素
        if (heading.parentNode == toc) continue;

        //  判断标题级别
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;

        //  重置所有标题比它级别低的数字为零
        sectionNumbers[level-1]++;
        for(var i=level;i<6;i++) sectionNumbers[i]=0;

        //  将所有标题级别的章节号组合产生一个章节号
        var sectionNumber=sectionNumbers.slice(0,level).join(".");

        var span=document.createElement("span");
        span.className="TOCSectNum";
        span.innerHTML=sectionNumber;
        heading.insertBefore(span,heading.firstChild);

        var anchor=document.createElement("a");
        anchor.name="TOC"+sectionNumber;
        heading.parentNode.insertBefore(anchor,heading);
        anchor.appendChild(heading);

        var link=document.createElement("a");
        link.href="#TOC"+sectionNumber;
        link.innerHTML=heading.innerHTML;

        var entry=document.createElement("div");
        entry.className="TOCEntry TOCLevel"+level;
        entry.appendChild(link);

        toc.appendChild(entry);
    }
}());
