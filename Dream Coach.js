var ball_possesion = 1;//параметр владения мячом
var t = 0; // параметр времени матча
var array = []; // массив, куда записывается значения отклонений
var id; // таймер

/* считывание значения параметров с ползунков */
document.getElementById('ball_possesion').oninput = function(){
	ball_possesion = this.value;
}

/*функция расчёта среднего значения*/
function  average(arr)
{
    if(arr.length === 0)
        return 0;
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i];
    } 
    return sum / arr.length;
}
/*функция расчёта среднего значения*/

/*функция с параметрами команды соперника*/
function test_team(t){
	var a = 5;
	return a * t;
}
/*функция с параметрами команды соперника*/

/*функция сравнения параметров введённых пользователем и эталонных*/
function compare(){
	console.log(t);
	if (t == 0){
	    array = [];
	}
	console.log(array);
    if(t == 240){
		clearInterval(id);
	}
	else if(t % 30 != 0){
		 let exact = test_team(t);
	     let num = ball_possesion * t;
	     array.push(Math.abs(exact - num) / exact);
	}
	else if(t % 30 == 0 && t != 0 ){
	    let av = average(array);
		array = [];
		if (av>0.5){
			console.log("Пропускаем");
		}
		else if(av == 0.5){
		    console.log("Ничего не произошло");
		}
		else{
		    console.log("Забиваем");
		}
	}
    t++;
}
/*функция сравнения параметров введённых пользователем и эталонных*/

/*функция запуска матча*/
function start(){
	id = setInterval(compare, 1000); 
}
/*функция запуска матча*/

/*функция завершения матча*/
function stop(){
	clearInterval(id);
	t=0;
	array = [];
}
/*функция завершения матча*/

/*функция остановки матча*/
function on_pause(){
	clearInterval(id);
}
/*функция остановки матча*/

