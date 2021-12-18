var audios = [
    new Audio('music/Tending_The_Garden.mp3'),
    new Audio('music/Tending_The_Garden.mp3'),
    new Audio('music/Tending_The_Garden.mp3'),
    new Audio('music/No_More_Fire.mp3')
]
var volumes = [0,0,0,0];
var flags = [0,0,0,0];
const MAX_INDEX = 4;

var currentPlaying = null;
window.addEventListener('scroll',ScrollMusic);

function ScrollMusic()
{
    if(window.scrollY >= 100 & window.scrollY < 200)
    {
        exclusivePlay(2);
    }
    if(window.scrollY >= 200 & window.scrollY < 300)
    {
        exclusivePlay(3);
    }
}

//해당 인덱스만 재생, 이외 중지
function exclusivePlay(index)
{
    
    for(let i = 0; i < MAX_INDEX; i++)
    {
        if(i == index)
        {
            if(flags[i] != 1) //해당 인덱스
            {
                console.log(i);
                flags[i] = 1;
                audios[i].play();
                AccumulateVolume(i,1);
            }           
        }
        else
        {
            if(flags[i] != -1) //이외
            {
                flags[i] = -1;
                AccumulateVolume(i,-1);
            }      
        }
    }
}


//재귀 볼륨 조절
function AccumulateVolume(index,direction)
{
    if(direction != flags[index])
        return;

    //볼륨증가
    if(direction == 1)
    {
        if(volumes[index] == 100)
        {
            return;
        }
        volumes[index] += 1;

    }//볼륨감소
    else if(direction == -1)
    {
        if(volumes[index] == 0)
        {
            audios[index].pause();
            return;
        }
        volumes[index] -= 1;
        
    }
    audios[index].volume = volumes[index] / 100;
    setTimeout(AccumulateVolume,20,index,direction);
}


function castParallax() {

	window.addEventListener("scroll", function(event){

        console.log(window.scrollY);
		var top = this.scrollY;
		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});


}





castParallax();