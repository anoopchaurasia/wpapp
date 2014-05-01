/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
fm.Package("jfm.dom");
fm.Import("jfm.dom.DomManager");
fm.Class("ListView");
jfm.dom.ListView = function (me, DomManager){this.setMe=function(_me){me=_me;};   
    'use strict';
	var copyNode, newScopeC, exp, nodeList, isArray;

    this.ListView = function(list){
		isArray = jQuery.isArray(list);
    	this.items = list;
		nodeList = [];
    	newScopeC = function(){};
    };
    this.add = function(item){
		if(!copyNode){
			setTimeout(function(){
				me.add(item);
			}, 30);
			return;
		}
    	if(jQuery.isArray(item)){
    		for(var i=0, len = item.length; i< len; i++){
    			this.add(item[i]);
    		}
    	}
    	else if(isArray){
    		this.items.push(item);
			addDom(this.items[this.items.length-1], this.items.length-1);
    	}
		else{
			this.clear();
			me.items = item;
			for(var k in me.items){
				if(!me.items.hasOwnProperty(k) ) continue;
				addDom( me.items[k], k);
			}
		}
    };

	this.remove = function(item, key){
		if(isArray){
			var index = this.items.indexOf(item);
			nodeList.splice(index, 1)[0].remove();
			this.items.splice(index, 1);
		}else{
			var index = 0;
			for(var k in me.items){
				if(!me.items.hasOwnProperty(k) ) continue;
				index++;
				if(k === key)break;
			}
			delete me.items[key];
			nodeList.splice(index-1, 1)[0].remove();
		}
		
	};

	this.clear = function(){
		var temp;
		while(temp = nodeList.pop()){
			temp.remove();
		}
	};

	function append(clone){
		if(nodeList.length){
			nodeList[nodeList.length-1].after(clone);
		}else{
			nextNode.after(clone);
		}
	};

	function addDom(item, index){
		var newScope = new newScopeC;
        newScope[exp] = item;
        newScope.index = index;
        var clone = copyNode.clone(true);
		append(clone);
		nodeList.push(clone);
		new DomManager( clone, newScope);
	}

    this.createView = function(n, s, e){
     	copyNode = $(n);
		exp = e;
		newScopeC.prototype = s;
	    nextNode = copyNode;
		copyNode = nextNode.clone(true).show();
        for(var k in me.items){
			if(!me.items.hasOwnProperty(k) ) continue;
            addDom( me.items[k], k);
        }
     }
};