var fromSquare = "";
var toSquare = "";

function Chess() {}
Chess.w = ['P','R','N','B','K','Q'];
Chess.Black = ['p','r','n','b','k','q'];
Chess.activeColor = Chess.w;
Chess.castling = ["K","Q","k","q"];
Chess.enpassant = " - ";
Chess.halfMoveClock = 0;
Chess.fullMoveClock = 1;
Chess.Pieces = [];

Chess.TouchPiece = function (piece, sq) {
	var squareDisplayLabel = document.getElementById("from_square_label");
	squareDisplayLabel.innerText = sq + "->";
	Chess.Board.GetPossibleMoves(piece, sq);
}

Chess.MovePiece = function (elem, _to) {
	if (_to.lastElementChild && _to.lastElementChild.nodeName == "CHESS-PIECE") {
		elem.kills.push(_to.lastChild.pieceId);
		console.log(elem.kills);
		_to.removeChild(_to.lastChild);
	}
	_to.appendChild(elem);

	fromSquare = "";
	toSquare = "";

	Chess.activeColor = (Chess.activeColor === Chess.w) ? Chess.Black : Chess.w;
}

Chess.AddPieceListeners = function (elem) {
	var _this = elem;
	var _to = null;
	var _from = elem.parentElement;

	_this.ondragstart = function () { return false; };

	_this.onmouseenter = function (event) {
		if (!Chess.activeColor.includes(_this.getAttribute('name')))
			return;
		_this.style.cursor = "grab";
	}

	_this.onmouseleave = function (event) {
		if (!Chess.activeColor.includes(_this.getAttribute('name')))
			return;
		_this.style.cursor = "initial";
	}

	_this.onmousedown = function (event) {
		if (!Chess.activeColor.includes(_this.getAttribute('name')))
			return;

		fromSquare = _from.id;
		
		_this.style.cursor = "grabbing";
		Chess.TouchPiece(_this, _from.id);

		_this.style.position = 'absolute';
		_this.style.zIndex = 1000;
		_this.style.width = _from.offsetWidth + "px";
		_this.style.height = _from.offsetHeight + "px";

		document.body.append(_this);

		moveAt(event.pageX, event.pageY);

		function moveAt(pageX, pageY) {
			_this.style.left = pageX - _this.offsetWidth / 2 + 'px';
			_this.style.top = pageY - _this.offsetHeight / 2 + 'px';
		}

		function onMouseMove(event) {

			if (!Chess.activeColor.includes(_this.getAttribute('name')))
				return;
			moveAt(event.pageX, event.pageY);

			_this.hidden = true;
			var _element_at_position = document.elementFromPoint(event.clientX, event.clientY);
			_this.hidden = false;

			if (!_element_at_position)
				return;

			var _closest_square = _element_at_position.closest('.square');

			if (_to != _closest_square) {
				if (_to) ChessBoard.exitSquare(_to);
				_to = _closest_square;
				if (_to) ChessBoard.enterSquare(_to);
			}
		}
		document.addEventListener('mousemove', onMouseMove);

		_this.onmouseup = function () {

			if (!Chess.activeColor.includes(_this.getAttribute('name')))
				return;

			document.removeEventListener('mousemove', onMouseMove);
			_this.onmouseup = null;

			_this.style.cursor = "grab";

			if (_to && _to != _from) {
				Chess.MovePiece(_this, _to);
				ChessBoard.exitSquare(_to);
			} else {
				_from.appendChild(_this);
				ChessBoard.exitSquare(_from);
			}

			_this.style.position = "static";
			_from = _this.parentElement;
			_to = null;
		};
	};
}
var pieceId = 1;

class ChessPiece extends HTMLElement {
	constructor() {
		super();
		this.Square = this.getAttribute('square');
		this.setAttribute('id', "piece" + pieceId++);
		this.kills = [];
		Chess.Pieces.push(this);
		this.isCaptured = false;
	}

	render() {
		var name = this.getAttribute('name');

		switch (name) {
			case 'p': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackPawn.png" ></div>';  this.hasRange = false; this.deltas = [8, 7, 9]; break;
			case 'P': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhitePawn.png" ></div>';  this.hasRange = false; this.deltas = [-8, -7, -9];break;
			case 'r': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackRook.png" ></div>';  this.hasRange = true;  this.deltas = [1, 8, -1, -8];break;
			case 'R': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhiteRook.png" ></div>';  this.hasRange = true;  this.deltas = [1, 8, -1, -8];break;
			case 'n': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackKnight.png"></div>'; this.hasRange = false; this.deltas = [17, 15, -17, -15, 6, 10, -6, -10]; break;
			case 'N': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhiteKnight.png"></div>'; this.hasRange = false; this.deltas = [17, 15, -17, -15, 6, 10, -6, -10]; break;
			case 'b': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackBishop.png"></div>'; this.hasRange = true;  this.deltas = [7, -7, 9, -9]; break;
			case 'B': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhiteBishop.png"></div>'; this.hasRange = true;  this.deltas = [7, -7, 9, -9]; break;
			case 'q': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackQueen.png" ></div>'; this.hasRange = true;  this.deltas = [7, -7, 9, -9, 1, 8, -1, -8]; break;
			case 'Q': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhiteQueen.png" ></div>'; this.hasRange = true;  this.deltas = [7, -7, 9, -9, 1, 8, -1, -8]; break;
			case 'k': this.innerHTML = '<div><img src="../css/image/chess_pieces/BlackKing.png"  ></div>'; this.hasRange = false; this.deltas = [7, -7, 9, -9, 1, 8, -1, -8]; break;
			case 'K': this.innerHTML = '<div><img src="../css/image/chess_pieces/WhiteKing.png"  ></div>'; this.hasRange = false; this.deltas = [7, -7, 9, -9, 1, 8, -1, -8]; break;
		}
	}

