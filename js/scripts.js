 function convertTo12Hr(hour){
	let current_hour = hour;
	let amPm = "AM"; //set the default 
	if(hour > 12){
		current_hour = hour - 12;
		amPm = "PM";
	}

	return {
		'amPm': amPm,
		'current_hour': current_hour
	}

}


function changeTimeFormat(hourFormat){

	let time_format = localStorage.getItem("time_format");

	if(time_format == null || time_format == undefined){
		//
	}else{
		time_format = JSON.parse(time_format);
		let hourFormat = time_format['hourFormat'];

		if(hourFormat == 12){
			//change the hour format to 24
			time_format['hourFormat'] = 24;
			time_format['info'] = "24hour";
		}

		if(hourFormat == 24){
			//change the hour format to 12
			time_format['hourFormat'] = 12;
			time_format['info'] = "12hour";
		}


		time_format = JSON.stringify(time_format);

		localStorage.setItem("time_format", time_format);

	}


}

function getTime(){

	let currentDate = new Date();

	//time in JS is in 24hour by default
	let currentHour = currentDate.getHours();
	let currentMinutes = currentDate.getMinutes();
	let currentSeconds = currentDate.getSeconds();

	//check the localStorage for time format
	let time_format = localStorage.getItem("time_format");

	let hourFormat = 24; //default hourFormat which is 24 hours
	let setHour = currentHour; //default.
	let amPm = "";


	if(time_format == null || time_format == undefined){

		//use 12 hour by default..
		if(setHour > 12){
			setHour = setHour - 12;
		}

		time_format = {
			"hourFormat" : 12,
			"info" : "12hour"
		}

		time_format = JSON.stringify(time_format);

		localStorage.setItem("time_format", time_format);


	}else{
		//there is time format in localStorage
		time_format = JSON.parse(time_format);
		hourFormat = time_format['hourFormat'];

		if(hourFormat == 24){
			setHour = currentHour;
			amPm = "";
		}

		if(hourFormat == 12){
			if(currentHour > 12){
				setHour = currentHour - 12;
			}else{
				setHour = currentHour;
			}

			current_hour_info = convertTo12Hr(currentHour);

			amPm = current_hour_info['amPm']; //set it
		}

	}

	let clockId = document.getElementById("clock_id");

	//get the clock id
	let clock_code = `<div id='clock_div'>
						<span id='inner_clock_id'>${setHour}:${currentMinutes}:${currentSeconds}<small style='font-size: 24px;'>${amPm}</small> </span>

						<button id='inner_settings_id'>Toggle Format</button>
					</div>`;


	clockId.innerHTML = clock_code;



	//show toggle settings on mouseover
	document.getElementById("clock_div").addEventListener("mouseover", function(){
		document.getElementById("inner_settings_id").style.display = "inline";
	});


	//Once the user clicks the Toggle Format button
	document.getElementById("inner_settings_id").addEventListener("click", function(){

				//change format
				changeTimeFormat(hourFormat);


	})


}



//call the getTime() function
getTime();


//Set an interval of 1 sec
setInterval(getTime, 1000);