/**
 * Created by ��������� on 2015/7/27.
 *  �洢����    P584
 */
var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) ||
    new cookieStorage();
// example
var username = memory.getItem("username");