	static get observedAttributes() {
		return ['name'];
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;

			Chess.AddPieceListeners(this);
		}
	}
}
customElements.define("chess-piece", ChessPiece);


class ChessBoard extends HTMLElement {
	constructor() {
		super();
		this.Shade = ["d", "l"];
		this.File = ["a","b","c","d","e","f","g","h"];
		this.Rank = ["1","2","3","4","5","6","7","8"];
		this.Board = this.GetBoard();
		Chess.squareDisplayFrom = document.getElementById("square_label_from");
		Chess.squareDisplayTo = document.getElementById("square_label_to");
		this.GetFen = this.GetFenPosition;
	}

	render() {
		this.innerHTML = this.Board;
		this.squares = document.getElementsByClassName('square');
		var fen = this.GetFenPosition();
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}

	GetBoard() {
		var board = '<table class="board">';

		for (var i = 7; i >= 0; i--)
			board += this.InitRankSquares(i);
		board += '</table>';

		return board;
	}

	InitSquare(rank,file) {
		var rf = rank + file;
		var elem = '<td class="' + this.Shade[(this.Rank.indexOf(rank) + this.File.indexOf(file)) % 2] + '"><div class="dropable square" id="' + file + rank + '">';
		var cp = null;

		switch (rank) {
			case "2": cp = 'P'; break;
			case "7": cp = 'p'; break;
			case "1": 
				switch (file) {
					case "a": case "h": cp = 'R'; break;
					case "b": case "g": cp = 'N'; break;
					case "c": case "f": cp = 'B'; break;
					case "d": cp = 'Q'; break;
					case "e": cp = 'K'; break;
				} break;
			case "8":
				switch (file) {
					case "a": case "h": cp = 'r'; break;
					case "b": case "g": cp = 'n'; break;
					case "c": case "f": cp = 'b'; break;
					case "d": cp = 'q'; break;
					case "e": cp = 'k'; break;
				} break;
		}

		if (cp) elem += '<chess-piece name="' + cp + '"></chess-piece>';
		elem += '</div></td>' + "\n\t\t";

		return elem;
	}

	InitRankSquares(num) {
		var rank = '<tr class="rank" id="' + this.Rank[num] + '">';

		for (var j = 0; j < 8; j++)
			rank += this.InitSquare(this.Rank[num], this.File[j]);
		rank += '</tr>' + "\n\n\t";

		return rank;
	}

	GetFenPosition() {
		var fen = "";
		var emptySquares = 0

		for (var i = 0; i < this.squares.length; i++) {
			var sq = this.squares[i];

			if (sq.lastElementChild && sq.lastElementChild.tagName && sq.lastElementChild.tagName == "CHESS-PIECE") {
				if (emptySquares > 0 && emptySquares <= 8)
					fen += emptySquares;

				emptySquares = 0;
				var p = sq.lastChild.getAttribute('name');
				fen += p;
			} else {
				emptySquares++;
			}

			if ((i + 1) % 8 == 0 && i + 1 < this.squares.length) {
				if (emptySquares > 0 && emptySquares <= 8)
					fen += emptySquares;
				fen += "/";
				emptySquares = 0;
			}
		}

		fen += (Chess.activeColor == Chess.w) ? " w ":" b ";
		fen += (Chess.castling.length > 0) ? Chess.castling.join("") : " - "
		fen += Chess.enpassant;
		fen += Chess.halfMoveClock + " ";
		fen += Chess.fullMoveClock + " ";

		document.getElementById('fen_position_label').innerText = fen;
		return fen;
	}

	IsOnTheBoard(squareIndex){
		if (squareIndex >= 0 && squareIndex <= 63)
			return true;
		else 
			return false;
	}

	GetPossibleMoves(piece, sq){
		var mvs = [];
		var origin = Chess.SquareNames.indexOf(sq);

		for( var i = 0; i < piece.deltas.length; i++ ){
			var delta = piece.deltas[i];
			var squareIndex = origin + delta;

			while (this.IsOnTheBoard(squareIndex)){
				mvs.push(Chess.SquareNames[squareIndex] + " " + squareIndex );
				
				if (piece.hasRange == false)
					break;

				squareIndex += delta;
			}
		}
						
		console.log(mvs);
		return mvs;
	}
}
customElements.define("chess-board", ChessBoard);

ChessBoard.enterSquare = function (elem) {
	elem.classList.add("considered");
	toSquare = elem.id
	var squareDisplayLabel = document.getElementById("to_square_label");
	squareDisplayLabel.innerHTML = toSquare;
}

ChessBoard.exitSquare = function (elem) {
	elem.classList.remove("considered");
}

ChessBoard.FenHistory = [];
Chess.Board = document.getElementById("main-chess-board");

Chess.SquareNames = [	
	"a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
	"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
	"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
	"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
	"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
	"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
	"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
	"a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
];



