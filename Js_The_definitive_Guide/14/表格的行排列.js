/**
 * Created by 你的特仑苏 on 2015/5/23.
 *  P383
 */
function sortrows(table, n, comparator) {
    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    rows = Array.prototype.slice.call(rows, 0);    //  真实数组中的快照(将对象转换为数组)

    //  基于第n个<td>元素的值对行排列
    rows.sort(function (row1, row2) {
        var cell1 = row1.getElementsByTagName("td")[n];
        var cell2 = row2.getElementsByTagName("td")[n];
        var val1 = cell1.textContent || cell1.innerText;
        var val2 = cell2.textContent || cell2.innerText;
        if (comparator) return comparator(val1, val2);    //  进行比较
        if (val1 < val2) return -1;                 //  如果没有传入comparator，按字母顺序比较
        else if (val1 > val2) return 1;
        else return 0;
    });

    //  在tbody中按它们的顺序把行添加到最后，
    //  这将自动把它们从当前位置移走，故没有必要预先删除它们
    for (var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}

//  查找表格中的<th>元素，让他们可单击
//  以便单击列标题，按该列对行排序
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
