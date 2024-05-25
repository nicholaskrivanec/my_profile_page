


window.addEventListener("load", addListeners);


class Painting {
	constructor(file_path, artist, description){
		this._file = file_path;
		this._artist = artist;
		this._descr = description;
		
		var file = this.File;
		var artist = this.Artist;
		var descr = this.Descr;
	}
	
	File(){
		return this._file;
	}
	
	Artist(){
		return this._artist;
	}
	
	Descr(){
		return this._descr;
	}
}

var Picture = function(artist, title, ref, fontSize = "12pt", fontColor = "white", fontWeight = "bold"){
	var _this = this;
	_this.artist = artist;
	_this.title = title;
	_this.ref = ref;
	_this.fontSize = fontSize;
	_this.fontColor = fontColor;
};

var pictures = new Array(
	 new Picture("M.C. Escher","Hand with Reflecting Sphere-1935","../resources/images/LW268-MC-Escher-Hand-with-Reflecting-Sphere-1935.jpg")		
	,new Picture("M.C. Escher","Balcony-1945","../resources/images/LW334-MC-Escher-Balcony-19451.jpg")	
	,new Picture("M.C. Escher","Relativity-1953","../resources/images/LW389-MC-Escher-Relativity-19531.jpg")	
	,new Picture("M.C. Escher","Print Gallery-1956,","../resources/images/LW410-MC-Escher-Print-Gallery-19561.jpg")	
	,new Picture("M.C. Escher","Division-1956","../resources/images/LW411-MC-Escher-Division-1956.jpg")	
	,new Picture("M.C. Escher","Ascending and Descending-1960","../resources/images/LW435-MC-Escher-Ascending-and-Descending-19601.jpg")	
	,new Picture("Cats", "Stripes", "https://www.thesprucepets.com/thmb/V1oGzYAiUkinq94H0wZ8YM2CUsw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Stocksy_txp33a24e10lxw100_Medium_214761-5af9d6d7875db900360440a7.jpg", "124pt", "pink")
	,new Picture("Cats", "Mittens", "https://images.squarespace-cdn.com/content/v1/55c945e0e4b04386fb9f8162/1531837146897-RJA7PBBKEMGJWGAGDA2B/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/cute-3252251.jpg?format=2500w", "124pt", "lightblue")
	,new Picture("Cats", "Dr. Evil", "https://pyxis.nymag.com/v1/imgs/671/fdb/29fd522da5c5c7a2a143df34f61a75c482-cat-coronavirus.rsquare.w1200.jpg", "24pt", "red")
	,new Picture("Cats", "", "https://a.wattpad.com/cover/125666566-352-k989319.jpg")
	,new Picture("Cats", "huhhhh!?! Capper", "https://i1.pngguru.com/preview/203/99/627/mlp-movie-capper-png-clipart.jpg","45pt", "#3d3662") 
	,new Picture("Cats", "Sleeping Capper", "https://mlpforums.com/uploads/post_images/sig-4819383.1366319__safe_artist-colon-threetwotwo32232_capper_twilight%20sparkle_my%20little%20pony-colon-%20the%20movie_spoiler-colon-my%20little%20pony%20movie_book_capperbetes.png", "59pt", "gold")
	,new Picture("Cats", "Granny Cat", "https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SX522_.jpg", "50pt", "darkviolet")
	,new Picture("Cats", "Cool Capper", "https://ih1.redbubble.net/image.442062138.9711/flat,750x,075,f-pad,750x1000,f8f8f8.jpg", "50pt", "blue")
	,new Picture("Cats", "Human Capper", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a51ba98-e2e2-418f-a11f-49984658c711/dbekbfp-4b5a6fd2-e497-4f6a-8cd7-930da61b8837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMGE1MWJhOTgtZTJlMi00MThmLWExMWYtNDk5ODQ2NThjNzExXC9kYmVrYmZwLTRiNWE2ZmQyLWU0OTctNGY2YS04Y2Q3LTkzMGRhNjFiODgzNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Q32VLPejwsFSEQxErgAYLXpU_wiuSd5BOxzFY49Vf_Q", "54pt", "violet")
	,new Picture("Cats", "Buff Capper", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGJDCRHopY2N0cWeMKKErvFocewTc-kiQpMg&usqp=CAU", "54pt", "purple")
);
	
var index = 0;
var timer;

function addListeners(){
	window.addEventListener("keypress", keyPressed);
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("play").addEventListener("click", play);
	document.getElementById("previous").addEventListener("click", back);
	document.getElementById("pause").addEventListener("click",pause);
}

function next(){	
	document.getElementById("next").focus();
	
	if (index == pictures.length -1){
		index = 0;
	}
	else{
		index++;
	}
	document.getElementById("picture0").src = pictures[index].ref;
	setTitleProperties(index);
}

function setTitleProperties(index){
	var title = document.getElementById("title");
	title.innerText= pictures[index].title;
	title.style.fontSize = pictures[index].fontSize;
	title.style.color= pictures[index].fontColor;
	title.style.fontWeight = "bold";
}
function play(){
	document.getElementById("play").style.display = "none";
	document.getElementById("pause").style.display = "inline-block";
	clearInterval(timer);
	timer = setInterval("next()", 5000);
}

function pause(){
	document.getElementById("play").style.display = "inline-block";
	document.getElementById("pause").style.display = "none";
	clearInterval(timer);
}

function back(){
	document.getElementById("previous").focus();
	if (index==0){
		index = pictures.length - 1;
	}
	else{
		index--;
	}
	document.getElementById("picture0").src = pictures[index].ref;
	setTitleProperties(index);
}


function keyPressed(){
	var key = event.which;
	clearInterval(timer);
	unhighlight("pause");
	unhighlight("next");
	unhighlight("play");
	unhighlight("previous");
	
	// if the key is the left arrow key 
	if (key == 37){
		back();
	}
	
	if (key == 39) {
		next();
	}
}



