var ball_possesion = 5;//параметр владения мячом 0-10
var counter_attack = 0; // параметр наличия контратак 0-1
var pace = 5; // темп 0-10
var long_short_pass = 5; // соотношение числа длинных и коротких пассов
var long_short_shot = 5; // соотношение числа дальних и ближних ударов
var pressing = 5; // прессинг
var t = 0; // параметр времени матча
var array = []; // массив, куда записывается значения отклонений нашего зн-я и точного
var id; // таймер
var level = 0.1; //уровень сложности
var our_score = 0; // забитые мячи нашей команды
var opponent_score = 0; // забитые мячи команды соперника
var tour = 0; // номер тура
var calendar = ['Arsenal','Manchester_City','Manchester_United','Chelsea',
'Liverpool','Tottenham','Real_Madrid','Barcelona','Atletico_Madrid','Bayern','Borussia_Dortmund','PSG','Milan','Juventus','Inter']; // календарь ред
var team_list = ['Arsenal','Manchester_City','Manchester_United','Chelsea','Liverpool','Tottenham','Real_Madrid',
'Barcelona','Atletico_Madrid','Bayern','Borussia_Dortmund','PSG','Milan','Juventus','Inter']; //список команд для формирования их очков ред 
var rand_minute_arr = [];
/* считывание значения параметров с ползунков */
document.getElementById('difficulty level').oninput = function(){
	 level= this.value;
}

document.getElementById('ball_possesion').oninput = function(){
	ball_possesion = this.value;
}

document.getElementById('counter_attack').oninput = function(){
	 counter_attack= this.value;
}

document.getElementById('pace').oninput = function(){
	 pace = this.value;
}

document.getElementById('long_short_pass').oninput = function(){
	long_short_pass = this.value;
}

document.getElementById('long_short_shot').oninput = function(){
	long_short_shot = this.value;
}

document.getElementById('pressing').oninput = function(){
	pressing = this.value;
}

/*функция рандом*/
function getRandomArrayElement(arr){
   return arr[Math.floor(Math.random()*arr.length)]
}
/*функция рандом*/

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

/*функция создания рандомных минут*/
function rand_minute(){
	rand_minute_arr=[];
let start_arr = [];
for (var i = 1; i <= 90; i++) {
   start_arr.push(i);
}
let num_min = getRandomArrayElement([0,1,2,3,4]);
for (var i = 1; i <= num_min; i++) {
	rand_minute_arr.push(getRandomArrayElement(start_arr));
}
console.log(rand_minute_arr);
}
/*функция создания рандомных минут*/


/*Возможные команды соперника*/
var Liverpool = {
	'points': 0,
    'Salah': 7.7 ,
	'Mane': 7.29,
	'Jota': 7.3,
	'Henderson': 6.86,
	'Tiago':7.30,
	'Fabinho': 7.0,
	'Robertson': 7.23,
	'Van Djk': 7.18,
	'Matip':7.35,
	'Trent-Aleksandr-Arnold': 7.51,
	'Alisson': 6.87,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 4 , 'pace_exact' : 7, 'long_short_pass_exact' : 7, 'ball_possesion_exact' : 6, 'pressing_exact' : 8

};

var Arsenal = {
	'points': 0,
	'Saka': 7.2,
	'Martinelli': 7.1,
	'Nketiah': 6.60,
	'Thomas Partey': 7.1,
	'Ødegaard':6.9,
	'Smith Rowe': 6.74,
	'Tierny': 6.7,
	'Gabriel Magalhães': 6.6,
	'White':6.6,
	'Soares': 6.7,
	'Ramsdale': 6.3,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 7 , 'pace_exact' : 6, 'long_short_pass_exact' : 8, 'ball_possesion_exact' : 7, 'pressing_exact' : 7

	
};

