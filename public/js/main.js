function start() {
    require(["mainLoop", "assets/vars"],
    function(mainLoop, vars) 
    {    
        let main = new mainLoop.mainLoop();
        function resize() { main.resizeCanvas(); }
        function ev(event) { main.updateInput(event); }
        document.getElementById("canvas").addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
        document.getElementById("canvas").addEventListener("mousemove", function(e){ ev(e); }, false);
        document.addEventListener("keyup", function(e){ ev(e); }, false);
        document.addEventListener("keydown", function(e){ ev(e); }, false);
        document.addEventListener("click", function(e){ ev(e); }, false);
        window.addEventListener('resize', resize);
        
        let vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        let lastTime = (new Date()).getTime();
        let currentTime = 0;
        let timeDelta = 0;

        function start() {
            window.requestAnimationFrame(start);
            currentTime = (new Date()).getTime();
            timeDelta = currentTime - lastTime;
            if(timeDelta > vars.interval) 
            {
                main.update(timeDelta); 
                timeDelta = 0;           
                lastTime = currentTime;
            }
            main.draw();
        }
        start();
    });
}
