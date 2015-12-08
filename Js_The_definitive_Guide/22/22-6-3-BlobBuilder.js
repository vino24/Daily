/**
 * Created by jzwmxz on 15-11-6.
 *  P686    BlobBuilder已被废弃
 */

//  创建一个新的BlobBuilder
var bb = new BlobBuilder();
//  把一个字符串追加到Blob中
bb.append("This blob contains this text and 10 big-endian 32-bit signed ints.");
bb.append("\0");

//  将数据存储到ArrayBuffer中
var ab = new ArrayBuffer(4 * 10);
var dv = new DataView(ab);
for (var i = 0; i < 10; i++) dv.setInt32(i * 4, i);

//  将ArrayBuffer添加到Blob
bb.append(ab);

//  现在从builder中获取Blob，并指定MIME类型
var blob = bb.getBlob("x-optional/mime-type-here");