var Chelsea = {
	'points': 0,
	'Werner': 6.81,
	'Havertz': 7.5,
	'Mount': 7.6,
	'Alonso':7.2,
	'Kante': 7.2,
	'Jorginho':7.04,
	'Chalobah': 7.1,
	'Tiago Silva':7.2,
	'Rudiger': 7.2,
	'James': 7.7,
	'Mendy': 6.7,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 7, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 7, 'pressing_exact' : 7

	
};

var Manchester_City = {
	'points': 0,
	'Jesus': 7.8,
	'Grealish': 7.9,
	'Mahrez': 8,
	'De Bryne':8.4,
	'Silva': 7.3,
	'Rodri':7.5,
	'Walker': 7.7,
	'Laporte':6.9,
	'Dias': 7.1,
	'Cancelo': 7.7,
	'Ederson': 6.8,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 5 , 'pace_exact' : 8, 'long_short_pass_exact' : 8, 'ball_possesion_exact' : 5, 'pressing_exact' : 5

	
};

var Manchester_United = {
	'points': 0,
	'Ronaldo': 7.1,
	'Sancho': 6.7,
	'Greenwood': 6.9,
	'Fernandes':7.1,
	'Fred': 6.8,
	'McTominay':6.8,
	'Shaw': 6.6,
	'Maguarer':6.6,
	'Lindelef': 6.5,
	'Wan-Bissaka': 6.9,
	'De Gea': 6.5,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 5 , 'pace_exact' : 7, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 7, 'pressing_exact' : 9

	
};

