/**
 * Created by ��������� on 2015/5/23.
 *  P383
 */
function sortrows(table, n, comparator) {
    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);    //  ��ʵ�����еĿ���(������ת��Ϊ����)

    //  ���ڵ�n��<td>Ԫ�ص�ֵ��������
    rows.sort(function (row1, row2) {
        var cell1 = row1.getElementsByTagName("td")[n];
        var cell2 = row2.getElementsByTagName("td")[n];
        var val1 = cell1.textContent || cell1.innerText;
        var val2 = cell2.textContent || cell2.innerText;
        if (comparator) return comparator(val1, val2);    //  ���бȽ�
        if (val1 < val2) return -1;                 //  ���û�д���comparator������ĸ˳��Ƚ�
        else if (val1 > val2) return 1;
        else return 0;
    });

    //  ��tbody�а����ǵ�˳�������ӵ����
    //  �⽫�Զ������Ǵӵ�ǰλ�����ߣ���û�б�ҪԤ��ɾ������
    for (var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}

//  ���ұ���е�<th>Ԫ�أ������ǿɵ���
//  �Ա㵥���б��⣬�����ж�������
function makeSortable(table) {
    var headers = table.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        (function (n) {
            headers[i].onclick = function () {
                sortrows(table, n);
            };
        }(i));
    }
}
