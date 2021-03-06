/*
 * ------------------------------------------
 * 调度器辅助接口实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _u = _('nej.u'),
        _t = _('nej.ut'),
        _p = _('nej.ut.p');
    /*
     * 解析UMI对应的节点
     * @param  {nej.ut.p._$$Node} 根节点
     * @param  {String}             UMI值
     * @param  {Function}           解析过程处理函数
     * @return {nej.ut.p._$$Node} 对应节点
     */
    var _doParseUMI = function(_root,_umi,_hanlder){
        var _node = _root,
            _hanlder = _hanlder||_f;
        if (_umi!='/'){
            _u._$forEach(_umi.split('/'),
                function(_name){
                    var _result = _hanlder(_node,_name);
                    if (!_result) 
                        return !0;
                    _node = _result;
                });
        }
        return _node;
    };
    /**
     * 根据UMI取对应的节点
     * @api    {nej.ut.p._$getNodeByUMI}
     * @param  {nej.ut.p._$Node} 根节点
     * @param  {String}          UMI值
     * @return {nej.ut.p._$Node} UMI对应的节点
     */
    _p._$getNodeByUMI = (function(){
        var _doSearch = function(_parent,_name){
            var _name = _name||'/',
                _pname = _parent._$getName();
            if (_pname=='/'&&_name=='/')
                return _parent;
            return _parent._$getChildByName(_name);
        };
        return function(_root,_umi){
            return _doParseUMI(_root,_umi,_doSearch);
        };
    })();
    /**
     * 根据UMI追加对应的节点
     * @api    {nej.ut.p._$appendNodeByUMI}
     * @param  {nej.ut.p._$Node} 根节点
     * @param  {String}            UMI值
     * @return {nej.ut.p._$Node} UMI对应的节点
     */
    _p._$appendNodeByUMI = (function(){
        // build tree
        var _doBuild = function(_parent,_name){
            var _pname = _parent._$getName();
            // root not add slash child
            if (!_name&&_pname=='/')
                return _parent;
            var _node = null;
            // check slash child first
            if (_pname!='/'){
                _node = _parent._$getChildByName('/');
                if (!_node){
                    _node = _p._$$Node._$allocate();
                    _parent._$appendChild(_node);
                }
            }
            // check non-slash child
            if (!!_name){
                _node = _parent._$getChildByName(_name);
                if (!_node){
                    _node = _p._$$Node._$allocate({name:_name});
                    _parent._$appendChild(_node);
                }
            }
            return _node;
        };
        return function(_root,_umi){
            return _doParseUMI(_root,_umi,_doBuild);
        };
    })();
    /**
     * 取两个节点的公共
     * @api    {nej.ut.p._$getCommonRoot}
     * @param  {nej.ut.p._$Node} 匹配节点
     * @param  {nej.ut.p._$Node} 匹配节点
     * @return {nej.ut.p._$Node} 公共节点
     */
    _p._$getCommonRoot = function(_root,_source,_target){
        if (!_source||!_target) return _root;
        var _source = _source._$getPath().split('/'),
            _target = _target._$getPath().split('/'),
            _difidx = _u._$forIn(_source,
                      function(_value,_index){
                          if (_value!=_target[_index])
                              return !0;
                      })||1,
            _umi = _source.splice(0,_difidx).join('/')||'/';
        return _p._$getNodeByUMI(_root,_umi);
    };
    /**
     * 广度优先搜索
     * @api    {nej.ut.p._$breadthFirstSearch}
     * @param  {nej.ut.p._$Node} 起始节点
     * @param  {Function}          搜索过程处理函数
     * @return {nej.ut.dsp}
     */
    _p._$breadthFirstSearch = function(_root,_handler){
        var _arr = [_root],
            _node = _arr.shift(),
            _handler = _handler||_f;
        while(!!_node){
            _arr.push.apply(_arr,
                _node._$getChildren());
            _handler(_node);
            _node = _arr.shift();
        }
        return this;
    };
    /**
     * 判断是否节点实例
     * @api    {nej.ut.p._$isNode}
     * @param  {nej.ut.p._$$Node} 节点
     * @return {Boolean}            是否节点实例
     */
    _p._$isNode = function(_node){
        return _node instanceof _p._$$Node;
    };
    /**
     * 判断是否模块实例
     * @api    {nej.ut.p._$isModule}
     * @param  {nej.ut._$$Module} 模块实例
     * @return {Boolean}          是否模块实例
     */
    _p._$isModule = function(_module){
        return _module instanceof _t._$$Module;
    };
    /**
     * 判断给定UMI是否代表私有模块
     * @api    {nej.ut.p._$isUMIPrivate}
     * @param  {Object}  UMI值
     * @return {Boolean} 是否私有模块
     */
    _p._$isUMIPrivate = (function(){
        var _reg = /^\/?\?(?=\/|$)/;
        return function(_umi){
            return _reg.test(_umi||'');
        };
    })();
    /**
     * 路径转UMI<br/>
     * 转换逻辑
     * <ol>
     *   路径按照"?"或者"#"分割
     *   识别私有模块，条件：第一个元素为"/"同时第二个元素以"?"开始
     *   非私有模块返回第一个元素，私有模块返回用"?"合并的第一和第二个元素
     * </ol>
     * 转换举例
     * <pre>
     *     /a/b              ->   /a/b
     *     /a/b?a=aa         ->   /a/b
     *     /a/b#a=aa         ->   /a/b
     *     /a/b?a=aa#b=bb    ->   /a/b
     *     /a/b#a=aa?b=bb    ->   /a/b
     *     /a/b?/a/b         ->   /a/b
     *     /a/b#/a/b         ->   /a/b
     *     /?/a/b            ->   /?/a/b
     *     /?/a/b?a=aa       ->   /?/a/b
     *     /?/a/b#a=aa       ->   /?/a/b
     *     /?/a/b?a=aa#b=bb  ->   /?/a/b
     *     /?/a/b#a=aa?b=bb  ->   /?/a/b
     *     /?a=aa            ->   /
     *     /#a=aa            ->   /
     * </pre>
     * @api    {nej.ut.p._$path2umi}
     * @param  {String} 路径，可带查询参数
     * @return {String} 模块UMI
     */
    _p._$path2umi = (function(){
        var _reg = /[\?#]/;
        return function(_url){
            var _arr = (_url||'').trim().split(_reg),
                _prv = _arr[0]=='/'&&(_arr[1]||'').indexOf('/')==0;
            return _arr[0]+(_prv?('?'+_arr[1]):'');
        };
    })();
};
NEJ.define('{lib}util/dispatcher/dsp/util.js',
          ['{lib}base/util.js'
          ,'{lib}util/dispatcher/module.2.js'
          ,'{lib}util/dispatcher/dsp/node.js'],f);
