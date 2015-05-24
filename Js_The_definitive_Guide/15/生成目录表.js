/**
 * Created by ��������� on 2015/5/24.
 *  P387
 *  ���ģ��ע��һ��������ҳ�������ɺ��Զ����е���������������ִ��ʱ��ȥ�ĵ��в���idΪ��TOC����Ԫ�ء�
 */
onLoad(function () {
    var toc = document.getElementById("TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    //  �������еı���Ԫ��
    var headings;
    if (document.querySelectorAll)   //  ���֧��querySelectAll����
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

    else
        headings = findHeadings(document.body, []);

    //  �ݹ�ı���Document��body�����ұ���Ԫ��
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

    //  ��ʼ��һ�����������ָ����½ں�
    var sectionNumbers = [0, 0, 0, 0, 0, 0];

    for (var h = 0; i < headings.length; h++) {
        var heading = headings[h];

        //  ������TOC�����еı���Ԫ��
        if (heading.parentNode == toc) continue;

        //  �жϱ��⼶��
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;

        //  �������б����������͵�����Ϊ��
        sectionNumbers[level-1]++;
        for(var i=level;i<6;i++) sectionNumbers[i]=0;

        //  �����б��⼶����½ں���ϲ���һ���½ں�
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
