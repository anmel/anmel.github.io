var amount = 0;
var na = 100;


$(document).ready(function(){
    var c = {x: $('body').width()/2, y: $('body').height()/2};
    var speed = {r:.005, m:1};
    var rlim = {v:.05, r:.2}
    var container = $('<div/>');
    $('body').prepend(container);
    function makeIota() {
        var size = Math.round(Math.random()*10+1);
        var iota = $('<div />').css({
            'position':'absolute',
            'height':size,
            'width':size,
            'border-radius':size/2,
            'background':Math.random()>.5?'#000':'#FFF',
            'opacity':Math.random()*.2+.05
            //'z-index':10000
        });
        container.prepend(iota);
        iota.x = Math.random()*c.x*2;
        iota.y = Math.random()*c.y*2;
        iota.rv = Math.random()*.2-.1;
        iota.r = Math.PI * Math.random();
        return iota;
    }
    var z = [];
          
    var x = setInterval(function(){
        var start = new Date().getTime();
        for(var i in z){
            var iota = z[i];
            iota.rv += (Math.random()-.5)*speed.r;
            iota.rv = iota.rv>rlim.v?rlim.v:iota.rv<-rlim.v?-rlim.v:iota.rv;
            iota.r+=iota.rv;
            var dx = c.x-iota.x; dx*=dx;
            var dy = c.y-iota.y; dy*=dy;
            var dst = (dx+dy)/1000.0;
            iota.x += Math.cos(iota.r)*speed.m;
            iota.y += Math.sin(iota.r)*speed.m;
            
            iota.x = lerp(iota.x, c.x, 1-.0001);
            iota.y = lerp(iota.y, c.y, 1-.0001);
            iota.css({
                left:iota.x,
                top:iota.y,
            'postion':'absolute'
            });
        }
        var end = new Date().getTime();
        var fps = Math.round(1000/(end-start));
        //$('p').text(fps+' fps');
        
        if (amount<1000 && fps>10) {
            na += amount*.01;
            while (Math.round(na)>amount) {
                z.push(makeIota());
                amount++;
            }
        }
        $('body span').text(amount);
    },10);
    
    $('body').click(function(){
        container.html('');
        z=[];
        amount=0;
        na=100;
    });
});


function lerp (a0,a1,a2) {
    return (a1+a2*(a0-a1));
}