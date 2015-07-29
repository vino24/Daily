/**
 * Created by 你的特仑苏 on 2015/7/27.
 *  存储机制    P584
 */
var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) ||
    new cookieStorage();
// example
var username = memory.getItem("username");