/*
 * ------------------------------------------
 * Promise实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _v = _('nej.v'),
        _p = _('nej.ut'),
        _proPromise;
    if (!!_p._$$Promise) return;
    /**
     * Promise基类对象
     * 
     * @class   {nej.ut._$$Promise} 标签切换控件封装
     * @extends {nej.ut._$$Event}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     * 
     * 
     * 
     */
    _p._$$Promise = NEJ.C();
      _proPromise = _p._$$Promise._$extend(_p._$$Event);
    
    
    
    
    
    _proPromise._$when = function(){
        
        
    };
    
    _proPromise._$then = function(){
        
        
        
    };
    
    
    
    
};
NEJ.define('{lib}util/promise/promise.js',
          ['{lib}base/event.js'],f);