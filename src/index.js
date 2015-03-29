var fs      = require('fs');
var walk    = require('walk');
var _       = require('underscore');

// Walker options
var walker  = walk.walk('./test-data', { followLinks: false });

walker.on('file', function(root, stat, next) {
    fs.readFile(root + '/' + stat.name, 'utf8', function(err, data){
        var list = buildList(data);
        var res = hasLoop(list);

        console.log('> ' + stat.name);
        console.log(':: res = ' + res);
        console.log(data);
    });

    next();
});

function buildList(data){
  var lines = data.split('\n');
  var entry = null;
  var prev = null;

  var dic = { };

  _.each(lines, function(l){
      if(l === '') return;

      var e = dic[l] || (dic[l] = { value: l });

      if(prev) prev.next = e;

      prev = e;
      entry = entry || e;
  });

  return entry;
}

function hasLoop(list){
    if(!list) return false;

    var a = list;
    var b = list;

    var ia = 0;
    var ib = 1;

    var move = function(){
        for(var i = 0; i < ib; i++) {
          b = b.next;

          if(!b) return true;
        }

        for(var j = 0; j < ia; j++) a = a.next;
    };

    while(!move()) {
        if(a === b) return true;

        ia++;
        ib++;
    }

    return false;
}
