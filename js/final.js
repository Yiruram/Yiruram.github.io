var audios = [
    new Audio('music/Its_Been_A_Year.mp3'),
    new Audio('music/Rolling_Down_This_Lazy_Wave.mp3'),
    new Audio('music/Tending_The_Garden.mp3'),
    new Audio('music/No_More_Fire.mp3')
]
var titles = ["It's Been A Year - No Spirit X Kyle McEvoy", "Rolling Down This Lazy Wave - santpoort", "Tending The Garden - Stan Forebee", "No More Fire - Sleepy Fish"];
var volumes = [0,0,0,0];
var flags = [0,0,0,0];
var music_flag = false;
const MAX_INDEX = 4;

audios[0].loop = true;
audios[1].loop = true;
audios[2].loop = true;
audios[3].loop = true;

var title = document.getElementById('song');
var button = document.getElementById('button');
var currentPlaying = null;
window.addEventListener('scroll',ScrollMusic);



function ScrollMusic()
{
    if(window.scrollY >= 0 & window.scrollY < 3200)
    {
        exclusivePlay(0);
    }
    else if(window.scrollY >= 3200 & window.scrollY < 6400)
    {
        exclusivePlay(1);
    }
    else if(window.scrollY >= 6400 & window.scrollY < 9600)
    {
        exclusivePlay(2);
    }
    else if(window.scrollY >= 9600 & window.scrollY < 12800)
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
                flags[i] = 1;
                if(music_flag)
                {
                    audios[i].play();
                    title.innerText = "Now Playing : " + titles[i];
                    AccumulateVolume(i,1);
                }

                document.getElementById("season"+(i+1)).style.visibility = "visible";
            }           
        }
        else
        {
            if(flags[i] != -1) //이외
            {
                flags[i] = -1;
                if(music_flag)
                {
                    AccumulateVolume(i,-1);
                }
                document.getElementById("season"+(i+1)).style.visibility = "hidden";
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

//패럴랙스 계산
function parallax() {

	window.addEventListener("scroll", function(event){
        //console.log(window.scrollY);
		var layers = document.getElementsByClassName("parallax");
		var layer, speed, y;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
            if(layer.parentElement.style.visibility != 'hidden')
            {
                var topY = this.scrollY - layer.getAttribute('data-offset');
                speed = layer.getAttribute('data-speed');
                var y = -(topY * speed / 100);
                layer.setAttribute('style', 'transform: translate3d(0px, ' + y + 'px, 0px)');
    
            }
		}
	});
}

function onLoad()
{
    parallax();

    //스크롤 책갈피 리스너

    document.getElementById('bm1').addEventListener('click',function(){window.scrollTo(0,0);});
    document.getElementById('bm2').addEventListener('click',function(){window.scrollTo(0,3200);});
    document.getElementById('bm3').addEventListener('click',function(){window.scrollTo(0,6400);});
    document.getElementById('bm4').addEventListener('click',function(){window.scrollTo(0,9600);});

    button.addEventListener('click',function(){
        if(music_flag)
        {
            music_flag = false;
            for(var i = 0 ; i < MAX_INDEX; i ++)
            {
                button.innerText="[음악 켜기]";
                title.innerText = "Now Playing : Muted";
                audios[i].pause();
                flags[i] = 0;
            }
        }
        else
        {
            music_flag = true; 
            for(var i = 0 ; i < MAX_INDEX; i ++)
            {
                button.innerText="[음악 끄기]";
                flags[i] = 0;
            }
            ScrollMusic();
        }


    });

}


document.body.onload = onLoad();