var Tottenham = {
	'points': 0,
	'Kane': 7.7,
	'Son Hon Min': 7.6,
	'Kulusevski': 7.6,
	'Reguilon':7,
	'Heberg': 7,
	'Bentancur':7.2,
	'Royal': 7.1,
	'Dier':6.8,
	'Sanchez': 7.1,
	'Davis': 6.9,
	'Loris': 6.8,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Real_Madrid = {
	'points': 0,
	'Benzema': 7.5,
	'Vinisius': 7.6,
	'Asensio': 7.1,
	'Kroos':7.1,
	'Casemiro': 7.3,
	'Modrich':7.1,
	'Mendy': 7.0,
	'Alaba':6.7,
	'Militao': 7.0,
	'Vaskes': 7.0,
	'Courtois': 6.7,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Barcelona = {
	'points': 0,
	'F. Torres': 6.9,
	'Aubameang': 7.1,
	'Dembele': 7.7,
	'Gavi':6.6,
	'Busguets': 7.0,
	'F. De Jong':6.9,
	'Jordi Alba': 7.0,
	'Eric Garcia':6.8,
	'Araujo': 6.8,
	'Dani Alves': 7.1,
	'Ter Stegen': 6.5,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Atletico_Madrid = {
	'points': 0,
	'Cunha': 6.6,
	'Suarez': 6.6,
	'Lemar': 6.8,
	'Condogbia':7.2,
	'De Paul': 6.6,
	'Fereira Carassco':7.4,
	'Reinildo': 6.7,
	'Gimenez':6.5,
	'Savic': 6.8,
	'Llorente': 6.6,
	'Oblak': 6.3,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Bayern = {
	'points': 0,
	'Lewandowski': 8.0,
	'Sane': 7.6,
	'Gnabry': 7.6,
	'Muller':7.3,
	'Goretska': 7.1,
	'Kimmich':7.4,
	'Davies': 7.3,
	'Hernandez':7.0,
	'Upamecano': 7.1,
	'Pavard': 6.9,
	'Neuer': 6.6,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Borussia_Dortmund = {
	'points': 0,
	'Haaland': 7.7,
	'T. Hazard': 6.7,
	'Reus':6.7,
	'Brandt': 7.1,
	'Dahoud':6.8,
	'Can': 6.8,
	'Shulz':6.5,
	'Zagadou': 6.5,
	'Akanji': 7.6,
	'Munier': 6.6,
	'Kobel': 6.9,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var PSG = {
	'points': 0,
	'Mbappe': 8.0,
	'Messi': 7.8,
	'Di Maria':7.3,
	'Veratti': 7.4,
	'Wjinaldum':6.3,
	'Pereira': 7.0,
	'Mendes':7.1,
	'Kimpembe': 6.8,
	'Marquinius': 6.9,
	'Hakimi': 7.0,
	'Navas': 6.9,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Milan = {
	'points': 0,
	'Giroud': 7.2,
	'Saelemaekers': 6.7,
	'Leao':7.3,
	'B. Diaz': 6.7,
	'Kessie':6.9,
	'Tonali': 7.2,
	'L. Hernandez':7.1,
	'Tomori': 7.0,
	'Kalulu': 7.0,
	'Calabria': 6.9,
	'Mengian': 6.9,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Juventus = {
	'points': 0,
	'Morata': 6.8,
	'Dybala': 7.4,
	'Rabiot':6.7,
	'Arthur': 6.5,
	'Locatelli':7.1,
	'Cuadrado': 7.1,
	'Alex Sandro':6.7,
	'Chiellini': 6.9,
	'Bonucci': 6.5,
	'Danilo': 6.7,
	'Szczesny': 6.7,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};

var Inter = {
	'points': 0,
	'Dzeko': 7.1,
	'Lautaro Martinez': 7.2,
	'Perishic':7.2,
	'Çalhanoglu': 7.3,
	'Brozovich':7.1,
	'Barella': 7.0,
	'Dumfries':7.0,
	'Bastoni': 6.9,
	'De Vrij': 6.7,
	'Skriniar': 6.7,
	'Handanovich': 6.8,
	'counter_attack_exact' : 0, 'long_short_shot_exact' : 4 , 'pace_exact' : 5, 'long_short_pass_exact' : 4, 'ball_possesion_exact' : 6, 'pressing_exact' : 7

	
};
/*Возможные команды соперника*/

/*Наша команда*/
var You = {
	'points': 0,
    'Felino': 5.4,
	'Boba': 5.8,
	'MM': 6.85,
	'Van Ge Gol': 5.7,
	'Goslin':5.2,
	'Lind': 5.1,
	'Ger': 6.2,
	'Lover': 5.3,
	'Mitchell': 5.5,
	'Pope': 6.54,
	'Forster': 5.0,
	'counter_attack_exact' : 1, 'long_short_shot_exact' : 5 , 'pace_exact' : 5, 'long_short_pass_exact' : 5, 'ball_possesion_exact' : 5, 'pressing_exact' : 5

};
/*Наша команда*/

var Progress = { // ред
	'You':0,
	'Arsenal':0,
	'Tottenham':0,
	'Manchester_City':0,
	'Manchester_United':0,
	'Chelsea':0,
	'Liverpool':0,
	'Real_Madrid':0,
	'Barcelona':0,
	'Atletico_Madrid':0,
	'Bayern':0,
	'Borussia_Dortmund':0,
	'PSG':0,
	'Milan':0,
	'Juventus':0,
	'Inter':0,
	
};


/* функция составление итогового календаря */
function create_calendar() {
  calendar.sort(() => Math.random() - 0.5);
  for(var y = 0; y < calendar.length; y++) {
  document.getElementById("c_" + (y + 1)).innerHTML = 'You : ' + calendar[y].replace("_", " ");
  }
}
/* функция составление итогового календаря */

alert('Are you ready start season?');
create_calendar();

/*функция расчёта рейтинга команды*/
function calc_rate(name){
	  var dict = eval(name);
	  rate_arr = [];
	  for(var key in dict) {
         if (key == 'counter_attack_exact' || key == 'long_short_shot_exact' || key == 'pace_exact' 
         || key == 'long_short_pass_exact' || key == 'ball_possesion_exact' || key == 'pressing_exact'){
			  continue;
		  }
      rate_arr.push(dict[key]);
} 	
 return average(rate_arr);
}
/*функция расчёта рейтинга команды*/


var our_rating = calc_rate(You); //рейтинг нашей команды 0-10
var opponent_rating;//рейтинг команды соперника 0-10
var exact_arr; //массив с параметрами соперника

/*функция с параметрами команды соперника*/
function test_team(counter_attack_exact, long_short_shot_exact, pace_exact, long_short_pass_exact, ball_possesion_exact, pressing_exact){
	return [counter_attack_exact, long_short_shot_exact, pace_exact, long_short_pass_exact, ball_possesion_exact, pressing_exact];
}
/*функция с параметрами команды соперника*/
var numb = 0; // костыль, чтоб нельзя было менять оппонента по ходу матча
var opponent_team; 
var opponent;

/*Функция обновления очков команды*/
function edit_table(name, point){
		  Progress[name] = Progress[name] + point;
}
/*Функция обновления очков команды*/

/*Функция сортировки команд по набранным очкам и обновления таблицы*/
function sort_table(input_dict){
	//сортировка словаря -> массив пар команда - очки
var items = Object.keys(input_dict).map(function(key) {
  return [key, input_dict[key]];
});
items.sort(function(first, second) {
  return second[1] - first[1];
});
let serial = ['first','second','third','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fiveteen','sixteen']; //id названий команд ред
let serial_point = ['first_point','second_point','third_point','four_point','five_point','six_point',
'seven_point','eight_point','nine_point','ten_point','eleven_point','twelve_point','thirteen_point','fourteen_point','fiveteen_point','sixteen_point']; //id очков команд ред
// заполнение турнирной таблицы
for(var j = 0; j < serial.length; j++) {
	 document.getElementById(serial[j]).innerHTML = items[j][0].replace("_", " ");
	 document.getElementById(serial_point[j]).innerHTML = items[j][1];
 }
};
/*Функция сортировки команд по набранным очкам и обновления таблицы*/

/*функция распределения очков между соперниками*/
function create_combinations() {
  team_list.sort(() => Math.random() - 0.5);
  let dd = [];
  for(var ki = 0; ki < team_list.length; ki++) {
	  if (team_list[ki]==opponent){continue;}
	  dd.push(team_list[ki]);
  }
  
for(var ki = 0; ki < dd.length; ki=ki+2) {
	let rand = getRandomArrayElement([0,1,3]);
	Progress[dd[ki]] = Progress[dd[ki]] + rand;
	if (rand == 1){	Progress[dd[ki+1]] = Progress[dd[ki+1]] + 1;}
	else{
	Progress[dd[ki+1]] = Progress[dd[ki+1]] + (3 - rand);
	}


}
  	  //console.log(Progress);

}
/*функция распределения очков между соперниками*/


/*функция сравнения параметров введённых пользователем и эталонных*/
function compare(){
	document.getElementById("time").innerHTML = Math.ceil((t*3)/8)+ ' минута';
	console.log('время ' + t);
	
	if(rand_minute_arr.includes(Math.ceil((t*3)/8))==true){
		let rand = getRandomArrayElement(array);
		array = [];
		if (rand == 1 ){
			console.log("Пропускаем");
			opponent_score = opponent_score + 1;

			document.getElementById("scored").innerHTML ='You ' + our_score + ':' + opponent_score + ' ' + opponent.replace("_", " ");
		}
		else if(rand == 2){
		    console.log("Ничего не произошло");
		}
		else if (rand == 3){
		    console.log("Забиваем");
			our_score = our_score + 1;
			document.getElementById("scored").innerHTML = 'You ' + our_score + ':' + opponent_score + ' ' + opponent.replace("_", " ");
		}
	};
	if (t == 0){
	    array = [];
	}
	console.log(array);
    if(t == 241){
		tour++;
		document.getElementById("tur").innerHTML = tour + 1 + ' тур';
		if (tour==5){
		document.getElementById("pause_game").disabled = true; 
		document.getElementById("stop_game").disabled = true;
		}
		create_combinations();
		document.getElementById("time").innerHTML = 'Матч завершён!';
		if (opponent_score > our_score){edit_table(opponent,3); edit_table('You',0);}
		else if(opponent_score == our_score){edit_table(opponent,1);  edit_table('You',1)}
		else if(opponent_score < our_score){edit_table(opponent,0);  edit_table('You',3);}
		sort_table(Progress);
		our_score = 0;
		array = [];
		t = 0;
		opponent_score = 0;
		numb = 0;
		clearInterval(id);
	}
	else if(t % 30 != 0){
	     let num_arr = 	[Number(counter_attack), Number(long_short_shot), Number(pace),Number(long_short_pass),Number(ball_possesion),Number(pressing)];
		 let error = [(0.5 - level+ ((our_rating - opponent_rating)/50)),(0.5 - level + ((our_rating - opponent_rating)/50)),(0.4 - level + ((our_rating - opponent_rating)/50)),
		 (0.4 - level + ((our_rating - opponent_rating)/50)),(0.3 - level + ((our_rating - opponent_rating)/50)),(0.2 - level + ((our_rating - opponent_rating)/50))];
		 for (var i = 0; i < error.length; i++) {
              if ((Math.abs(exact_arr[i] - num_arr[i]) / exact_arr[i]) < error[i] ){
				  array.push(3)
			  }
			  else if ((Math.abs(exact_arr[i] - num_arr[i]) / exact_arr[i]) <= (error[i] + 0.2)){array.push(2);}
			  else{array.push(1);}
         }		 
	}
	else if(t % 30 == 0 && t != 0 ){
		let rand = getRandomArrayElement(array);
		array = [];
		if (rand == 1 ){
			console.log("Пропускаем");
			opponent_score = opponent_score + 1;

			document.getElementById("scored").innerHTML ='You ' + our_score + ':' + opponent_score + ' ' + opponent.replace("_", " ");
		}
		else if(rand == 2){
		    console.log("Ничего не произошло");
		}
		else if (rand == 3){
		    console.log("Забиваем");
			our_score = our_score + 1;
			document.getElementById("scored").innerHTML = 'You ' + our_score + ':' + opponent_score + ' ' + opponent.replace("_", " ");
		}
	}
    t++;

}
/*функция сравнения параметров введённых пользователем и эталонных*/
/*функция запуска матча*/
function start(){
	if (tour == team_list.length - 1 ){
		document.getElementById("start_game").disabled = true; 
		//document.getElementById("start_season").disabled = true; 
}

    numb++;
	if (numb == 1){ // если 1, то оппонент выбирается впервые
	//opponent_team = document.getElementById("Opponent_team");
    //opponent = opponent_team.value;
	rand_minute();
	opponent = calendar[tour];
	document.getElementById("scored").innerHTML = 'You ' + our_score + ':' + opponent_score + ' ' + opponent.replace("_", " ");

	opponent_rating = calc_rate(opponent);
	console.log(eval(opponent)['counter_attack_exact']);
	
	exact_arr = test_team(eval(opponent)['counter_attack_exact'], eval(opponent)['long_short_shot_exact'],eval(opponent)['pace_exact'],
	eval(opponent)['long_short_pass_exact'], eval(opponent)['ball_possesion_exact'], eval(opponent)['pressing_exact']);
	id = setInterval(compare, 1000);
	}
	else{
			id = setInterval(compare, 1000);

	}

	
}
/*функция запуска матча*/

/*функция завершения матча*/
function stop(){
	if (numb > 0 ){ // если 1, то оппонент выбирается впервые
	tour++;
    document.getElementById("tur").innerHTML = tour + 1 + ' тур';
	create_combinations();
	numb = 0; // сброс оппонента
	clearInterval(id);
	edit_table(opponent,3); 
	edit_table('You',0);
	sort_table(Progress);
	console.log('Техническое поражение');
	t=0;
	array = [];
	}
		
		
	if (tour == team_list.length){
		document.getElementById("pause_game").disabled = true; 
		document.getElementById("stop_game").disabled = true; 
		document.getElementById("time").innerHTML = 'Сезон завершён!';

}
	
}
/*функция завершения матча*/

/*функция остановки матча*/
function on_pause(){
	clearInterval(id);
}
/*функция остановки матча*/

